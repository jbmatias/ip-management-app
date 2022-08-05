<template>
  <section class="card">
    <v-text-field
      flat 
      name=""
      :id="`input-${id}`"
      :placeholder="placeholder"
      :readonly="readonly"
      :style="{ height: `${height}px` }"
      :type="type"
      v-model="model"
      :maxlength="maxlength"
      :rules="rules"
      @keypress="keypressEvent"
      :disabled="disabled"
    />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, ModelSync } from "vue-property-decorator";

@Component
export default class BaseInput extends Vue {
  @Prop({ type: String, default: "52" }) readonly height!: string;
  @Prop({ type: String, default: "name" }) readonly id!: string;
  @Prop({ type: String, default: "text" }) readonly type!: string;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: String }) readonly placeholder!: string;
  @Prop({ default: false }) readonly readonly!: string;
  @ModelSync("value", "input", { type: String }) readonly model!: boolean;
  // @Prop({ type: Object, required: true }) readonly user!: User;
  @Prop({ type: String, default: '-1' }) readonly maxlength!: string;
  @Prop({ type: Array}) readonly rules!: string;

  keypressEvent(e: any) {
    this.$emit('keypress');
  }
}
</script>

<style lang="scss" scoped>
.card {
  input {
    width: 100%;
    background: #ffffff;
    padding: 0 15px !important;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    &:focus-visible {
      outline: none !important;
    }
  }
}
</style>
