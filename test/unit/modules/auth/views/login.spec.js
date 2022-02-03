import { mount } from '@vue/test-utils'
import Login from '../../../../../src/modules/auth/views/Login.vue'

describe('Login', () => {
  test('render Login', async () => {
    expect(Login).toBeTruthy()
    
    const wrapper = mount(Login)
    expect(wrapper.text()).toContain('Login')
    expect(wrapper.text()).toContain('Usuario')
    expect(wrapper.text()).toContain('Contraseña')
  })
})