/**
 * Created by apple on 17/12/21.
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../css/theme.css';
import claimsList from './claimsList.vue';

Vue.use(VueResource);
Vue.use(ElementUI);

Vue.http.options.emulateJSON = true;
new Vue({
  el: '#claimsList',
  template: '<claims-list></claims-list>',
  components: {
    claimsList
  }
});
