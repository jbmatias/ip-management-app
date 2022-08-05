<template>
  <BasePage>
    <v-snackbar
      v-model="snackbar"
      top
      :color="color"
      elevation="24"
      rounded="pill"      
      class="text-center"
      timeout="3000"
      >
      {{message}}
    </v-snackbar>
    <v-card flat>
      <v-container class="page">
        <v-form
          class="form"
          @submit.prevent
          v-model="isValid"
          lazy-validation
          ref="form"
        >
          <div class="form--group">
            <label class="form--label">IP Address</label>
            <BaseInput 
              v-model="form.ip"               
              :rules="ipRules" 
              id="email" />
          </div>
          <div class="form--group">
            <label class="form--label">Label</label>
            <BaseInput
              v-model="form.label"              
              id="password"
              :rules="ipLabelRules"
            />
          </div>
          <div class="d-flex justify-end">
            <v-btn
              type="submit"              
              elevation="0"
              height=""
              color="grey"
              class="form--btn mr-2 text-light"            
              large
              to="/manage"
            >Cancel</v-btn>
            <v-btn
              type="submit"
              @click="store"
              :loading="loading"
              elevation="0"
              height=""
              color="primary"
              class="form--btn"            
              large
            >Add</v-btn>
          </div>
      </v-form>
    </v-container>    
  </v-card>
  </BasePage>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AppSettingMixins from "~/mixins/AppSettingMixins";
import BaseInput from "~/components/base/BaseInput.vue";
import BasePage from "~/components/base/BasePage.vue";
import { IIpAddress } from "~/services/application.service";
@Component<Create>({
  layout: "admin",
  middleware: "auth",  
  components: {
    BaseInput,
    BasePage
  }
})
export default class Create extends Mixins(AppSettingMixins) {
  public isValid: boolean = true;
  public loading: boolean = false;
  
  public snackbar: Boolean = false
  public message: string = ''
  public color: string = ''
  
  form: IIpAddress = {
    ip: '',
    label: ''
  }
  
  async store() {    
    try {
      let form: any = this.$refs.form;
      if (form.validate()) {
        this.loading = true
        const response = await this.$applicationService.storeIpAddress(this.form)
        this.color = 'success'        
        this.message = response.message
        this.snackbar = true
        this.$emit('record:added', response.data)
        this.form.ip = ''
        this.form.label = ''
        this.$router.push({ path: '/manage' })
      }
    } catch (err: any) {      
      this.message = Object.keys(err.response.data).map( key => err.response.data[key]).join(', ')
      this.color = 'error'
      this.snackbar = true
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.form {
  margin-top: 15px;
  &--group {
    margin-bottom: 10px;
  }
  &--input {
    margin-top: 2px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    border-color: white;
  }
  &--btn {
    text-transform: uppercase;
    margin-top: 20px;
  }
  &--label {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 14px;
    color: #acacac;
    text-transform: uppercase;
  }
}
.title1 {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 22px;
  text-transform: capitalize;
}

.footer {
  &--line {
    position: relative;
    &--text {
      background-color: #fff;
      width: 30px;
      position: absolute;
      top: -10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      font-size: 12px;
      font-weight: bold;
      color: #acacac;
    }
  }
  &--text {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
    color: #1e1e1e;
  }
}

.v-text-field--outlined >>> fieldset {
  border-color: unset !important;
}
</style>
