
### full cal
日程表
:::demo 日程表
```html
<template>
    <ac-full-cal @onEventClick='onEventClick'></ac-full-cal>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
      onEventClick(e) {
        this.$message(`你点击了 ${e.content} 任务`)
      }
    }
}
</script>
```
:::

### Booking 预约

会议室预约模块

### 基本用法

会议预约模块展示。

:::demo 预约模块展示。
```html
<template>
    <ac-booking :classList='currentClassList'></ac-booking>
</template>
<script>
export default {
    data() {
        return {
            currentClassList: [{
              startTime: '2019-10-17 9:10:00',
              lessonTime: 60,
              className: '测试课程'
            },
            {
              startTime: '2019-10-16 9:10:00',
              lessonTime: 120,
              className: '位置测试'
            },
            {
              startTime: '2019-10-18 14:30:00',
              lessonTime: 30,
              className: '测试课程'
            }  
          ]
        }
    },
    methods: {
    }
}
</script>
```
:::

<!-- ### Attributes -->
<!-- | 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| urls     | 验证token有效性及token登陆接口          | [string, string] | — | —---- |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| callback | 用户获取脱敏权限后的操作 | — | -->
