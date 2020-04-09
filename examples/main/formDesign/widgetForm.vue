<template>
    <div class="widget-form-container">
        <el-form :size="data.config.size" :label-position="data.config.labelPosition" :label-width="data.config.labelWidth + 'px'">
           <draggable class="widget-form-list"
                v-model="data.list"
                :group="{ name: 'people'}"
                ghost-class="ghost"
                @end="handleMoveEnd"
                @add="handleWidgetAdd"
            >
                <template v-if="data.config.isTab && actTab">
                    <el-tabs v-model="actTab">
                        <template v-for="(element, index) in data.list">
                            <template v-if="element.module == 'grid'">
                                <el-tab-pane :label="element.label" :name="element.key" :key="index">
                                    <div v-if="element && element.key"  class="widget-grid-container data-grid" :key="element.key" style="position: relative;">
                                        <el-row class="widget-grid "
                                            type="flex"
                                            :class="{active: selectWidget.key == element.key}"
                                            :gutter="element.gutter ? element.gutter : 0"
                                            :justify="element.justify"
                                            :align="element.align"
                                            @click.native="handleSelectWidget(index)">
                                            <el-col  v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                                                <div style="border: 1px dashed #999;">
                                                    <draggable
                                                    class="widget-form-list"
                                                    style="padding-bottom: 50px;"
                                                    v-model="col.list"
                                                    filter="widget-grid-container"
                                                    :group="{ name: 'people'}"
                                                    ghost-class="ghost"
                                                    :sortable="false"
                                                    @end="handleMoveEnd"
                                                    @add="handleWidgetColAdd($event, element, colIndex)"
                                                    >
                                                    <template v-for="(el, i) in col.list">
                                                        <widget-form-item
                                                            :key="el.key"
                                                            v-if="el.key"
                                                            :element="el"
                                                            :select.sync="selectWidget"
                                                            :index="i"
                                                            :data="col">
                                                        </widget-form-item>
                                                    </template>
                                                    </draggable>
                                                </div>
                                            </el-col>

                                        </el-row>
                                        <el-button title="删除" style="bottom: -20px;" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
                                            <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                                            <i class="el-icon-delete" ></i>
                                        </el-button>
                                    </div>
                                </el-tab-pane>
                            </template>
                        </template>
                    </el-tabs>
                </template>
                <template v-else>
                    <template v-for="(element, index) in data.list">
                        <template v-if="element.module == 'grid'">
                            <div v-if="element && element.key"  class="widget-grid-container data-grid" :key="element.key" style="position: relative;">
                                <el-row class="widget-grid "
                                    type="flex"
                                    :class="{active: selectWidget.key == element.key}"
                                    :gutter="element.gutter ? element.gutter : 0"
                                    :justify="element.justify"
                                    :align="element.align"
                                    @click.native="handleSelectWidget(index)">
                                    <el-col  v-for="(col, colIndex) in element.columns" :key="colIndex" :span="col.span ? col.span : 0">
                                        <div style="border: 1px dashed #999;">
                                            <draggable
                                            class="widget-form-list"
                                            style="padding-bottom: 50px;"
                                            v-model="col.list"
                                            filter="widget-grid-container"
                                            :group="{ name: 'people'}"
                                            ghost-class="ghost"
                                            :sortable="false"
                                            @end="handleMoveEnd"
                                            @add="handleWidgetColAdd($event, element, colIndex)"
                                            >
                                            <template v-for="(el, i) in col.list">
                                                <widget-form-item
                                                    :key="el.key"
                                                    v-if="el.key"
                                                    :element="el"
                                                    :select.sync="selectWidget"
                                                    :index="i"
                                                    :data="col">
                                                </widget-form-item>
                                            </template>
                                            </draggable>
                                        </div>
                                    </el-col>

                                </el-row>
                                <el-button title="删除" style="bottom: -20px;" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
                                    <!-- <icon name="icon-trash" style="width: 12px;height: 12px;"></icon> -->
                                    <i class="el-icon-delete" ></i>
                                </el-button>
                            </div>
                        </template>
                        <template v-else>
                            <widget-form-item v-if="element && element.key"  :key="element.key" :element="element" :select.sync="selectWidget" :index="index" :data="data"></widget-form-item>
                        </template>
                    </template>
                </template>
            </draggable>
        </el-form>
    </div>
</template>
<script>
import Draggable from 'vuedraggable'
import widgetFormItem from './widgetFormItem.vue'
export default {
    props: ['data', 'select'],
    components: { Draggable, widgetFormItem },
    data() {
        return {
            actTab: '',
            selectWidget: this.select
        }
    },
    watch: {
        select(val) {
            if (!this.actTab) {
                this.actTab = val.key
            }
            this.selectWidget = val
        },
        selectWidget: {
            handler(val) {
                this.$emit('update:select', val)
            },
            deep: true
        }
    },
    mounted() {
        document.body.ondrop = function(event) {
            let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            if (isFirefox) {
                event.preventDefault()
                event.stopPropagation()
            }
        }
    },
    methods: {
        handleMoveEnd() {
        },
        handleWidgetAdd(event) {
            const newIndex = event.newIndex
            // 移入目标 容器
            const to = event.to
            // 为拖拽到容器的元素添加唯一 key
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
            this.$set(this.data.list, newIndex, {
                ...this.data.list[newIndex].options,
                key
            })
            if (this.data.list[newIndex].module === 'grid') {
                this.$set(this.data.list, newIndex, {
                    ...this.data.list[newIndex],
                    columns: this.data.list[newIndex].columns.map(item => ({ ...item }))
                })
            }
            this.selectWidget = this.data.list[newIndex]
        },
        handleSelectWidget(index) {
            this.selectWidget = this.data.list[index]
        },
        handleWidgetColAdd($event, row, colIndex) {
            const newIndex = $event.newIndex
            const oldIndex = $event.oldIndex
            const item = $event.item
            // 防止布局元素的嵌套拖拽
            if (item.className.indexOf('data-grid') >= 0) {
                // 如果是列表中拖拽的元素需要还原到原来位置
                item.tagName === 'DIV' && this.data.list.splice(oldIndex, 0, row.columns[colIndex].list[newIndex])
                row.columns[colIndex].list.splice(newIndex, 1)
                return false
            }
            const key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
            this.$set(row.columns[colIndex].list, newIndex, {
                ...row.columns[colIndex].list[newIndex].options,
                key
            })
            this.selectWidget = row.columns[colIndex].list[newIndex]
        },
        handleWidgetDelete(index) {
            if (this.data.list.length - 1 === index) {
                if (index === 0) {
                    this.selectWidget = {}
                } else {
                    this.selectWidget = this.data.list[index - 1]
                }
            } else {
                this.selectWidget = this.data.list[index + 1]
            }
            this.$nextTick(() => {
                this.data.list.splice(index, 1)
            })
        }
    }
}
</script>
<style>

</style>
