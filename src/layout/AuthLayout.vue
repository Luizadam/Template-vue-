<template>
  <div
    class="main-content"
    style="background-image: url('img/brand/login-bg.jpg');background-repeat: none;background-size:cover;"
  >
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <template v-slot="{closeMenu}">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="@/assets/logobaru.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                @click="closeMenu"
                class="navbar-toggler"
                aria-label="Toggle sidenav"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Navbar items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/register">
              <i class="ni ni-circle-08 text-default"></i>
              <span class="nav-link-inner--text text-default">Register</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/login">
              <i class="ni ni-key-25 text-default"></i>
              <span class="nav-link-inner--text text-default">Login</span>
            </router-link>
          </li>
        </ul>
      </template>
    </base-nav>
    <!-- Header -->
    <div class="header py-8 py-lg-8"></div>
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
