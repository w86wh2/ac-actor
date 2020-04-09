## face 表情选择

### 基本调用
仿网页版表情，最简写法：

:::demo 
```html
<template>
    <ac-face placement="right" @onSelectFace="onSelectFace"></ac-face>
    <p>已选择符号：{{ faceCode }}</p>
    <p>已选择图片:<span v-html="faceImg"></span></p>
</template>
<script>
  export default {
    data() {
      return {
        faceCode: '',
        faceImg: ''
      }
    },
    methods: {
      // 插入表情
      onSelectFace(facecode, faceimg) {
        this.faceCode += facecode
        this.faceImg += faceimg
      }
    }
  }
</script>
```
:::

### 属性

:::demo 
```html
<template>
    <h4>位置</h4>
    <table>
      <tr>
        <td></td>
        <td><ac-face placement="top-end" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>上左</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td><ac-face placement="top" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>上中</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td><ac-face placement="top-start" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>上右</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td></td>
      </tr>
      <tr>
        <td><ac-face placement="left-end" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>左上</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td></td>
        <td></td>
        <td></td>
        <td><ac-face placement="right-end" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>右上</span>" @onSelectFace="onSelectFace"></ac-face></td>
      </tr>
      <tr>
        <td><ac-face placement="left" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>左中</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td></td>
        <td></td>
        <td></td>
        <td><ac-face placement="right" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>右中</span>" @onSelectFace="onSelectFace"></ac-face></td>
      </tr>
      <tr>
        <td><ac-face placement="left-start" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>左下</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td></td>
        <td></td>
        <td></td>
        <td><ac-face placement="right-start" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>右下</span>" @onSelectFace="onSelectFace"></ac-face></td>
      </tr>
      <tr>
        <td></td>
        <td><ac-face placement="bottom-end" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>下左</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td><ac-face placement="bottom" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>下中</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td><ac-face placement="bottom-start" btnTitle="<span style='border: 1px solid #ccc; padding: 5px'>下右</span>" @onSelectFace="onSelectFace"></ac-face></td>
        <td></td>
      </tr>
    </table>
    <h4>选择表情弹窗不隐藏</h4>
    <ac-face placement="right" :isAutoHide="false" @onSelectFace="onSelectFace"></ac-face>
    <p>已选择符号：{{ faceCode }}</p>
    <p>已选择图片:<span v-html="faceImg"></span></p>
</template>
<script>
  export default {
    data() {
      return {
        faceCode: '',
        faceImg: ''
      }
    },
    methods: {
      // 插入表情
      onSelectFace(facecode, faceimg) {
        this.faceCode += facecode
        this.faceImg += faceimg
      }
    }
  }
</script>
```
:::

### 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| placement    | 控制弹窗在按钮的显示位置 | string    | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start | top |
| isAutoHide | 控制点击表情popover是否隐藏 | boolean | true/false | true |
| btnTitle | 按钮显示内容（文本/html） | string | — | <img class="facebtn qqface_show" title="表情" src="@/assets/face/img/spacer.gif"> |


### Events
| 事件名称 | 描述 | 参数 |
|-------------  |---------------- |---------------- |
| onSelectFace | 点击弹窗里的表情触发事件 | (facecode, faceimg)依次为：符号码、符号图片 |
| symbolToImg | 符号转图片（组件内部方法，供外部调用） | (facecode)符号字符串，函数返回faceimg |

