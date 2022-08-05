import { Plugin } from '@nuxt/types'
import QueryString from 'qs'
import { initializeStore } from '~/utils/store'

const soloStorePlugin: Plugin = ({ store }) => {
  initializeStore(store)
}

export default soloStorePlugin
