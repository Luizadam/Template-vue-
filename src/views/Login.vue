<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0" style="margin-top:-6rem">
        <div class="card-header bg-transparent pb-3">
          <div class="text-muted text-center mt-2 mb-3">
            <small></small>
          </div>
          <div class="btn-wrapper text-center">
            <img src="../assets/logobaru.png" style="width:50%" />
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @submit.prevent="validate">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></base-input>

            <div class="text-center">
              <base-button type="primary" nativeType="submit" class="my-4">LOGIN</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/forgotpass" class="text-light">
            <small>Forgot password?</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>Create new account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: ""
      }
    };
  },
/*eslint-disable*/
  methods: {
    async login(email, password) {
      const credentials = {
        email,
        password
      };
      try {
        const response = await axios({
          method: "post",
          url: "http://localhost:8000/registrations/api/login/",
          data: {
            email: credentials.email,
            password: credentials.password
          },
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
          }
        }).then(response => {
          const resp = response.data;
          console.log(response.data)
          localStorage.setItem('token',resp.token)
          localStorage.setItem('email',resp.user.email)
          if (resp.api_status === 202) {
              this.$router.push('/dashboard')
          }
          else {

          }
          });

      } catch (error) {
        console.error("whoops " + error);
      }
    },
    async validate() {
      await this.login(this.model.email, this.model.password);
    }
  }
};
</script>
<style>
</style>
