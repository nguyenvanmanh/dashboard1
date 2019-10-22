import Vue from "vue";
import App from "./App.vue";
import router from './router';
import vuetify from './plugins/vuetify';
// import dashboard from "./components/dashboard.vue";
// import login from "./components/login.vue";
// import register from "./components/register.vue";
// import sendingEmail from "./components/emailList.vue";
import VeeValidate from "vee-validate";
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.use(VeeValidate);

window.$ = window.jQuery = require('jquery');



// Vue.use(VueRouter);

// const routes = [
//   {
//     path: "/",
//     component: dashboard,
//     children: [
//       { path: "/sendingEmail", 
//       name: "sendingEmail", 
//       component: sendingEmail }
//     ]
//   },
//   { path: "/login", component: login },
//   { path: "/register", component: register }
// ];

// const router = new VueRouter({
//   routes,
//   mode: "history"
// });

Vue.config.productionTip = false;

export default new Vue({
  router,
  vuetify,
  icons: {
    iconfont: 'md',
  },
  render: h => h(App)
}).$mount("#app");
