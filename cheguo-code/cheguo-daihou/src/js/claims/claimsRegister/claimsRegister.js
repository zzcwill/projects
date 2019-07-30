import Vue from 'vue';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../css/theme.css';
import claimsRegister from './claimsRegister.vue';

Vue.use(VueResource);
Vue.use(ElementUI);

Vue.http.options.emulateJSON = true;
//Vue.http.headers.post = {'Content-Type':"application/json;charset=utf-8"};
new Vue({
  el: '#claimsRegister',
  template: '<claims-register></claims-register>',
  components: {
    claimsRegister
  }
});
