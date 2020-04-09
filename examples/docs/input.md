## 输入框组件

 acInput 输入框调用 必须包裹在 el-form 之下

### 基本调用
最简写法

:::demo 支持element 提供原生属性。
```html
<template>
    <el-form>
        <ac-input label="产品名称" labelWidth="100px" v-model="form.text" placeholder="请输入"  @change="handleChange"></ac-input>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { text: '111' }
        }
    },
    methods: {
        handleChange(val) {
            console.log(this.form.text)
        }
    }
  }
</script>
```
:::

### 输入校验

需传入prop 以及 rule

:::demo rule 确定是否必填。
```html
<template>
    <el-form :model="form">
        <ac-input label="产品名称" prop="text" rule labelWidth="100px" v-model="form.text"></ac-input>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { text: '' }
        }
    },
    methods: {
        handleChange(val) {
            console.log(this.form.text)
        }
    }
  }
</script>
```
:::

### 金额输入

后端一般传入前端的值为厘或则分 前端需做一些金钱转换传给后端厘 单位

:::demo 
```html
<template>
    <el-form :model="form" labelWidth="100px">
        <el-row :gutter="30">
            <el-col :span="12">
                <ac-input label="打款金额" rule prop="amt" type="penny" v-model="form.amt" @change="change">
                    <i name="suffix">元</i>
                </ac-input>
                <p>传入后台金额：{{form.amt}}厘</p>
                <p>实际金额：{{realMoney}}元</p>
            </el-col>
            <el-col :span="12">
                <ac-input label="打款金额" rule prop="amt1" type="cent" v-model="form.amt1" @change="change1">
                    <i name="suffix">元</i>
                </ac-input>
                <p>传入后台金额：{{form.amt1}}分</p>
                <p>实际金额：{{realMoney1}}元</p>
            </el-col>
        </el-row>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { amt: '1231', amt1: '' },
          realMoney: '1.231',
          realMoney1: ''
        }
    },
    methods: {
        change(val) {
            this.realMoney = val
        },
        change1(val) {
            this.realMoney1 = val
        }
    }
  }
</script>
```
:::

### 手机

不写rule 非必填 但验证格式

:::demo
```html
<template>
    <el-form :model="form" labelWidth="100px">
        <ac-input label="手机号"  prop="mobile" type="tel" v-model="form.mobile" ></ac-input>
        <ac-input label="整数"  prop="int" type="int" v-model="form.int" ></ac-input>
        <ac-input label="非负整数"  prop="noNegInt" type="noNegInt" v-model="form.noNegInt" ></ac-input>
        <ac-input label="比例"  prop="rate" type="scale" v-model="form.rate" ></ac-input>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { mobile: '', int: '', noNegInt: '', rate: '' }
        }
    }
  }
</script>
```
:::

### 自定义效验

提供rules 钩子 支持自定义效验 此时不必填写 rule 和 type 属性
是不是封装一下 会比较好

:::demo
```html
<template>
    <el-form :model="form" labelWidth="100px">
        <ac-input label="手机号" :rules="rules"  prop="mobile" v-model="form.mobile" >
        </ac-input>
    </el-form>
</template>
<script>
  export default {
    data() {
        const validMobile = (rule, value, callback) => {
            let filter = /^1[3-9]\d{9}$/
            if (filter.test(value)) { callback() }
            callback(new Error('请输入正确的手机号格式'))
        }
        return {
          form: { mobile: '' },
          rules: [
              { message: `手机号不能为空`, required: true, trigger: 'blur' },
              { validator: validMobile, trigger: 'blur' }
              ]
        }
    }
  }
</script>
```
:::

### Input Type
type 属性的特殊处理,持续开发中

| type值 | 描述 |
|----| ----|
| text | 正常文本 |
| tel | 如果有文本输入，必须为手机格式 |
| int | 整数 |
| noNegInt | 非负整数 |
| scale | 比例 保留两位有效小数 |
| penny |  必须为小数点后三位正浮点数，自动进行厘/元转换|
| cent |  必须为小数点后两位正浮点数，自动进行分/元转换|

### Input 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —       | — |
| type | 选填文本框的特定格式，支持特殊格式 | string | — | text |
| rule | 是否必填 | boolean | — | false |
| rules    | 表单验证规则 | object | — | — |
| value / v-model | 绑定值           | string / number  | — | — |
| maxlength     | 原生属性，最大输入长度      | number          |  —  | — |
| minlength     | 原生属性，最小输入长度      | number          | — | — |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | true |
| disabled      | 禁用            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| prefix-icon   | 输入框头部图标    | string          | — | — |
| suffix-icon   | 输入框尾部图标    | string          | — | — |
| rows          | 输入框行数，只对 `type="textarea"` 有效  |  number | — |  2   |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，{ minRows: 2, maxRows: 6 }  |  boolean / object | — |  false   |
| autocomplete | 原生属性，自动补全 | string | on, off | off |
| readonly | 原生属性，是否只读 | boolean | — | false |
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | — |
| default-first | 默认选中第一项并触发校验 | boolean | - | — |
| autofocus | 原生属性，自动获取焦点 | boolean | true, false | false |


### Input 事件

| 事件名 | 描述 | 参数 |
|----| ----| ----|
| blur | 丢失焦点事件 | -- |
| change | 文本框内容改变 | (value: string) |