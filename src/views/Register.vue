<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0" style="margin-top:-5rem">
           
        <div class="card-header bg-transparent pb-2">
          <div v-if="isRegistered" class="alert alert-primary">
              <p style="margin-bottom: 0;">
                <strong>Registrasi berhasil</strong> Silakan cek email anda untuk aktivasi
              </p>
            </div>
            
          <div class="text-muted text-center mt-2 mb-3">
            <img src="../assets/logobaru.png" alt="Logo Mindzzle" style="width:50%" />
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @submit.prevent="Registrasi">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Nama Lengkap"
              addon-left-icon="ni ni-hat-3"
              v-model="name"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              type="email"
              v-model="email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Kata Sandi"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="password"
              @keyup="requirePassword()"
            ></base-input>
            <!-- <span class="text-danger">{{errors}}</span> -->
            <!-- <ul type="none" v-if="!this.password.length < 1">
              <li type="none" class="text-danger" v-for="error in errors" :key="error.id">{{error}}</li>
            </ul>-->
            <div
              v-if="!this.password.length < 1 && !this.errors.length < 1"
              class="alert alert-danger"
            >
              <div class v-for="error in errors" :key="error.id">
                {{error}}
                <br />
              </div>
            </div>

            <base-input
              class="input-group-alternative"
              placeholder="Konfirmasi Kata Sandi"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="secondPassword"
              @keyup="checkPassword()"
            ></base-input>
            <div v-show="!isCheck" class="alert alert-danger">Password tidak sama</div>

            <base-input
              class="input-group-alternative"
              type="date"
              addon-left-icon="ni ni-hat-3"
              v-model="birth"
              :min="minDate"
            ></base-input>
            <!-- <DatePicker></DatePicker> -->

            <Multiselect
              v-model="gender.value"
              class="shad m-bottom"
              :options="gender.options"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              placeholder="Jenis Kelamin"
            ></Multiselect>

            <Multiselect
              v-model="country.value"
              class="shad m-bottom"
              :options="country.options"
              :searchable="false"
              :close-on-select="true"
              :show-labels="false"
              placeholder="Negara"
            ></Multiselect>

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
              <base-button type="primary" nativeType="submit" class="my-4">Create account</base-button>
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
import Multiselect from "vue-multiselect";
import VCalendar from "v-calendar";
import Axios from 'axios';

/* eslint-disable */
export default {
  name: "register",
  components: {
    Multiselect,
    VCalendar
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
        options: ["Indonesia", "United Kingdom", "Germany", "India","United States of America"]
      },
      isRegistered : false,
      isCheck: true,
      errors: []
    };
  },
  created() {
    this.checkDate();
  },
  methods: {
      async regist(name,email,password,secondPassword,birth,minDate,gender,country){
          const Daftar = {
              name,
              email,
              password,
              secondPassword,
              birth,
              minDate,
              gender,
              country,

          };
          try{
              const response = await Axios({
                  method:"POST",
                  url:"http://localhost:8000/registrations/api/",
                  data:{
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
                  const resp = response.data
                  this.$router.push('/login')
                  localStorage.setItem('registered',true)
                  
                  

              })
    } catch (error){
        console.error("wadaww" + error);
    }
      },
    async Registrasi(){
        await this.regist(this.name,this.email,this.password,this.birth,this.minDate,this.gender,this.country);
    },

    check() {
      if (typeof this.name == "string") {
        console.log(this.name.toLowerCase());
      }

      let all =
        this.name +
        this.email +
        this.password +
        this.secondPassword +
        this.birth +
        this.gender.value;
      let name = this.name;
      let regex = /^[a-zA-Z ]+$/g;
      let isValid = regex.test(name);
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let currentYear = today.getFullYear();
      let cek = today.getFullYear() - 18;
      console.log("lahir tahun", cek);

      console.log("tanggal hari ini", date);
      console.log(all);

      if (isValid) {
        alert("Isi dari nama anda adalah huruf semua");
      } else {
        alert("harus huruf");
      }
    },

    requirePassword() {
      let kapital = /^.*(?=.*[A-Z]).*$/;
      let angka = /^.*(?=.*[0-9]).*$/;
      this.errors = [];

      if (this.password.length < 6) {
        this.errors.push("Kata sandi minimal 6 karakter");
      }
      if (!kapital.test(this.password)) {
        this.errors.push("Setidaknya harus ada 1 huruf kapital");
      }
      if (!angka.test(this.password)) {
        this.errors.push(" Setidaknya harus ada 1 angka");
      }
    },

    checkPassword() {
      if (this.password === this.secondPassword) {
        this.isCheck = true;
        console.log(this.isCheck);
      } else {
        this.isCheck = false;
        console.log(this.isCheck);
      }
    },

    checkDate() {
      let today = new Date();
      
      let cek = today.getFullYear() - 18;
      // console.log("lahir tahun", cek);

      // let date =
      //   today.getFullYear() +
      //   "-" +
      //   (today.getMonth() + 1) +
      //   "-" +
      //   today.getDate();

      // let minDate = this.minDate;
      let checkYear =
        cek + "-" + (today.getMonth() + 1) + "-" + today.getDate();
      // console.log(checkYear)
      this.minDate = checkYear
      // console.log(this.minDate)
    }

  },
  mounted(){
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
</style>
