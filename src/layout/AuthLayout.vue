<template>
  <div class="main-content" style="background-image: url('img/brand/Mindzzle.jpeg');">
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-end align-items-baseline">
          <form role="form" @submit.prevent="validate">
            <div class="row mt-4">
              <div class="col-md-4">
                <base-input
                  class="input-group-alternative"
                  type="email"
                  placeholder="Email"
                  addon-left-icon="ni ni-email-83"
                  v-model="email"
                ></base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  class="input-group-alternative"
                  placeholder="Kata Sandi"
                  type="password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                >
                  <template slot="helpBlock"></template>
                </base-input>
                <router-link to="/forgotpass" class="position-relative" style="z-index: 2">
                  <small>Forgot password?</small>
                </router-link>
              </div>
              <div class="col-md-4">
                <base-button class="w-100" type="primary" nativeType="submit" id="button1">LOGIN</base-button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- Page content -->
      <div class="mt--5">
        <slide-y-up-transition mode="out-in" origin="center top">
          <router-view></router-view>
        </slide-y-up-transition>
      </div>
    </div>
    <base-footer></base-footer>
  </div>
</template>
<script>
import Auth from "@/services/auth";

import { SlideYUpTransition } from "vue2-transitions";
export default {
  name: "auth-layout",
  components: {
    SlideYUpTransition
  },
  data() {
    return {
      email: "",
      password: "",
      year: new Date().getFullYear(),
      showMenu: false
    };
  },
  methods: {
    async validate() {
      const { data } = await Auth.login(this.email, this.password);
      if (data.api_status === 200) {
        this.$router.push("/dashboard");
        return;
      }
    }
  }
};
</script>
<style lang="scss">
.main-content {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>