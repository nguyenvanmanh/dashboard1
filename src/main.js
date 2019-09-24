import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import dashboard from './components/dashboard.vue';
import login from './components/login.vue';
import register from './components/register.vue';

Vue.use(VueRouter);
const routes = [
    {path:'/login', component: login},
    {path:'/', component: dashboard},
    {path:'/register', component: register}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
