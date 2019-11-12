<template>
  <div class="fixed">
    <!-- Success Alert -->
    <div
      class="alert alert-success alert-dismissible fade show"
      role="alert"
      :style="{display: successAlert}"
    >
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">
          <i class="fal fa-times"></i>
        </span>
      </button>
      <strong>Well Done!</strong>
      {{message}}
    </div>
    <!-- End Alert -->
    <!-- Fail Alert  -->
    <div
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      :style="{display: failAlert}"
    >
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">
<<<<<<< HEAD
          <i class="fal fa-trash-alt"></i>
=======
           <i class="fal fa-times"></i>
>>>>>>> develop
        </span>
      </button>
      <strong>Oh snap!</strong>
      {{message}}
    </div>
    <!-- End Alert -->
  </div>
</template>

<script>
<<<<<<< HEAD
  import { watch } from "fs";
  export default {
    props: {
      show: {
        type: Boolean
      },
      message: {
        type: String
      },
      typeAlert: {
        type: String
      }
    },
    data: () => ({
      failAlert: "none",
      successAlert: "none",
      type: ""
    }),

    watch: {
      show: function() {
        if (this.typeAlert === "success") {
          this.successAlert = "block";
        } else if (this.typeAlert === "fail") {
          this.failAlert = "block";
        }
        setTimeout(() => {
          this.successAlert = "none";
          this.failAlert = "none";
        }, 2000);
      }
    }
  };
</script>
<style scoped>
  .fixed {
    position: absolute;
    top: 0;
    left: 600px;
    z-index: 1;
  }
=======
import { watch } from "fs";
export default {
  props: {
    show: {
      type: Boolean
    },
    message: {
      type: String
    },
    typeAlert: {
      type: String
    }
  },
  data: () => ({
    failAlert: "none",
    successAlert: "none",
    type: ""
  }),

  watch: {
    show: function() {
      if (this.typeAlert === "success") {
        this.successAlert = "block";
      } else if (this.typeAlert === "fail") {
        this.failAlert = "block";
      }
      setTimeout(() => {
        this.successAlert = "none";
        this.failAlert = "none";
      }, 3000);
    }
  }
};
</script>
<style scoped>
.fixed {
  position: fixed;
  z-index: 10;
  bottom: 0;
  right: 0;
}
>>>>>>> develop
</style>