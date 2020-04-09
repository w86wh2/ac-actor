import './element'
let components = {}
// 批量加载所有全局组件
let importAll = (r) => {
    r.keys().forEach(item => {
        let name = r(item).default.name.replace(/^Ac/, '')
        components[name] = r(item).default
    })
}
importAll(require.context('./', true, /^\.\/(.*)\/(.+)\.js$/))
export { components }
