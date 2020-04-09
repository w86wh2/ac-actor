## table 组件

### 基本调用

:::demo

```html
<template>
    <ac-table
        v-bind="tableConfig"
        v-on="tableEvents"
        :pagination.sync="pagination"
    >
    </ac-table>
</template>
<script>
    export default {
        data() {
            return {
                pagination: {
                    currentPage: 1,
                    pageSize: 5,
                    pageSizes: [1, 5, 20, 50, 100],
                    total: 10
                },
                tableEvents: {
                    'selection-change': this.onChangeSelection
                    // 'summary-method': this.getSummaries
                },
                tableConfig: {
                    stripe: true,
                    border: true,
                    'show-summary': true,
                    'sum-text': '合计信息',
                    // 'sum-info': '测试一下合计内容信息',
                    data: [],
                    summary: {
                        status: '合计1',
                        date: '合计2',
                        name: '合计3',
                        address: '合计4'
                    },
                    fetch: () => this.getData(),
                    columns: [
                        {
                            // label: '全选',
                            type: 'selection'
                        },
                        {
                            label: '行序号',
                            type: 'index',
                            width: 100,
                            rowSpan: [[0, 1], [2, 4]]
                        },
                        {
                            label: '禁用状态',
                            type: 'switch',
                            prop: 'status',
                            active: 1,
                            inActive: 0,
                            onClick: (row, index) => {
                                console.log('change status')
                            }
                        },
                        {
                            label: '日期',
                            prop: 'date'
                        },
                        {
                            label: '名称',
                            prop: 'name',
                            rowSpan: 'all'
                        },
                        {
                            label: '地址',
                            prop: 'address',
                            render: (row, index) => {
                                const { province, city, address } = row
                                return province + city + address
                            }
                        }
                    ],
                    actionsWidth: 80,
                    actions: [
                        {
                            label: '发货单',
                            needConfirm: true,
                            confirmLabel: '确认发货吗？',
                            confirmTitle: '发货确认单',
                            cancelMessage: '已取消发货',
                            confirmMessage: '已成功发货',
                            confirmButtonText: 'ok',
                            cancelButtonText: 'cancel',
                            onClick: (row, index) => {
                                console.log('发货', row, index)
                            },
                            onCancel: (row, index) => {
                                console.log('不发货', row, index)
                            }
                        },
                        {
                            render: item => {
                                return <span style="color: green">测试</span>
                            },
                            onClick: (row, index) => {
                                console.log('test')
                            }
                        },
                        {
                            label: '查看',
                            onClick: (row, index) => {
                                console.log('show')
                            }
                        }
                    ]
                }
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            // getSummaries({ columns, data }) {
            //     // console.log('----param:', columns, this.summary, this.$attrs)
            //     const sums = []
            //     columns.forEach((column, index) => {
            //         sums[index] = '***'
            //     })

            //     return sums
            // },
            onChangeSelection: selection => {
                console.log('----selection:', selection)
            },
            getData() {
                this.pagination.total = 5
                this.tableConfig.data = [
                    {
                        date: '2019-05-01',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '金沙江路 1518 弄',
                        zip: 200333,
                        tag: '家',
                        status: 0
                    },
                    {
                        date: '2019-05-04',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '金沙江路 1517 弄',
                        zip: 200333,
                        tag: '公司',
                        status: 1
                    },
                    {
                        date: '2019-05-03',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '金沙江路 1519 弄',
                        zip: 200333,
                        tag: '家',
                        status: 0
                    },
                    {
                        date: '2019-05-02',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '金沙江路 1516 弄',
                        zip: 200333,
                        tag: '公司',
                        status: 0
                    },
                    {
                        date: '2019-05-05',
                        name: '王小虎',
                        province: '上海',
                        city: '普陀区',
                        address: '金沙江路 1515 弄',
                        zip: 200333,
                        tag: '公司',
                        status: 0
                    }
                ]
            }
        }
    }
</script>
```

:::

### table 属性

| 参数       | 说明                               | 类型    | 必填 | 默认值 |
| ---------- | ---------------------------------- | ------- | ---- | ------ |
| data       | 显示的数据                         | array   | —    | —      |
| columns    | 显示的列                           | array   | —    | —      |
| actions    | 表格操作                           | array   | —    | —      |
| pagination | 分页信息                           | object  | —    | —      |
| fetch      | 获取表格数据的方法                 | object  | —    | —      |
| tooltip    | 是否当内容过长被隐藏时显示 tooltip | Boolean | —    | true   |
| summary    | 合计行信息                         | object  | —    | —      |

### 事件

| 事件名 | 说明 | 回调参数 |
| ------ | ---- | -------- |


### slot

| name | 描述 | 参数 |
| ---- | ---- | ---- |

