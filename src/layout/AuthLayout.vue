<template>
  <div
    class="main-content"
    style="background-image: url('img/brand/Mindzzle.jpeg');background-repeat: no-repeat;background-size :cover"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-12 d-flex justify-content-end">
          <form role="form" class="form-group form-inline">
            <!-- <base-input
              class="input-group-alternative "
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              
            ></base-input> -->
            <!-- <input type="text" class="form-control mb-2 m-2" id="inlineFormInput" placeholder="Jane Doe"> -->
            <div class="input-group mb-2 m-2 ">
  <div class="input-group-prepend ">
    <span class="input-group-text text-white  " id="basic-addon1" style="background:grey"><i class="far fa-envelope"></i></span>
  </div>
  <input type="text" class="form-control " placeholder="Email" aria-label="Username" aria-describedby="basic-addon1">
</div>

           <div class="input-group mb-2 m-2 ">
  <div class="input-group-prepend ">
    <span class="input-group-text text-white  " id="basic-addon1" style="background:grey"><i class="fas fa-lock"></i></span>
  </div>
  <input type="password" class="form-control " placeholder="Password" aria-label="Username" aria-describedby="basic-addon1">
</div>
            <!-- <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
            ></base-input> -->

            <div class="text-center">
              <base-button type="primary" nativeType="submit" class="my-4 ">LOGIN</base-button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Navbar -->
    <!-- <base-nav class="navbar-top navbar-horizontal navbar-dark"
                  containerClasses="px-4 container"
                  expand>
            <router-link slot="brand" class="navbar-brand" to="/">
                
            </router-link>

            <template v-slot="{closeMenu}"> 
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button"
                                    @click="closeMenu"
                                    class="navbar-toggler"
                                    aria-label="Toggle sidenav">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/">
                            <i class="ni ni-planet"></i>
                            <span class="nav-link-inner--text">Dashboard</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/register">
                            <i class="ni ni-circle-08"></i>
                            <span class="nav-link-inner--text">Register</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/login">
                            <i class="ni ni-key-25"></i>
                            <span class="nav-link-inner--text">Login</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/profile">
                            <i class="ni ni-single-02"></i>
                            <span class="nav-link-inner--text">Profile</span>
                        </router-link>
                    </li>
                </ul>
            </template>
    </base-nav>-->
    <!-- Header -->
    <div class="header py-8 py-lg-8">
      <!-- <div class="container">
                <div class="header-body text-center mb-7">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-6">
                            <h1 class="text-white">Welcome!</h1>
                            <p class="text-lead text-white">Use these awesome forms to login or create new account in
                                your project for free.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
      </div>-->
    </div>
    <!-- Page content -->
    <div class="container mt--6 pb-8">
      <slide-y-up-transition mode="out-in" origin="center top">
        <router-view></router-view>
      </slide-y-up-transition>
    </div>
    <footer class="py-5">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; {{year}}
              <a
                href="http://mindzzle.com/id/"
                class="font-weight-bold ml-1"
                target="_blank"
              >Mindzzle</a>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="nav nav-footer justify-content-center justify-content-xl-end">
              <li class="nav-item">
                <a href="http://mindzzle.com/id/" class="nav-link" target="_blank">Mindzzle</a>
              </li>
              <li class="nav-item">
                <a href="http://mindzzle.com/id/about.html" class="nav-link" target="_blank">
                  About
                  Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "auth-layout",
  components: {
    SlideYUpTransition
  },
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false
    };
  }
};
</script>
<style>
</style>
