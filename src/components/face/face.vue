<template>
    <span>
        <el-popover ref="popover1" :placement="placement" trigger="click" v-model="popShow">
            <el-tabs v-model="activeName">
                <el-tab-pane label="QQ表情" name="first">
                    <div class="faceout">
                        <a v-for="(value, key) in faceData.qq" :key="key" :title="value.title" :class="setClass(key, 'qqface')" @click="faceImgSel(value.value)">{{value.title}}</a>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="符号表情" name="second">
                    <div class="faceout">
                        <a v-for="(value, key) in faceData.emoji" :key="key" :title="value.title" :class="setClass(key, 'emoji')" @click="faceImgSel(value.value)">{{value.title}}</a>
                    </div>
                </el-tab-pane>
            </el-tabs>
            <el-button icon="el-icon-close" circle class="face-btn-close" size="mini" @click="popShow = false"></el-button>
        </el-popover>
        <span style="cursor:pointer;" v-html="btnTitle" v-popover:popover1></span>
    </span>
</template>
<script>
/*
表情组件by wzy on 2018.04.09

调用实例：
<wechat-face ref="face" @onSelectFace="onSelectFace" placement="bottom" :isAutoHide="false" ></wechat-face>

placement：控制弹窗在按钮的显示位置，不传默认在按钮顶部显示
值：top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end

isAutoHide：控制点击表情popover是否隐藏，不传默认隐藏

btnTitle: 按钮显示内容（文本/html），不传默认显示笑脸图片

onSelectFace：点击表情触发事件
 */
import faceData from '../../assets/face/face.js'
import '../../assets/face/face.css'
import spacerImg from '../../assets/face/img/spacer.gif'

export default {
    name: 'AcFace',
    props: {
        placement: { type: String, default: 'top' },
        isAutoHide: { type: Boolean, default: true },
        btnTitle: { type: String, default: '<img class="facebtn qqface_show" title="表情" src="' + spacerImg + '">' }
    },
    data() {
        return {
            popShow: false,
            activeName: 'first',
            faceData: faceData
        }
    },
    mounted() {
    },
    methods: {
        setClass(key, type) {
            let obj = {}
            obj[`${type}_face`] = true
            obj[`${type}${key}`] = true
            return obj
        },
        // 点击表情触发父组件方法，传递2个参数（带符号facecode，带图片faceimg）
        faceImgSel(facecode) {
            // 控制点击表情popover是否隐藏
            this.popShow = !this.isAutoHide
            this.$emit('onSelectFace', facecode, this.symbolToImg(facecode))
        },
        // 符号转图片,供外部调用的方法
        symbolToImg(str) {
            for (let i in faceData) {
                faceData[i].map((value, index) => {
                    let faceVal = value.value
                    if (str.indexOf(faceVal) !== -1) {
                        faceVal = (faceVal.indexOf('[') === -1 ? faceVal : '\\' + faceVal)
                        let reg = new RegExp(faceVal, 'g')
                        str = str.replace(reg, (val) => {
                            if (i === 'qq') {
                                return '<img class="' + 'qqface_show qqface' + index + '" title="' + value.title + '" src="' + spacerImg + '">'
                            } else if (i === 'emoji') {
                                return '<img class="' + 'emoji_show emoji' + index + '" title="' + value.title + '" src="' + spacerImg + '">'
                            }
                        })
                    }
                })
            }
            return str
        }
    }
}
</script>
<style lang="scss">
.face-btn-close {
    position: absolute;
    right: 12px;
    top: 12px;
}
</style>
