## Utils 模块

公共基础方法和类型判断

### 类型判断

```html
    this.$util.isObject(data)
    this.$util.isArray(data)
    this.$util.isDate(data)
    this.$util.isString(data)
    this.$util.isNumber(data)
    this.$util.isNull(data)
    this.$util.isEmail(data)
    this.$util.isUrl(data)
    this.$util.isPhone(data)
```

### 日期格式化

:::demo `dateFormat(time, fmt)`第二个参数传格式，默认`yyyy-MM-dd hh:mm:ss`
```html
<template>
    <el-row>
        <el-col :span="8">
            <div><el-button type="success" @click="format('1553743231275')">格式化</el-button></div>
            <div>time: 1553743231275</div>
        </el-col>
        <el-col :span="8">
            <div><el-button type="success" @click="format(new Date())">格式化</el-button></div>
            <div>time: new Date()</div>
        </el-col>
        <el-col :span="8">
            <div><el-button type="success" @click="format('1553744731275', 'dd/MM/yyyy hh:mm')">格式化</el-button></div>
            <div>格式：dd/MM/yyyy hh:mm</div>
        </el-col>
    </el-row>
</template>
<script>
  export default {
    methods: {
      format(time, fmt) {
          this.$alert(this.$util.dateFormat(time, fmt), '格式化结果')
      }
    }
  }
</script>
```
:::


### 深度拷贝

:::demo `deepClone`
```html
<template>
    <code>
        <pre>
srcobj = {
    d1: {
        a: [1, 2, {
            b: 3
        }]
        d2: {
            c: '哈哈'
            d3: {
                value: 4
            }
        }
    },
    nu: null,
    em: '',
    ud: undefined
}
        </pre>
    </code>
    <el-button type="success" @click="handleClick">拷贝</el-button>
</template>
<script>
    export default {
        data() {
            return {
                srcobj: {
                    d1: {
                        a: [1, 2, {
                            b: 3
                        }],
                        d2: {
                            c: '哈哈',
                            d3: {
                                value: 4
                            }
                        }
                    },
                    nu: null,
                    em: '',
                    ud: undefined
                }
            }
        },
        methods: {
            handleClick(count) {
                this.$alert(this.$util.deepClone(this.srcobj), '拷贝结果')
            }
        }
    }
</script>
```
:::

### 合并对象已存在的属性

:::demo `existClone(handObj, sourceObj, cover = true)` cover 新值有定义但是为空时，要不要覆盖
```html
<template>
    <el-row>
        <el-col :span="6">
            <code>
                <pre>
let handObj = {
    k1: 'aaaaa',
    k2: 'bbbbb',
    k3: 'ccccc'
}
                </pre>
            </code>
        </el-col>
        <el-col :span="6">
           <code>
                <pre>
let sourceObj = {
    k1: '',
    k2: 'BBBBB',
    k4: 'DDDDD',
    k5: 'EEEEE',
}
                </pre>
            </code>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6">
            <el-button type="success" @click="clone">默认合并</el-button>
        </el-col>
        <el-col :span="6">
            <el-button type="success" @click="cloneNotCover">非覆盖合并</el-button>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data(){
        return {
            handObj: {
                k1: 'aaaaa',
                k2: 'bbbbb',
                k3: 'ccccc'
            },
            sourceObj: {
                k1: '',
                k2: 'BBBBB',
                k4: 'DDDDD',
                k5: 'EEEEE',
            }
        }
    },
    methods: {
        clone() {
            let hander = Object.assign({}, this.handObj)
            this.$alert(this.$util.existClone(hander, this.sourceObj), '合并结果')
        },
        cloneNotCover() {
            let hander = Object.assign({}, this.handObj)
            this.$alert(this.$util.existClone(hander, this.sourceObj, false), '合并结果')
        }
    }
}
</script>
```
:::

### 生成随机字符串

:::demo `randomString(len)`  /^[1-9a-z]{len}$/
```html
<template>
    <el-input v-model="len" style="width:100px;" placeholder="字符串长途"></el-input>
    <el-button type="success" @click="create">生成</el-button>
    结果：{{string}}
</template>
<script>
    export default {
        data() {
            return {
                len: 8,
                string: ''
            }
        },
        methods: {
            create(){
                this.string = this.$util.randomString(this.len)
            }
        }
    }
</script>
```
:::


### 批量处理对象属性空格

:::demo `batchTrim(obj,clear=true)`, clear表示清除无效属性，默认true
```html
<template>
    <code>
        <pre>
{
    a: 'value1 ',
    b: ' value2 ',
    c: '',
    d: undefined,
    e: null,
    f: false
}
        </pre>
    </code>
    <el-button type="success" @click="handleClick">清除</el-button>
</template>
<script>
    export default {
        data() {
            return {
                testObj: {
                    a: 'value1 ',
                    b: ' value2 ',
                    c: '',
                    d: undefined,
                    e: null,
                    f: false
                }
            }
        },
        methods: {
            handleClick(count) {
                this.$alert(this.$util.batchTrim(this.testObj), '清除结果')
            }
        }
    }
</script>
```
:::
