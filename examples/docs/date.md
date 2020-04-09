## date 日期时间

### 基本调用
日期时间组件必须要包裹在el-form 之下，最简写法：

:::demo 单个日期（时间）value为字符串，日期区间（时间区间）value为数组。
```html
<template>
    <el-form :model="form" labelWidth="80px">
        <h4>日期</h4>
        <ac-date 
            label="创建时间"
            :value="form.value1"
            rule
            @change="change1"
        ></ac-date>
        <p>已选择： {{form.value1}}</p>
        <h4>日期区间</h4>
        <ac-date 
            label="日期区间"
            type="datetimerange"
            :value="[form.startTime, form.endTime]"
            dateRangeName="startTime,endTime"
            @change="rangeChange"
        ></ac-date>
        <p>已选择：{{form.startTime}} 至 {{form.endTime}}</p>
        <h4>任意时间</h4>
        <ac-date
            dateType="timePicker"
            label="创建时间"
            :timeOptions="timeOptions1"
            :value="form.value2"
            @change="change2"
        ></ac-date>
        <p>已选择： {{form.value2}}</p>
        <h4>任意时间区间</h4>
        <ac-date
            dateType="timePicker"
            :isRange=true
            :value="rangeTime1"
            label="时间区间"
            @change="change3"
        ></ac-date>
        <p>已选择：{{form.startTime1}} 至 {{form.endTime1}}</p>
        <h4>固定时间</h4>
        <ac-date
            dateType="timeSelect"
            label="可选时间"
            :timeOptions="timeOptions"
            :value="form.value3"
            @change="change4"
        ></ac-date>
        <p>已选择：{{form.value3}}</p>
        <h4>固定时间区间</h4>
        <ac-date
            dateType="timeSelect"
            :isRange=true
            :value="[form.startTime2,form.endTime2]"
            label="可选时间"
            dateRangeName="startTime2,endTime2"
            :timeOptions="timeOptions"
            @change="change5"
        ></ac-date>
        <p>已选择：{{form.startTime2}} - {{form.endTime2}}</p>
    </el-form>
</template>
<script>
  export default {
    data() {
      return {
        timeOptions: {
          start: '08:30',
          step: '00:15',
          end: '18:30'
        },
        rangeTime1: null,
        rangeTime2: null,
        timeOptions1: {
          selectableRange: '18:30:00 - 20:30:00'
        },
        form: { 
          value1: '2019-03-06 00:00:00',
          value2: '',
          value3: '',
          startTime: '2019-03-06 00:00:00',
          endTime: '2019-03-06 00:00:00',
          startTime1: '',
          endTime1: '',
          startTime2: '',
          endTime2: ''
        }
      }
    },
    methods: {
      change1(value) {
        this.form.value1 = value
      },
      change2(value) {
        this.form.value2 = value
      },
      change3(value) {
        this.form.startTime1 = value ? value[0] : ''
        this.form.endTime1 = value ? value[1] : ''
      },
      change4(value) {
        this.form.value3 = value
      },
      change5(start, end) {
        this.form.startTime2 = start
        this.form.endTime2 = end
      },
      rangeChange(start, end) {
        this.form.startTime = start || ''
        this.form.endTime = end || ''
      }
    }
  }
</script>
```
:::

### 日期属性

:::demo
```html
<template>
    <el-form :model="form" labelWidth="80px">
        <h4>带快捷选项</h4>
        <ac-date 
            label="创建时间"
            :value="form.value1"
            :shortcuts="shortcuts"
        ></ac-date>
        <ac-date 
            label="时间区间"
            type="datetimerange"
            :value="form.value2"
            :shortcuts="shortcutsRange"
        ></ac-date>
        <h4>不可选择日期</h4>
        <ac-date 
            label="创建时间"
            :value="form.value3"
            :disabledDate="disabledDate"
        ></ac-date>
        <h4>不可编辑</h4>
        <ac-date 
            label="创建时间"
            :value="form.value4"
            :disabled="disabled"
        ></ac-date>
        <h4>默认时间</h4>
        <ac-date 
            label="创建时间"
            :value="form.value5"
            defaultTime="23:59:59"
        ></ac-date>
        <ac-date 
            label="时间区间"
            type="datetimerange"
            :value="form.value6"
            :defaultTime="['00:00:00', '23:59:59']"
        ></ac-date>
    </el-form>
</template>
<script>
  export default {
    data() {
      return {
        shortcuts: [{
          text: '今天',
          days: 0
        }, {
          text: '昨天',
          days: -1
        }, {
          text: '一周前',
          days: -7
        }, {
          text: '明天',
          days: 1
        }],
        shortcutsRange: [{
          text: '最近一周',
          days: -7
        }, {
          text: '后30天',
          days: 30
        }],
        form: { 
          value1: '',
          value2: '',
          value3: '',
          value4: '',
          value5: '',
          value6: ''
        },
        disabled: true
      }
    },
    mounted() {
    },
    methods: {
      disabledDate(time) {
        return time.getTime() < Date.now()
      }
    }
  }
</script>
```
:::

### 其他日期单位

:::demo type值不同。
```html
<template>
    <el-form :model="form" labelWidth="80px">
        <ac-date 
            label="周"
            type="week"
            :value="form.value1"
            @change="change1"
        ></ac-date>
        <ac-date 
            label="年"
            type="year"
            :value="form.value2"
            @change="change2"
        ></ac-date>
        <p>已选择： {{form.value2}}</p>
        <ac-date 
            label="月"
            type="month"
            :value="form.value3"
            @change="change3"
        ></ac-date>
        <p>已选择： {{form.value3}}</p>
        <ac-date 
            label="多个日期"
            type="dates"
            :value="form.value4"
            @change="change4"
        ></ac-date>
        <p>已选择： {{value4Copy}}</p>
    </el-form>
</template>
<script>
  export default {
    data() {
      return {
        value4Copy: '',
        form: { value1: '', value2: '', value3: '', value4: null }
      }
    },
    methods: {
      change1(value) {
        this.form.value1 = value
      },
      change2(value) {
        this.form.value2 = value
      },
      change3(value) {
        this.form.value3 = value
      },
      change4(value) {
        this.value4Copy = value ? value.join(',') : ''
      }
    }
  }
</script>
```
:::

### 共有属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| form | 表单字段 | object | — | — |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —  selectWidth     | — |
| rule | 是否必填 | boolean | — | false |
| dateRangeName | 日期区间传2个字段，用逗号分割，如：'startTime,endTime'，change事件返回2个值，不传change事件默认返回1个值 | string | — | — |
| dateType | 日期时间类型 | string | datePicker / timePicker / timeSelect | datePicker |
| disabled | 禁用 | boolean | — | false   |
| clearable     | 是否可清空        | boolean         | — | true |
| size | 输入框尺寸  | string | medium / small / mini  | — |
| format | 输入框显示的格式 | string | 见日期格式 | yyyy-MM-dd |
| valueFormat | 可选，绑定值格式。不指定则绑定值为 Date 对象 | string | 见日期格式 | — |
| value / v-model | 日期-绑定值，传一个字段。注意：如果传2个字段组成的数组也当一个字段处理 | string/array  | — | — |
| placeholder   | 非范围选择时的占位内容 | string | — | — |
| rangeSeparator | 选择范围时的分隔符 | string | — | '-' |
| startPlaceholder | 范围选择时开始日期的占位内容 | string | — | — |
| endPlaceholder | 范围选择时结束日期的占位内容 | string | — | — |

### datePicker属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| type | 类型 | string | datetime / date / daterange / datetimerange / year / month / week / dates | datetime |
| defaultTime | 选中日期后的默认具体时刻 | 非范围选择时：string / 范围选择时：string[] | — | — |
| disabledDate | 不可编辑函数 | function | — | — |
| shortcuts | 带快捷选项 | array | — | [] |

### timePicker属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| timeOptions | 可选属性：selectableRange | object | — | {} |
| isRange | 是否为时间范围选择 | boolean | — | false |

### timeSelect属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| timeOptions | 可选属性：start/end/step/minTime/maxTime | object | — | {} |
| isRange | 是否为时间范围选择 | boolean | — | false |

### Events
| 事件名称 | 描述 | 传参 |
|-------------  |---------------- |---------------- |
| change | 用户确认选定的值时触发 | 组件绑定值。格式与绑定值一致，可受 value-format 控制 | 

### 日期格式

参考[element-ui日期格式](http://element-cn.eleme.io/#/zh-CN/component/date-picker#ri-qi-ge-shi)


### datePicker的type/format/valueFormat默认值对照表

| 类型（type） |  输入框显示的格式（format） | 绑定值格式（valueFormat） | 返回值类型 |
|-------------  |---------------- |---------------- |---------------- |
| datetime | yyyy-MM-dd HH:mm:ss | yyyy-MM-dd HH:mm:ss | string |
| datetimerange | yyyy-MM-dd HH:mm:ss | yyyy-MM-dd HH:mm:ss | string，返回值1个或2个 |
| date | yyyy-MM-dd | yyyy-MM-dd | string |
| daterange | yyyy-MM-dd | yyyy-MM-dd | string，返回值1个或2个 |
| dates | yyyy-MM-dd | yyyy-MM-dd | array，如果传入form则返回逗号分割字符串 |
| year | yyyy | yyyy | string |
| month | yyyy-MM | yyyy-MM | string |
| week | yyyy 第 WW 周 | Date 对象 | Date 对象 |

### timePicker的format/valueFormat默认值对照表

|  输入框显示的格式（format） | 绑定值格式（valueFormat） | 返回值类型 |
|---------------- |---------------- |---------------- |
| HH:mm:ss | yyyy-MM-dd HH:mm:ss | string |