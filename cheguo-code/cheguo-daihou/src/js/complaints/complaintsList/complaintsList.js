/**
 * Created by apple on 17/12/6.
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import vueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../css/theme.css';
import complaintsList from './complaintsList.vue';
Vue.use(ElementUI);
Vue.use(vueResource);
Vue.http.options.emulateJSON = true;
new Vue({
  el: '#complaintsList',
  template: '<complaints-list></complaints-list>',
  components: {
    complaintsList
  }
});

