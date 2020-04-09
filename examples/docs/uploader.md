### 图片上传
### 基本调用 
:::demo
```html
<template>
    <ac-upload v-model="img" tokenUrl="http://yapi.aicaitest.com/mock/106/common/getOssWebSignature"/>
    {{`图片的地址为：${img}`}}
</template>
<script>
  export default {
    data() {
        return {
            img: ''
        }
          
    }
  }
</script>
```
:::