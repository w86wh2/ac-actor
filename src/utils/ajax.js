/*
 * callback用例： this.$ajax.method(url[, data[, config]], successCallback(), errorCallback())
 * promise用例： this.$ajax.method(url[, data[, config]]).then().catch()
 * { diy: true }：在不以{ success: true} 作为判断依据的时候， 统一在successCallback()或者then()内处理请求结果
 * enctype: json: 默认值，form: 普通form类型，multi: 二进制文件form类型
 */

import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

const isObject = v => {
    return Object.prototype.toString.call(v) === '[object Object]'
}

const initAjax = (configs = {}) => {
    const options = Object.assign({
        defaults: {
            baseURL: '/api',
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        },
        authFun: undefined,
        authCode: '-1999',
        authUrl: '/login'
    }, configs)

    for (let [key, value] of Object.entries(options.defaults)) {
        axios.defaults[key] = value
    }

    axios.interceptors.response.use(response => {
        if (response.status !== 200) {
            return Promise.reject(response)
        }

        // 统一登录拦截
        const res = response.data.ret || response.data
        if (res.code && res.code === options.authCode) {
            if (typeof options.authFun === 'function') {
                options.authFun()
            } else {
                Message.error({
                    message: '登录超时，请重新登录',
                    duration: 1000,
                    onClose() {
                        window.location.href = options.authUrl
                    }
                })
            }
        }
        return res
    }, (error) => {
        let status = error.response.status
        switch (status) {
        case 400:
            Message.error('对不起，您请求的参数错误，请确认后重试')
            break
        case 401:
            Message.error('登录超时，请重新登录')
            break
        case 403:
            Message.error('对不起，你没有权限进行此项操作')
            break
        case 404:
            Message.error('对不起，你请求的服务不存在')
            break
        case 500:
            Message.error('服务器内部可能正在升级,请稍后再试')
            break
        default:
            Message.error('对不起，系统繁忙，请稍后再试，错误代码(' + status + ')')
        }
        return Promise.reject(error)
    })

    const methods = ['post', 'get', 'delete']
    const Ajax = {}
    methods.forEach((method) => {
        Ajax[method] = function(url, pms = {}, ops = {}, callback) {
            // 只有form类型需要qs序列化（multipart/form-data除外）
            // debugger
            pms = method !== 'get' && ops.enctype === 'form' && isObject(pms) ? qs.stringify(pms) : isObject(pms) ? pms : {}
            ops = isObject(ops) ? ops : {}
            let [, ...argsLast] = [...arguments]
            let isCb, CB, CBIndex
            isCb = argsLast.some((item, index) => {
                CB = item
                CBIndex = index
                return typeof item === 'function'
            })
            // 这里用axios[method]的方式会出错，不知道为什么
            let request = method === 'get' ? axios.get(url, { params: pms })
                : method === 'post' ? axios.post(url, pms, ops)
                    : axios.delete(url, { data: pms })
            return request.then(response => {
                let success = response.success || response.status === 0 || ops.diy
                if (isCb) {
                    let errCallback = typeof argsLast[CBIndex + 1] === 'function' ? argsLast[CBIndex + 1] : function() {
                        Message.error(response.resultDes || response.msg || response.errmsg || '系统繁忙')
                    }
                    // 回调函数里报错会上升到Promise，触发错误catch，所以用try处理
                    try {
                        if (success) {
                            CB(response)
                        } else {
                            errCallback(response)
                        }
                    } catch (e) {
                        Message.error(String(e))
                    }
                } else {
                    if (success) {
                        return Promise.resolve(response)
                    } else {
                        return Promise.reject(response)
                    }
                }
            }, error => {
                return Promise.reject(error)
            })
        }
    })

    return Ajax
}
export default initAjax
