export default {
  methods: {
    wall() {
      if (this.myfeeds_bool === true) {
        userAPI({
          method: "get",
          url: "/feeds/api/"
        }).then(response => {
          this.reactive_edit(response, false);
        });
      }
      this.myfeeds_bool = false;
    },
    myfeeds() {
      if (this.myfeeds_bool === false) {
        userAPI({
          method: "get",
          url: "/feeds/api/"
        }).then(response => {
          this.reactive_edit(response, true);
        });
      }
      this.myfeeds_bool = true;
    },
    getCurrentUser() {
      var current_user = localStorage.getItem("name");
      current_user = current_user.split(" ");
      return current_user[0];
    },
    getCurrentTime() {
      var current_date = new Date();
      var current_hours = current_date.getHours();
      var result = "";
      if (current_hours < 12) {
        result = this.local[0].morning;
      } else if (current_hours < 18) {
        result = this.local[0].afternoon;
      } else if (current_hours < 24) {
        result = this.local[0].evening;
      }
      // console.log(result)
      return result;
    },
    format_date(param) {
      var str_date = param.toString();
      str_date = str_date.substring(0, 19);
      str_date = str_date.split("T");
      return str_date[1] + ", date: " + str_date[0];
    },

    // like and unlike
    like(feed_id, index) {
      userAPI({
        method: "PUT",
        url:
          "/feeds/api/likes/like/" +
          localStorage.getItem("id_user") +
          "/" +
          feed_id
      }).then(response => {
        this.feeds[index].likes_count += 1;
        this.feeds[index].liked_bool = !this.feeds[index].liked_bool;
      });
    },
    unlike(feed_id, index) {
      userAPI({
        method: "PUT",
        url:
          "/feeds/api/likes/unlike/" +
          localStorage.getItem("id_user") +
          "/" +
          feed_id
      }).then(response => {
        this.feeds[index].likes_count -= 1;
        this.feeds[index].liked_bool = !this.feeds[index].liked_bool;
      });
    },
    show_comments(index, feeds_id) {
      // if (this.feeds[index].comments_bool == false) {
      if (this.feeds_bool[index] == false) {
        userAPI({
          method: "get",
          url: "/feeds/api/comments/" + feeds_id
        }).then(response => {
          this.feeds[index]["comment_list"] = response.data;
          this.feeds_bool.splice(index, 1, !this.feeds_bool[index]);
        });
      } else {
        this.feeds_bool.splice(index, 1, !this.feeds_bool[index]);
      }
    },
    post_comments(feeds_id, index) {
      this.feeds[index].comments_count += 1;
      var tmp_feeds = this.feeds.filter(function(feed) {
        return feed.id == feeds_id;
      });
      tmp_feeds = tmp_feeds[0];
      var tmp_comments_count = tmp_feeds.comments_count;
      //post comments in likesncomments
      userAPI({
        method: "POST",
        url: "/feeds/api/comments/",
        data: {
          feeds: feeds_id,
          content: tmp_feeds.comments_content,
          user: localStorage.getItem("id_user"),
          name: localStorage.getItem("name")
        }
      }).then(response => {
        userAPI({
          method: "get",
          url: "/feeds/api/comments/" + feeds_id
        }).then(response => {
          var tmp_feeds_2 = this.feeds[index];
          tmp_feeds_2["comment_list"] = response.data;
          this.feeds.splice(index, 1, tmp_feeds_2);
        });
        tmp_feeds.comments_content = "";
      });
    },
    post_feeds() {
      userAPI({
        method: "post",
        url: "/feeds/api/",
        data: {
          content: this.post_val,
          user_id: localStorage.getItem("id_user"),
          user_name: localStorage.getItem("name")
        }
      }).then(response => {
        userAPI({
          method: "get",
          url: "/feeds/api/"
        }).then(response => {
          this.reactive_edit(response);
        });
      });
      this.post_val = "";
    },
    reactive_edit(response, bool) {
      var temporary;
      if (bool) {
        temporary = response.data
          .filter(id => id.user_id == localStorage.getItem("id_user"))
          .reverse();
      } else {
        temporary = response.data.reverse();
      }
      function likes(item, index) {
        userAPI({
          method: "GET",
          url: "/feeds/api/likes/count/" + item.id
        }).then(response => {
          item.likes_count = response.data.likes_count;
        });
      }
      function comments(item, index) {
        userAPI({
          method: "GET",
          url: "/feeds/api/comments/count/" + item.id
        }).then(response => {
          item.comments_count = response.data.comments_count;
        });
      }
      temporary.forEach(likes);
      temporary.forEach(comments);
      this.feeds = temporary;
      this.feeds_bool = [];
      for (var i = 0; i < this.feeds.length; i++) {
        this.feeds_bool.push(this.feeds[i].comments_bool);
      }
      userAPI({
        method: "get",
        url: "/feeds/api/likes/" + localStorage.getItem("id_user")
      }).then(response => {
        if (response.data.user == null) {
          userAPI({
            method: "post",
            url: "/feeds/api/likes/create/",
            data: {
              user: localStorage.getItem("id_user"),
              name: localStorage.getItem("name")
            }
          });
        } else {
          this.feeds_liked = response.data.feeds;
          for (var i = 0; i < this.feeds.length; i++) {
            var liked_bool = false;
            for (var j = 0; j < this.feeds_liked.length; j++) {
              if (this.feeds[i].id == this.feeds_liked[j]) {
                liked_bool = true;
                break;
              }
            }
            this.feeds[i]["liked_bool"] = liked_bool;
          }
        }
        this.isLoading = false;
      });
    },
    show_feeds() {
      if (this.show_boolean == true) {
        this.text_btn = "Load More ";
      } else {
        this.text_btn = "Load Less";
      }
      this.show_boolean = !this.show_boolean;
    }
  },
  mounted() {
    this.isLoading = true;
    userAPI({
      method: "GET",
      url: "/feeds/api/"
    }).then(response => {
      this.reactive_edit(response);
    });
  }
};
