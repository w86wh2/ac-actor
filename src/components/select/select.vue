<template>
    <el-form-item :label="label" :prop="prop" :rules="validate(rule, 'text', label, 'change')"  :label-width="labelWidth">
        <el-tooltip class="item" :content="toolTips" :disabled="!toolTips">
            <el-select v-model="text"  v-bind="iProps" @change="change" collapse-tags ref="acSelect" :style="'width:'+ width">
                <el-option v-for="(item,key) in dic" :key="key" :label="item" :value="key"></el-option>
            </el-select>
        </el-tooltip>
    </el-form-item>
</template>

<script>
import { validate } from '../../utils/formValidate'
import utils from '../../utils'
export default {
    name: 'AcSelect',
    data() {
        return {
            text: '',
            validate: validate,
            toolTips: ''
        }
    },
    props: {
        labelWidth: {
            type: String,
            default: ''
        },
        value: {
            default: ''
        },
        label: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: '100%'
        },
        prop: {
            type: String,
            default: ''
        },
        rule: {
            type: Boolean,
            default: false
        },
        dict: {
            default() { return {} }
        },
        dictAttr: {
            type: String,
            default: 'key,value'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: 'mini'
        },
        type: {
            type: String,
            default: 'text'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        resize: {
            type: String,
            default: 'none'
        },
        autofocus: {
            type: String,
            default: 'none'
        },
        multipleLimit: {
            type: Number,
            default: 0
        },
        filterable: {
            type: Boolean,
            default: true
        },
        defaultFirst: {
            type: Boolean,
            default: false
        },
        remote: {
            type: Boolean,
            default: false
        },
        remoteMethod: {
            type: Function
        }
    },
    watch: {
        value() {
            if (this.multiple && utils.isString(this.value)) this.text = this.value ? this.value.split(',') : []
            else this.text = this.value
        },
        dict(val) {
            if (val && this.defaultFirst) {
                this.init()
            }
        },
        text() {
            if (!this.iProps.multiple) {
                return false
            }
            this.toolTips = ''
            if (utils.isArray(this.text) && this.text.length) {
                this.text.forEach(item => { this.toolTips += `${this.dic[item]},` })
                this.toolTips = this.toolTips.substring(0, this.toolTips.length - 1)
                return false
            }
            this.toolTips = ''
        }
    },
    computed: {
        iProps() {
            let props = Object.assign({}, this.$props)
            Object.keys(props).forEach(item => {
                if (['value', 'labelWidth', 'label', 'prop', 'rule', 'dict'].includes(item)) {
                    delete props[item]
                }
            })
            props.placeholder = props.placeholder || this.label
            // 如果传过来的是数组 自动认定为多选
            if (utils.isArray(this.value)) {
                props.multiple = true
            }
            return props
        },
        dic() {
            if (utils.isArray(this.dict)) {
                let dic = {}
                let [key, value] = this.dictAttr.split(',')
                this.dict.forEach(item => {
                    dic[item[key]] = item[value]
                })
                return dic
            }
            return this.dict
        }
    },
    created() { this.init() },
    methods: {
        init() {
            if (this.multiple && utils.isString(this.value)) this.text = this.value ? this.value.split(',') : []
            else this.text = this.value
            // 默认选中第一项并触发校验
            this.$nextTick(() => {
                let { options, emitChange } = this.$refs.acSelect
                if (this.defaultFirst && options.length) {
                    if (this.multiple) {
                        this.text = [options[0].value]
                    } else {
                        this.text = options[0].value
                    }
                    emitChange(this.text)
                }
            })
        },
        change(value) {
            if (this.multiple) this.$emit('input', value.length ? value.join(',') : '')
            else this.$emit('input', value)
            this.$emit('change', value)
        }
    }
}
</script>
