<template>
  <div id="app">
    <!-- <Login></Login> 
    <Register></Register>
    <Dashboard></Dashboard> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import Login from "./components/login.vue";
// import Register from "./components/register.vue";
// import Dashboard from "./components/dashboard.vue";
export default {
  name: "app",
  components: {
    // Login,
    // Register,
    // Dashboard
  }
};
</script>

<style>
@import "./assets/css/page-login.css";
@import "./assets/css/vendors.bundle.css";
@import "./assets/css/app.bundle.css";
</style>

