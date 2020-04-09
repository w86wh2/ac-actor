<template>
    <div>
        <el-form ref="acForm" v-if="data.config && data.list" :model="form" :size="data.config.size" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
            <template v-if="data.config.isTab && actTab">
                <el-tabs v-model="actTab">
                    <template v-for="(item, index) in data.list">
                        <template v-if="item.module == 'grid'">
                            <el-tab-pane :label="item.label" :name="item.key" :key="index">
                                <el-row :key="index" type="flex" :gutter="item.gutter ? item.gutter : 0" :justify="item.justify" :align="item.align">
                                    <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
                                        <template v-for="(citem,key1) in col.list" >
                                            <el-form-item v-if="citem.module==='slot'" :label="citem.label" :prop="citem.prop" :key="key1">
                                                <slot :name="citem.prop" :model="form"></slot>
                                            </el-form-item>
                                            <template v-else>
                                                <component
                                                    :key="key1"
                                                    :is="citem.module"
                                                    :dict="transDict(citem, form)"
                                                    :disabled="transDisabled(citem)"
                                                    v-model="form[citem.prop]"
                                                    @change="handleChange(form, citem, data.list)"
                                                    v-bind="citem"
                                                ></component>
                                            </template>
                                        </template>
                                    </el-col>
                                </el-row>
                            </el-tab-pane>
                        </template>
                    </template>
                </el-tabs>
            </template>
            <template v-else>
                <template v-for="(item, key) in data.list">
                    <template v-if="item.module == 'grid'">
                        <el-row :key="key" type="flex" :gutter="item.gutter ? item.gutter : 0" :justify="item.justify" :align="item.align">
                            <el-col v-for="(col, colIndex) in item.columns" :key="colIndex" :span="col.span">
                                <template v-for="(citem,key1) in col.list" >
                                    <template v-if="citem.module==='slot'">
                                        <!-- <slot :name="citem.prop" :model="form" :key="key1"></slot> -->
                                    </template>
                                    <template v-else>
                                        <component
                                            :key="key1"
                                            :is="citem.module"
                                            :form.sync="form"
                                            :disabled="transDisabled(citem)"
                                            :dict="transDict(citem, form)"
                                            v-model="form[citem.prop]"
                                            @change="handleChange(form, citem, data.list)"
                                            v-bind="citem"
                                        ></component>
                                    </template>
                                </template>
                            </el-col>
                        </el-row>
                    </template>
                    <template v-else-if="item.module == 'slot'">
                        <slot :name="item.prop" :model="form"></slot>
                    </template>
                    <template v-else>
                        <component
                            :key="key"
                            :is="item.module"
                            :dict="transDict(item, form)"
                            :disabled="transDisabled(item)"
                            :form.sync="form"
                            v-model="form[item.prop]"
                            @change="handleChange(form, item, data.list)"
                            v-bind="item"
                        ></component>
                    </template>
                </template>
            </template>

        </el-form>
    </div>
</template>

<script>
export default {
    name: 'AcForm',
    data() {
        return {
            form: {},
            actTab: ''
        }
    },
    props: {
        data: {
            type: Object,
            default() {
                return {
                    config: {
                        labelWidth: 90,
                        labelPosition: 'left',
                        size: 'small',
                        type: ''
                    },
                    list: []
                }
            }
        },
        dicts: { type: Object, default() { return {} } },
        functions: { type: Object, default() { return {} } },
        rform: { type: Object, default() { return {} } }
    },
    created() {
        this.generateModle(this.data.list)
    },
    methods: {
        getData() {
            return new Promise((resolve, reject) => {
                this.$refs.acForm.validate(valid => {
                    if (valid) {
                        resolve(this.form)
                    } else {
                        reject(new Error('表单数据校验失败').message)
                    }
                })
            })
        },
        // dict rule
        transDict(item, form) {
            let dicts = this.dicts
            if (dicts[item.dic]) {
                if (typeof dicts[item.dic] === 'function') {
                    return dicts[item.dic](form)
                } else {
                    return dicts[item.dic]
                }
            } else {
                if (typeof item.dic === 'string') {
                    return { '1': '测试1', '2': '测试2' }
                }
                return item.dic
            }
        },
        // disabled rule
        transDisabled(item) {
            let { disabled } = item
            if (disabled === true || disabled === 'disabled') return true
            if (disabled === '') return false
            if (this.data.config.type && disabled === this.data.config.type) return true
            return false
        },
        generateModle(list) {
            if (!list) return false
            list.forEach(item => {
                if (item.module === 'grid') {
                    if (!this.actTab) { this.actTab = item.key }
                    item.columns.forEach(cItem => { this.generateModle(cItem.list) })
                    return
                }
                // slot 的 prop 就不要绑在 form 上了
                if (item.module === 'slot') {
                    return false
                }
                Object.keys(this.rform).forEach(key => {
                    if (item.prop === key) {
                        this.$set(this.form, item.prop, this.rform[item.prop] || item.defaultValue)
                    } else {
                        this.$set(this.form, key, this.rform[key])
                    }
                })
            })
        },
        // change rule
        handleChange(scope, item, data) {
            if (item.change && typeof item.change === 'function') {
                (item.change)(scope, data, this.dicts)
                return
            }
            if (item.change && this.functions[item.change]) {
                this.functions[item.change](scope, data, this.dicts)
            }
        }
    },
    watch: {
        rform: {
            deep: true,
            handler(val) {
                this.form = { ...this.form, ...val }
            }
        }
    }
}
</script>
