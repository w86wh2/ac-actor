### delButton 删除按钮

### Popover 模式

:::demo

```html
<template>
    <ac-del-button @click="handleDel">删除按钮</ac-del-button>
</template>
<script>
    export default {
        methods: {
            handleDel() {
                console.log(111)
            }
        }
    }
</script>
```

:::

### dialog 模式

:::demo

```html
<template>
    <ac-del-button @click="handleDel" method="dialog">删除按钮</ac-del-button>
</template>
<script>
    export default {
        methods: {
            handleDel() {
                console.log(111)
            }
        }
    }
</script>
```

:::

### Attributes

| 参数        | 说明           | 类型    | 可选值                                             | 默认值  |
| ----------- | -------------- | ------- | -------------------------------------------------- | ------- |
| method      | 弹窗形式       | string  | popover / dialog                                   | popover |
| size        | 尺寸           | string  | medium / small / mini                              | —       |
| type        | 类型           | string  | primary / success / warning / danger / info / text | —       |
| plain       | 是否朴素按钮   | boolean | —                                                  | false   |
| round       | 是否圆角按钮   | boolean | —                                                  | false   |
| circle      | 是否圆形按钮   | boolean | —                                                  | false   |
| loading     | 是否加载中状态 | boolean | —                                                  | false   |
| disabled    | 是否禁用状态   | boolean | —                                                  | false   |
| icon        | 图标类名       | string  | —                                                  | —       |
| autofocus   | 是否默认聚焦   | boolean | —                                                  | false   |
| native-type | 原生 type 属性 | string  | button / submit / reset                            | button  |
