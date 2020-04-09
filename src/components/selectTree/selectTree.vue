<template>
  <el-popover placement="bottom-start" :width="selectWidth" :offset="offset" @hide="popoverHide" trigger="click" v-model="isShowSelect">
    <el-scrollbar>
        <el-input
            v-if="filter"
            :size="size"
            style="margin-bottom:10px"
            placeholder="输入关键字"
            v-model="filterText">
        </el-input>
        <el-tree
            ref="tree"
            v-if="isShowSelect"
            style="height: 180px"
            :data="dict"
            :check-strictly="isCheckStrictly"
            :node-key="defaultProps.key"
            :show-checkbox="isMultiple"
            :expand-on-click-node="true"
            :default-expanded-keys="defaultExpandedKeys"
            :filter-node-method="filterNode"
            :default-checked-keys="defaultCheckedKeys"
            :default-expand-all="defaultExpandAll"
            highlight-current
            @node-click="handleNodeClick"
            @check="getKeys"
            :props="defaultProps"
        ></el-tree>
    </el-scrollbar>
    <el-form-item
        slot="reference"
        :label="label"
        :labelWidth="labelWidth"
        :prop="prop"
        :rules="validate(rule, 'text', label, 'change')"
     >
        <el-tooltip class="item" :content="toolTips" :disabled="!toolTips">
            <el-select
                ref="select"
                :style="'width:'+ width"
                v-model="text"
                :size="size"
                :clearable="clearable"
                :placeholder="placeholder || label"
                @click.native="isShowSelect = !isShowSelect"
                :multiple="isMultiple"
                collapse-tags
            >
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-tooltip>
    </el-form-item>
  </el-popover>
</template>
<script>
import utils from '../../utils'
import { validate } from '../../utils/formValidate'
export default {
    name: 'AcSelectTree',
    props: {
        labelWidth: {
            type: String,
            default: ''
        },
        value: {
            default: ''
        },
        prop: {
            type: String,
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
        rule: {
            type: Boolean,
            default: false
        },
        selectWidth: {
            type: Number,
            default: 200
        },
        offset: {
            type: Number,
            default: 200
        },
        size: {
            type: String,
            default: 'small'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        dict: {
            type: Array,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        isSelectRoot: {
            type: Boolean,
            default: false
        },
        isChooceSame: {
            type: Boolean,
            default: false
        },
        checkStrictly: {
            type: Boolean,
            default: false
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        popoverHide: {
            type: Function,
            default: function() { }
        },
        filter: {
            type: Boolean,
            default: false
        },
        defaultProps: {
            type: Object,
            default: () => { return { children: 'children', label: 'label', key: 'id', pid: 'parentId' } }
        }
    },
    data() {
        return {
            filterText: '',
            validate: validate,
            text: '',
            isShowSelect: false, // 是否显示原生下拉框
            options: [],
            key: [],
            showValueTmp: [],
            defaultExpandedKeys: [],
            defaultCheckedKeys: [],
            toolTips: '',
            parentIds: []
        }
    },
    computed: {
        // 是否遵循父子不关联
        isCheckStrictly() {
            if (this.isMultiple && this.isSelectRoot) {
                return true
            }
            if (!this.isMultiple && !this.isSelectRoot) {
                return true
            }
            return false
        },
        // 是否单选
        isMultiple() {
            if (utils.isArray(this.value)) {
                return true
            }
            return this.multiple
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        },
        isShowSelect(val) {
            // 隐藏select自带的下拉框
            this.$refs.select.blur()
            if (val) {
                let text = this.transArray(this.text)
                // 下拉面板展开-选中节点-展开节点
                this.setTreeCheckNode(text)
                this.defaultCheckedKeys = text
                this.defaultExpandedKeys = text
            }
        },
        value(val) {
            this.init()
            let text = this.transArray(this.text)
            this.setTreeCheckNode(text)
        },
        text(val) {
            this.toolTips = ''
            if (this.multiple) this.$emit('input', val.length ? val.join(',') : '')
            else this.$emit('input', val)
            if (this.text.length && this.isMultiple) {
                let option = {}
                this.options.forEach(item => { option[item.value] = item.label })
                this.text.forEach(ite => { this.toolTips += `${option[ite]},` })
                this.toolTips = this.toolTips.substring(0, this.toolTips.length - 1)
                return false
            }
            this.toolTips = ''
        }
    },
    mounted() {
        // 把传进来的参数转成数组处理
        this.init()
        let text = this.transArray(this.text)
        this.setTreeCheckNode(text)
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        // 将数据处理成数组
        transArray(text = []) {
            let _text = text
            if (utils.isNumber(text)) _text = [text]
            else if (!utils.isArray(text)) _text = text.split(',')
            return _text
        },
        // 初始化数据
        init() {
            if (this.multiple && utils.isString(this.value)) this.text = this.value ? this.value.split(',') : []
            else this.text = this.value
            if (this.isMultiple && this.isSelectRoot) this.disabledTreeNode(this.dict)
        },
        handleNodeClick(data) {
            if (!this.isMultiple) {
                let tmpMap = {}
                let { key, label, children } = this.defaultProps
                tmpMap.value = data[key]
                tmpMap.label = data[label]
                // 子节点逻辑
                if (this.isSelectRoot && data[children] && data[children].length) {
                    return
                }
                this.options = []
                this.options.push(tmpMap)
                this.text = data[key]
                this.isShowSelect = !this.isShowSelect
            }
        },
        getKeys(data, checked) {
            let tmp = []
            this.parentIds = []
            let { key, label, children, pid } = this.defaultProps

            checked.checkedNodes.forEach(node => {
                let tmpMap = {}
                tmpMap.value = node[key]
                tmpMap.label = node[label]
                this.parentIds.push(node[pid])
                tmp.push(tmpMap)
            })
            this.options = tmp
            this.text = checked.checkedKeys
        },
        setTreeCheckNode(ids) {
            this.showValueTmp = []
            ids.forEach(id => {
                this.findTreeNode(this.dict, id)
            })
            this.options = this.showValueTmp
        },
        // 递归查询树形节点
        findTreeNode(tree, id) {
            let { key, label, children } = this.defaultProps
            if ((!utils.isNull(tree)) && (!utils.isNull(id))) {
                for (var i = 0; i < tree.length; i++) {
                    if (tree[i][key] === id || tree[i][key] === parseInt(id)) {
                        this.showValueTmp.push({
                            value: id,
                            label: tree[i].label
                        })
                    } else if (tree[i][children] != null && tree[i][children].length > 0) {
                        this.findTreeNode(tree[i][[children]], id)
                    }
                }
            }
        },
        // 禁用父节点
        disabledTreeNode(tree) {
            let { key, children, pid } = this.defaultProps
            if (!utils.isNull(tree)) {
                for (var i = 0; i < tree.length; i++) {
                    if (this.isSelectRoot && tree[i][children] && tree[i][children].length) {
                        this.$set(tree[i], 'disabled', true)
                        this.disabledTreeNode(tree[i][children])
                    } else {
                        // 必须选择同一节点
                        if (this.parentIds.length && this.parentIds.indexOf(tree[i][pid]) === -1 && this.isChooceSame) {
                            this.$set(tree[i], 'disabled', true)
                        } else {
                            this.$set(tree[i], 'disabled', false)
                        }
                    }
                }
            }
        }
    }
}
</script>
<style lang="scss">
    .el-tree {
        [aria-checked="true"] {
            &>.el-tree-node__content {
                color: #409EFF;
            }
        }
    }
</style>
