import { Store } from 'vuex'

// eslint-disable-next-line import/no-mutable-exports
let $store: Store<any>

export function initializeStore (storeInstance: Store<any>) {
  $store = storeInstance
}

export { $store }
