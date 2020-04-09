### tableForm

基础用法
:::demo 基础用法。
```html
<template>
    <div>
        <el-form :model="formList" ref="form">
            <ac-table-form v-model="formList.itemList" prop="itemList" :fieldList="fieldList"></ac-table-form>
        </el-form>
        <div style="text-align: center;margin-top: 20px">
            <el-button @click="getDate" type="success">获取tableform 数据</el-button>
        </div>
    </div>
        
</template>
<script>
export default {
    data() {
        return {
            formList: {
                itemList: []
            },
            fieldList: [{
                label: '参数',
                dat: 'params',
                module: 'AcSelect',
                dic: {'1': '年龄', '2': '性别', '3': '学校'},
                rule: true
            }, {
                label: '规则',
                dat: 'rule',
                module: 'AcSelect',
                dic: {'>': '大于', '<': '小于', '=': '等于'},
                rule: true
            }, {
                label: '参数',
                dat: 'paramsValue',
                module: 'AcInput',
                rule: true
            }]
        }
    },
    methods: {
        getDate() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message.success(JSON.stringify(this.formList.itemList))
                } else {
                    return false;
                }
            })
        }
    }
}
</script>
```
:::

表单数据 互相关联
:::demo。
```html
<template>
    <div>
        <el-form :model="formList" ref="form">
            <ac-table-form v-model="formList.itemList" prop="itemList" :fieldList="fieldList"  :dicts="dicts" :functions="functions"></ac-table-form>
        </el-form>
        <div style="text-align: center;margin-top: 20px">
            <el-button @click="getDate" type="success">获取tableform 数据</el-button>
        </div>
    </div>
        
</template>
<script>
export default {
    data() {
        return {
            formList: {
                itemList: [{
                    params: '1',
                    rule: '>',
                    paramsValue: ''
                }]
            },
            fieldList: [{
                label: '参数',
                dat: 'params',
                module: 'AcSelect',
                dic: 'paramsDict',
                change: 'paramsChange',
                rule: true
            }, {
                label: '规则',
                dat: 'rule',
                module: 'AcSelect',
                dic: 'ruleDict',
                rule: true
            }, {
                label: '参数',
                dat: 'paramsValue',
                module: 'AcInput',
                rule: true
            }],
            dicts: {
                ruleDict(form) {
                    return {}
                },
                paramsDict(form) {
                    return {'1': '年龄', '2': '性别', '3': '其他'}
                }
            },
            functions: {
                paramsChange(form) {
                    form.rule = ''
                }

            },
            dict1: {'>': '大于', '<': '小于', '=': '等于'},
            dict2: {'y': '是', 'n': '否'},
            dict3: {'!': '或者', 'c': '测试'}
        }
    },
    mounted() {
        setTimeout(() => {
            this.dicts.ruleDict = (form) => {
                if (form.params === '1') {
                    return this.dict1
                } else if ( form.params === '2' ) {
                    return this.dict2
                } else {
                    return this.dict3
                }
            }
        }, 100)
    },
    methods: {
        getDate() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message.success(JSON.stringify(this.formList.itemList))
                } else {
                    return false;
                }
            })
        }
    }
}
</script>
```
:::

### tabForm 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| value / v-model    | 绑定值 | array    | —  | — |
| prop    | 校验值 | string    | —  | — |
| fieldList    | 配置值(详情见下方配置值) | array    | —  | — |
| dicts    | 下拉字典列表(详情见下方配置值) | object    | —  | — |
| functions    | 方法列表(详情见下方配置值) | object    | —  | — |


### fieldList属性配置
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| label    | 显示的标题 | string | —    | —   |
| dat | 绑定属性值（和v-model 绑定值对应） | string | —    | —  |
| module | 组件名（目前已经开发的组件） |string | —  |  —   |
| dic | 如组件需要字典，需配置下拉或者列表项（可放置于dicts） |string/function/object/map | —  |  —   |
| rule | 是否必填 | 布尔 | —    | false  |
| change | 当前表单改变时方法 |string/function | —  |  —   |
 ### dicts属性配置
| 参数       | 说明                | 回调参数     | 
| -------- | ----------------- | ------ | 
| 取上面dic 配置为 string的值    | map /function | form 当前表单的上下文  |
 ### functions属性配置
| 参数       | 说明                | 回调参数     | 
| -------- | ----------------- | ------ | 
| 取上面change 配置为 string的值    | function | （form, item, dicts）依次为 表单上下文 表格当前行 当前字典列表  |


### 事件

| 事件名 | 描述 | 回调参数 |
|----| ----| ----|
| validate | 任意表单校验后触发 | 被校验的表单项 prop 值，校验是否通过，错误消息（如果存在）|
