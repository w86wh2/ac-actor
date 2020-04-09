export const basicComponents = [
    {
        name: '文本框',
        icon: 'el-icon-tickets',
        options: {
            module: 'AcInput',
            label: '请输入',
            prop: '',
            labelWidth: '',
            width: '100%',
            rule: true,
            placeholder: '',
            type: 'money',
            change: '',
            defaultValue: ''
        }
    },
    {
        name: '下拉选择框',
        icon: 'el-icon-search',
        options: {
            module: 'AcSelect',
            label: '请输入',
            prop: '',
            labelWidth: '',
            dic: JSON.stringify({ '1': '测试1', '2': '测试2' }),
            rule: false
        }
    },
    {
        name: '单选框组',
        icon: 'el-icon-d-caret',
        options: {
            module: 'AcRadio',
            label: '请输入',
            prop: 'test',
            labelWidth: '',
            column: false,
            defaultValue: '',
            dic: JSON.stringify({ '1': '测试1', '2': '测试2' }),
            rule: false,
            width: ''
        }
    },
    {
        name: '多选框组',
        icon: 'el-icon-search',
        options: {
            module: 'AcCheckbox',
            label: '请输入',
            prop: '',
            labelWidth: '',
            column: false,
            defaultValue: '',
            dic: JSON.stringify({ '1': '测试1', '2': '测试2' }),
            rule: false,
            width: ''
        }
    },
    {
        name: '日期选择器',
        icon: 'el-icon-date',
        options: {
            module: 'AcDate',
            label: '请输入',
            prop: '',
            labelWidth: '',
            rule: false,
            dateType: 'datePicker'
        }
    },
    {
        name: '时间选择器',
        icon: 'el-icon-time',
        options: {
            module: 'AcDate',
            label: '请输入',
            prop: '',
            labelWidth: '',
            rule: false,
            dateType: 'timePicker'
        }
    }
]

export const advanceComponents = [
    {
        name: 'slot',
        icon: 'el-icon-info',
        options: {
            module: 'slot',
            prop: 'slotName'
        }
    }
]

export const layoutComponents = [
    {
        name: '栅格布局',
        icon: 'el-icon-more-outline',
        options: {
            gutter: 0,
            justify: 'start',
            align: 'top',
            module: 'grid',
            isTab: false,
            label: '列表1',
            name: 'tab1',
            columns: [
                {
                    span: 12,
                    list: []
                },
                {
                    span: 12,
                    list: []
                }
            ]
        }
    }
]
