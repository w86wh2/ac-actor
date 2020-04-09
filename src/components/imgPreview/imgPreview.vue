<template>
    <div class="h-img-view" v-if="showImgPreview">
        <div class="h-img-view-cover" @click="close"></div>
        <div class="h-img-view-cont">
            <div class="h-img-view-btn">
                <i class="h-btn5" @click="prev"></i>
                <i class="h-btn4" @click="rotateL"></i>
                <i class="h-btn1" @click="narrow"></i>
                <i class="h-btn2" @click="enlarge"></i>
                <i class="h-btn3" @click="rotateR"></i>
                <i class="h-btn6" @click="next"></i>
                <i class="h-btn7" @click="close"></i>
            </div>
            <p id="imgPreviewBox" @mousedown="start" @mouseup="stop" @mousemove="move" :style="style">
                <img id="imgPreview" @mousewheel="mouseWheel" :src="imgUrl" alt="">
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AcImgPreview',
    mounted() {
        this.bindKeyEvent()
    },
    data() {
        return {
            showImgPreview: false,
            imgUrl: '',
            imgIndex: 0,
            canDrag: false,
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            style: '',
            scale: 1,
            deg: 0
        }
    },
    props: {
        imgList: { type: Array, default() { return [] } },
        index: { type: Number, default: 0 }
    },
    watch: {
        index: 'init',
        imgList: 'init'
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.imgIndex = this.index
            this.imgUrl = this.imgList[this.imgIndex]
        },
        show() {
            this.showImgPreview = true
        },
        // 键盘控制
        bindKeyEvent() {
            document.addEventListener('keydown', (e) => {
                switch (e.code) {
                case 'ArrowLeft':
                    this.prev()
                    break
                case 'ArrowRight':
                    this.next()
                    break
                case 'Escape':
                    this.close()
                    break
                default:
                    break
                }
            }, false)

            // 解决浏览器后退，图片预览仍存在的问题
            window.onpopstate = (event) => {
                this.close()
            }
        },
        start(e) {
            e.preventDefault()
            if (e.button === 0) {
                this.canDrag = true
                this.x0 = e.pageX
                this.y0 = e.pageY
            }
        },
        stop(e) {
            e.preventDefault()
            this.canDrag = false
        },
        move(e) {
            e.preventDefault()
            if (this.canDrag) {
                this.x1 = e.pageX
                this.y1 = e.pageY
                let x = this.x1 - this.x0
                let y = this.y1 - this.y0
                let img = document.querySelector('#imgPreviewBox')
                this.style = `left:${img.offsetLeft + x}px;top:${img.offsetTop + y}px;right:auto;bottom:auto;`
                this.x0 = this.x1
                this.y0 = this.y1
            }
        },
        enlarge() {
            let img = document.querySelector('#imgPreview')
            if (this.scale < 2) {
                this.scale += 0.1
            }
            if (img) {
                img.style.webkitTransform = 'scale(' + this.scale + ')'
                img.style.MozTransform = 'scale(' + this.scale + ')'
                img.style.msTransform = 'scale(' + this.scale + ')'
                img.style.OTransform = 'scale(' + this.scale + ')'
                img.style.transform = 'scale(' + this.scale + ')'
            }
        },
        narrow() {
            let img = document.querySelector('#imgPreview')
            if (this.scale > 0.4) {
                this.scale -= 0.1
            }
            if (img) {
                img.style.webkitTransform = 'scale(' + this.scale + ')'
                img.style.MozTransform = 'scale(' + this.scale + ')'
                img.style.msTransform = 'scale(' + this.scale + ')'
                img.style.OTransform = 'scale(' + this.scale + ')'
                img.style.transform = 'scale(' + this.scale + ')'
            }
        },
        mouseWheel(event) {
            let type = event.type
            let scale = this.scale
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3
            }
            scale += event.delta * 0.1
            if (scale >= 2) {
                this.scale = 2
            } else if (scale <= 0.4) {
                this.scale = 0.4
            } else {
                this.scale = scale
            }
            let img = document.querySelector('#imgPreview')
            if (img) {
                img.style.webkitTransform = 'scale(' + this.scale + ')'
                img.style.MozTransform = 'scale(' + this.scale + ')'
                img.style.msTransform = 'scale(' + this.scale + ')'
                img.style.OTransform = 'scale(' + this.scale + ')'
                img.style.transform = 'scale(' + this.scale + ')'
            }
        },
        rotateL() {
            let box = document.querySelector('#imgPreviewBox')
            this.deg += -90
            if (box) {
                box.style.webkitTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.MozTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.msTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.OTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.transform = 'rotate(' + this.deg + 'deg' + ')'
            }
        },
        rotateR() {
            let box = document.querySelector('#imgPreviewBox')
            this.deg += 90
            if (box) {
                box.style.webkitTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.MozTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.msTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.OTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.transform = 'rotate(' + this.deg + 'deg' + ')'
            }
        },
        prev() {
            let len = this.imgList.length - 1
            this.imgIndex = (this.imgIndex - 1) < 0 ? len : (this.imgIndex - 1)
            this.imgUrl = this.imgList[this.imgIndex]
            this.reset()
        },
        next() {
            let len = this.imgList.length - 1
            this.imgIndex = (this.imgIndex + 1) > len ? 0 : (this.imgIndex + 1)
            this.imgUrl = this.imgList[this.imgIndex]
            this.reset()
        },
        reset() {
            this.canDrag = false
            this.x0 = 0
            this.y0 = 0
            this.x1 = 0
            this.y1 = 0
            this.style = ''
            this.scale = 1
            this.deg = 0
            let box = document.querySelector('#imgPreviewBox')
            let img = document.querySelector('#imgPreview')
            if (box) {
                box.style.webkitTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.MozTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.msTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.OTransform = 'rotate(' + this.deg + 'deg' + ')'
                box.style.transform = 'rotate(' + this.deg + 'deg' + ')'
            }
            if (img) {
                img.style.webkitTransform = 'scale(' + this.scale + ')'
                img.style.MozTransform = 'scale(' + this.scale + ')'
                img.style.msTransform = 'scale(' + this.scale + ')'
                img.style.OTransform = 'scale(' + this.scale + ')'
                img.style.transform = 'scale(' + this.scale + ')'
            }
        },
        close() {
            this.showImgPreview = false
        }
    }
}
</script>
<style lang="scss" scoped>
.h-img-view {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1000;
    top: 0;
    left: 0;
    .h-img-view-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1001;
        background: rgba(0, 0, 0, 0.4);
    }
    .h-img-view-cont {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1002;
        .h-img-view-btn {
            position: absolute;
            z-index: 1004;
            width: 100%;
            text-align: center;
            height: 40px;
            padding: 10px 0;
            bottom: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            i {
                width: 40px;
                height: 40px;
                background: url("./images/imgPreview.png") no-repeat;
                display: inline-block;
                margin: 0 10px;
                vertical-align: bottom
            }
            .h-btn1 {
                background-position: 0 0;
            }
            .h-btn2 {
                background-position: 0 -40px;
            }
            .h-btn3 {
                background-position: 0 -80px;
            }
            .h-btn4 {
                background-position: 0 -120px;
            }
            .h-btn5 {
                background-position: 0 -160px;
            }
            .h-btn6 {
                background-position: 0 -200px;
            }
            .h-btn7 {
                background-position: 0 -240px;
            }
        }
        p {
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 1003;
            img {
                margin: auto;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                max-width: 100%;
                max-height: 100%;
                user-select: none;
            }
        }
    }
}

.main-content {
    width: 100%;
    min-height: 100%;
    position: relative;
    overflow: hidden
}

.main-content .content {
    position: absolute;
    left: 200px;
    right: 0;
    top: 70px;
    bottom: 0;
    overflow-y: auto;
    transition: all 0.3s;
    box-sizing: border-box
}

.main-content .content.isCollapse {
    left: 64px
}
</style>
