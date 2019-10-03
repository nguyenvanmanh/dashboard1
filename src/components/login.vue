<template>
  <div>
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
          <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
        </a>
      </div>
      <div class="card p-4 border-top-left-radius-0 border-top-right-radius-0">
        <form>
          <v-text-field
            v-model="users.username"
            v-validate="'required'"
            :error-messages="errors.collect('username')"
            label="User Name"
            data-vv-name="username"
            required
          ></v-text-field>
          <v-text-field
            v-model="users.password"
            v-validate="'required'"
            :error-messages="errors.collect('password')"
            label="Password"
            data-vv-name="password"
            required
          ></v-text-field>
          <p></p>
          <div class="form-group text-left">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="rememberme" />
              <label class="custom-control-label" for="rememberme">Remember me for the next 30 days</label>
            </div>
          </div>

          <a class="btn btn-primary float-right" role="button" type="submit" @click="addToAPI">LOGIN</a>
        </form>
      </div>

      <div class="blankpage-footer text-center">
        <a href="#">
          <strong>Recover Password</strong>
        </a> |
        <router-link to="/register">
          <a href="#">
            <strong>Register Account</strong>
          </a>
        </router-link>
      </div>
    </div>
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
        url: "http://172.30.56.173:8080/rest/login",
        data: newUser
      }).then(function(response) {
        if (response.status === 200) {
          localStorage.setItem('tocken',response.data);
          _this.$router.push({
            path: "/"
          });
        }
        
      }).catch(()=>{ alert('Login Failed'); return null;});
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
