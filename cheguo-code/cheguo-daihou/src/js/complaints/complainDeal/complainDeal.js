import Vue from 'vue';
import ElementUI from 'element-ui';
import vueResource from 'vue-resource';
import 'element-ui/lib/theme-chalk/index.css';
import '../../../css/theme.css';
import complainDeal from './complainDeal.vue';
Vue.use(ElementUI);
Vue.use(vueResource);
Vue.http.options.emulateJSON = true;
new Vue({
  el: '#complainDeal',
  template: '<complain-deal></complain-deal>',
  components: {
    complainDeal
  }
});
