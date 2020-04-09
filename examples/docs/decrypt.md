### Decrypt 脱密

用于各业务系统脱密。

### 基本用法

点击提示用户是否需要明文查看。

:::demo 以按钮形式，提示用户明文查看。
```html
<template>
    <ac-decrypt :urls="urls" @callback="renderList"></ac-decrypt>
</template>
<script>
export default {
    data() {
        return {
            urls: ['/auth/getGrade', '/auth/login'] // 可不传，有默认路径
        }
    },
    methods: {
        renderList(code) {
            alert(code)
        }
    }
}
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| urls     | 验证token有效性及token登陆接口          | [string, string] | — | —---- |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| callback | 用户获取脱敏权限后的操作 | — |
