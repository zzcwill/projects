import PopupComponent from './Popup.vue'
import { mergeOptions } from '@/utils/plugin-helper'

//全局就一个弹窗对象
let $vm
const factory = (Vue) => {
	if (!$vm) {
		let Popup = Vue.extend(PopupComponent)
		$vm = new Popup({
			el: document.createElement('div')
		})
		document.body.appendChild($vm.$el)
	}
	return $vm
}

export default {
	install(Vue) {
		let $vm = factory(Vue)

		const popup = {
			open(options) {
				mergeOptions($vm, options)
				$vm.open()
			},
			hide() {
				$vm.hide()
			}
		}

    if (!Vue.$za) {
      Vue.$za = {
        popup
      }
    } else {
      Vue.$za.popup = popup
    }

    Vue.mixin({
      created: function() {
        this.$za = Vue.$za
      }
    })
	}	
}

