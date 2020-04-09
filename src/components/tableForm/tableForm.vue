<template>
    <div class="ac-table-form">
        <div class="tr">
            <span class="icon el-icon-circle-plus-outline icon_add" @click="_add"></span>
            <span class="icon el-icon-remove-outline icon_del" @click="_del"></span>
        </div>
        <el-table
            :data="value"
            header-align="center"
            @selection-change="handleSelectionChange"
            :max-height="230+Math.random()"
            border
        >
            <el-table-column
                type="selection"
                :selectable="checkSelectable"
                width="55">
            </el-table-column>
            <template v-for="(item,key) in fieldList">
                <el-table-column
                    align="center"
                    :key="key"
                    :label="item.label"
                >
                    <template slot-scope="scope">
                        <component
                            :is="item.module"
                            label=" "
                            label-width="20px"
                            :prop="prop + '.' + scope.$index + '.' + item.dat"
                            v-bind="item"
                            :dict="transDict(item, scope.row)"
                            v-model="scope.row[item.dat]"
                            @change="handleChange(scope.row, item)"
                        >
                        </component>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>

<script>
import { validate } from '../../utils/formValidate'
export default {
    name: 'AcTableForm',
    data() {
        return {
            selectVal: []
        }
    },
    props: {
        dicts: {
            type: Object,
            default() { return {} }
        },
        functions: {
            type: Object,
            default() { return {} }
        },
        value: {
            default: () => [],
            type: Array
        },
        prop: {
            type: String,
            default: '11'
        },
        fieldList: {
            default: () => [],
            type: Array
        }
    },
    watch: {
        value() {
            this.value.map((item, key) => { item.key = key })
        }
    },
    computed: {

    },
    created() { },
    methods: {
        transDict(item, form) {
            let dicts = this.dicts
            if (dicts[item.dic]) {
                if (typeof dicts[item.dic] === 'function') {
                    return dicts[item.dic](form)
                } else {
                    return dicts[item.dic]
                }
            } else {
                return item.dic
            }
        },
        handleChange(scope, item) {
            if (item.change && typeof item.change === 'function') {
                (item.change)(scope, item, this.dicts)
                return
            }
            if (item.change && this.functions[item.change]) {
                this.functions[item.change](scope, item, this.dicts)
            }
        },
        handleSelectionChange(val) {
            this.selectVal = val
        },
        checkSelectable(row) {
            return !row.disabled
        },
        _add() {
            let leng = this.value.length
            this.value.push({ key: leng })
            this.fieldList.forEach(item => {
                this.$set(this.value[leng], item.dat, '')
            })
        },
        _del() {
            if (!this.selectVal.length) {
                return this.$message.error('请选择删除项')
            }
            this.$confirm(`确定要删除吗？`, '删除选中项', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                let result = this.value.filter(item => {
                    return this.selectVal.every(key => key.key !== item.key)
                })
                this.$emit('input', result)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                })
            })
        }
    }
}
</script>
<style lang="scss">
    .ac-table-form {
        .icon {
            display: inline-block;
            font-size: 26px;
            cursor: pointer;
            padding-left: 5px;
            &.icon_add {
                color: #67c23a
            }
            &.icon_del {
                color: #f56c6c
            }
        }
        td {
            padding: 2px 0 !important;
        }
    }
</style>
