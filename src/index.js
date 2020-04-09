import { components } from './components/index'
import utils from './utils/index'
import ajax from './utils/ajax'
import directives from './utils/directives'

// 批量注册
let install = (Vue, opts = {}) => {
    Object.keys(components).forEach(key => {
        Vue.component(components[key].name, components[key])
    })

    Vue.prototype.$util = utils
    Vue.prototype.$ajax = ajax()
    directives.forEach(item => { Vue.directive(item.name, item.direct) })
}

// 支持script标签引入
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

// 导出按需组件
// export * from './components/index'

// 导出的对象必须具有install，才能被Vue.use()方法安装
export default {
    install
}
