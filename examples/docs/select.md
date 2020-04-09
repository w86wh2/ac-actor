## 下拉框组件

acSelect 所有下拉框调用 必须包裹在 el-form 之下

### 基本调用
最简写法 支持传入map 与 list  list 需指定key value （默认 key,value）

:::demo list 需指定键值。
```html
<template>
    <el-form :model="form">
        <ac-select 
            label="产品名称" 
            labelWidth="100px" 
            v-model="form.text" 
            :dict="dict" 
        ></ac-select>
        <ac-select 
            label="产品名称" 
            labelWidth="100px" 
            prop="productNo" 
            v-model="form.productNo"        
            :dict="dictArray"  
            dictAttr="productNo,productName" 
            rule 
        ></ac-select>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { text: '', productNo: '' },
          dict: {'202204': '取点花', '202207': '成功花'},
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

### 智能多选

select 支持两种多选方式   
1.multiple 属性 传入string 传出 string 优先级最高   
2.v-model 绑定值为一个数组 程序默认为多选 传入 array 传出 array  

:::demo 多选强制收缩 支持toolTips。
```html
<template>
    <el-form :model="form">
        <ac-select 
            label="产品名称" 
            labelWidth="100px" 
            multiple
            v-model="form.productNo1" 
            :dict="dict" 
        ></ac-select>
        <p>用户选择了： {{form.productNo1}}</p>
        <ac-select 
            label="产品名称" 
            labelWidth="100px" 
            v-model="form.productNo2" 
            :dict="dict" 
        ></ac-select>
        <p>用户选择了： {{form.productNo2}}</p>
    </el-form>
    
</template>
<script>
  export default {
    data() {
        return {
          form: { productNo1: '', productNo2: [] },
          dict: {'202204': '取点花', '202207': '成功花', '202209': '大家花', '202209': '好好花'}
        }
    }
  }
</script>
```
:::



### Select 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| rule | 是否必填 | boolean | — | false |
| value / v-model | 绑定值           | string / array  | — | — |
| multiple | 是否多选 | boolean | — | false |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | true |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| readonly | 原生属性，是否只读 | boolean | — | false |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| filterable | 是否可搜索 | boolean | — | true |
| remote | 是否为远程搜索 | boolean | — | false |
remote-method | 远程搜索方法 | function | — | — |


### Select 事件

| 事件名 | 描述 | 参数 |
|----| ----| ----|
| change | 文本框内容改变 | (value: string) |