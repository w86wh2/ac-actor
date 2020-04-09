## checkbox 多选框

### 基本调用
所有表单组件必须要包裹在el-form 之下  
以下是dict 三种传入格式 可以为纯数据 map 以及map list 详情见下面 三事例

:::demo list 需指定键值。
```html
<template>
    <el-form :model="form" labelWidth="80px">
        <ac-checkbox 
            label="产品名称"  
            v-model="form.text" 
            :dict="dict" 
        ></ac-checkbox>
        <p>你选择了 {{form.text}}</p>
        <ac-checkbox 
            label="产品名称" 
            prop="productNo" 
            v-model="form.productNo"        
            :dict="dictArray"  
            dictAttr="productNo,productName" 
            rule 
        ></ac-checkbox>
        <p>你选择了 {{form.productNo}}</p>
        <ac-checkbox 
            label="产品名称"  
            prop="productNo1" 
            v-model="form.productNo1"        
            :dict="array" 
            rule 
        ></ac-checkbox>
        <p>你选择了 {{form.productNo1}}</p>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { text: '', productNo: '', productNo1: '嗨花' },
          dict: {'202204': '取点花', '202207': '成功花'},
          array: ['取点花', '嗨花'],
          dictArray: [{
              productNo: '202204',
              productName: '取点花'
          }, {
              productNo: '202205',
              productName: '嗨花'
          }, {
              productNo: '202206',
              productName: '好好花'
          }]
        }
    }
  }
</script>
```
:::

### 输出
   checkbox 输出类型与输入类型一一匹配

:::demo list 需指定键值。
```html
<template>
    <el-form :model="form" labelWidth="80px">
        <ac-checkbox 
            label="产品名称" 
            v-model="form.productNo"      
            :dict="dict"  
        ></ac-checkbox>
        <p>你选择了 {{form.productNo}}</p>
        <ac-checkbox 
            label="产品名称"  
            v-model="form.productNo1"        
            :dict="array"  
        ></ac-checkbox>
        <p>你选择了 {{form.productNo1}}</p>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { productNo: '', productNo1: ['嗨花'] },
          dict: {'202204': '取点花', '202207': '成功花', '202206': '好好花' },
          array: ['取点花', '嗨花', '蚂蚁花', '天猫花', '吃饱花']
        }
    }
  }
</script>
```
:::

### 排版

:::demo
```html
<template>
    <el-form :model="form" labelWidth="80px">
        <ac-checkbox 
            label="产品名称"  
            v-model="form.productNo1"        
            :dict="array" 
            column 
        ></ac-checkbox>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { productNo1: ['嗨花'] },
          array: ['取点花这里是测试专用', '嗨花这里是测试专用', '蚂蚁花这里是测试专用', '天猫花这里是测试专用', '吃饱花这里是测试专用']
        }
    }
  }
</script>
```
:::

### checkbox 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| rule | 是否必填 | boolean | — | false |
| value / v-model | 绑定值           | string / array  | — | — |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| column      | 选项是否每列显示            | boolean         | — | false   |


### checkbox 事件

| 事件名 | 描述 | 参数 |
|----| ----| ----|
| change | 文本框内容改变 | (value: string) |