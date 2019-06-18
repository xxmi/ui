import Vue from 'vue';
import router from './route';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import XxmiUI from '../src/index';

Vue.use(ElementUI);
Vue.use(XxmiUI);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
