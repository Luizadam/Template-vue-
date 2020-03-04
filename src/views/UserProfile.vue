<template>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
      <!-- Mask -->
      <span class="mask bg-gradient-warning opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Halo {{ user.full_name }}</h1>
            <p
              class="text-white mt-0 mb-5"
            >Ini adalah halaman profil Anda. Anda dapat melihat kemajuan yang Anda buat dengan pekerjaan Anda dan mengelola proyek Anda atau tugas yang ditugaskan</p>
            <a href="#!" class="btn btn-info">Edit profile</a>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img :src="user.url_photo" class="rounded-circle" />
                  </a>
                </div>
              </div>
            </div>
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>
                  {{ user.full_name }}
                  <span class="font-weight-light">, {{ userAge }}</span>
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>
                  {{ user.primary_address }}
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager - Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer Science
                </div>
                <hr class="my-4" />
                <p>{{ user.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">My account</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Full Name"
                        input-classes="form-control-alternative"
                        v-model="model.full_name"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Email address"
                        input-classes="form-control-alternative"
                        v-model="model.email"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                        alternative
                        label="Address"
                        input-classes="form-control-alternative"
                        v-model="model.primary_address"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="City"
                        placeholder="City"
                        input-classes="form-control-alternative"
                        v-model="model.city"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Country"
                        placeholder="Country"
                        input-classes="form-control-alternative"
                        v-model="model.country"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Postal code"
                        placeholder="Postal code"
                        input-classes="form-control-alternative"
                        v-model="model.zipCode"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Description -->
                <h6 class="heading-small text-muted mb-4">About me</h6>
                <div class="pl-lg-4">
                  <div class="form-group">
                    <base-input alternative label="About Me">
                      <textarea
                        rows="4"
                        class="form-control form-control-alternative"
                        placeholder="A few words about you ..."
                        v-model="model.description"
                      ></textarea>
                    </base-input>
                  </div>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/services/api";

export default {
  name: "user-profile",
  data() {
    return {
      user: null,
      model: null
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      const response = await axios({
        method: "GET",
        url: "/registrations/api/" + localStorage.getItem("id_user")
      });
      this.user = response.data;
      this.model = response.data;

      // To be changed
      Object.assign(this.model, {
        city: "Bekasi",
        country: "Indonesia",
        zipCode: 17412
      });
    }
  },
  computed: {
    userAge() {
      return Math.floor(
        (new Date() - new Date(this.user.birth_day).getTime()) / 3.15576e10
      );
    }
  }
};
</script>
<style></style>
