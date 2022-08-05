import Vue from 'vue'
import { Component, Watch, Provide, Mixins } from 'vue-property-decorator'


@Component<AppSettingMixins>({
 
})
export default class AppSettingMixins extends Mixins() {
  
  get nameRules() {
    return [
      (v: any) => !!v || "Name is required",      
    ];
  }

  get emailRules() {
    return [
      (v: any) => !!v || 'Email is required',
      (v: any) => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Email must be valid',
     ]
  }

  get passwordRules() {
    return [
      (v: any) => !!v || "Password is required",
      (v: any) =>
        (v && v.length > 3) || "Password should be atleast 4 characters",
    ];
  }
    

  get labelRules() {
    return [
      (v: any) => !!v || "Label is required",      
    ];
  }

  get ipRules() {
    return [
      (v: any) => !!v || 'IP Address is required',
      (v: any) => /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v) || "IP Address must be valid."
    ]
  }
  
  get ipLabelRules() {
    return [
      (v: any) => !!v || 'IP Label is required',
    ]
  }

}
