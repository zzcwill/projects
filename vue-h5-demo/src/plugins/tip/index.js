import TipComponent from './Tip.vue'
import { mergeOptions } from '@/utils/plugin-helper'

//全局就一个弹窗对象
let $vm
const factory = (Vue) => {
	if (!$vm) {
		let Tip = Vue.extend(TipComponent)
		$vm = new Tip({
			el: document.createElement('div')
		})
		document.body.appendChild($vm.$el)
	}
	return $vm
}

export default {
	install(Vue) {
		let $vm = factory(Vue)

		const tip = {
			open(options) {
				mergeOptions($vm, options)
				$vm.open()
			},
			hide() {
				$vm.hide()
			}
		}

    if (!Vue.plug) {
      Vue.plug = {
        tip
      }
    } else {
      Vue.plug.tip = tip
    }

    Vue.mixin({
      created: function() {
        this.plug = Vue.plug
      }
    })		
	}	
}