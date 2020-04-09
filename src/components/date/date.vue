<template>
    <el-form-item :label="label" :prop="prop" :rules="validate(rule, 'text', label, 'change')"  :label-width="labelWidth">
        <template v-if="dateType === 'datePicker'">
            <el-date-picker
                ref="acDate"
                v-model="text"
                :type="type"
                :size="size"
                :range-separator="rangeSeparator"
                :start-placeholder="startPlaceholder"
                :end-placeholder="endPlaceholder"
                :placeholder="placeholder"
                :disabled="disabled"
                :format="format"
                :value-format="valueFormat"
                :picker-options="pickerOptions"
                :clearable="clearable"
                :default-time="defaultTime"
                @change="handleChange"
            >
            </el-date-picker>
        </template>
        <template v-else-if="dateType === 'timePicker'">
            <el-time-picker
                :is-range="isRange"
                ref="acDate"
                v-model="text"
                :picker-options="timeOptions"
                :range-separator="rangeSeparator"
                :start-placeholder="startPlaceholder"
                :end-placeholder="endPlaceholder"
                :placeholder="placeholder"
                :disabled="disabled"
                :clearable="clearable"
                :size="size"
                :format="format"
                :value-format="valueFormat"
                @change="handleChange"
            >
            </el-time-picker>
        </template>
        <template v-else-if="dateType === 'timeSelect'">
            <template v-if="isRange === false">
                <!-- 固定时间 -->
                <el-time-select
                    v-model="text"
                    :picker-options="timeOptions"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :clearable="clearable"
                    :size="size"
                    :format="format"
                    :value-format="valueFormat"
                    @change="handleChange"
                >
                </el-time-select>
            </template>
            <template v-else>
                <!-- 固定时间区间 -->
                <el-time-select
                    v-model="startText"
                    :picker-options="timeOptions"
                    :placeholder="startPlaceholder"
                    :disabled="disabled"
                    :clearable="clearable"
                    :size="size"
                    :format="format"
                    :value-format="valueFormat"
                    class="timeSelect_side"
                    @change="selectHandleChange"
                >
                </el-time-select>
                <span class="timeSelect_mid"> {{rangeSeparator}} </span>
                <el-time-select
                    v-model="endText"
                    :picker-options="{
                        ...this.timeOptions,
                        minTime: this.startText
                    }"
                    :placeholder="endPlaceholder"
                    :disabled="disabled"
                    :clearable="clearable"
                    :size="size"
                    :format="format"
                    :value-format="valueFormat"
                    class="timeSelect_side"
                    @change="selectHandleChange"
                >
                </el-time-select>
            </template>
        </template>
    </el-form-item>
</template>

<script>
import { validate } from '../../utils/formValidate'
export default {
    name: 'AcDate',
    data() {
        return {
            pickerOptions: {},
            text: '',
            validate: validate,
            toolTips: '',
            startText: '',
            endText: '',
            isDateRange: false,
            isDateRangeName: false
        }
    },
    props: {
        dateRangeName: {},
        form: {},
        dateType: {
            type: String,
            default: 'datePicker',
            validator: function(value) {
                return ['datePicker', 'timePicker', 'timeSelect'].indexOf(value) !== -1
            }
        },
        labelWidth: {},
        label: { type: String, default: '' },
        prop: { default: '' },
        rule: { type: Boolean, default: false },
        type: {
            type: String,
            default: 'datetime',
            validator: function(value) {
                return ['datetime', 'date', 'daterange', 'datetimerange', 'year', 'month', 'week', 'dates'].indexOf(value) !== -1
            }
        }, // 类型：datetime / date / daterange / datetimerange / year / month / week / dates
        disabled: { type: Boolean, default: false }, // 可否编辑
        size: {
            type: String,
            default: 'small',
            validator: function(value) {
                return ['medium', 'small', 'mini'].indexOf(value) !== -1
            }
        }, // 控制大小
        valueFormat: { // 定义返回值格式
            type: String,
            default: function() {
                if (this.dateType === 'datePicker') {
                    switch (this.type) {
                    case 'datetime':
                    case 'datetimerange':
                        return 'yyyy-MM-dd HH:mm:ss'
                    case 'date':
                    case 'daterange':
                    case 'dates':
                        return 'yyyy-MM-dd'
                    case 'year':
                        return 'yyyy'
                    case 'month':
                        return 'yyyy-MM'
                    }
                } else if (this.dateType === 'timePicker') {
                    return 'yyyy-MM-dd HH:mm:ss'
                }
            }
        },
        format: { // 定义文本框显示值格式
            type: String,
            default: function() {
                if (this.dateType === 'datePicker') {
                    switch (this.type) {
                    case 'datetime':
                    case 'datetimerange':
                        return 'yyyy-MM-dd HH:mm:ss'
                    case 'date':
                    case 'daterange':
                    case 'dates':
                        return 'yyyy-MM-dd'
                    case 'year':
                        return 'yyyy'
                    case 'month':
                        return 'yyyy-MM'
                    case 'week':
                        return 'yyyy 第 WW 周'
                    }
                }
            }
        },
        value: { }, // 日期-取值
        placeholder: { type: String, default: '' }, // 日期-文字
        rangeSeparator: { type: String, default: '-' }, // 日期区间-隔断符号
        startPlaceholder: { type: String, default: '' }, // 日期区间-开始文字
        endPlaceholder: { type: String, default: '' }, // 日期区间-结束文字
        shortcuts: { type: Array, default() { return [] } }, // 带快捷选项
        disabledDate: { type: Function }, // 不可编辑函数
        clearable: { type: Boolean, default: true }, // 是否可清空
        defaultTime: {},
        timeOptions: {}, // 时间-取值范围
        isRange: { type: Boolean, default: false } // 是否时间区间
    },
    watch: {
        value: 'init'
    },
    computed: {},
    created() {
        let that = this
        // 是否日期区间
        this.isDateRange = (this.type === 'datetimerange' || this.type === 'daterange')
        this.isDateRangeName = (this.dateRangeName && this.dateRangeName.indexOf(',') !== -1)
        // 带快捷选项
        if (this.shortcuts.length > 0) {
            this.pickerOptions.shortcuts = []
            this.shortcuts.forEach((item) => {
                this.pickerOptions.shortcuts.push({
                    text: item.text,
                    onClick(picker) {
                        if (that.isDateRange) {
                            const end = new Date()
                            const start = new Date()
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * item.days)
                            picker.$emit('pick', item.days < 0 ? [end, start] : [start, end])
                        } else {
                            const date = new Date()
                            date.setTime(date.getTime() + 3600 * 1000 * 24 * item.days)
                            picker.$emit('pick', date)
                        }
                    }
                })
            })
        }
        // 不可编辑函数
        if (this.disabledDate) {
            this.pickerOptions.disabledDate = (time) => {
                return this.disabledDate(time)
            }
        }
        this.init()
    },
    methods: {
        // 赋值
        init() {
            let val = this.value
            // 值为逗号分割字符串处理成数组（周除外）
            if (this.type !== 'week' && this.value && this.value.indexOf(',') !== -1) {
                val = this.value.split(',')
            }

            // 日期区间初始化（含开始和结束2个字段）
            if (this.form && this.isDateRangeName) {
                let arr = this.dateRangeName.split(',')
                let sVal = this.form[arr[0]]
                let eVal = this.form[arr[1]]
                let has = !!(sVal && eVal)
                if (this.isRange && this.dateType === 'timeSelect') {
                    this.startText = has ? sVal : ''
                    this.endText = has ? eVal : ''
                } else if (has) {
                    this.text = [sVal, eVal]
                } else {
                    this.text = null
                }
                return
            }
            // 日期区间初始化（单个字段）
            if (this.isDateRange) {
                this.text = val || null
                return
            }
            // 时间区间初始化
            if (this.isRange) {
                // 固定时间区间
                if (this.dateType === 'timeSelect') {
                    this.startText = val ? val[0] : ''
                    this.endText = val ? val[1] : ''
                } else {
                    this.text = val || null
                }
                return
            }
            // 其他类型
            this.text = val
        },
        // change
        handleChange(value) {
            if (this.isDateRangeName) {
                this.$emit('change', value ? value[0] : null, value ? value[1] : null)
            } else {
                this.$emit('change', value)
            }
            if (this.form) {
                if (this.isDateRangeName) {
                    let arr = this.dateRangeName.split(',')
                    if (value) {
                        this.$set(this.form, arr[0], value[0])
                        this.$set(this.form, arr[1], value[1])
                    } else {
                        this.$set(this.form, arr[0], '')
                        this.$set(this.form, arr[1], '')
                    }
                } else if (this.isDateRange || this.isRange || this.type === 'dates') {
                    this.$set(this.form, this.prop, value ? value.join(',') : null)
                } else {
                    this.$set(this.form, this.prop, value)
                }
            }
        },
        // 固定时间区间-change
        selectHandleChange() {
            // 判断开始结束有一个被清空，则2个都清空
            if (this.startText === null || this.endText === null) {
                this.startText = ''
                this.endText = ''
            }
            // 判断开始大于结束，则清空结束时间（重选结束）
            if (this.startText > this.endText) {
                this.endText = ''
            }
            if (this.isDateRangeName) {
                this.$emit('change', this.startText, this.endText)
            } else {
                this.$emit('change', (this.startText && this.endText) ? [this.startText, this.endText] : null)
            }

            if (this.form) {
                let hasVal = !!(this.startText && this.endText)
                if (this.isDateRangeName) {
                    let arr = this.dateRangeName.split(',')
                    this.$set(this.form, arr[0], hasVal ? this.startText : '')
                    this.$set(this.form, arr[1], hasVal ? this.endText : '')
                } else {
                    this.$set(this.form, this.prop, hasVal ? [this.startText, this.endText].join(',') : null)
                }
            }
        }
    }
}
</script>
<style lang="scss">
.el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
    width: 100%;
}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 100%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
.timeSelect_side.el-input {
    width: 45%;
}
.timeSelect_mid {
    display: inline-block;
    width: 10%;
    text-align: center;
}
</style>
