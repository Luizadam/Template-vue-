import axios from "axios";

/*eslint-disable*/
export default {
  async login(email, password) {
    const credentials = {
      email,
      password
    };

    try {
      let response = await axios({
        method: "POST",
        url: "https://x-user-api.mindzzle.com/registrations/api/login/",
        data: {
          email: credentials.email,
          password: credentials.password
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.user.email);
      localStorage.setItem("id_user", response.data.user.id_user);

      return response;
    } catch (error) {
      console.error("whoops " + error);
    }
  }
};
