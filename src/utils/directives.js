import '../assets/waves.css'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

function elscrollBar(el) {
    if (el._ps_ instanceof PerfectScrollbar) {
        el._ps_.update()
    } else {
        el.style.overflow = 'hidden'
        el._ps_ = new PerfectScrollbar(el, { wheelPropagation: true, swipeEasing: true })
    }
}

function debounce(method) {
    clearTimeout(method.tId)
    method.tId = setTimeout(function() {
        method.call()
    }, 500)
}

function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, listener)
    } else {
        element['on' + event] = listener
    }
}

const DIRECTIVE = [
    {
        name: 'niceScroll',
        direct: {
            inserted(el, binding) {
                const { arg } = binding
                if (arg === 'table') {
                    el = el.querySelector('.el-table__body-wrapper')
                }
                elscrollBar(el)
            },
            componentUpdated(el, binding, vnode) {
                const { arg } = binding
                if (arg === 'table') {
                    el = el.querySelector('.el-table__body-wrapper')
                }
                vnode.context.$nextTick(
                    () => {
                        try {
                            elscrollBar(el)
                        } catch (error) {
                            console.error(error)
                        }
                    }
                )
            }
        }
    },
    {
        name: 'reClick',
        direct: {
            bind: function(el, binding) {
                addEvent(el, 'click', function() {
                    debounce(binding.value)
                })
            },
            unbind: function(el) {
                addEvent(el, 'click', function() {})
            }
        }
    },
    // 水波纹效果
    {
        name: 'waves',
        direct: {
            bind: function(el, binding) {
                el.addEventListener('click', e => {
                    const customOpts = Object.assign({}, binding.value)
                    const opts = Object.assign({
                        ele: el, // 波纹作用元素
                        type: 'hit', // hit点击位置扩散center中心点扩展
                        color: 'rgba(0, 0, 0, 0.15)' // 波纹颜色
                    }, customOpts)
                    const target = opts.ele
                    if (target) {
                        target.style.position = 'relative'
                        target.style.overflow = 'hidden'
                        const rect = target.getBoundingClientRect()
                        let ripple = target.querySelector('.waves-ripple')
                        if (!ripple) {
                            ripple = document.createElement('span')
                            ripple.className = 'waves-ripple'
                            ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
                            target.appendChild(ripple)
                        } else {
                            ripple.className = 'waves-ripple'
                        }
                        switch (opts.type) {
                        case 'center':
                            ripple.style.top = (rect.height / 2 - ripple.offsetHeight / 2) + 'px'
                            ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
                            break
                        default:
                            ripple.style.top = (e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop) + 'px'
                            ripple.style.left = (e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft) + 'px'
                        }
                        ripple.style.backgroundColor = opts.color
                        ripple.className = 'waves-ripple z-active'
                        return false
                    }
                }, false)
            }
        }
    }
]

export default DIRECTIVE
