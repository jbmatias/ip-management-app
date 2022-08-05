<template>
  <v-card flat>
    <v-container class="d-flex justify-center">
      <div>
        <v-btn class="text-capitalize ml-auto" color="primary" @click="redirect">Add new IP</v-btn>      
        <v-btn class="text-capitalize ml-auto" color="primary" @click="audit">Audit Using Telescope</v-btn>
      </div>
    </v-container>
    <NuxtChild @record:added="addRecord" @record:updated="getIpAddresses"/>
    <v-container class="d-flex justify-center">
      <div>
        <h5 class="text-center">List of IP Address</h5>
        <ul class="header">
          <li>ip</li>
          <li>label</li>
        </ul>
        <ul v-for="(address, i) in ipAddresses" :key="i" @click="initUpdate(address)">
          <li>{{address.ip}}</li>
          <li>{{address.label}}</li>
          <li>
            <v-btn small color="success">
              Edit
            </v-btn>
          </li>
        </ul>
      </div>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AppSettingMixins from "~/mixins/AppSettingMixins";
import BaseInput from "~/components/base/BaseInput.vue";
import { IgetIpAddresses, IIpAddress } from "~/services/application.service";
@Component<Manage>({
  layout: "admin",
  middleware: "auth",  
  components: {
    BaseInput
  }
})
export default class Manage extends Mixins(AppSettingMixins) {
  loading: boolean = false;  
  
  ipAddresses: Array<IIpAddress> = []

  addRecord(address: IIpAddress) {    
    this.ipAddresses.push(address)
  }

  audit() {
    window.location.href = `${this.$applicationService.axios.defaults.baseURL}/telescope/queries` as any
  }

  mounted() {
    this.getIpAddresses()
  }

  initUpdate(address: IIpAddress) {
    this.$router.push({ path: `/manage/edit/${address.id}`, query: {  ip: address.ip, label: address.label } })
  }

  async getIpAddresses() {
    try {
      const response: IgetIpAddresses = await this.$applicationService.getIpAddress()      
      this.ipAddresses = response.data
    } catch (error) {
      
    }
  }

  redirect() {
    this.$router.push({ path: '/manage/create' })
  }
}
</script>

<style lang="scss">
ul {  
  margin: 0;
  padding: 0;
  list-style: none;
  li {
    display: inline-block;
    min-width: 300px;
    text-transform: uppercase;
    font-size: 14px;
    // border: 1px solid #acacac;
    padding: 3px 20px;
    &:nth-child(3) {
      border: 0;
      padding: 3px 0;
      min-width: 0;
    }
  }
  &.header {
    margin: 20px 0 10px 0;
    li {
      background: rgb(199, 190, 190);
      margin: 0;
      padding: 5px 20px;
    }
  }
}
.v-text-field--solo >>> fieldset {
  border-color: red;
  background: red !important;
}
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

.v-text-field--outlined >>> fieldset {
  border-color: unset !important;
}
</style>
