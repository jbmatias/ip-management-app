<template>
  <v-card flat>
    <v-snackbar
      v-model="snackbar"
      top
      elevation="24"
      rounded="pill"      
      class="text-center"
      timeout="3000"
      >
      {{error}}
    </v-snackbar>
    <v-container>
      <h1 class="title mt-12 text-center">Sign In</h1>
      <v-row justify="center">
        <v-col md="6">
          <v-form
            class="form"
            @submit.prevent="login"
            v-model="isValid"
            lazy-validation
            ref="form"
          >
            <div class="form--group">
              <label class="form--label">Email Address</label>
              <BaseInput 
                v-model="form.email" 
                type="email"
                :rules="emailRules" 
                id="email" />
            </div>
            <div class="form--group">
              <label class="form--label">Password</label>
              <BaseInput
                v-model="form.password"
                type="password"
                id="password"
                :rules="passwordRules"
              />
            </div>
            <v-btn
              type="submit"
              :loading="loading"
              elevation="0"
              height=""
              class="form--btn"
              block
              large
            >
              Sign in
            </v-btn>
            <footer class="footer text-center">
              <div class="footer--line">
                <v-divider class="my-10"></v-divider>
                <div class="footer--line--text">or</div>
              </div>
              <section class="social my-7">
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
              </section>

              <p class="footer--text">
                Don\'t have an account yet?
                <v-btn nuxt to="/signup" small text> Register now </v-btn>
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
import BaseInput from "~/components/base/BaseInput.vue";
import AppSettingMixins from "~/mixins/AppSettingMixins";

@Component<SignIn>({
  middleware: "auth",
  auth: "guest",
  components: {
    BaseInput,
  },
})
export default class SignIn extends Mixins(AppSettingMixins) {
  public loading: boolean = false;
  public isValid: boolean = true;
  public snackbar: Boolean = false
  public error: string = ''

  form = {
    email: "",
    password: "",
  };  

  async login() {
    try {
      let form: any = this.$refs.form;
      if (form.validate()) {
        this.loading = true;

        const response: any = await this.$auth.login({
          data: {
            email: this.form.email,
            password: this.form.password,
          },
        });

        await this.$auth.setUser(response.data);
        await this.$auth.$storage.setUniversal("currentUser", response.data);
      }
    } catch (err: any) {
      console.error(err.response.data.error)
      this.error = err.response.data.error
      this.snackbar = true
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
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
    background: transparent !important;
  }
}

.title {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 22px;
  text-transform: capitalize;
}
</style>
