<template>
  <!-- datatable start -->

  <table id="dt-basic-example" class="table table-bordered table-hover table-striped w-100">
    <thead>
      <tr>
        <th
          v-for="(header,i) in dataHeader"
          :key="i"
          class="text-center"
          :style="`width:${header.width}%`"
        >{{header.name}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(template,i) in dataTable" :key="i" class="text-center">
        <td>{{i+1}}</td>
        <template v-for="(header,i) in dataHeader">
            <td  v-if="header.name !== '#' && header.dataFormat !== '' && header.dataFormat !== undefined" :key="i" >{{template[header.dataFormat]}}</td>
        </template>
        <slot name="action" :row="template"></slot>
      </tr>
    </tbody>
  </table>
  <!-- datatable end -->

</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    header: {
      type: Array
    }
  },
  data: () => ({
    body_td: "",
    dataHeader: [],
    dataTable: [],
    failAlert: "none",
    successAlert: "none",
    type: ""
  }),

  watch: {
    data: function() {
      this.dataTable = this.data;
      this.dataHeader = this.header;
    }
  }
};
</script>
<style scoped>
.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>