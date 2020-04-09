### Form 表单封装

 你可以通过配置方法生成表单 推荐使用[表单配置器](http://172.16.6.125:8080/formDesign) 

### 常规调用
常规调用 传入 data 可完成基本配置  为了适配表单的特殊性   
我们准备 dicts属性 放置字典 （支持 object 和 function 两种模式）特别注意此处不能写异步方法   
functions 属性  放置所有需要自定义方法

:::demo 支持element 提供原生属性。日期区间输入方式有2种：1、prop传2个字段，逗号分割，见实例“日期区间”；2、prop传一个字段，值为逗号分割的字符串，如：'1970-01-23 00:00:00,1970-01-23 00:00:00'，见实例“日期区间1”
```html
<template>
    <ac-form v-bind="formConfig" ref="form" :rform="form"></ac-form>
    <div style="text-align: center">
        <el-button type="danger" @click="submit">点击获取表单数据</el-button>
    </div>
</template>
<script>
  export default {
    data() {
        return {
            formConfig: {
                data: {
                    list: [{
                        gutter: 10,
                        justify: 'start',
                        align: 'top',
                        module: 'grid',
                        columns: [
                            {
                                span: 12,
                                list: [
                                    {
                                        module: 'AcSelect',
                                        label: '资金产品',
                                        prop: 'fundsProduct',
                                        dic: {'1': '取点花', '2': '好好花', '3': '大家花'},
                                        change: 'fundsProductChange',
                                    },
                                    {
                                        module: 'AcSelect',
                                        label: '资产产品',
                                        prop: 'assetsProduct',
                                        disabled: 'add',
                                        dic: 'test',
                                        rule: true,
                                    },
                                    {
                                        module: 'AcSelectTree',
                                        label: '下拉树规则',
                                        prop: 'selectList',
                                        offset: 100,
                                        dic: 'tree',
                                        rule: true
                                    },
                                    {
                                        module: 'AcCheckbox',
                                        label: '多选框开发',
                                        prop: 'selectListMilt',
                                        dic: 'mList',
                                        column: true,
                                        rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '周',
                                    type: 'week',
                                    prop: 'dateValue1',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '多个日期',
                                    type: 'dates',
                                    prop: 'dateValue2',
                                    rule: true
                                    },
                                    {
                                    module: 'AcRadio',
                                    label: '是否启用',
                                    prop: 'isSelect',
                                    dic: {'202204': '取点花', '202207': '成功花'},
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '任意时间区间',
                                    prop: 'startTime1',
                                    dateRangeName: 'startTime1,endTime1',
                                    dateType: 'timePicker',
                                    isRange: true,
                                    rule: true
                                    }
                                ]
                            },
                            {
                                span: 12,
                                list: [
                                    {
                                    module: 'AcInput',
                                    label: '产品编号',
                                    prop: 'fundsProductNo',
                                    rule: true,
                                    },
                                    {
                                    module: 'AcInput',
                                    label: '资产产品',
                                    prop: 'assetsProductNo',
                                    rule: true
                                    },
                                    {
                                    module: 'AcInput',
                                    label: '金额',
                                    prop: 'amt',
                                    rule: true,
                                    type: 'money'
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '日期',
                                    prop: 'dateValue',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '日期区间',
                                    prop: 'startTime',
                                    type: 'datetimerange',
                                    dateRangeName: 'startTime,endTime',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '日期区间1',
                                    prop: 'timeRange',
                                    type: 'daterange',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '任意时间',
                                    dateType: 'timePicker',
                                    prop: 'timeValue1',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '任意时间',
                                    dateType: 'timePicker',
                                    isRange: true,
                                    prop: 'timeValue3',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '固定时间',
                                    dateType: 'timeSelect',
                                    prop: 'timeValue2',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '固定时间区间',
                                    dateType: 'timeSelect',
                                    isRange: true,
                                    prop: 'startTime2',
                                    dateRangeName: 'startTime2,endTime2',
                                    rule: true
                                    },
                                    {
                                    module: 'AcDate',
                                    label: '固定时间区间',
                                    dateType: 'timeSelect',
                                    isRange: true,
                                    prop: 'timeRange2',
                                    rule: true
                                    }
                                ]
                            }
                        ] 
                    }],
                    config: {
                        labelWidth: 110,
                        labelPosition: 'left',
                        size: 'small',
                        type: 'add'
                    }
                },
                dicts: {
                    test(form) {
                        // 不能异步
                        return {'111': '取1点花', '222': '好1好花', '333': '大1家花'}
                    },
                    mList() {
                        return {
                            '1': '今天是个好日子',
                            '2': '明天会很热',
                            '3': '后天不会远行',
                            '4': '前面的路还很苦'
                        }
                    },
                    tree(form) {
                        return [{
                            id: '1',
                            label: '支付渠道',
                            children: [{
                                id: '4',
                                label: '支付宝',
                                children: [{
                                id: '9',
                                label: '微信'
                                }, {
                                id: '10',
                                label: '网银'
                                }]
                            }]
                            }, {
                            id: '2',
                            label: '资金产品',
                            children: [{
                                id: '5',
                                label: '众安1期'
                            }, {
                                id: '6',
                                label: '山东信托'
                            }]
                            }, {
                            id: '3',
                            label: '资产产品',
                            children: [{
                                id: '7',
                                label: '取点花'
                            }, {
                                id: '8',
                                label: '嗨花',
                                children: [{
                                id: '11',
                                label: '成功花'
                                }, {
                                id: '12',
                                label: '抱米花'
                                }, {
                                id: '13',
                                label: '抱你花'
                                }]
                            }]
                        }]
                    }
                },
                functions: {
                    fundsProductChange(scope, data, dicts) {
                        // 可以异步实现级联
                        setTimeout(()=> {
                            if (scope.fundsProduct === '1') {
                                dicts.test = {'111': '众安1', '222': '众安2', '333': '众安3'}    
                            } else {
                                dicts.test = {'111': '众安4', '222': '众安5', '333': '众安6'}
                            }
                        }, 100)
                    }
                }
            },
            form: {
                timeValue3: '1970-01-23 12:06:03,1970-01-23 18:23:15',
                fundsProduct: '1',
                assetsProduct: '111',
                fundsProductNo: '1334555',
                assetsProductNo: '111111',
                selectList: '2',
                dateValue: '1975-03-14 14:25:30',
                startTime: '1970-01-23 00:00:00',
                endTime: '1975-03-14 14:25:30',
                startTime1: '1970-01-23 00:00:00',
                endTime1: '1975-03-14 14:25:30',
                startTime2: '05:20:10',
                timeRange2: '10:00,11:00',
                endTime2: '14:25:30',
                timeRange: ''
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.getData().then(data => {
              // 数据校验成功
              this.$message.success(JSON.stringify(data))
            }).catch(e => {
              // 数据校验失败
            })
        }
    }
  }
</script>
```
:::

### tab form
表单信息过长通过tabs 切换
:::demo
```html
<template>
    <ac-form :data='foDate' ref="form" :rform="form"></ac-form>
    <div style="text-align: center"><el-button type="danger" @click="submit">点击获取表单数据</el-button></div>
</template>
<script>
  export default {
    data() {
        return {
            foDate: {
                list: [
                    {
                        gutter: 10,
                        justify: 'start',
                        align: 'top',
                        module: 'grid',
                        key: '1',
                        label: '基本信息',
                        columns: [
                            {
                                span: 12,
                                list: [
                                    {
                                        module: 'AcSelect',
                                        label: '资金产品',
                                        prop: 'fundsProduct',
                                        dic: {'1': '取点花', '2': '好好花', '3': '大家花'}
                                    },
                                    {
                                        module: 'AcSelect',
                                        label: '资金产品3',
                                        prop: 'fundsProduct3',
                                        dic: {'1': '取点花', '2': '好好花', '3': '大家花'}
                                    }
                                ]
                            },
                            {
                                span: 12,
                                list: [{
                                    module: 'AcInput',
                                    label: '产品编号',
                                    prop: 'fundsProductNo',
                                    rule: true,
                                    },
                                    {
                                    module: 'AcRadio',
                                    label: '是否启用',
                                    prop: 'isSelect',
                                    dic: {'Y': '启用', 'N': '禁用'},
                                    rule: true
                                    }
                                ]
                            }
                        ] 
                    },
                    {
                        gutter: 10,
                        justify: 'start',
                        align: 'top',
                        module: 'grid',
                        key: '2',
                        label: '还款信息',
                        columns: [
                            {
                                span: 12,
                                list: [
                                    {
                                        module: 'AcSelect',
                                        label: '资金产品1',
                                        prop: 'fundsProduct1',
                                        dic: {'1': '取点花', '2': '好好花', '3': '大家花'}
                                    },
                                    {
                                        module: 'AcSelect',
                                        label: '资金产品2',
                                        prop: 'fundsProduct2',
                                        dic: {'1': '取点花', '2': '好好花', '3': '大家花'}
                                    }
                                ]
                            },
                            {
                                span: 12,
                                list: [{
                                    module: 'AcInput',
                                    label: '产品编号1',
                                    prop: 'fundsProductNo1',
                                    rule: true,
                                    },
                                    {
                                    module: 'AcRadio',
                                    label: '是否启用1',
                                    prop: 'isSelect1',
                                    dic: {'202204': '取点花', '202207': '成功花'},
                                    rule: true
                                    }
                                ]
                            }
                        ] 
                    }
                ],
                config: {
                    isTab: true,
                    labelWidth: 110,
                    labelPosition: 'left',
                    size: 'small'
                }
            },
            form: {
                fundsProduct: '1',
                assetsProduct: '111',
                fundsProductNo: '1334555',
                assetsProductNo: '111111',
                selectList: '2',
                dateValue: '1975-03-14 14:25:30',
                startTime: '1970-01-23 00:00:00',
                endTime: '1975-03-14 14:25:30',
                timeRange: '1970-01-23 00:00:00,1970-01-23 00:00:00'
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.getData().then(data => {
              // 数据校验成功
              this.$message.success(JSON.stringify(data))
            }).catch(e => {
              // 数据校验失败
            })
        }
    }
  }
</script>
```
:::
### 配置化表单 
获取ENCORE 表单

:::demo 支持element 提供原生属性。
```html
<template>
    <ac-form :data='foDate' :functions="functions" :dicts="dicts"  ref="form" class="form">
        <template slot="basic">
            <div class="head" >
                | 基本信息
            </div>
        </template>
        <template slot="relate">
            <div class="head">
                | 联系人信息
            </div>
        </template>
    </ac-form>
    <div style="text-align: center">
        <el-button type="danger" @click="handleChangeType">改变为新增模式</el-button>
        <el-button type="waring" @click="submit">点击获取表单数据</el-button>
    </div>
</template>
<script>
  export default {
    data() {
        return {
          foDate: {
          },
          dicts: {},
          functions: {
              handleChangeChannelType(form, data, dicts) {
                  form.channelNo = 'test1'
              }
          }
        }
    },
    mounted() {
        this.getDict()
        this.$ajax.get('module/detail', {moduleNo: 'actorTest'}, res=> {
            this.foDate = JSON.parse(res.data.config)
        })
    },
    methods: {
        getDict() {
            setTimeout(() => {
                let temp = {
                    '1': '国营',
                    '2': '私营'
                }
                this.$set(this.dicts, 'channelType', temp)
            }, 500)
        },
        submit() {
            this.$refs.form.getData().then(data => {
              // 数据校验成功
              this.$message.success(JSON.stringify(data))
            }).catch(e => {
              // 数据校验失败
            })
        },
        handleChangeType() {
            this.$set(this.foDate.config, 'type', 'add')
        }
    }
  }
</script>
```
:::
### 插槽 
高度定制化表单需要用到插槽

:::demo 支持element 提供原生属性。
```html
<template>
    <ac-form :data='foDate' ref="form">
        <template slot="rate" slot-scope="scope">
            <p>
                <ac-input label="费率公式" prop="rate" v-model="scope.model.rate"
                style="width: 30%;display: inline-block" rule></ac-input>*(
                <ac-input label=""  label-width="1" v-model="scope.model.Methods"
                style="width: 20%;display: inline-block" ></ac-input>+
                <ac-input label="" label-width="1" v-model="scope.model.ccc"
                style="width: 20%;display: inline-block" ></ac-input>)*222
            </p>
        </template>
    </ac-form>
    <div style="text-align: center"><el-button type="waring" @click="submit">点击获取表单数据</el-button></div>
</template>
<script>
  export default {
    data() {
        return {
          foDate: {
                list: [{
                    module: 'slot',
                    label: '费率',
                    prop: 'rate',
                    },
                    {
                    module: 'AcSelect',
                    label: '资产产品',
                    prop: 'assetsProduct',
                    dic: {'111': '取1点花', '222': '好1好花', '333': '大1家花'},
                    width: '100%',
                    rule: true,
                    defaultValue: '111',
                    }
                ],
                config: {
                    labelWidth: 100,
                    labelPosition: 'left',
                    size: 'small'
                }
            }
        }
    },
    methods: {
        submit() {
            this.$refs.form.getData().then(data => {
              // 数据校验成功
              this.$message.success(JSON.stringify(data))
            }).catch(e => {
              // 数据校验失败
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
| data    | 配置值(详情见下方配置值) | array    | —  | — |
| dicts    | 下拉字典列表(详情见下方配置值) | object    | —  | — |
| functions    | 方法列表(详情见下方配置值) | object    | —  | — |


### data list 属性配置
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| label    | 显示的表单label | string | —    | —   |
| prop    | 显示表单绑定值 | string | —    | —   |
| rule | 是否必填 | 布尔 | —    | false  |
| module | 组件名（目前已经开发的组件） |string | —  |  —   |
| dic | 如组件需要字典，需配置下拉或者列表项（可放置于dicts） |string/function/object/map | —  |  —   |
| change | 当前表单改变时方法 |string/function | —  |  —   |
### module 为 grid

| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| gutter    | 同element 原生属性 | number | —    | —   |
| justify    | 同element 原生属性 | string | —    | —   |
| align    | 同element 原生属性 | string | —    | —   |
| columns    | 数组存在两个参数 span 宽度  list 同上list, 但接收的组件不能是 grid  | array | —    | —   |

### module 为 slot
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| label    | 显示的表单label | string | —    | —   |
| prop    | 显示表单绑定值/ slot 名 | string | —    | —   |

### data config 属性配置
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| label-width    | 同element 原生属性 | string | —    | —   |
| label-position    | 同element 原生属性 | string | —    | —   |
| size | 是否必填 | 同element 原生属性 | —    | small  |
 ### dicts属性配置
| 参数       | 说明                | 回调参数     | 
| -------- | ----------------- | ------ | 
| 取上面dic 配置为 string的值    | map /function | form 当前表单的上下文  |
 ### functions属性配置
| 参数       | 说明                | 回调参数     | 
| -------- | ----------------- | ------ | 
| 取上面change 配置为 string的值    | function | （form, item, dicts）依次为 表单上下文 表格当前行 当前字典列表  |


### 事件

| 事件名 | 描述 |  
|----| ----| 
| getData | 获取表单数据 Promise| 
