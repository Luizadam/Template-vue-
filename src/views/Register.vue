<template>
  <div class="row" style="margin-top:-15rem">
    <div class="col-12 col-md-6 d-none d-md-block logo-section">
      <img src="@/assets/logobaru.png" alt class="img-fluid" />
    </div>
    <div class="col-12 col-md-6 register-section">
      <modal :show.sync="isEmpty" gradient="warning">
        <template slot="header">
          <h5 class="modal-title text-white" id="exampleModalLabel">Warning</h5>
        </template>
        <div class="text-white">Harap periksa kembali data yang anda isi</div>
        <template slot="footer">
          <base-button type="secondary" @click="isEmpty = false">Close</base-button>
        </template>
      </modal>
      <div class="card border-0" style="margin-top: -5rem;background:transparent">
        <div class="card-header bg-transparent pb-2">
          <div v-if="isRegistered" class="alert alert-primary">
            <p style="margin-bottom: 0;">
              <strong>Registrasi berhasil</strong> Silakan cek email anda untuk aktivasi
            </p>
          </div>

          <div class="text-muted text-center mt-2 mb-3">
            <!-- <h1 class="d-none d-md-block">Register</h1> -->
          </div>
          <div class="d-block d-md-none text-muted text-center mt-2 mb-3">
            <img src="../assets/logobaru.png" alt="Logo Mindzzle" style="width:100%" />
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @submit.prevent="check">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Nama Lengkap"
              addon-left-icon="ni ni-hat-3"
              :valid="isName ? false : null"
              v-model="name"
            >
              <template slot="infoBlock">
                <small
                  class="text-warning invalid-feedback p-2"
                  v-show="isName"
                >Nama harus berupa huruf dan juga tidak boleh kosong</small>
              </template>
            </base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              nativeType="email"
              :valid="isEmail ? false : null"
              v-model="email"
            >
              <template slot="infoBlock">
                <small
                  class="text-warning invalid-feedback p-2"
                  v-show="isEmail"
                >Email tidak boleh kosong</small>
              </template>
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Kata Sandi"
              type="password"
              :valid="isPasswordError ? false : null"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
              @keyup="requirePassword()"
            >
              <template slot="infoBlock">
                <small class="text-warning invalid-feedback p-2">
                  <span v-for="error in errors" :key="error.id">
                    {{error}}
                    <br />
                  </span>
                </small>
              </template>
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Konfirmasi Kata Sandi"
              type="password"
              :valid="checkSecPassword ? false : null"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="secondPassword"
              @keyup="checkPassword()"
            >
              <template slot="infoBlock">
                <small
                  class="text-warning invalid-feedback p-2"
                  v-show="checkSecPassword"
                >Kata sandi anda tidak sama</small>
              </template>
            </base-input>

            <base-input class="input-group-alternative" addon-left-icon="ni ni-calendar-grid-58">
              <flat-picker
                slot-scope="{focus, blur}"
                @on-open="focus"
                @on-close="blur"
                placeholder="Tanggal Lahir"
                :config="{allowInput: true, maxDate: minDate}"
                class="form-control datepicker"
                v-model="birth"
              ></flat-picker>
              <template slot="infoBlock">
                <small
                  class="text-warning invalid-feedback p-2"
                  v-show="isDate"
                >Tanggal lahir tidak boleh kosong</small>
              </template>
            </base-input>
            <div class="form-group">
              <Multiselect
                v-model="gender.value"
                class="shad m-bottom rounded border-none text-muted"
                :options="gender.options"
                :searchable="false"
                :close-on-select="true"
                :show-labels="false"
                placeholder="Jenis Kelamin"
              ></Multiselect>
              <small
                class="text-warning invalid-feedback p-2"
                v-show="isGender"
              >Jenis kelamin tidak boleh kosong</small>
            </div>
            <div class="form-group">
              <Multiselect
                v-model="country.value"
                class="shad m-bottom rounded border-none text-muted"
                :options="country.options"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                placeholder="Negara"
              ></Multiselect>
              <small
                class="text-warning invalid-feedback p-2"
                v-show="isCountry"
              >Negara tidak boleh kosong</small>
            </div>

            <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted">
                    I agree with the
                    <a href="#!">Privacy Policy</a>
                  </span>
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
              <base-button
                type="primary"
                nativeType="submit"
                @click.prevent="check"
                class="my-4"
              >Buat Akun</base-button>
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
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Multiselect from "vue-multiselect";

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Moment from "moment";
import Axios from "axios";

/* eslint-disable */
Vue.use(Moment);
export default {
  name: "register",
  components: {
    Multiselect,
    DatePicker,
    flatPicker
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      secondPassword: "",
      birth: "",
      minDate: "",
      gender: {
        value: "",
        options: ["Laki-laki", "Perempuan"]
      },
      country: {
        value: "",
        options: [
          "Indonesia",
          "United Kingdom",
          "Germany",
          "India",
          "United States of America"
        ]
      },
      isEmpty: false,
      isName: false,
      isEmail: false,
      isPasswordError: false,
      checkSecPassword: false,
      isDate: false,
      isGender: false,
      isCountry: false,
      errors: [],
      isRegistered: false
    };
  },
  created() {
    this.checkDate();
  },
  methods: {
    async regist(
      name,
      email,
      password,
      secondPassword,
      birth,
      minDate,
      gender,
      country
    ) {
      const Daftar = {
        name,
        email,
        password,
        secondPassword,
        birth,
        minDate,
        gender,
        country
      };
      try {
        const response = await Axios({
          method: "POST",
          url: "https://x-user-api.mindzzle.com/registrations/api/",
          data: {
            full_name: Daftar.name,
            email: Daftar.email,
            password: Daftar.password,
            salt_password: "",
            id_user: 2,
            birth_day: Daftar.birth,
            primary_phone: 0,
            primary_address: "",
            id_country: 1,
            id_regions: 1,
            id_city: 1,
            tax_num: 0,
            description: "",
            id_type: 0,
            banned_type: 0,
            url_photo: "",
            token: "",
            ssn_num: 0,
            verified: 0,
            gender: Daftar.gender
          }
        }).then(response => {
          const resp = response.data;
          this.$router.push("/login");
          localStorage.setItem("registered", true);
        });
      } catch (error) {
        console.error("wadaww" + error);
      }
    },
    checkName() {
      let name = this.name.toLowerCase();
      let regex = /^[a-zA-Z ]+$/g;
      let isValid = regex.test(name);
      if (!isValid) {
        this.isName = true;
      } else {
        this.isName = false;
        return name;
      }
    },
    checkEmail() {
      if (this.email === "") {
        this.isEmail = true;
      } else {
        this.isEmail = false;
      }
    },
    async check() {
      await this.checkName();
      await this.checkEmail();
      await this.requirePassword();
      await this.requireDate();
      await this.checkGender();
      await this.checkCountry();
      try {
        if (
          this.gender.value === "" ||
          this.country.value === "" ||
          this.name === "" ||
          this.email === "" ||
          this.email === "" ||
          this.password === "" ||
          this.gender.value === "" ||
          this.country.value === ""
        ) {
          this.isEmpty = true;
        } else {
          this.coba();
        }
      } catch (error) {
        console.error(error);
      }
    },
    async coba() {
      let name = this.name.toLowerCase();
      let email = this.email;
      let password = this.password;
      let date = Moment(this.birth).format("YYYY-MM-DD");
      let gender = this.gender.value;
      let country = this.country.value;
      try {
        await this.regist(name, email, password, date, gender, country);
        console.log(name, email, password, date, gender, country);
      } catch (error) {
        console.error(error);
      }
    },
    requirePassword() {
      let kapital = /^.*(?=.*[A-Z]).*$/;
      let angka = /^.*(?=.*[0-9]).*$/;
      this.errors = [];
      if (this.password.length < 6) {
        this.errors.push("Kata sandi minimal 6 karakter");
        this.isPasswordError = true;
      } else {
        this.isPasswordError = false;
      }
      if (!kapital.test(this.password)) {
        this.errors.push("Setidaknya harus ada 1 huruf kapital");
      }
      if (!angka.test(this.password)) {
        this.errors.push(" Setidaknya harus ada 1 angka");
      }
    },
    checkPassword() {
      let password = this.password;
      let secondPassword = this.secondPassword;
      if (password === secondPassword) {
        this.checkSecPassword = false;
        console.log(this.checkSecPassword);
      } else {
        this.checkSecPassword = true;
        console.log(this.checkSecPassword);
      }
    },
    checkDate() {
      let today = new Date();
      let years = today.getFullYear() - 18;
      let date = years + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      this.minDate = date;
      console.log(this.minDate);
    },
    requireDate() {
      if (this.birth === "") {
        this.isDate = true;
      } else {
        this.isDate = false;
      }
    },
    checkGender() {
      if (this.gender.value === "") {
        this.isGender = true;
      } else {
        this.isGender = false;
      }
    },
    checkCountry() {
      if (this.country.value === "") {
        this.isCountry = true;
      } else {
        this.isCountry = false;
      }
    }
  },
  mounted() {
    if (localStorage.hasOwnProperty("registered")) {
      localStorage.removeItem("registered");
      this.isRegistered = true;
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
.shad {
  box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
}
.m-bottom {
  margin-bottom: 1.5rem;
}
.font-color {
  color: #8898aa;
}

</style>