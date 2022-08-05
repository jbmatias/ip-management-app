<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
        <v-progress-circular
          style="margin: calc(50% - 16px)auto; display: block;"
          indeterminate
          color="red"
        ></v-progress-circular>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AppSettingMixins from '~/mixins/AppSettingMixins'

@Component({
  beforeRouteEnter (from, to, next) {    
    next(vm => {            
      vm.$router.push(`/signin`)
    })
  },
})
export default class Home extends Mixins(AppSettingMixins) { 

}
</script>
