## Directive 自定义指令

一些与业务脱钩的自定义指令

### 水波纹效果 v-waves

水波纹效果。

:::demo 常用于按钮，点击产生水波纹效果。
```html
<template>
  <el-button  v-waves  type="success">测试1</el-button>
  <el-button  v-waves  type="warning">测试按钮2</el-button>
  <el-button  v-waves  type="error">测试按钮3</el-button>
  <el-button  v-waves  type="info">测试按钮4</el-button>
</template>
```
:::

### 滚动条 v-niceScroll
常规只需要 v-niceScroll
table 组件 v-niceScroll:table

:::demo 兼容于浏览器
```html
<template>
    <template>
  <el-table
    :data="tableData"
    height="250"
    v-niceScroll:table
    >
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }
</script>
</template>
```
:::

### Debounce click

禁止用户频繁点击，多用于频繁点击操作，500ms之内只能点击一次

:::demo 类似于@click使用方法，使用v-reClick 调用。禁止使用可执行方法。
```html
<template>
    <el-button  v-reClick="handleClick"  type="success">测试按钮1</el-button>
</template>

<script>
  export default {
    methods: {
      handleClick() {
        alert('你执行了点击事件, 是不是感觉有点延迟!');
      }
    }
  }
</script>
```
:::

传参调用。

:::demo 不能直接在事件中传参，使用方法如下。
```html
<template>
  <el-button  v-reClick="() => handleClick(++count)"  type="success">点击count + 1</el-button>
  <p>开始计数：{{count}}</p>
</template>
<script>
  export default {
    data() {
        return {
          count: 1
        }
    },
    methods: {
      handleClick(count) {
        this.count = count
      }
    }
  }
</script>
```
:::
