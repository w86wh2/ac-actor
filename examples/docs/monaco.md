## monaco web编辑器

### 基本调用

:::demo 基本调用。
```html
<template>
    <div style="margin-bottom: 20px; font-size：14px;">
      语言：
      <el-select v-model="opts.language" clearable placeholder="请选择" size="mini" @change="changeLanguage">
        <el-option
          v-for="item in sets.language"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      样式风格：
      <el-select v-model="opts.theme" clearable placeholder="请选择" size="mini" @change="changeTheme">
        <el-option
          v-for="item in sets.theme"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="getValue">获取内容</el-button>
    </div>
    <ac-monaco ref="monaco" :opts="opts" @change="changeValue"></ac-monaco>
</template>
<script>
  export default {
    data() {
      return {
        sets: {
          language: {
            'apex': 'apex',
            'azcli': 'azcli',
            'bat': 'bat',
            'c': 'c',
            'clojure': 'clojure',
            'coffeescript': 'coffeescript',
            'cpp': 'cpp',
            'csharp': 'csharp',
            'csp': 'csp',
            'css': 'css',
            'dockerfile': 'dockerfile',
            'fsharp': 'fsharp',
            'go': 'go',
            'graphql': 'graphql',
            'handlebars': 'handlebars',
            'html': 'html',
            'ini': 'ini',
            'java': 'java',
            'javascript': 'javascript',
            'json': 'json',
            'kotlin': 'kotlin',
            'less': 'less',
            'lua': 'lua',
            'markdown': 'markdown',
            'msdax': 'msdax',
            'mysql': 'mysql',
            'objective-c': 'objective-c',
            'pascal': 'pascal',
            'perl': 'perl',
            'pgsql': 'pgsql',
            'php': 'php',
            'plaintext': 'plaintext',
            'postiats': 'postiats',
            'powerquery': 'powerquery',
            'powershell': 'powershell',
            'pug': 'pug',
            'python': 'python',
            'r': 'r',
            'razor': 'razor',
            'redis': 'redis',
            'redshift': 'redshift',
            'ruby': 'ruby',
            'rust': 'rust',
            'sb': 'sb',
            'scheme': 'scheme',
            'scss': 'scss',
            'shell': 'shell',
            'sol': 'sol',
            'sql': 'sql',
            'st': 'st',
            'swift': 'swift',
            'tcl': 'tcl',
            'typescript': 'typescript',
            'vb': 'vb',
            'xml': 'xml',
            'yam': 'yam'
          },
          theme: {
            'vs': 'vs',
            'vs-dark': 'vs-dark',
            'hc-black': 'hc-black'
          }
        },
        opts: {
          value: '',
          readOnly: false,
          language: 'javascript',
          theme: 'vs-dark'
        }
      }
    },
    methods: {
      changeLanguage(val) {
        this.opts.language = val
      },
      changeTheme(val) {
        this.opts.theme = val
      },
      // 手动获取值
      getValue() {
        this.$message.info(this.$refs.monaco.getVal())
      },
      // 内容改变自动获取值
      changeValue(val) {
        console.log(val)
      }
    }
  }
</script>
```
:::


### monaco 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| height | 编辑器高度 | number | — | 300 |
| opts | 配置项，详见opts 属性 | object | — | — |


### opts 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value | 初始值 | string | — | '' |
| theme | 主题风格 | string | vs/vs-dark/hc-black | vs-dark |
| language | 在编辑器中自动创建模型的初始语言 | string | 详见：language可选值 | 自动创建 |
| selectOnLineNumbers | 单击行号时，是否应该选择相应的行 | boolean | ture/false | true |
| roundedSelection | 右侧显示编辑器预览框 | boolean | ture/false | true |
| readOnly | 是否只读 | boolean | ture/false | false |
| cursorStyle | 光标样式 | string | block/line | line |
| fontSize | 字体大小 | string | — | 14px |
| autoIndent | 自动缩进 | boolean | ture/false | true |

##### language可选值

apex / azcli / bat / c / clojure / coffeescript / cpp / csharp / csp / css / dockerfile / fsharp / go / graphql / handlebars / html / ini / java / javascript / json / kotlin / less / lua / markdown / msdax / mysql / objective-c / pascal / perl / pgsql / php / plaintext / postiats / powerquery / powershell / pug / python / r / razor / redis / redshift / ruby / rust / sb / scheme / scss / shell / sol / sql / st / swift / tcl / typescript / vb / xml / yaml


### 更多属性

[查看更多属性](https://microsoft.github.io/monaco-editor/api/index.html)

### 事件

| 事件名 | 描述 | 参数 |
|----| ----| ----|
| this.$refs.monaco.getVal() | 手动获取值 | -- |
| change | 编辑器内容改变自动获取值 | (value: string) |