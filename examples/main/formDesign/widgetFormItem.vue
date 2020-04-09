<template>
    <div class="widget-view" :class="{active: selectWidget.key == element.key}">
        <component
            @click.native.stop="handleSelectWidget(index)"
            :is="element.module"
            @change="element.change || ''"
            v-bind="element"
            :dict="transDict(element.dic)"
            readonly
        ></component>
        <el-button title="删除" @click.stop="handleWidgetDelete(index)" class="widget-action-delete" v-if="selectWidget.key == element.key" circle plain type="danger">
          <i class="el-icon-delete"></i>
        </el-button>
        <el-button title="复制" @click.stop="handleWidgetClone(index)" class="widget-action-clone" v-if="selectWidget.key == element.key" circle plain type="primary">
          <i class="el-icon-printer"></i>
        </el-button>
    </div>
</template>
<script>
export default {
    props: ['element', 'select', 'index', 'data'],
    data() {
        return {
            selectWidget: this.select,
            nowIndex: this.index
        }
    },
    mounted() {
        this.$nextTick(() => {
            document.onkeydown = e => {
                let ev = e || window.event
                if (ev.keyCode === 8 && this.nowIndex) {
                    this.handleWidgetDelete(this.nowIndex)
                }
            }
        })
    },
    methods: {
        transDict(dic) {
            if (dic) {
                try {
                    return JSON.parse(dic)
                } catch (error) {
                    this.$message.error('你输入字典格式错误')
                }
            }
            return dic
        },
        handleSelectWidget(index) {
            this.nowIndex = index
            this.selectWidget = this.data.list[index]
        },
        handleWidgetDelete(index) {
            if (this.data.list.length - 1 === index) {
                if (index === 0) {
                    this.selectWidget = {}
                } else {
                    this.selectWidget = this.data.list[index - 1]
                    this.nowIndex = index - 1
                }
            } else {
                this.selectWidget = this.data.list[index + 1]
                this.nowIndex = index + 1
            }
            this.$nextTick(() => {
                this.data.list.splice(index, 1)
            })
        },
        handleWidgetClone(index) {
            let cloneData = {
                ...this.data.list[index],
                key: Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
            }
            this.data.list.splice(index, 0, cloneData)
            this.$nextTick(() => {
                this.nowIndex = index + 1
                this.selectWidget = this.data.list[index + 1]
            })
        }
    },
    watch: {
        select(val) {
            this.selectWidget = val
        },
        selectWidget: {
            handler(val) {
                this.$emit('update:select', val)
            },
            deep: true
        }
    }
}
</script>
