import components from'./components'

const plugin = {
  install (Vue) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop]
        Vue.component(component.props.Lname.default, component)
      }
    }
  }
}

export default plugin