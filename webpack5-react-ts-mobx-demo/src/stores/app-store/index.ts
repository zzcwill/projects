import { observable, action } from 'mobx'
import { BaseStore } from '../base-store'
import { sleep } from '@/utils'

export class AppStore extends BaseStore {
  @observable appLoading = false

  @observable userInfo: any = {
    userName: '',
    phone: '',
  }

  @action.bound
  async getUserInfo() {
    await sleep(5000)
    this.userInfo = {
      userName: 'zzc',
      phone: '1804243',
    }
  }

  @action.bound
  async initAppData() {
    // console.log('NODE_ENV', process.env.NODE_ENV)
    // console.log('BASE_ENV', process.env.BASE_ENV)

    console.info(this)
    this.appLoading = true
    await this.getUserInfo()
    console.info(this.rootStore)
    console.info(this.userInfo)
    this.appLoading = false
  }
}
