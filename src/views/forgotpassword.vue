<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
                <div class="card bg-secondary shadow border-0" style="margin-top:-6rem">
                    <div class="card-header bg-transparent pb-2">
                        <div class="text-muted text-center mt-2 mb-3"><small></small></div>
                        <div class="btn-wrapper text-center">
                            <!-- <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                                <span class="btn-inner--text">Github</span>
                            </a>
                            <a href="#" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                                <span class="btn-inner--text">Google</span>
                            </a> -->
                            <img src="img/brand/logo-default.png" style="width:50%">
                        </div>

                    </div>
                    <div class="card-body px-lg-5 py-lg-5">

                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <!-- <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input> -->


                            <div class="text-center">
                                <base-button type="primary" class="my-4">Forgot Password</base-button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-6 ">
                    <router-link to="/login" class="text-light">
                        <small>Login your account</small>
                    </router-link>
                </div>
                <div class="col-6 text-right" >
                    <router-link to="/register" class="text-light"><small>Create new account</small></router-link>

                </div>

            </div>
            </div>
        </div>
</template>
<script>
  export default {
    name: 'forgotpass',
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    }
  }
</script>
<style>
</style>