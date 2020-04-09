<template>
    <el-form-item :label="label" :prop="prop" :rules="validate(rule, 'text', label, 'change')"  :label-width="labelWidth" :class="{'ac_check_group': column}">
        <el-checkbox-group v-model="text"  v-bind="iProps" @change="change" ref="acCheckbox" >
            <el-checkbox v-for="(item,key) in dic" :key="key" :label="key">{{item}}</el-checkbox>
        </el-checkbox-group>
    </el-form-item>
</template>

<script>
import { validate } from '../../utils/formValidate'
import utils from '../../utils'
export default {
    name: 'AcCheckbox',
    data() {
        return {
            text: '',
            validate: validate,
            toolTips: ''
        }
    },
    props: {
        labelWidth: { },
        value: { default: '' },
        label: { default: '' },
        prop: { default: '' },
        rule: { type: Boolean, default: false },
        dict: { default: {} },
        dictAttr: { type: String, default: 'key,value' },
        disabled: { type: Boolean, default: false },
        size: { type: String, default: 'small' },
        type: { type: String, default: 'text' },
        column: { type: Boolean, default: false }
    },
    watch: {
        value() {
            this.init()
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
            return props
        },
        dic() {
            if (utils.isArray(this.dict)) {
                let dic = {}
                let [key, value] = this.dictAttr.split(',')
                this.dict.forEach(item => {
                    if (utils.isObject(item)) {
                        dic[item[key]] = item[value]
                    } else {
                        // 用户单传一个数组
                        dic[item] = item
                    }
                })
                return dic
            }
            return this.dict
        }
    },
    created() { this.init() },
    methods: {
        init() {
            if (utils.isString(this.value)) this.text = this.value ? this.value.split(',') : []
            else this.text = this.value
        },
        change(value) {
            if (utils.isString(this.value)) this.$emit('input', value.length ? value.join(',') : '')
            else this.$emit('input', value)
        }
    }
}
</script>
<style lang="scss">
.ac_check_group {
    .el-checkbox {
        display: block;
        margin-left: 20px;
        .el-checkbox__label {
            font-size: 12px;
        }
    }
}
</style>
