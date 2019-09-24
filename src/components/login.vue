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
          <!-- <img src="../assets/img/logo.png" alt="SmartAdmin WebApp" aria-roledescription="logo" /> -->
          <img src="../assets/img/logo.png" alt />
          <span class="page-logo-text mr-1">SmartAdmin WebApp</span>
          <i class="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
        </a>
      </div>
      <div class="card p-4 border-top-left-radius-0 border-top-right-radius-0">
        <form>
          <div class="form-group">
            <label class="form-label" for="username">Username</label>
            <input
              type="text"
              id="username"
              class="form-control"
              placeholder="your id or email"
              value="drlantern@gotbootstrap.com"
              v-model="username1"
            />
          </div>
          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="password"
              value="password123"
              v-model="password1"
            />
          </div>
          <div class="form-group text-left">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="rememberme" />
              <label class="custom-control-label" for="rememberme">Remember me for the next 30 days</label>
            </div>
          </div>
          <!-- <router-link to="/"> -->
          <a class="btn btn-primary float-right" role="button" @click="checkForm">Secure Login</a>
          <!-- </router-link> -->
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
// import vueRouter from "vue-router";
export default {
  name: "login",
  props: {
    msg: String
  },
  data() {
    return {
      username1: "",
      password1: "",
      users: [
        {
          username: "admin1",
          password: "123456"
        },
        {
          username: "admin2",
          password: "123456"
        },
        {
          username: "admin3",
          password: "123456"
        },
        {
          username: "admin4",
          password: "123456"
        },
        {
          username: "admin5",
          password: "123456"
        }
      ]
    };
  },
  methods: {
    checkForm() {
      let temp = false;
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.username1 === this.users[i].username &&
          this.password1 === this.users[i].password
        ) {
          temp = true;
          this.$router.push({
            path: "/"
          });
          break;
        }
      }
      if (temp === false) {
        alert("Login failed");
      }

      // if (
      //   this.username1 === this.users.username &&
      //   this.password1 === this.users.password
      // ) {
      //   console.log("dsdsd");

      // }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
