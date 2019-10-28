<template>
  <v-app id="inspire">
    <div class="page-wrapper">
      <div class="page-inner bg-brand-gradient">
        <div class="page-content-wrapper bg-transparent m-0">
          <div class="height-10 w-100 shadow-lg px-4 bg-brand-gradient">
            <div class="d-flex align-items-center container p-0">
              <div
                class="page-logo width-mobile-auto m-0 align-items-center justify-content-center p-0 bg-transparent bg-img-none shadow-0 height-9"
              >
                <a
                  href="javascript:void(0)"
                  class="page-logo-link press-scale-down d-flex align-items-center"
                >
                  <img
                    src="../assets/img/logo.png"
                    alt="SmartAdmin WebApp"
                    aria-roledescription="logo"
                  />
                  <span class="page-logo-text mr-1">SmartAdmin WebApp</span>
                </a>
              </div>
              <a href="page_register.html" class="btn-link text-white ml-auto">Create Account</a>
            </div>
          </div>
          <div
            class="flex-1"
            style="background: url(../assets/img/svg/pattern-1.svg) no-repeat center bottom fixed; background-size: cover;"
          >
            <div class="container py-4 py-lg-5 my-lg-5 px-4 px-sm-0">
              <div class="row">
                <div class="col col-md-6 col-lg-7 hidden-sm-down">
                  <h2 class="fs-xxl fw-500 mt-4 text-white">
                    The simplest UI toolkit for developers &amp; programmers
                    <small
                      class="h3 fw-300 mt-3 mb-5 text-white opacity-60"
                    >Presenting you with the next level of innovative UX design and engineering. The most modular toolkit available with over 600+ layout permutations. Experience the simplicity of SmartAdmin, everywhere you go!</small>
                  </h2>
                  <a href="#" class="fs-lg fw-500 text-white opacity-70">Learn more &gt;&gt;</a>
                  <div
                    class="d-sm-flex flex-column align-items-center justify-content-center d-md-block"
                  >
                    <div
                      class="px-0 py-1 mt-5 text-white fs-nano opacity-50"
                    >Find us on social media</div>
                    <div class="d-flex flex-row opacity-70">
                      <a href="#" class="mr-2 fs-xxl text-white">
                        <i class="fab fa-facebook-square"></i>
                      </a>
                      <a href="#" class="mr-2 fs-xxl text-white">
                        <i class="fab fa-twitter-square"></i>
                      </a>
                      <a href="#" class="mr-2 fs-xxl text-white">
                        <i class="fab fa-google-plus-square"></i>
                      </a>
                      <a href="#" class="mr-2 fs-xxl text-white">
                        <i class="fab fa-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-5 col-xl-4 ml-auto">
                  <h1 class="text-white fw-300 mb-3 d-sm-block d-md-none">Secure login</h1>
                  <div class="card p-4 rounded-plus bg-faded">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="users.username"
                        :rules="usernameRules"
                        label="Username"
                        outlined
                        required
                        autofocus
                      ></v-text-field>
                      <v-text-field
                        v-model="users.password"
                        :type="'password'"
                        :rules="passwordRules"
                        label="Password"
                        outlined
                        required
                      ></v-text-field>
                      <v-alert
                        dense
                        outlined
                        type="error"
                        v-if="isCheck"
                      >Incorrect username or password !</v-alert>
                      <div class="form-group text-left">
                        <label for="rememberme">
                          New user?
                          <router-link to="/register" title="Redirect to register page">
                            <a>Create an account</a>
                          </router-link>
                        </label>
                      </div>
                      <div class="row no-gutters">
                        <div class="col-lg-6 pr-lg-1 my-2">
                          <!-- <button class="btn btn-info btn-block btn-lg">
                            Sign in with
                            <i class="fab fa-google"></i>
                          </button>-->
                        </div>
                        <div class="col-lg-6 pl-lg-1 my-2">
                          <button
                            :disabled="!valid"
                            id="js-login-btn"
                            type="submit"
                            class="btn btn-danger btn-block btn-lg"
                            @click.prevent="addToAPI"
                          >Secure login</button>
                        </div>
                      </div>
                    </v-form>
                  </div>
                </div>
              </div>
              <div
                class="position-absolute pos-bottom pos-left pos-right p-3 text-center text-white"
              >
                2019 © SmartAdmin by&nbsp;
                <a
                  href="https://www.gotbootstrap.com"
                  class="text-white opacity-40 fw-500"
                  title="gotbootstrap.com"
                  target="_blank"
                >gotbootstrap.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-app>
    <!-- <video poster="./assets/img/backgrounds/clouds.png" id="bgvid" playsinline autoplay muted loop>
      <source src="./assets/media/video/cc.webm" type="video/webm" />
      <source src="./assets/media/video/cc.mp4" type="video/mp4" />
    </video> -->
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      isCheck: false,
      valid: true,
      usernameRules: [v => !!v || "Username is required !"],
      passwordRules: [v => !!v || "Password is required !"],
      users: { username: "", password: "" },
      addToAPI: Function
    };
  },
  mounted() {
    let _this = this;
    this.addToAPI = () => {
      let newUser = {
        username: this.users.username,
        password: this.users.password
      };
      axios({
        method: "post",
        url: "http://172.30.56.81:8081/rest/login",
        data: newUser
      })
        .then(function(response) {
          if (response.status === 200) {
            localStorage.setItem("tocken", response.data);
            _this.$router.push({
              path: "/"
            });
          }
        })
        .catch(() => {
          this.isCheck = true;
        });
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3,
.h3 {
  font-size: 1.1875rem !important;
}
.btn-group-lg > .btn,
.btn-lg {
  font-size: unset;
}
.btn-danger {
  background-color: #fd3995;
  border-color: #fd3995;
}
/* .btn-primary {
  background-color: #fd3995!important;
  border-color: unset !important;
} */
</style>