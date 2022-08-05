<template>
  <v-card flat>
    <v-container class="page">
      <v-snackbar
        v-model="snackbar"
        top
        elevation="24"
        rounded="pill"      
        class="text-center"
        timeout="3000"
      >
      {{message}}
    </v-snackbar>
      <h1 class="title1 mt-7 text-center">Sign up now</h1>
      <v-row justify="center">
        <v-col md="6">
          <v-form class="form" ref="form" @submit.prevent="signUp">
            <div class="form--group">
              <label class="form--label">Name</label>
              <BaseInput v-model="form.name" :rules="nameRules" id="firstName" />
            </div>                       
            <div class="form--group">
              <label class="form--label">Email Address</label>
              <BaseInput v-model="form.email" :rules="emailRules" type="email" id="email" />
            </div>
            <div class="form--group">
              <label class="form--label">Password</label>
              <BaseInput v-model="form.password" :rules="passwordRules" type="password" id="password"  />
            </div>
            <div class="form--group">
              <label class="form--label">Confirm Password</label>
              <BaseInput v-model="form.repeatPassword" :rules="repeatPasswordRules" type="password" id="repeatPassword" />
            </div>
            <v-btn
              :loading="loading"
              type="submit"
              elevation="0"
              height="55"              
              class="form--btn"
              block
              large
            >
              Register
            </v-btn>
            <footer class="footer text-center">
              <div class="footer--line">
                <v-divider class="mt-10 mb-6"></v-divider>
                <div class="footer--line--text">OR</div>
              </div>
              <p class="footer--text">
                Already have an account?
                <v-btn nuxt to="/signin" small text>
                  SIGN IN NOW
                </v-btn>
              </p>
            </footer>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import AppSettingMixins from "~/mixins/AppSettingMixins";
import BaseInput from "~/components/base/BaseInput.vue";
import { IUser } from "~/services/auth.service";
@Component<SignUp>({
  layout: "default",
  middleware: "auth",
  auth: "guest",
  components: {
    BaseInput
  }
})
export default class SignUp extends Mixins(AppSettingMixins) {  
  
  public loading: boolean = false;
  public isValid: boolean = true;
  public snackbar: Boolean = false
  public message: string = ''
  public color: string = ''

  form: IUser = {
    name: "",    
    email: "",    
    password: "",
    repeatPassword: ""
  }; 

  get getPassword() {
    return this.form.password == this.form.repeatPassword
  }

  get repeatPasswordRules() {
    return [
      (v: any) => !!v || "Password is required",
      (v: any) => this.getPassword || "Password doesn't match!",
      (v: any) => (v && v.length > 3) || "Password should be atleast 4 characters",    
    ];
  }

  async signUp() {
    let form: any = this.$refs.form;
    if (form.validate()) {
      try {
        const response = await this.$authService.register(this.form)        
        this.color = 'success'
        this.message = response.message
        this.snackbar = true        
        setTimeout(() => {
          this.$router.push('/signin')
        }, 3000)
      } catch (err: any) {      
        this.message = Object.keys(err.response.data).map( key => err.response.data[key]).join(', ')
        this.snackbar = true
        this.color = 'error'
      } finally {
        this.loading = false;
      }
    }    
  }
}
</script>

<style lang="scss">
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
