<template>
  <div class="form">
    <v-app id="inspire">
      <div class="blankpage-form-field">
        <div
          class="page-logo m-0 w-100 align-items-center justify-content-center rounded border-bottom-left-radius-0 border-bottom-right-radius-0 px-4"
        >
          <a
            href="javascript:void(0)"
            class="page-logo-link press-scale-down d-flex align-items-center"
          >
            <img src="../assets/img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo" />
            <span class="page-logo-text mr-1">SmartAdmin WebApp</span>
          </a>
        </div>
        <div class="card p-4 border-top-left-radius-0 border-top-right-radius-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="users.username"
              :rules="usernameRules"
              label="Username"
              required
              autofocus
            ></v-text-field>
            <v-text-field
              v-model="users.password"
              :type="'password'"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>
            <p></p>
            <v-alert dense outlined type="error" v-if="isCheck">Incorrect username or password !</v-alert>
            <div class="form-group text-left">
              <label for="rememberme">
                New user?
                <router-link to="/register" title="Redirect to register page">
                  <a>Create an account</a>
                </router-link>.
              </label>
            </div>
            <a
              class="btn btn-primary float-right"
              role="button"
              type="submit"
              @click="addToAPI"
            >Login</a>
          </v-form>
        </div>
      </div>
    </v-app>
    <video poster="img/backgrounds/clouds.png" id="bgvid" playsinline autoplay muted loop>
      <source src="../assets/media/video/cc.webm" type="video/webm" />
      <source src="../assets/media/video/cc.mp4" type="video/mp4" />
    </video>
  </div>
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
</style>
