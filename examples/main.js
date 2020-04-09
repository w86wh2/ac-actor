import Vue from 'vue'
import router from './router'
import App from './main/App.vue'
import Actor from '@/index'
import hljs from 'highlight.js'
import demoBlock from './md-loader/components/demo-block'
import sideNav from './md-loader/components/side-nav'
import title from './md-loader/i18n/title'
import './assets/demo-styles/index.scss'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.css'
import 'highlight.js/styles/color-brewer.css'

Vue.config.productionTip = false

Vue.use(Actor)
Vue.component('demo-block', demoBlock)
Vue.component('side-nav', sideNav)

router.afterEach(route => {
    Vue.nextTick(() => {
        const blocks = document.querySelectorAll('pre code:not(.hljs)')
        Array.prototype.forEach.call(blocks, hljs.highlightBlock)
    })
    const data = title['zh-CN']
    for (let val in data) {
        if (new RegExp('^' + val, 'g').test(route.name)) {
            document.title = data[val]
            return
        }
    }
    document.title = 'Actor'
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
