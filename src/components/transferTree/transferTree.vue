<template>
    <div class="transfer" :style="{width,height}">
        <template v-if="mode === 'tree'">
            <!-- 左侧穿梭框 原料框 -->
            <div class="transfer-left">
                <h3 class="transfer-title">
                    <el-checkbox :indeterminate="fromIsIndeterminate" v-model="fromCheckAll" @change='fromAllBoxChange'></el-checkbox>
                    <span>{{fromTitle}}</span>
                    <slot name="title-left"></slot>
                </h3>
                <!-- 内容区 -->
                <div class="transfer-main">
                    <el-input v-if="filter" :placeholder="placeholder" v-model="filterFrom" size="small" class="filter-tree">
                    </el-input>
                    <!-- <slot name="from"></slot> -->
                    <el-tree ref='from-tree' :data="selfFromData" show-checkbox :node-key="nodeKey" @check='fromTreeChecked' :default-expanded-keys="fromExpandedKeys" :props="defaultProps" :filter-node-method="filterNodeFrom" :default-expand-all="openAll" :render-content='renderContent' :default-checked-keys="defaultCheckedKeys">
                    </el-tree>
                    <slot name="left-footer"></slot>
                </div>
            </div>
            <!-- 穿梭区 按钮框 -->
            <div class="transfer-center">
                <template v-if='buttonText'>
                    <p class="transfer-center-item">
                        <el-button type="primary" @click="addToAims" :disabled="fromDisabled">
                            {{fromButton || '添加'}}
                            <i class="el-icon-arrow-right"></i>
                        </el-button>
                    </p>
                    <p class="transfer-center-item">
                        <el-button type="primary" @click='removeToSource' :disabled="toDisabled" icon="el-icon-arrow-left">{{toButton || '移除'}}</el-button>
                    </p>
                </template>
                <template v-else>
                    <p class="transfer-center-item">
                        <el-button type="primary" @click="addToAims" icon="el-icon-arrow-right" circle :disabled="fromDisabled"></el-button>
                    </p>
                    <p class="transfer-center-item">
                        <el-button type="primary" @click='removeToSource' :disabled="toDisabled" icon="el-icon-arrow-left" circle></el-button>
                    </p>
                </template>
            </div>
            <!-- 右侧穿梭框 目标框 -->
            <div class="transfer-right">
                <h3 class="transfer-title">
                    <el-checkbox :indeterminate="toIsIndeterminate" v-model="toCheckAll" @change="toAllBoxChange"></el-checkbox>
                    <span>{{toTitle}}</span>
                    <slot name="title-right"></slot>
                </h3>
                <!-- 内容区 -->
                <div class="transfer-main">
                    <!-- <slot name='to'></slot> -->
                    <el-input v-if="filter" :placeholder="placeholder" v-model="filterTo" size="small" class="filter-tree">
                    </el-input>
                    <el-tree slot='to' ref='to-tree' :data="selfToData" show-checkbox :node-key="nodeKey" @check='toTreeChecked' :default-expanded-keys="toExpandedKeys" :props="defaultProps" :filter-node-method="filterNodeTo" :default-expand-all="openAll" :render-content='renderContent'>
                    </el-tree>
                    <slot name="right-footer"></slot>
                </div>
            </div>
        </template>
        <template v-else-if="mode === 'list'">
            <!-- 左侧穿梭框 原料框 -->
            <div class="transfer-left">
                <h3 class="transfer-title">
                    <el-checkbox :indeterminate="fromIsIndeterminate" v-model="fromCheckAll" @change='fromAllBoxChange'></el-checkbox>
                    <span>{{fromTitle}}</span>
                </h3>
                <!-- 内容区 -->
                <el-input v-if="filter" :placeholder="placeholder" v-model="filterFrom" size="small" class="filter-tree">
                </el-input>
                <div class="transfer-main">
                    <!-- <slot name="from"></slot> -->
                    <el-tree ref='from-tree' :data="selfFromData" show-checkbox :node-key="nodeKey" @check='fromTreeChecked' :default-expanded-keys="fromExpandedKeys" :props="defaultProps" :filter-node-method="filterNodeFrom" :default-expand-all="openAll" :render-content='renderContent' :default-checked-keys="defaultCheckedKeys">
                    </el-tree>
                </div>
            </div>
            <!-- 穿梭区 按钮框 -->
            <div class="transfer-center address-list-center">
                <p class="transfer-center-item">
                    <el-button type="primary" @click="addToList()" icon="el-icon-arrow-right" circle :disabled="fromDisabled"></el-button>
                </p>
            </div>
            <div class="transfer-right">
                <div class="transfer-right-item" :class="{'transfer-right-small':false}">
                    <h3 class="transfer-title">
                        <span>{{toTitle}}</span>
                        <span class="u-clear" @click="clearList('all')">清空</span>
                    </h3>
                    <!-- 内容区 -->
                    <el-input v-if="filter" :placeholder="placeholder" v-model="filterList" size="small" class="filter-tree">
                    </el-input>
                    <div class="transfer-main">
                        <!-- <slot name='to'></slot> -->
                        <ul class="address-list-ul">
                            <li class="address-list-li" v-for="item of toList" :key="item[nodeKey]">
                                <label>{{item[defaultProps.label]}}</label><label class="label-right">{{item.pLabel}}</label>
                                <i class="address-list-del" @click="clearList(item[nodeKey])">x</i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import utils from '../../utils'
export default {
    name: 'AcTransferTree',
    data() {
        return {
            fromIsIndeterminate: false, // 源数据是否半选
            fromCheckAll: false, // 源数据是否全选
            toIsIndeterminate: false, // 目标数据是否半选
            toCheckAll: false, // 目标数据是否全选
            fromExpandedKeys: [], // 源数据展开节点
            toExpandedKeys: [], // 目标数据展开节点
            selfFrom: [], // 子组件左侧数据
            selfTo: [], // 子组件右侧数据
            fromDisabled: true, // 添加按钮是否禁用
            toDisabled: true, // 移除按钮是否禁用
            fromCheckKeys: [], // 源数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
            toCheckKeys: [], // 目标数据选中key数组 以此属性关联穿梭按钮，总全选、半选状态
            filterFrom: '', // 源数据筛选
            filterTo: '', // 目标数据筛选
            filterList: '', // 列表模式 筛选
            archiveList: [], // 存档右侧筛选前数据
            toList: [] // 收件人列表
        }
    },
    props: {
        // 宽度
        width: {
            type: String,
            default: '100%'
        },
        // 高度
        height: {
            type: String,
            default: '320px'
        },
        // 标题
        title: {
            type: Array,
            default: () => ['源列表', '目标列表']
        },
        // 穿梭按钮名字
        buttonText: Array,
        // 源数据
        fromData: {
            type: Array,
            default: () => []
        },
        // 选中数据
        toData: {
            type: Array,
            default: () => []
        },
        // el-tree 配置项
        defaultProps: {
            type: Object,
            default: () => {
                return { label: 'label', children: 'children' }
            }
        },
        // el-tree node-key 必须唯一
        nodeKey: {
            type: String,
            default: 'id'
        },
        // 自定义 pid参数名
        pid: {
            type: String,
            default: 'pid'
        },
        // 是否只返回叶子节点
        leafOnly: {
            type: Boolean,
            default: false
        },
        // 是否启用筛选
        filter: {
            type: Boolean,
            default: false
        },
        // 是否展开所有节点
        openAll: {
            type: Boolean,
            default: false
        },
        // 自定义树节点
        renderContent: Function,
        // 穿梭框模式
        mode: {
            type: String,
            default: 'tree'
        },
        // 穿梭后是否展开节点
        transferOpenNode: {
            type: Boolean,
            default: true
        },
        // 源数据 默认选中节点
        defaultCheckedKeys: {
            type: Array,
            default: () => []
        },
        // 筛选placeholder
        placeholder: {
            type: String,
            default: '输入关键字进行过滤'
        },
        // 默认穿梭一次默认选中数据
        defaultTransfer: {
            type: Boolean,
            default: true
        }
    },
    created() {
        this.fromCheckKeys = this.defaultCheckedKeys
        this.$on('clear', () => this.clearList('all'))
        this.$on('clearFilter', () => this.clearFilter())
    },
    mounted() {
        if (this.fromCheckKeys.length > 0 && this.defaultTransfer) {
            this.$nextTick(() => {
                if (this.mode === 'tree') {
                    this.addToAims()
                } else if (this.mode === 'list') {
                    this.addToList()
                }
            })
        }
    },
    methods: {
        clearFilter() {
            this.filterList = ''
        },
        // 添加按钮
        addToAims() {
            // 获取选中通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信
            let keys = this.$refs['from-tree'].getCheckedKeys(this.leafOnly)
            // 获取半选通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信
            let harfKeys = this.$refs['from-tree'].getHalfCheckedKeys()
            // 选中节点数据
            let arrayCheckedNodes = this.$refs['from-tree'].getCheckedNodes(
                this.leafOnly
            )
            // 获取选中通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求
            let nodes = JSON.parse(JSON.stringify(arrayCheckedNodes))
            // 半选中节点数据
            let arrayHalfCheckedNodes = this.$refs['from-tree'].getHalfCheckedNodes()
            // 获取半选通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求
            let halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes))

            // 自定义参数读取设置
            let children__ = this.defaultProps.children || 'children'
            let pid__ = this.pid || 'pid'
            let id__ = this['nodeKey'] || 'id'

            /*
             * 先整合目标树没有父节点的叶子节点选中，需要整理出来此叶子节点的父节点直到根节点路径 - 此时所有骨架节点已有
             * 再将所有末端叶子节点根据pid直接推入目标树即可
             * 声明新盒子将所有半选节点的子节点清除 - 只保留骨架 因为排序是先父后子 因此不存在子元素处理好插入时父元素还没处理的情况
             * 下面一二步是为了搭建出来目标树没有根节点躯干节点时的叶子选中，给此叶子搭建出根节点和躯干节点
             */

            // let不存在状态提升 因此在函数调用之前赋值 并递归为以为数组！
            let selfToData = JSON.stringify(this.selfToData)
            // 第一步
            let skeletonHalfCheckedNodes = JSON.parse(
                JSON.stringify(arrayHalfCheckedNodes)
            ) // 深拷贝数据 - 半选节点
            // 筛选目标树不存在的骨架节点 - 半选内的节点
            let newSkeletonHalfCheckedNodes = []
            skeletonHalfCheckedNodes.forEach(item => {
                if (!inquireIsExist(item)) {
                    newSkeletonHalfCheckedNodes.push(item)
                }
            })
            // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 半选节点
            newSkeletonHalfCheckedNodes.forEach(item => {
                item[children__] = []
                if (item[pid__] === 0) {
                    this.$refs['to-tree'].append(item)
                } else {
                    this.$refs['to-tree'].append(item, item[pid__])
                }
            })

            // 第二步
            /*  let cloneSkeletonCheckedNodes = JSON.parse(
              JSON.stringify(arrayCheckedNodes)
            ); // 深拷贝数据 -选中节点 */
            // 筛选目标树不存在的骨架节点 - 全选内的节点
            let newSkeletonCheckedNodes = []
            nodes.forEach(item => {
                if (!inquireIsExist(item)) {
                    newSkeletonCheckedNodes.push(item)
                }
            })
            // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 全选节点
            newSkeletonCheckedNodes.forEach(item => {
                if (item[children__] && item[children__].length > 0) {
                    item[children__] = []
                    this.$refs['to-tree'].append(item, item[pid__])
                }
            })

            // 第三步 处理末端叶子元素 - 声明新盒子筛选出所有末端叶子节点
            let leafCheckedNodes = arrayCheckedNodes.filter(
                item => !item[children__] || item[children__].length === 0
            )
            // 末端叶子插入目标树
            leafCheckedNodes.forEach(item => {
                if (!inquireIsExist(item)) {
                    this.$refs['to-tree'].append(item, item[pid__])
                }
            })

            // 递归查询data内是否存在item函数
            function inquireIsExist(item, strData = selfToData) {
                // 将树形数据格式化成一维字符串 然后通过匹配来判断是否已存在
                let strItem =
                    typeof item[id__] === 'number'
                        ? `"${id__}":${item[id__]},`
                        : `"${id__}":"${item[id__]}"`
                let reg = RegExp(strItem)
                let existed = reg.test(strData)
                return existed
            }

            // 左侧删掉选中数据
            arrayCheckedNodes.forEach(item => {
                this.$refs['from-tree'].remove(item)
            })

            // 处理完毕按钮恢复禁用状态
            this.fromCheckKeys = []

            // 目标数据节点展开
            if (this.transferOpenNode) {
                this.toExpandedKeys = keys
            }

            // 传递信息给父组件
            this.$emit('addBtn', this.selfFromData, this.selfToData, {
                keys,
                nodes,
                harfKeys,
                halfNodes
            })
        },
        // 移除按钮
        removeToSource() {
            // 获取选中通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信
            let keys = this.$refs['to-tree'].getCheckedKeys(this.leafOnly)
            // 获取半选通过穿梭框的keys - 仅用于传送纯净的id数组到父组件同后台通信
            let harfKeys = this.$refs['to-tree'].getHalfCheckedKeys()
            // 获取选中通过穿梭框的nodes 选中节点数据
            let arrayCheckedNodes = this.$refs['to-tree'].getCheckedNodes()
            // 获取选中通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求
            let nodes = JSON.parse(JSON.stringify(arrayCheckedNodes))
            // 半选中节点数据
            let arrayHalfCheckedNodes = this.$refs['to-tree'].getHalfCheckedNodes()
            // 获取半选通过穿梭框的nodes - 仅用于传送选中节点数组到父组件同后台通信需求
            let halfNodes = JSON.parse(JSON.stringify(arrayHalfCheckedNodes))

            // 自定义参数读取设置
            let children__ = this.defaultProps.children || 'children'
            let pid__ = this.pid || 'pid'
            let id__ = this['nodeKey'] || 'id'

            /*
             * 先整合目标树没有父节点的叶子节点选中，需要整理出来此叶子节点的父节点直到根节点路径 - 此时所有骨架节点已有
             * 再将所有末端叶子节点根据pid直接推入目标树即可
             * 声明新盒子将所有半选节点的子节点清除 - 只保留骨架 因为排序是先父后子 因此不存在子元素处理好插入时父元素还没处理的情况
             * 下面一二步是为了搭建出来目标树没有根节点躯干节点时的叶子选中，给此叶子搭建出根节点和躯干节点
             */

            // let不存在状态提升 因此在函数调用之前赋值 并递归为以为数组！
            let selfFromData = JSON.stringify(this.selfFromData)
            // 第一步
            let skeletonHalfCheckedNodes = JSON.parse(
                JSON.stringify(arrayHalfCheckedNodes)
            ) // 深拷贝数据 - 半选节点
            // 筛选目标树不存在的骨架节点 - 半选内的节点
            let newSkeletonHalfCheckedNodes = []
            skeletonHalfCheckedNodes.forEach(item => {
                if (!inquireIsExist(item)) {
                    newSkeletonHalfCheckedNodes.push(item)
                }
            })
            // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 半选节点
            newSkeletonHalfCheckedNodes.forEach(item => {
                item[children__] = []
                if (item[pid__] === 0) {
                    this.$refs['from-tree'].append(item)
                } else {
                    this.$refs['from-tree'].append(item, item[pid__])
                }
            }) // 深拷贝数据 -选中节点 // 筛选目标树不存在的骨架节点 - 全选内的节点

            // 第二步
            /* let cloneSkeletonCheckedNodes = JSON.parse(
              JSON.stringify(arrayCheckedNodes)
            ); */

            let newSkeletonCheckedNodes = []
            nodes.forEach(item => {
                if (!inquireIsExist(item)) {
                    newSkeletonCheckedNodes.push(item)
                }
            })
            // 筛选到目标树不存在的骨架后在处理每个骨架节点-非末端叶子节点 - 全选节点
            newSkeletonCheckedNodes.forEach(item => {
                if (item[children__] && item[children__].length > 0) {
                    item[children__] = []
                    this.$refs['from-tree'].append(item, item[pid__])
                }
            })

            // 第三步 处理末端叶子元素 - 声明新盒子筛选出所有末端叶子节点
            let leafCheckedNodes = arrayCheckedNodes.filter(
                item => !item[children__] || item[children__].length === 0
            )
            // 末端叶子直接插入目标树
            leafCheckedNodes.forEach(item => {
                if (!inquireIsExist(item)) {
                    this.$refs['from-tree'].append(item, item[pid__])
                }
            })

            // 递归查询data内是否存在item函数
            function inquireIsExist(item, strData = selfFromData) {
                // 将树形数据格式化成一维字符串 然后通过匹配来判断是否已存在
                let strItem =
                    typeof item[id__] === 'number'
                        ? `"${id__}":${item[id__]},`
                        : `"${id__}":"${item[id__]}"`
                let reg = RegExp(strItem)
                let existed = reg.test(strData)
                return existed
            }

            // 右侧删掉选中数据
            arrayCheckedNodes.forEach(item => {
                this.$refs['to-tree'].remove(item)
            })

            // 处理完毕按钮恢复禁用状态
            this.toCheckKeys = []

            // 目标数据节点展开
            if (this.transferOpenNode) {
                this.fromExpandedKeys = keys
            }

            // 传递信息给父组件
            this.$emit('removeBtn', this.selfFromData, this.selfToData, {
                keys,
                nodes,
                harfKeys,
                halfNodes
            })
        },
        // 源树选中事件 - 是否禁用穿梭按钮
        fromTreeChecked(nodeObj, treeObj) {
            this.fromCheckKeys = treeObj.checkedNodes
            this.$emit('left-check-change', nodeObj, treeObj)
        },
        // 目标树选中事件 - 是否禁用穿梭按钮
        toTreeChecked(nodeObj, treeObj) {
            this.toCheckKeys = treeObj.checkedNodes
            this.$emit('right-check-change', nodeObj, treeObj)
        },
        // 源数据 总全选checkbox
        fromAllBoxChange(val) {
            if (this.selfFromData.length === 0) {
                return
            }
            if (val) {
                // let array = [...this.fromData];
                this.fromCheckKeys = this.selfFromData
                this.$refs['from-tree'].setCheckedNodes(this.selfFromData)
            } else {
                this.$refs['from-tree'].setCheckedNodes([])
                this.fromCheckKeys = []
            }
        },
        // 目标数据 总全选checkbox
        toAllBoxChange(val) {
            if (this.selfToData.length === 0) {
                return
            }
            if (val) {
                this.toCheckKeys = this.selfToData
                this.$refs['to-tree'].setCheckedNodes(this.selfToData)
            } else {
                this.$refs['to-tree'].setCheckedNodes([])
                this.toCheckKeys = []
            }
        },
        // 源数据 筛选
        filterNodeFrom(value, data) {
            if (!value) return true
            return data[this.defaultProps.label].indexOf(value) !== -1
        },
        // 目标数据筛选
        filterNodeTo(value, data) {
            if (!value) return true
            return data[this.defaultProps.label].indexOf(value) !== -1
        },
        // 列表模式 穿梭操作
        addToList() {
            // 选中节点数据
            let arrayCheckedNodes = this.$refs['from-tree'].getCheckedNodes(true)
            // 去重筛选
            let arrayDeWeighting = []
            arrayDeWeighting = arrayCheckedNodes.filter(item => {
                if (
                    !this.toList.some(
                        ite => ite[this.nodeKey] === item[this.nodeKey]
                    )
                ) {
                    return item
                }
            })
            this.toList = [...this.toList, ...arrayDeWeighting]

            // 处理完毕取消选中
            this.$refs['from-tree'].setCheckedKeys([])

            // 处理完毕按钮恢复禁用状态
            this.fromCheckKeys = []

            // 传递信息给父组件
            this.$emit('addBtn', this.toList)
        },
        // 清理 列表选中 数据
        clearList(id) {
            if (id === 'all') {
                this.filterList = ''
            }
            this.archiveList =
                id === 'all'
                    ? []
                    : this.archiveList.filter(item => item[this.nodeKey] !== id)
            this.toList =
                id === 'all'
                    ? []
                    : this.toList.filter(item => item[this.nodeKey] !== id)
            // 传递信息给父组件
            if (this.archiveList.length > 0) {
                this.$emit('removeBtn', this.archiveList)
            } else {
                this.$emit('removeBtn', this.toList)
            }
        }
    },
    computed: {
        // 左侧数据
        selfFromData() {
            let fromArray = [...this.fromData, ...this.selfFrom]
            fromArray.forEach(item => {
                item[this.pid] = 0
            })
            return fromArray
        },
        // 右侧数据
        selfToData() {
            let toArray = [...this.toData, ...this.selfTo]
            toArray.forEach(item => {
                item[this.pid] = 0
            })
            return toArray
        },
        // 左侧菜单名
        fromTitle() {
            let [text] = this.title
            return text
        },
        // 右侧菜单名
        toTitle() {
            let [, text] = this.title
            return text
        },
        // 上部按钮名
        fromButton() {
            if (this.buttonText === undefined) {
                return
            }

            let [text] = this.buttonText
            return text
        },
        // 下部按钮名
        toButton() {
            if (this.buttonText === undefined) {
                return
            }
            let [, text] = this.buttonText
            return text
        }
    },
    watch: {
        // 左侧 状态监测
        fromCheckKeys(val) {
            if (val.length > 0) {
                // 穿梭按钮是否禁用
                this.fromDisabled = false
                // 总半选是否开启
                this.fromIsIndeterminate = true

                // 总全选是否开启 - 根据选中节点中为根节点的数量是否和源数据长度相等
                let allCheck = val.filter(item => item[this.pid] === 0)
                if (allCheck.length === this.selfFromData.length) {
                    // 关闭半选 开启全选
                    this.fromIsIndeterminate = false
                    this.fromCheckAll = true
                } else {
                    this.fromIsIndeterminate = true
                    this.fromCheckAll = false
                }
            } else {
                this.fromDisabled = true
                this.fromIsIndeterminate = false
                this.fromCheckAll = false
            }
        },
        // 右侧 状态监测
        toCheckKeys(val) {
            if (val.length > 0) {
                // 穿梭按钮是否禁用
                this.toDisabled = false
                // 总半选是否开启
                this.toIsIndeterminate = true

                // 总全选是否开启 - 根据选中节点中为根节点的数量是否和源数据长度相等
                let allCheck = val.filter(item => item[this.pid] === 0)
                if (allCheck.length === this.selfToData.length) {
                    // 关闭半选 开启全选
                    this.toIsIndeterminate = false
                    this.toCheckAll = true
                } else {
                    this.toIsIndeterminate = true
                    this.toCheckAll = false
                }
            } else {
                this.toDisabled = true
                this.toIsIndeterminate = false
                this.toCheckAll = false
            }
        },
        // 左侧 数据筛选
        filterFrom(val) {
            this.$refs['from-tree'].filter(val)
        },
        // 右侧 数据筛选
        filterTo(val) {
            this.$refs['to-tree'].filter(val)
        },
        // 列表模式 右侧数据筛选
        filterList(newval, oldval) {
            if (oldval === '') {
                this.archiveList = utils.deepClone(this.toList)
            }
            if (newval === '') {
                this.toList = utils.deepClone(this.archiveList)
                this.archiveList = []
            }
            let reg = RegExp(newval, 'i')
            this.toList = this.toList.filter(item => reg.test(item.label) || reg.test(item.pLabel))
        },
        // 监视默认选中
        defaultCheckedKeys(val) {
            if (val.length > 0 && this.defaultTransfer) {
                this.$nextTick(() => {
                    if (this.mode === 'tree') {
                        this.addToAims()
                    } else if (this.mode === 'list') {
                        this.addToList()
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
/* @import "../assets/clear.css"; */
.el-tree {
    min-width: 100%;
    display: inline-block !important;
}

.transfer {
    position: relative;
    overflow: hidden;
}

.transfer-left {
    position: absolute;
    top: 0;
    left: 0;
}

.transfer-right {
    position: absolute;
    top: 0;
    right: 0;
}

.transfer-right-small {
    height: 41px;
}

.transfer-main {
    padding: 10px;
    height: calc(100% - 118px);
    box-sizing: border-box;
    overflow: auto;
}

.transfer-left,
.transfer-right {
    border: 1px solid #ebeef5;
    width: 40%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    vertical-align: middle;
}

.transfer-right-item {
    height: 100%;
}

.transfer-center {
    position: absolute;
    top: 50%;
    left: 40%;
    width: 20%;
    transform: translateY(-50%);
    text-align: center;
}

.transfer-center-item {
    padding: 10px;
    overflow: hidden;
}

.address-list-center {
    height: 100%;
}

.address-list-center > .transfer-center-item {
    height: 50%;
    padding: 70px 10px 0;
    box-sizing: border-box;
    overflow: hidden;
}

.transfer-title {
    border-bottom: 1px solid #ebeef5;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    color: #333;
    font-size: 16px;
    background-color: #f5f7fa;
}

.transfer-title .el-checkbox {
    margin-right: 10px;
}

.filter-tree {
    margin-bottom: 10px;
}

.address-list-ul {
    padding-bottom: 20px;
}

.address-list-li {
    position: relative;
    padding: 4px 24px 4px 4px;
    border-radius: 3px;
    overflow: hidden; /*超出部分隐藏*/
    white-space: nowrap; /*不换行*/
    text-overflow: ellipsis; /*超出部分文字以...显示*/
}

.address-list-li:hover {
    background-color: #f5f7fa;
}

.address-list-li:hover .address-list-del {
    display: block;
}

.address-list-del {
    display: none;
    position: absolute;
    top: 50%;
    right: 2px;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    text-align: center;
    background-color: #fef0f0;
    color: #f56c6c;
    cursor: pointer;
}

.u-clear {
    float: right;
    color: #67c23a;
    font-size: 14px;
    cursor: pointer;
}
.label-right {
    float: right;
}
</style>
