<template>
    <div class="auth-wrap pl10">
        <el-button type="warning" plain @click="checkToken">{{text || '查看完整信息'}}</el-button>
        <el-dialog title="用户权限验证" :visible.sync="dialogVisible" width="30%" append-to-body>
            <el-form ref="authForm" :model="formData" :rules="formRules" label-width="80px">
                <el-form-item label="工号：" prop="jobId">
                    <span>{{formData.jobId}}</span>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="请输入密码" auto-complete="off"></el-input>
                </el-form-item>
                <p class="tip ml25">提示：查看用户完整信息需要先申请［敏感信息查看权限］获得密码</p>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="authLogin">提 交</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'AcDecrypt',
    props: {
        text: {
            type: String
        },
        urls: {
            type: Array,
            default() {
                return ['/auth/getGrade', '/auth/login']
            }
        }
    },
    data() {
        // 验证信息
        let validator = (rule, value, callback) => {
            if (value === '') {
                let info = {
                    password: '请输入密码'
                }
                callback(new Error(info[rule.field]))
            } else {
                callback()
            }
        }

        return {
            formData: {
                jobId: '',
                password: ''
            },
            formRules: {
                password: [{
                    validator: validator,
                    trigger: 'blur'
                }]
            },
            dialogVisible: false
        }
    },
    mounted() {
    },
    methods: {
        // 认证成功父组件发送指令
        showContent(code) {
            this.$emit('callback', code)
        },
        // 验证token有效性
        checkToken() {
            this.$ajax.post(this.urls[0], res => {
                this.showContent(res.data)
            }, err => {
                if (err.code === '401') {
                    this.dialogVisible = true
                    this.formData.jobId = err.result
                } else {
                    this.$message.warning(err.resultDes)
                }
            })
        },
        // token登录
        authLogin() {
            const params = {
                password: this.$util.encrypt(this.formData.password)
            }
            this.$refs['authForm'].validate((valid) => {
                if (valid) {
                    this.$ajax.post(this.urls[1], params, (res) => {
                        this.dialogVisible = false
                        // 显示父级列表
                        this.showContent()
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.auth-wrap {
    display: inline-block;
}
.tip {
    color: #bbb;
}
</style>
