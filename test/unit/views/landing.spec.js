import { mount } from '@vue/test-utils'
import Landing from '../../../src/views/Landing.vue'

describe('Landing', () => {
  test('render div en el Landing', async () => {
    expect(Landing).toBeTruthy()
    
    const wrapper = mount(Landing)
    expect(wrapper.text()).toContain('SCADA v2.')
  })
})

