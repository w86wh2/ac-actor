<template>
  <div ref="container" class="monaco-editor" :style="`height: ${height}px`"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
export default {
    name: 'AcMonaco',
    props: {
        opts: {
            type: Object,
            default() {
                return {}
            }
        },
        height: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
            // 主要配置
            defaultOpts: {
                value: '',
                theme: 'vs-dark', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
                roundedSelection: false,
                autoIndent: true // 自动缩进
            }

        }
    },
    watch: {
        opts: {
            handler(n) {
                this.init()
            },
            deep: true
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            // 初始化container的内容，销毁之前生成的编辑器
            this.$refs.container.innerHTML = ''
            this.editorOptions = Object.assign(this.defaultOpts, this.opts)
            this.monacoEditor = monaco.editor.create(this.$refs.container, this.editorOptions)
            // 编辑器内容发生改变时触发
            this.monacoEditor.onDidChangeModelContent(() => {
                this.$emit('change', this.monacoEditor.getValue())
            })
        },
        getVal() {
            return this.monacoEditor.getValue()
        }
    }
}
</script>
