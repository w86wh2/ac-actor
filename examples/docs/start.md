<!-- ## 发布npm 私有库

#### npm 镜像源切换

```
$ npm i nrm -g
$ nrm ls # 查看源列表
$ nrm add aym http://fe-npm.aicaitest.com # 添加镜像
$ nrm del aym # 删除镜像
$ nrm use aym # 切换源
```
#### npm 发布
```
$ nrm use aym
$ npm login
$ npm add user // 没有用户添加
$ npm publish // 发布到远程仓库

``` -->

#### 安装

<!-- 配置 .npmrc 文件
```
@ac:registry=http://fe-npm.aicaitest.com
``` -->

安装

```
$ npm install actor
```

#### 使用

```
import Actor from 'ac-actor'
Vue.use(Actor)
```

#### 按需加载

配置模块映射

```
$ npm install actor
$ npm i babel-plugin-transform-modules -D
```

配置 babel.config.js

```
plugins: [
    ['transform-modules', {
        'ac-actor': {
            'transform': member => {
                let memb = member.replace(/-([a-z])/g, (all, letter) => letter.toUpperCase())
                return `ac-actor/src/components/${memb}`
            },
            'preventFullImport': true,
            'kebabCase': true
        },
        'ac-actor/utils': {
                'transform': member => {
                    let memb = member.replace(/-([a-z])/g, (all, letter) => letter.toUpperCase())
                    return `ac-actor/src/utils/${memb}`
                },
                'preventFullImport': true,
                'kebabCase': true
            }
    }]
]
```

使用

```
import { Input } from 'ac-actor'
Vue.use(Input)

// directive 使用
import { directives } from 'ac-actor/utils'
directives.forEach(item => { Vue.directive(item.name, item.direct) })

<el-form>
    <ac-input label="测试"></ac-input>
</el-form>
```
