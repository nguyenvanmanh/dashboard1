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
      <template v-if="dataTable.length !==0">
        <tr v-for="(template,i) in dataTable" :key="i" class="text-center">
          <td>{{i+1}}</td>
          <template v-for="(header,i) in dataHeader">
            <td
              v-if="header.name !== '#' && header.dataFormat !== '' && header.dataFormat !== undefined"
              :key="i"
            >
            <div v-html="template[header.dataFormat]"></div>
            </td>
          </template>
          <slot name="action" :row="template"></slot>
        </tr>
      </template>
      <template v-else>
        <tr class="text-center">
          <h4>No data</h4>
        </tr>
      </template>
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
    type: "",
    testData:"<p>asdfafsdfsf</p>"
  }),

  watch: {
    data: function() {
      this.dataTable = this.data;
      this.dataHeader = this.header;
    },
    dataHeader: function() {
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