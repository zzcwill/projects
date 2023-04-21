import { Store } from '@/stores'

export class BaseStore<T= Store> {
  rootStore: T

  constructor(rootStore: T) {
    this.rootStore = rootStore
  }
}
