<template>
  <!-- datatable start -->

  <table
    id="dt-basic-example"
    class="table table-bordered table-hover table-striped w-100"
  >
    <thead>
      <tr>
        <th
          v-for="(header, i) in dataHeader"
          :key="i"
          class="text-center"
          :style="`width:${header.width}%`"
        >
          {{ header.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="dataTable && dataTable.length !== 0">
        <tr v-for="(template, i) in dataTable" :key="i" class="text-center">
          <template v-for="(header, i) in dataHeader">
            <td
              v-if="
                header.name !== '#' &&
                  header.dataFormat !== '' &&
                  header.dataFormat !== undefined
              "
              :key="i"
              style="max-width: 400px ; word-break: break-all;"
            >
              <template
                v-if="
                  template[header.dataFormat] &&
                    template[header.dataFormat].length < 70
                "
              >
                <div v-html="template[header.dataFormat]"></div>
              </template>
              <template v-else-if="template[header.dataFormat]">
                <div
                  v-if="header.toolTip"
                  v-html="template[header.dataFormat].slice(0, 70) + '...'"
                  :data-tooltip="template[header.dataFormat]"
                ></div>
                <div
                  v-else-if="typeof template[header.dataFormat] == 'string'"
                  v-html="template[header.dataFormat].slice(0, 70) + '...'"
                ></div>
                <div v-else v-html="template[header.dataFormat]"></div>
              </template>
            </td>
            <slot v-else :name="header.name" :row="template"></slot>
          </template>
        </tr>
      </template>
      <template v-else>
        <tr class="text-center">
          <td :colspan="dataHeader.length">
            <span data-tooltip="No data">
              <h3>No Data</h3>
            </span>
          </td>
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
    data: function(newVal, oldVal) {
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
/**
 * Tooltip Styles
 */
/* Add this attribute to the element that needs a tooltip */
[data-tooltip] {
  position: relative;
  z-index: 2;
  cursor: pointer;
}

/* Hide the tooltip content by default */
[data-tooltip]:before,
[data-tooltip]:after {
  visibility: hidden;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=0);
  opacity: 0;
  pointer-events: none;
}

/* Position tooltip above the element */
[data-tooltip]:before {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-bottom: 5px;
  margin-left: -80px;
  padding: 7px;
  width: 160px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background-color: #000;
  background-color: hsla(0, 0%, 20%, 0.9);
  color: #fff;
  content: attr(data-tooltip);
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
}

/* Triangle hack to make tooltip look like a speech bubble */
[data-tooltip]:after {
  position: absolute;
  bottom: 150%;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 5px solid #000;
  border-top: 5px solid hsla(0, 0%, 20%, 0.9);
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
}

/* Show tooltip content on hover */
[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
  filter: progid: DXImageTransform.Microsoft.Alpha(Opacity=100);
  opacity: 1;
}</style
>>
