import Vue from "vue";
import App from "./App.vue";
import router from './router';
import vuetify from './plugins/vuetify';
import VeeValidate from "vee-validate";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
Vue.use(VeeValidate);

Vue.config.productionTip = false;

export default new Vue({
  router,
  vuetify,
  icons: {
    iconfont: 'md',
  },
  render: h => h(App)
}).$mount("#app");
