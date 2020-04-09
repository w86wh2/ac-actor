<template>
  <div v-if="show" class="widget-form-config">
    <el-form label-position="top" size="small">
        <template v-if="data.module === 'grid'">
            <el-form-item label="栅格间隔">
                <el-input type="number" v-model.number="data.gutter"></el-input>
            </el-form-item>
            <el-form-item label="列配置项">
            <draggable tag="ul" :list="data.columns"
                :group="{ name: 'options'}"
                ghost-class="ghost"
                handle='.drag-item'
            >
                <li v-for="(item, index) in data.columns" :key="index" >
                <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input>
                <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>
                </li>
            </draggable>
            <div style="margin-left: 22px;">
                <el-button type="text" @click="handleAddColumn">添加列</el-button>
            </div>
            </el-form-item>
            <el-form-item label="水平排列方式">
            <el-select v-model="data.justify">
                <el-option value="start" label="左对齐"></el-option>
                <el-option value="end" label="右对齐"></el-option>
                <el-option value="center" label="居中"></el-option>
                <el-option value="space-around" label="两侧间隔相等"></el-option>
                <el-option value="space-between" label="两端对齐"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="垂直排列方式">
            <el-select v-model="data.align">
                <el-option value="top" label="顶部对齐"></el-option>
                <el-option value="middle" label="居中"></el-option>
                <el-option value="bottom" label="底部对齐"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="tab label">
                <el-input v-model="data.label" :disabled="!config.isTab"></el-input>
            </el-form-item>
            <el-form-item label="tab name">
                <el-input v-model="data.key" :disabled="true"></el-input>
            </el-form-item>
        </template>
        <template v-else>
                <el-form-item label="标题">
                    <el-input v-model="data.label"></el-input>
                </el-form-item>
                <el-form-item label="关联数据库字段">
                    <el-input v-model="data.prop"></el-input>
                </el-form-item>
                <el-form-item label="是否必填">
                    <el-checkbox v-model="data.rule">必填</el-checkbox>
                </el-form-item>
                <template v-if="data.module=== 'AcInput'">
                    <el-form-item label="输入框类型">
                        <el-select v-model="data.type">
                            <el-option value="text" label="文本"></el-option>
                            <el-option value="textArea" label="文本域" ></el-option>
                            <el-option value="money" label="金额" ></el-option>
                            <el-option value="mobile" label="手机"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
                <template v-if="data.module=== 'AcSelect' || data.module=== 'AcRadio' || data.module=== 'AcCheckbox'">
                    <el-form-item label="字典值">
                        <el-input v-model="data.dic"></el-input>
                    </el-form-item>
                </template>
                <el-form-item label="节点改变方法" v-if="typeof data.change !== 'function'">
                    <el-input v-model="data.change"></el-input>
                </el-form-item>
        </template>
    </el-form>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
export default {
    props: ['data', 'config'],
    components: {
        Draggable
    },
    computed: {
        show() {
            if (this.data && Object.keys(this.data).length > 0) {
                return true
            }
            return false
        }
    },
    methods: {
        handleOptionsRemove(index) {
            this.data.columns.splice(index, 1)
        },
        handleAddColumn() {
            this.data.columns.push({
                span: '',
                list: []
            })
        }
    }
}
</script>
<style lang="scss">
.widget-form-config {
  .el-form-item {
    margin-bottom: 10px !important;
  }
}
</style>
