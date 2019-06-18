import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const modulesFiles = require.context('./components', true, /\.vue$/);
const routes = modulesFiles.keys().reduce((routers, modulePath) => {
  routers.push({ path: `${modulePath.replace(/(\.|vue)/ig, '')}`, component: modulesFiles(modulePath).default });
  return routers;
}, [{ path: '/', redirect: '/drag' }]);

const router = new VueRouter({
  base: '/',
  routes,
});

export default router;
