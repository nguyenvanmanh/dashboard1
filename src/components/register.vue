<template>
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
                <img src="../assets/img/logo.png" alt aria-roledescription="logo" />
                <span class="page-logo-text mr-1">CMC Employee Management</span>
              </a>
            </div>
            <span class="text-white opacity-50 ml-auto mr-2 hidden-sm-down">Already a member?</span>
            <a href="page_login-alt.html" class="btn-link text-white ml-auto ml-sm-0">Secure Login</a>
          </div>
        </div>
        <div
          class="flex-1"
          style="background: url(../assets/img/svg/pattern-1.svg) no-repeat center bottom fixed; background-size: cover;"
        >
          <div class="container py-4 py-lg-5 my-lg-5 px-4 px-sm-0">
            <div class="row">
              <div class="col-xl-12">
                <h2 class="fs-xxl fw-500 mt-4 text-white text-center">Register now</h2>
              </div>
              <div class="col-xl-6 ml-auto mr-auto">
                <div class="card p-4 rounded-plus bg-faded">
                  <form v-on:submit.prevent="sendVerification">
                    <div class="form-group row">
                      <label class="col-xl-12 form-label" for="fname">Your firstname</label>
                      <div class="col-6 pr-1">
                        <v-text-field
                          v-model="users.firstName"
                          :error-messages="errors.collect('name')"
                          label="Firstname"
                          outlined
                          required
                        ></v-text-field>
                        <div class="invalid-feedback">No, you missed this one.</div>
                      </div>
                      <div class="col-6 pl-1">
                        <v-text-field
                          v-model="users.lastName"
                          :error-messages="errors.collect('name')"
                          label="Lastname"
                          outlined
                          data-vv-name="name"
                          required
                        ></v-text-field>
                        <div class="invalid-feedback">No, you missed this one.</div>
                      </div>
                    </div>                   
                    <div class="form-group">
                      <label class="form-label" for="userpassword">
                        Pick a password:
                        <br />Don't reuse your bank password, we didn't spend a lot on security for this app.
                      </label>
                      <v-text-field
                        v-model="users.email"
                        :error-messages="errors.collect('name')"
                        label="Email"
                        outlined
                        required
                      ></v-text-field>
                      <v-text-field
                          v-model="users.username"
                          :error-messages="errors.collect('name')"
                          label="Date of Birth"
                          outlined
                          required
                        ></v-text-field>
                      <v-text-field
                        v-model="users.username"
                        :error-messages="errors.collect('name')"
                        label="Username"
                        outlined
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="users.password"
                        :error-messages="errors.collect('name')"
                        :type=" 'password'"
                        label="Password"
                        outlined
                        required
                      ></v-text-field>
                      <v-text-field
                        v-model="users.password"
                        :error-messages="errors.collect('name')"
                        :type=" 'password'"
                        label="Retype password"
                        outlined
                        required
                      ></v-text-field>
                      <div class="invalid-feedback">Sorry, you missed this one.</div>
                    </div>
                    <div class="row no-gutters">
                      <div class="col-md-4 ml-auto text-right">
                        <button
                          type="submit"
                          class="btn btn-block btn-danger btn-lg mt-3"
                        >Send verification</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="position-absolute pos-bottom pos-left pos-right p-3 text-center text-white">
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
</template>
<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      users: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      },
      sendVerification: Function
    };
  },
  mounted() {
    this.sendVerification = () => {
      // evt.preventDefault(); //prevents the default action
      let newUser = {
        firstName: this.users.firstName,
        lastName: this.users.lastName,
        email: this.users.email,
        username: this.users.username,
        password: this.users.password
      };
      axios({
        method: "POST",
        url: "http://172.30.56.77:8080/rest/register",
        data: newUser
      })
        .then(res => {
          if (res.status === 201) {
            alert("Register Success !");
          }
        })
        .catch(() => {
          alert("Register Failed");
          return null;
        });
    };
  }
};
</script>

<style scoped>
</style>