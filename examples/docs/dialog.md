## dialog 弹出框

### 基本调用

:::demo 基本调用。
```html
<template>
    <el-button type="success" @click="dialog = true">基本调用</el-button>
    <ac-dialog
        title="这是标题"
        :dialog="dialog"
        @close="dialog = false"
        width="800px"
        :action="false"
        >
          <div>基本调用</div>
        </ac-dialog>
</template>
<script>
  export default {
    data() {
        return {
          dialog: false
        }
    }
  }
</script>
```
:::

### 带有action
自带防抖功能

:::demo 带有action。
```html
<template>
    <el-button type="success" @click="dialog = true">带有action1</el-button>
    <el-button type="success" @click="dialog1 = true">带有action2</el-button>
    <ac-dialog
        :dialog="dialog"
        @submit="submit"
        @close="dialog = false"
        width="800px"
        ref="dialog"
        :action="true"
        form
    >
        <div>带有action1</div>
    </ac-dialog>
    <ac-dialog
        :dialog="dialog1"
        @close="dialog1 = false"
        width="800px"
        form
    >
        <div>这里弹层</div>
        <div slot="action">
            <el-button type="success">功能1</el-button>
            <el-button type="danger" @click="dialog1 = false">功能2</el-button>
        </div>
    </ac-dialog>
</template>
<script>
  export default {
    data() {
        return {
          dialog: false,
          dialog1: false
        }
    },
    methods: {
        submit() {
            setTimeout(() => {
                this.$refs.dialog.end()
            }, 2000)
        }
    }
  }
</script>
```
:::

### checkbox 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| width | 宽度，例如 '50px' | string |       —       | — |
| title | 标题           | string  | — | — |
| dialog      | 启动弹层            | boolean         | — | false   |
| center          | 标题和按钮是否居中      | boolean          |  | false |
| action      | 是否支持确定 取消 支持 slot            | boolean         | — | true   |

### checkbox 事件

| 事件名 | 描述 | 参数 |
|----| ----| ----|
| submit | 提交 |  |
| close | 关闭 |  |