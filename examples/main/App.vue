<template>
    <div class="main-content">
        <div class="page-header">
            <div class="page-nav-container">
                <img class="page-logo" />
                <div class="page-title" @click="handleModule">Actor组件库</div>
                <div class="page-link">
                    <a href="#" @click="handleFormDesign">表单配置器</a>
                    <a href="https://www.npmjs.com/package/ac-actor">npm地址</a>
                    <a href="https://github.com/w86wh2/ac-actor">代码仓库</a>
                </div>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    methods: {
        handleFormDesign() {
            this.$router.push({ path: "/formDesign" });
        },
        handleModule() {
            this.$router.push({ path: "/" });
        }
    }
};
</script>
<style lang="scss">
.main-content {
    height: 100%;
}
.head {
    margin: 10px 0 5px;
    padding-left: 20px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
}
.page-header {
    height: 50px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(220, 223, 230, 0.6);
    background: #fff;
    padding: 0 10px;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    .page-nav-container {
        margin: 0 auto;
    }

    .page-logo {
        height: 26px;
        vertical-align: middle;
    }
    .page-title {
        display: inline-block;
        line-height: 50px;
        vertical-align: middle;
        color: #1989fa;
        font-size: 20px;
        font-weight: 600;
        opacity: 0.8;
        cursor: pointer;
    }
    .page-link {
        height: 50px;
        float: right;

        a {
            color: #888;
            text-decoration: none;
            font-size: 14px;
            line-height: 50px;
            font-weight: 500;
            margin-right: 20px;

            &:hover {
                opacity: 0.8;
            }
        }
    }
}
@media (min-width: 1140px) {
    .page-nav-container {
        width: 98%;
        .page-title {
            margin-left: 2%;
        }
        .page-link {
            padding-right: 2%;
        }
    }
}

@media (min-width: 1600px) {
    .page-nav-container {
        width: 1600px;
        .page-title {
            margin-left: 230px;
        }
        .page-link {
            padding-right: 241px;
        }
    }
}

@media (max-width: 768px) {
    margin-left: 10px;
}
</style>
