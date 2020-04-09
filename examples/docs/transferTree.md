## transferTree 组件

### 基本调用

### 返回 tree

:::demo

```html
<template>
    <ac-transfer-tree
        :title="title"
        :from-data="fromData"
        :to-data="toData"
        :default-props="{label:'label'}"
        @add-btn="add"
        @remove-btn="remove"
        :mode="mode"
        height="400px"
        filter
        openAll
    >
    </ac-transfer-tree>
</template>
<script>
    export default {
        data() {
            return {
                title: ['待选值', '选中值'],
                mode: 'tree', // tree list
                fromData: [
                    {
                        id: '1',
                        pid: 0,
                        label: '一级 1',
                        children: [
                            {
                                id: '1-1',
                                pid: '1',
                                label: '二级 1-1',
                                children: []
                            },
                            {
                                id: '1-2',
                                pid: '1',
                                label: '二级 1-2',
                                children: [
                                    {
                                        id: '1-2-1',
                                        pid: '1-2',
                                        children: [],
                                        label: '二级 1-2-1'
                                    },
                                    {
                                        id: '1-2-2',
                                        pid: '1-2',
                                        children: [],
                                        label: '二级 1-2-2'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                toData: []
            }
        },
        methods: {
            // 监听穿梭框组件添加
            add(fromData, toData, obj) {
                console.log('fromData:', fromData)
                console.log('toData:', toData)
                console.log('obj:', obj)
            },
            // 监听穿梭框组件移除
            remove(fromData, toData, obj) {
                console.log('fromData:', fromData)
                console.log('toData:', toData)
                console.log('obj:', obj)
            }
        }
    }
</script>
```

:::

### 返回 List

:::demo

```html
<template>
    <ac-transfer-tree
        :title="title"
        :from-data="fromData"
        :to-data="toData"
        :default-props="{label:'label'}"
        @add-btn="add"
        @remove-btn="remove"
        :mode="mode"
        height="400px"
        filter
        openAll
    >
    </ac-transfer-tree>
</template>
<script>
    export default {
        data() {
            return {
                title: ['待选值', '选中值'],
                mode: 'list', // transfer addressList
                fromData: [
                    {
                        id: '1',
                        pid: 0,
                        label: '一级 1',
                        children: [
                            {
                                id: '1-1',
                                pid: '1',
                                label: '二级 1-1',
                                children: []
                            },
                            {
                                id: '1-2',
                                pid: '1',
                                label: '二级 1-2',
                                children: [
                                    {
                                        id: '1-2-1',
                                        pid: '1-2',
                                        children: [],
                                        label: '二级 1-2-1'
                                    },
                                    {
                                        id: '1-2-2',
                                        pid: '1-2',
                                        children: [],
                                        label: '二级 1-2-2'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                toData: []
            }
        },
        methods: {
            // 监听穿梭框组件添加
            add(toData) {
                console.log('toData:', toData)
            },
            // 监听穿梭框组件移除
            remove(toData) {
                console.log('toData:', toData)
            }
        }
    }
</script>
```

:::

### transferTree 属性

| 参数                 | 说明                                                                 | 类型     | 必填             | 默认值                                   |
| -------------------- | -------------------------------------------------------------------- | -------- | ---------------- | ---------------------------------------- |
| width                | 宽度                                                                 | string   | —                | 100%                                     |
| height               | 高度                                                                 | string   | —                | 320px                                    |
| title                | 标题                                                                 | array    | —                | ['源列表', '目标列表']                   |
| button-text          | 按钮名字                                                             | array    | —                | 空                                       |
| from-data            | 源数据,数据格式同 element-ui tree 组件，但必须有 id 和 pid           | Array    | true             | []                                       |
| to-data              | 目标数据,数据格式同 element-ui tree 组件，但必须有 id 和 pid         | Array    | tree 模式为 true | []                                       |
| default-props        | 配置项-同 el-tree 中 props,用法和 el-tree 的 props 一样              | object   | —                | { label: 'label', children: 'children' } |
| node-key             | 自定义 nodeKey 的值,必须与 treedata 数据内的 id 参数名一致，必须唯一 | string   | —                | 'id'                                     |
| pid                  | 自定义 pid 的参数名                                                  | false    | —                | 'pid'                                    |
| filter               | 是否开启筛选功能                                                     | Boolean  | —                | false                                    |
| open-all             | 是否默认展开全部                                                     | boolean  | —                | false                                    |
| render-content       | 自定义树节点，用法同 element-ui tree                                 | Function | —                | 空                                       |
| mode                 | 设置模式                                                             | string   | tree/list        | tree                                     |
| default-checked-keys | 默认选中节点                                                         | array    | —                | []                                       |
| placeholder          | 设置搜索框提示语                                                     | String   | —                | '请输入关键词进行筛选'                   |
| default-transfer     | 是否自动穿梭一次默认选中 defaultCheckedKeys 的节点                   | Boolean  | —                | true                                     |

### 事件

| 事件名             | 说明                                                    | 回调参数                                                     |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------------ |
| add-btn            | 点击添加按钮时触发的事件（tree 模式和 list 模式不一样） | tree 模式下为(fromData,toData,obj) /list 模式下为(toData)    |
| remove-btn         | 点击移除按钮时触发的事件（tree 模式和 list 模式不一样） | tree 模式下为(fromData,toData,obj) /list 模式下为(toData)    |
| left-check-change  | 左侧源数据勾选事件                                      | function(nodeObj, treeObj)，见 el-tree 组件 check 事件返回值 |
| right-check-change | 右侧目标数据勾选事件                                    | function(nodeObj, treeObj)，见 el-tree 组件 check 事件返回值 |

### slot

| name         | 描述                     | 参数 |
| ------------ | ------------------------ | ---- |
| left-footer  | 穿梭框左侧底部 slot      |
| right-footer | 穿梭框右侧底部 slot      |
| title-left   | 梭框标题区左侧自定义内容 |
| title-right  | 梭框标题区右侧自定义内容 |
