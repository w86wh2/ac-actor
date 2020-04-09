<template>
    <div>
        <el-table :data="data" header-row-class-name="tableHeader" v-bind="$attrs" :summary-method="getSummaries" v-on="$listeners" :span-method="arraySpanMethod">
            <!--数据列-->
            <template v-for="(c, i) in columns">
                <!--selection选择框、序号-->
                <el-table-column v-if="['selection','index'].includes(c.type)" :key="i" :label="c.label" :type="c.type" :width="c.width || '50'" align="center"></el-table-column>
                <el-table-column v-else :key="i" :prop="c.prop" :label="c.label" :align="c.align || 'left'" :width="c.width || ''" :show-overflow-tooltip="tooltip">
                    <template slot-scope="{row}">
                        <!--启用禁用-->
                        <div v-if="c.type==='switch'">
                            <el-switch v-model="row[c.prop]" :active-value="c.active || true" :inactive-value="c.inActive || false" @change="c.onClick && c.onClick(row, i)">
                            </el-switch>
                            <!-- <span class="sta">{{row[c.prop] === (c.active || true) ? '启用': '禁用'}}</span> -->
                        </div>
                        <!-- render -->
                        <RenderDom v-else-if="!!c.render" :row="row" :index="i" :render="c.render" />
                        <span v-else :style="c.show ? 'color: red': ''" @click="c.show? c.onClick(row) : ''">{{row[c.prop]}}</span>
                    </template>
                </el-table-column>
            </template>
            <template v-if="actions && actions.length">
                <el-table-column label="操作" fixed="right" :width="actionsWidth">
                    <template slot-scope="{row,$index}">
                        <template v-if="actions.length > 2">
                            <el-dropdown type="info" trigger="click" @command="handleCommand">
                                <span class="el-dropdown-link">
                                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(item,key) in actions" :key="key" :disabled="item.disabled" :command="{item, row, index:$index}">
                                        <span :type="item.type" v-if="item.label">{{item.label}}</span>
                                        <RenderDom v-else :row="row" :index="key" :render="item.render" />
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                        <template v-else>
                            <el-button type="text" class="table_button" v-for="(item,key) in actions" :key="key" @click.native="item.needConfirm?null:item.onClick(row, $index)" :disabled="item.disabled">
                                <RenderDom v-if="item.needConfirm" :row="row" :index="key" :render="()=>renderConfirm(item, row, $index)" />
                                <span :type="item.type" v-else-if="item.label">{{item.label}}</span>
                                <RenderDom v-else :row="row" :index="key" :render="item.render" />
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- 分页 -->
        <el-pagination v-if="pagination && pagination.total > 0" :current-page.sync="pagination.currentPage" :page-size.sync="pagination.pageSize" :total="pagination.total" :page-sizes="pagination.pageSizes || [20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleIndexChange" style="margin-top: 20px;text-align: right"></el-pagination>
    </div>
</template>
<script>
export default {
    name: 'AcTable',
    inheritAttrs: false,
    components: {
        RenderDom: {
            functional: true, // 函数式组件，无data和this上下文 => better render
            props: {
                row: Object,
                index: Number,
                render: Function
            },
            /**
             * @param {Function} h - 原生创建dom元素的createElement方法，弃用，推荐使用jsx
             * @param {Object} ctx - 渲染的节点的this对象
             * @argument 传递参数 row index
             */
            render(h, ctx) {
                const { row, index } = ctx.props
                let value = ctx.props.render(row, index)
                return <div>{value}</div>
            }
        }
    },
    props: {
        data: {
            type: Array,
            default() {
                return []
            }
        },
        columns: {
            type: Array,
            default() {
                return []
            }
        },
        pagination: Object, // 分页，不传则不显示
        actions: {
            type: Array,
            default() {
                return []
            }
        },
        actionsWidth: {
            type: Number,
            default: 120
        },
        fetch: Function, // 获取数据的函数
        tooltip: {
            type: Boolean,
            default: true
        },
        summary: Object
    },
    methods: {
        handleCommand({ item, row, index }) {
            const { needConfirm, confirmLabel, confirmTitle, confirmMessage, cancelMessage, confirmButtonText, cancelButtonText, onClick, onCancel } = item
            if (needConfirm) {
                this.$confirm(confirmLabel || '请确认', confirmTitle || '提示', {
                    confirmButtonText: confirmButtonText || '确定',
                    cancelButtonText: cancelButtonText || '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: confirmMessage || '已确认'
                    })
                    onClick && onClick(row, index)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: cancelMessage || '已取消'
                    })
                    onCancel && onCancel(row, index)
                })
            } else {
                onClick && onClick(row, index)
            }
        },
        renderConfirm(item, row, index) {
            const { confirmLabel, label, confirmTitle, cancelMessage, confirmButtonText, cancelButtonText, onClick, onCancel } = item
            const style = 'color: #f56c6c'
            return (
                <ac-del-button
                    label={confirmLabel}
                    confirmTitle={confirmTitle}
                    cancelMessage={cancelMessage}
                    confirmButtonText={confirmButtonText}
                    cancelButtonText={cancelButtonText}
                    onClick={() => onClick(row, index)}
                    onCancel={() => onCancel(row, index)}
                    type="text">
                    <span style={style} >{label}</span>
                </ac-del-button>
            )
        },
        handleSizeChange(pageSize) { // 切换每页显示的数量
            this.fetch()
        },
        handleIndexChange(currentPage) { // 切换页码
            this.fetch()
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            const rowSpan = this.columns[columnIndex] && this.columns[columnIndex].rowSpan
            if (rowSpan) {
                if (rowSpan === 'all') {
                    if (rowIndex === 0) {
                        return [this.pagination.pageSize, 1]
                    } else {
                        return [0, 0]
                    }
                } else if (rowSpan.length > 0) {
                    let spanArr = [1, 1]
                    rowSpan.forEach((span, index) => {
                        if (span.length > 0) {
                            const startRow = span[0]
                            const rows = span[1] - span[0] + 1
                            if (rowIndex === startRow) {
                                spanArr = [rows, 1]
                            } else if (rowIndex > startRow && rowIndex <= span[1]) {
                                spanArr = [0, 0]
                            }
                        }
                    })
                    return spanArr
                } else {
                    return [1, 1]
                }
            } else {
                return [1, 1]
            }
        },
        getSummaries({ columns, data }) {
            const sums = []
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = this.$attrs['sum-text'] || this.$attrs.sumText || '合计'
                } else if (column.property && this.summary[column.property]) {
                    sums[index] = this.summary[column.property]
                } else {
                    sums[index] = ''
                }
            })
            return sums
        }
    }
}
</script>
