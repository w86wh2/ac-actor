export const loadJs = (url) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.type = 'text/javascript'
        document.body.appendChild(script)
        script.onload = () => {
            resolve()
        }
    })
}
export const loadCss = (url) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        document.head.appendChild(link)
        link.onload = () => {
            resolve()
        }
    })
}
export const generateCode = (data) => {
    return `<template>
    <div>
        <ac-form :data="jsonData" :value="editData" ref="generateForm">
        </ac-form>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
</template>
<script>
export default {
    data: {
    jsonData: ${data},
    editData: {},
    },
    methods: {
        handleSubmit () {
            this.$refs.generateForm.getData().then(data => {
                // 数据校验成功
                // data 为获取的表单数据
            }).catch(e => {
                // 数据校验失败
            })
        }
    }
}
</script>`
}
