import Vue from "vue";
import App from "./App.vue";
import router from './router';
import vuetify from './plugins/vuetify';
import VeeValidate from "vee-validate";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import VueProgressBar from 'vue-progressbar';


const options = {
  color: '#584475',
  failedColor: '#584475',
  thickness: '3px',
  transition: {
    speed: '0.8s',
    termination: 300
  },
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options);

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
