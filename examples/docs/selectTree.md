## 下拉树组件

acSelect 树形下拉框 需要 el-form 之下

### 单选下拉树

:::demo list 需指定键值。
```html
<template>
    <el-form :model="form">
        <h4>可以选择任何项</h4>
        <ac-select-tree
            labelWidth="100px"
            :offset="100"
            label="测试树" 
            :dict='treeData' 
            v-model="form.text"
            prop="text"
            rule
        ></ac-select-tree>
        <p>你本次选择了 {{form.text}}</p>
        <h4>只能选择根节点</h4>
        <ac-select-tree
            labelWidth="100px"
            :offset="100"
            label="测试树"
            props="text1" 
            :dict='treeData' 
            v-model="form.text1"
            isSelectRoot
        ></ac-select-tree>
        <p>你本次选择了 {{form.text1}}</p>
    </el-form>
</template>
<script>
  export default {
    data() {
        return {
          form: { text: 3, text1: '' },
          returnString: '',
          treeData: [{
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2'
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2'
            }]
          }]
        }]
        }
    }
  }
</script>
```
:::

### 节点过滤

通过关键字过滤树节点 

:::demo
```html
<template>
    <el-form :model="form" labelWidth="100px">
        <ac-select-tree 
            label="产品名称" 
            :offset="100"
            :dict='treeData' 
            multiple
            v-model="form.productNo1"
            filter 
        ></ac-select-tree>
    </el-form>
    
</template>
<script>
  export default {
    data() {
        return {
          form: { productNo1: ''},
          treeData: [{
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
    }
  }
</script>
```
:::

### 智能多选

select 支持两种多选方式   
1.multiple 属性 传入string 传出 string 优先级最高   
2.v-model 绑定值为一个数组 程序默认为多选 传入 array 传出 array  

:::demo 也可支持只选到根节点。
```html
<template>
    <el-form :model="form" labelWidth="100px">
        <ac-select-tree 
            label="产品名称" 
            :offset="100"
            :dict='treeData' 
            multiple
            v-model="form.productNo1" 
        ></ac-select-tree>
        <p>用户选择了： {{form.productNo1}}</p>
        <ac-select-tree 
            label="选择根节点" 
            labelWidth="100px" 
            :offset="100"
            :dict='treeData1'
            v-model="form.productNo2"
            isSelectRoot 
        ></ac-select-tree>
        <p>用户选择了： {{form.productNo2}}</p>
    </el-form>
    
</template>
<script>
  export default {
    data() {
        return {
          form: { productNo1: '1,4,9', productNo2: [] },
          treeData: [{
            id: '1',
            label: '一级 1',
            children: [{
                id: '4',
                label: '二级 1-1',
                children: [{
                id: '9',
                label: '三级 1-1-1'
                }, {
                id: '10',
                label: '三级 1-1-2'
                }]
            }]
            }, {
            id: '2',
            label: '一级 2',
            children: [{
                id: '5',
                label: '二级 2-1'
            }, {
                id: '6',
                label: '二级 2-2'
            }]
            }, {
            id: '3',
            label: '一级 3',
            children: [{
                id: '7',
                label: '二级 3-1'
            }, {
                id: '8',
                label: '二级 3-2',
                children: [{
                id: '11',
                label: '三级 3-2-1'
                }, {
                id: '12',
                label: '三级 3-2-2'
                }, {
                id: '13',
                label: '三级 3-2-3'
                }]
            }]
        }],
        treeData1: [{
            id: '1',
            label: '一级 1',
            children: [{
                id: '4',
                label: '二级 1-1',
                children: [{
                id: '9',
                label: '三级 1-1-1'
                }, {
                id: '10',
                label: '三级 1-1-2'
                }]
            }]
            }, {
            id: '2',
            label: '一级 2',
            children: [{
                id: '5',
                label: '二级 2-1'
            }, {
                id: '6',
                label: '二级 2-2'
            }]
            }, {
            id: '3',
            label: '一级 3',
            children: [{
                id: '7',
                label: '二级 3-1'
            }, {
                id: '8',
                label: '二级 3-2',
                children: [{
                id: '11',
                label: '三级 3-2-1'
                }, {
                id: '12',
                label: '三级 3-2-2'
                }, {
                id: '13',
                label: '三级 3-2-3'
                }]
            }]
        }]
        }
    }
  }
</script>
```
:::

### Select 属性

| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| prop    | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | string    | 传入 Form 组件的 `model` 中的字段 | — |
| label | 标签文本 | string | — | — |
| label-width | 表单域标签的的宽度，例如 '50px' | string |       —  selectWidth     | — |
| offset | 树区域偏移量 一般与label-width相同 注意为number类型 | number |       —       | 200|
| selectWidth | 树区域偏宽度  注意为number类型 | number |       —       | 200|
| rule | 是否必填 | boolean | — | false |
| value / v-model | 绑定值           | string / array  | — | — |
| multiple | 是否多选 | boolean | — | false |
| placeholder   | 输入框占位文本    | string          | — | — |
| clearable     | 是否可清空        | boolean         | — | true |
| disabled      | 禁用            | boolean         | — | false   |
| check-strictly      | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false            | boolean         | — | false   |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | — |
| isSelectRoot | 是否只能选根节点 | boolean | — | false |
| dict | tree数据 | array | — | [] |
| defaultProps | 详情见配置表 | object | — | — |
| defaultExpandAll | 是否默认展开全部 | boolean | — | false |
| filter | 是否可搜索树 | boolean | — | false |

### defaultProps属性配置
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| key    | 指定节点key值,关键字 | string | —    | id  |
| children | children 对应值 | string | —    | children   |
| label | 指定节点label 展示用户 | | —    | label    |
 —    |
### Select 事件

| 事件名 | 描述 | 参数 |
|----| ----| ----|
| input | 文本框内容改变 | (value: string) |