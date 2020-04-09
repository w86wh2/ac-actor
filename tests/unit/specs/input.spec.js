import { shallowMount } from '@vue/test-utils'
import AcInput from '@/components/input/input.vue'

describe('input.vue', () => {
    it('test disabled', () => {
        const disabled = 'disabled'
        const wrapper = shallowMount(AcInput, {
            propsData: { disabled },
            stubs: ['el-input', 'el-form-item']
        })
        expect(wrapper.props('disabled')).toBe(true)
        expect(wrapper.props('rule')).toBe(false)
    })
})
