<template>
  <!-- pagination start -->
  <div style="text-align: center">
  <div class="demo" :style="`display:${pointing}`" >
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-secondary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-danger" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-warning" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-info" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-dark" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!-- pagination end -->
  <!-- style 2 -->
  <button class="btn btn-info waves-effect waves-themed center" type="button" disabled="" :style="`display:${button}`" >
                                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    Loading...
                                                </button>
                                                <!-- style 3  -->

                                                <div class="demo" :style="`display:${spinner}`">
                                                <div class="spinner-border text-primary" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <div class="spinner-border text-secondary" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <div class="spinner-border text-success" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <div class="spinner-border text-danger" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <div class="spinner-border text-warning" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <div class="spinner-border text-info" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <div class="spinner-border text-light" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                                <div class="spinner-border text-dark" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                                </div>
</template>

<script>
export default {
   data: () => ({
    spinner:"none",
    pointing:"block",
    button:"none"
  }),
  props: {
    type: {
      // type: String,
      // default: "spinner"
    },
  },
  methods:{
    
  },
   watch: {
    type:()=>{
      console.log("test")
      this.spinner ="none"
      if(type=="button"){
        this.button= "block"
      }else if(type =="pointing"){
        this.pointing ="block"
      }else{
        this.spinner ="block"
      }
    }
  }
};
</script>
<style scoped>
.center{
  text-align: center
}
</style>

