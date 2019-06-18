import XxmiDatePicker from '../packages/xxmi-date-picker/index.js';

const components = {
  XxmiDatePicker,
};
const install = function (Vue) {
  for (const component of Object.values(components)) {
    Vue.component(component.name, component);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.vue);
}

export default {
  version: '1.0.0',
  install,
  ...components,
};
