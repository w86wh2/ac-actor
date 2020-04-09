<template>
    <el-form-item :label="label" :prop="prop" :rules="validate(rule, 'text', label, 'change')"  :label-width="labelWidth" :class="{'ac_radio_group': column}">
        <el-radio-group v-model="text"  :size="size" :disabled="disabled" v-on="$listeners" ref="acRadio" >
            <el-radio v-for="(item,key) in dic"  :key="key" :label="key">{{item}}</el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<script>
import { validate } from '../../utils/formValidate'
import utils from '../../utils'
export default {
    name: 'AcRadio',
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
        prop: {
            type: String,
            default: ''
        },
        rule: {
            type: Boolean,
            default: false
        },
        dict: {
            default: {}
        },
        type: {
            type: String,
            default: 'text'
        },
        dictAttr: {
            type: String,
            default: 'key,value'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'small'
        },
        column: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value() {
            this.init()
        }
    },
    computed: {
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
    created() {
        this.init()
    },
    methods: {
        init() {
            this.text = this.value
        }
    }
}
</script>
<style lang="scss">
.ac_radio_group {
    .el-form-item__label {
        line-height: 15px;
    }
    .el-radio {
        display: block;
        margin-left: 20px;
        margin-bottom: 20px;
        .el-radio__label {
            font-size: 12px;
        }
    }
}
</style>
