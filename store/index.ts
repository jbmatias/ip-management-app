import { GetterTree, ActionTree, MutationTree } from 'vuex/types/index'
// import { Context } from '@nuxt/types/app'

export const state = () => ({
  //
})

// plugin here

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  //
}

export const mutations: MutationTree<RootState> = {
  //
}

export const actions: ActionTree<RootState, RootState> = {
  // 
}
