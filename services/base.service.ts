import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Store } from 'vuex'
import { $axios } from '~/utils/api'
import { $store } from '~/utils/store'

export default class BaseService {
  axios: NuxtAxiosInstance
  vueStore: Store<any>

  constructor () {
    this.axios = $axios
    this.vueStore = $store
    this.axios.onRequest((config) => {
      config.timeout = 1600000
      config.headers['Content-Type'] = 'application/json'
      config.headers.Accept = 'application/json'      
    })
  }

  prepareUrl (url: string, params: any): string {
    for (const key in params) {
      const identifier = ':' + key
      url = url.replace(identifier, params[key])
    }
    return url
  }
}
