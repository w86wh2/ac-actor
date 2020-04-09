<template>
    <el-popover placement="top" width="160" trigger="click" v-model="visible">
        <p>{{label}}</p>
        <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="cancel">{{cancelButtonText}}</el-button>
            <el-button type="primary" size="mini" @click="submit">{{confirmButtonText}}</el-button>
        </div>
        <el-button v-bind="$props" @click="handleClick($props.method)" slot="reference">
            <slot></slot>
        </el-button>
    </el-popover>
</template>

<script>
export default {
    name: 'AcDelButton',
    props: {
        label: {
            type: String,
            default: '您是否要删除当前项'
        },
        confirmTitle: {
            type: String,
            default: '提示'
        },
        cancelMessage: {
            type: String,
            default: '已取消删除'
        },
        confirmButtonText: {
            type: String,
            default: '确认'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        method: {
            type: String,
            default: 'popover'
        },
        type: {
            type: String,
            default: 'danger'
        },
        size: {
            type: String,
            default: 'small'
        },
        plain: {
            type: Boolean,
            default: false
        },
        round: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        icon: {
            type: String
        }
    },
    data() {
        return {
            visible: false
        }
    },
    methods: {
        handleClick(method) {
            const { confirmTitle, label, cancelMessage, confirmButtonText, cancelButtonText } = this
            if (method === 'popover') {
                this.visible = true
            } else {
                this.$confirm(label || '将执行删除操作, 是否继续?', confirmTitle, {
                    confirmButtonText,
                    cancelButtonText,
                    type: 'warning'
                }).then(() => {
                    this.$emit('click')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: cancelMessage
                    })
                    this.$emit('cancel')
                })
            }
        },
        submit() {
            this.visible = false
            this.$emit('click')
        },
        cancel() {
            const { cancelMessage } = this
            this.visible = false
            this.$message({
                type: 'info',
                message: cancelMessage
            })
            this.$emit('cancel')
        }
    }
}
</script>

<style lang="scss" scoped>
.ac-dialog-container {
    .el-dialog__footer {
        margin: 0 20px;
        // border-top: 1px dashed #ccc;
        padding: 15px 0 16px;
        text-align: center;
        position: relative;

        .dialog-footer {
            display: block;

            .circular {
                display: inline-block;
                vertical-align: middle;
                margin-right: 5px;
                width: 24px;
                height: 24px;
            }

            .el-loading-text {
                display: inline-block;
                vertical-align: middle;
            }

            .el-loading-spinner {
                margin-top: -12px;
            }
        }
    }
}
</style>
