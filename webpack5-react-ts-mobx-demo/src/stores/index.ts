import { AppStore } from './app-store'

export class Store {
  // router = new Router(this)

  appStore = new AppStore(this)
}

export const store = new Store()
