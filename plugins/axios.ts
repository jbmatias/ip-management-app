import { Plugin } from '@nuxt/types'
import QueryString from 'qs'
import { initializeAxios } from '~/utils/api'

const soloAxiosPlugin: Plugin = ({ $axios }) => {
  $axios.onRequest((config) => {
    config.timeout = 1600000
    config.headers['Content-Type'] = 'application/json'
    config.headers.Accept = 'application/json'
    config.paramsSerializer = (params: any) => QueryString.stringify(params)
  })

  initializeAxios($axios)
}

export default soloAxiosPlugin
