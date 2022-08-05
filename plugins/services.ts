import { Plugin } from '@nuxt/types'
import ApplicationService from '~/services/application.service'
import AuthService from '~/services/auth.service'


interface Services {
  $applicationService: ApplicationService
  $authService: AuthService
}

declare module 'vue/types/vue' {
  interface Vue extends Services {}
}

declare module '@nuxt/types' {
  interface NuxtAppOptions extends Services {}
}

declare module 'vuex/types/index' {  
  interface Store<S> extends Services {}
}

const servciesPlugin: Plugin = (_context, inject) => {
  inject('applicationService', new ApplicationService())  
  inject('authService', new AuthService())  
}

export default servciesPlugin
