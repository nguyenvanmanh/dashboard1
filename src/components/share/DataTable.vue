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
      <template v-if="dataTable && dataTable.length !==0">
        <tr v-for="(template,i) in dataTable" :key="i" class="text-center">
          <template v-for="(header,i) in dataHeader">
            <td
              v-if="header.name !== '#' && header.dataFormat !== '' && header.dataFormat !== undefined"
              :key="i"
              style="max-width: 500px word-break: break-all;"
            >
              <div v-html="template[header.dataFormat]" ></div>
            </td>
            <slot v-else :name="header.name" :row="template"></slot>
          </template>
        </tr>
      </template>
      <template v-else>
        <tr class="text-center">
          <td :colspan="dataHeader.length"><h4>No data</h4></td>
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
      type: ""
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