export const valid = (type, rule, value, callback) => {
    if (!value) return callback()
    switch (type) {
    case 'penny': {
        let filter = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        if (filter.test(value)) { callback() }
        callback(new Error('非负数,小数必须精确到后三位'))
        break
    }
    // 金额
    case 'cent': {
        let filter = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        if (filter.test(value)) { callback() }
        callback(new Error('非负数,小数必须精确到后两位'))
        break
    }
    // 浮点数
    case 'float': {
        let filter = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        if (filter.test(value)) { callback() }
        callback(new Error('非负数,小数必须精确到后两位'))
        break
    }
    case 'tel': {
        let filter = /^1[3-9]\d{9}$/
        if (filter.test(value)) { callback() }
        callback(new Error('请输入正确的手机号格式'))
        break
    }
    case 'int': {
        let filter = /^-?[0-9]*$/
        if (filter.test(value)) { callback() }
        callback(new Error('请输入整数'))
        break
    }
    case 'noNegInt': {
        let filter = /^[0-9]*$/
        if (filter.test(value)) { callback() }
        callback(new Error('请输入非负整数'))
        break
    }
    case 'scale': {
        let filter = /^[0-9]+([.]{1}[0-9]{1,2})?$/
        if (filter.test(value)) { callback() }
        callback(new Error('请输入正确的比例'))
        break
    }
    case 'password': {
        let filter = /^(?=.*[0-9].*)(?=.*[a-zA-Z].*)(?=.*[._@/].*).{8,20}$/
        if (filter.test(value)) { callback() }
        callback(new Error('必须包含字母与数字以及(._@/ 特殊字符),长度8-20位'))
        break
    }
    default : {
        callback()
        break
    }
    }
}
// 全局表单校验
export const validate = (rule, type, label, trigger = ['blur', 'change']) => {
    let rules = []
    if (rule) {
        rules.push({ required: true, message: `${label}不能为空`, trigger })
    }
    if (type !== 'text') {
        rules.push({ validator: valid.bind(this, type), trigger })
    }
    return rules
}
