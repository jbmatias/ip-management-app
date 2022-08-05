<template>
  <v-card flat>
    <v-container class="page">
      <h1 class="title1 mt-7 text-center">Sign up now</h1>
      <v-row justify="center">
        <v-col md="6">
          <v-form class="form" @submit.prevent="regsiter">
            <div class="form--group">
              <label class="form--label">Name</label>
              <BaseInput v-model="form.name" id="firstName" />
            </div>                       
            <div class="form--group">
              <label class="form--label">Email Address</label>
              <BaseInput v-model="form.email" type="email" id="email" />
            </div>
            <div class="form--group">
              <label class="form--label">Password</label>
              <BaseInput v-model="form.password" type="password" id="password"  />
            </div>
            <div class="form--group">
              <label class="form--label">Confirm Password</label>
              <BaseInput v-model="form.repeatPassword" type="password" id="repeatPassword" />
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
@Component<SignUp>({
  layout: "default",
  middleware: "auth",
  auth: "guest",
  components: {
    BaseInput
  }
})
export default class SignUp extends Mixins(AppSettingMixins) {
  loading: boolean = false;
  form = {
    name: "",    
    email: "",    
    password: "",
    repeatPassword: ""
  }; 
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
