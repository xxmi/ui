import Vue from 'vue';
import router from './route';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import 'xxmi-ui/lib/xxmi-ui.css';
import ElementUI from 'element-ui';
import XxmiUI from 'xxmi-ui';
import PreCode from './components/pre-code.vue';

Vue.component('PreCode', PreCode);
Vue.use(ElementUI);
Vue.use(XxmiUI);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
