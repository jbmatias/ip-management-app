<template>
<v-row justify="center" >
    <v-dialog overlay-color="black" persistent :overlay-opacity="0.2" transition="dialog-bottom-transition" :max-width="width"  v-model="value" content-class="custom" value="true">
      <v-card color="#FAFAFA" flat v-click-outside="close" :style="{borderRadius: 0}">
        <v-container>
          <slot></slot>
        </v-container>
      </v-card>
    </v-dialog>
</v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Mixins, Watch } from "vue-property-decorator";
import AppSettingMixins from "~/mixins/AppSettingMixins";
@Component
export default class BasePage extends Mixins(AppSettingMixins) {
  @Prop({ type: Boolean, required: false, default: true }) readonly value!: boolean
  @Prop({ type: String, default: '460' }) readonly width!: boolean
  @Prop({ type: String, default: 'center' }) align!: String
  @Prop({ type: Number, default: 1 }) opacity!: Number
  @Prop({ type: Boolean, default: true }) persistent!: Boolean
  
  close(e: any) {
    if(e.target.classList.contains('v-overlay__scrim')) {
      this.$emit('close')
    }
  }

}
</script>

<style lang="scss">
  .custom.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100% !important;

}
.custom{
  margin: 0;
  background-color: #FAFAFA !important;
}

</style>