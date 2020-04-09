import Vue from 'vue'
import Router from 'vue-router'
import navConfig from './nav.config.json'
const main = () => import(/* webpackChunkName: "main" */ '../main/index.vue')
const formDesign = () => import(/* webpackChunkName: "formDesign" */ '../main/formDesign/index.vue')

const loadMdTemp = (path) => {
    return r => require.ensure([], () =>
        r(require(`./../docs${path}.md`)))
}

const registerRoute = (navConfig) => {
    let route = []
    Object.keys(navConfig).forEach((mainNav, index) => {
        let navs = navConfig['nav']
        navs.forEach(nav => {
            route.push({
                path: `/component`,
                redirect: `/component/start`,
                component: main,
                children: []
            })
            if (nav.href) return
            if (nav.groups) {
                nav.groups.forEach(group => {
                    group.list.forEach(nav => {
                        addRoute(nav, index)
                    })
                })
            } else if (nav.children) {
                nav.children.forEach(nav => {
                    addRoute(nav, index)
                })
            } else {
                addRoute(nav, index)
            }
        })
    })
    function addRoute(page, index) {
        const component = loadMdTemp(page.path)
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description || ''
            },
            name: 'component-' + (page.title || page.name),
            component: component.default || component
        }
        route[index].children.push(child)
    }
    return route
}
let routes = registerRoute(navConfig)
routes.push({ path: '/', redirect: '/component' }, { path: '/formDesign', component: formDesign })
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})
