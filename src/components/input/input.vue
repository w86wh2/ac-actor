<template>
    <el-form-item :label="label" :prop="prop" :rules="rules || validate(rule, type, label, trigger)"  :label-width="labelWidth">
        <el-input  v-model="text" :placeholder="placeholder || label"  v-bind="$attrs" @change="handleChange" @input="handleInput" :size="size" :clearable="clearable"  @blur="$emit('blur')"  >
            <slot slot="suffix"> </slot>
        </el-input>
    </el-form-item>
</template>

<script>
import { validate } from '../../utils/formValidate'
export default {
    name: 'AcInput',
    inheritAttrs: false,
    data() {
        return {
            text: '',
            validate: validate,
            trigger: 'blur'
        }
    },
    props: {
        // 接收content的form
        form: {
            type: Object
        },
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
        rules: {
            default: ''
        },
        prop: {
            type: String,
            default: ''
        },
        rule: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: 'mini'
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    watch: {
        value: function(n, o) {
            this.init()
        }
    },
    created() {
        this.init()
    },
    methods: {
        isNaN(num) {
            if (Number.isNaN(parseFloat(num))) {
                return true
            } else {
                return false
            }
        },
        init() {
            if (this.type === 'penny' && !this.isNaN(this.value)) {
                this.text = (parseInt(this.value) / 1000).toFixed(3) || ''
                return false
            }
            if (this.type === 'cent' && !this.isNaN(this.value)) {
                this.text = (parseInt(this.value) / 100).toFixed(2) || ''
                return false
            }
            this.text = this.value
        },
        handleChange(value) {
            let text = this.text
            if (this.type === 'penny' && !this.isNaN(this.text)) {
                this.text = parseFloat(this.text).toFixed(3)
                text = (this.text * 1000).toFixed(0)
            }
            if (this.type === 'cent' && !this.isNaN(this.text)) {
                this.text = parseFloat(this.text).toFixed(2)
                text = (this.text * 100).toFixed(0)
            }
            this.$emit('input', text)
            this.$emit('change', this.text)
        },
        // 如果是用户输入 丢失焦点校验 如果点击 clearable 执行change 校验
        handleInput(val) {
            if (val) {
                this.trigger = 'blur'
                return false
            }
            this.trigger = 'change'
        }
    }
}
</script>
