<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <!-- <center> -->
      <router-link class="row justify-content-center" to="/">
        <img :src="logo" class="navbar-brand-img img-fluid" alt="..." />
      </router-link>
      <!-- </center> -->

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <!-- <base-dropdown class="nav-item" position="right">
            <a
              slot="title"
              class="nav-link nav-link-icon"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="ni ni-bell-55"></i>
          </a>-->

          <!-- <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>-->
          <!-- </base-dropdown> -->
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" :src="user.url_photo" />
                </span>
              </div>
            </a>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome {{user.full_name}}</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <!-- <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Activity</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Support</span>
            </router-link>-->
            <div class="dropdown-divider"></div>
            <div class="dropdown-item" @click="logout">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </div>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"></slot>
        </ul>
        <!--Divider-->
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import Axios from "axios";
/* eslint-disable */
export default {
  name: "sidebar",
  data() {
    return {
      user: []
    };
  },
  components: {
    NavbarToggleButton
  },
  props: {
    logo: {
      type: String,
      default: "img/brand/logo-orange.png",
      description: "Sidebar app logo"
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
    logout() {
      Axios({
        method: "GET",
        url: "https://x-user-api.mindzzle.com/registrations/api/login/",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }).then(response => {
        localStorage.removeItem("token"),
          localStorage.removeItem("email"),
          localStorage.removeItem("id_user");
        this.$router.push("/login");
      });
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
  mounted() {
    Axios({
      method: "get",
      url:
        "https://x-user-api.mindzzle.com/registrations/api/" +
        localStorage.getItem("id_user")
    }).then(response => {
      this.user = response.data;
      // console.log(this.user)
    });
  }
};
</script>