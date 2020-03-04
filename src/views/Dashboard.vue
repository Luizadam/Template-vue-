<template>
  <div>
    <base-header type="gradient-warning" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <!-- <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Check-in"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 3.48%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Friends"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 12.18%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-danger mr-2">
                <i class="fa fa-arrow-down"></i> 5.72%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 54.8%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>-->
    </base-header>
    <div class="container-fluid mt--8">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image mt-4 mt-md-0">
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
        <div class="col-xl-8 order-xl-4 mb-5 mb-xl-0">
          <!-- Comment Form -->
          <div class="card shadow">
            <div class="card-body pt-0 pt-md-4">
              <div class="row my-md-3 my-5">
                <div class="col">
                  <h1>Selamat sore {{userFirstName}}!</h1>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <form method="post" @submit.prevent="postFeed">
                    <ckeditor :editor="editor.type" :config="editor.config" v-model="feeds.content"></ckeditor>
                    <div class="text-right">
                      <base-button type="primary" nativeType="submit" class="my-4">Kirim</base-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- End Comment Form -->
          <!-- Feeds -->
          <div class="mt-5">
            <paginate name="feeds" :list="feeds.data" :per="5">
              <div
                class="card shadow text-left mb-4"
                v-for="feed in paginated('feeds')"
                :key="feed.id"
              >
                <div class="card-body">
                  <h4 class="card-title">{{ feed.user_name }}</h4>
                  <p class="card-text" v-html="feed.content"></p>
                  <small>{{ timeDelta(feed.created_at) }}</small>
                </div>
              </div>
            </paginate>
          </div>
          <div class="row">
            <paginate-links for="feeds" :show-step-links="true"></paginate-links>
            <base-pagination :page-count="10" align="center"></base-pagination>
          </div>
          <!-- End Feeds -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "@/services/api";
import moment from "moment";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data() {
    return {
      content: "",
      user: null,
      feeds: {
        content: "",
        data: null
      },
      paginate: ["feeds"],
      editor: {
        type: ClassicEditor,
        config: {}
      }
    };
  },
  created() {
    this.fetchUser();
    this.fetchFeeds();
    this._sortFeeds();
  },
  methods: {
    /**
     * Fetches current user for user profile card
     */
    async fetchUser() {
      try {
        const response = await axios({
          method: "GET",
          url: "/registrations/api/" + localStorage.getItem("id_user"),
          headers: {
            // Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
          }
        });

        this.user = response.data;
      } catch (error) {
        console.log("whoops", error);
      }
    },
    /**
     * Fetches all the feeds
     */
    async fetchFeeds() {
      try {
        const response = await axios({
          method: "GET",
          url: "/feeds/api/",
          headers: {
            // Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
          }
        });

        this.feeds.data = response.data;
      } catch (error) {
        console.log("whoops", error);
      }
    },
    /**
     * Post a new feed
     */
    async postFeed() {
      try {
        const response = await axios({
          method: "POST",
          url: "/feeds/api/",
          data: {
            content: this.feeds.content,
            user_id: localStorage.getItem("id_user"),
            user_name: this.user.full_name
          },
          headers: {
            // Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8"
          }
        });

        this.fetchFeeds();
        this.feeds.content = "";
      } catch (error) {
        console.log("whoops", error);
      }
    },
    /**
     * Gets the delta time from a feed
     */
    timeDelta(date) {
      return moment(date).fromNow();
    },
    /**
     * Sort feeds by feed upload date
     */
    _sortFeeds() {
      this.feeds = this.feeds.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      console.log(this.feeds);
    }
  },
  computed: {
    /**
     * Gets the user's age
     */
    userAge: function() {
      return Math.floor(
        (new Date() - new Date(this.user.birth_day).getTime()) / 3.15576e10
      );
    },
    /**
     * Gets the user's first name
     */
    userFirstName: function() {
      return this.user.full_name.split(" ")[0];
    },
    /**
     * Sort feeds by feed upload date
     */
    sortFeeds: function() {
      return (this.feeds = this.feeds.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      ));
    }
  }
};
</script>
<style></style>