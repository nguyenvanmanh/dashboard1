<template>
  <table id="myTable" class="table table-bordered table-hover w-100">
    <thead>
      <tr>
        <th style="width: 5%">#</th>
        <th style="width: 5%">id</th>
        <th style="width: 20%">Campaign Name</th>
        <th style="width: 30%">Description</th>
        <th style="width: 8%">Duration from</th>
        <th style="width: 8%">Duration To</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in campaigns" :key="record.title">
        <td :class="'row' + index">
          <span :class="!isEdit ? '':'hidden'">{{ index }}</span>
          <input type="text" :class="isEdit ? '':'hidden'" style="border: 2px solid lightred;" />
        </td>
        <td :class="'row' + index">
          <span :class="!isEdit ? '':'hidden'">{{ record.id }}</span>
          <input type="text" :class="isEdit ? '':'hidden'" style="border: 2px solid lightred;" />
        </td>
        <td :class="'row' + index">
          <span :class="!isEdit ? '':'hidden'">{{ record.title }}</span>
          <input type="text" :class="isEdit ? '':'hidden'" style="border: 2px solid lightred;" />
        </td>
        <td :class="'row' + index">
          <span :class="!isEdit ? '':'hidden'">{{ record.description }}</span>
          <input type="text" :class="isEdit ? '':'hidden'" style="border: 2px solid lightred;" />
        </td>
        <td :class="'row' + index">
          <span :class="!isEdit ? '':'hidden'">{{ record.startDate }}</span>
          <input type="text" :class="isEdit ? '':'hidden'" style="border: 2px solid lightred;" />
        </td>
        <td :class="'row' + index">
          <span :class="!isEdit ? '':'hidden'">{{ record.endDate }}</span>
          <input type="text" :class="isEdit ? '':'hidden'" style="border: 2px solid lightred;" />
        </td>

        <td class="action" style="display: flex; justify-content: space-around">
          <div class="tooltips">
            <i
              class="material-icons"
              style="color: orange; cursor: pointer"
              @click="updateTemplate(record, index)"
            >rounded_corner</i>
            <span class="tooltip-text">Change email template</span>
          </div>
          <div class="tooltips">
            <i
              class="material-icons"
              style="color: green; cursor: pointer"
              @click="updateTemplate(record.campaignId)"
            >supervised_user_circle</i>
            <span class="tooltip-text">Choose customers</span>
          </div>
          <div class="tooltips">
            <i
              class="material-icons"
              style="color: green; cursor: pointer"
              @click="updateTemplate(record.campaignId)"
            >email</i>
            <span class="tooltip-text">Send email</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  import axios from "axios";
  import * as API from "../../service/API";
  // import $ from "jquery";
  export default {
    data() {
      return {
        campaigns: [],
        isEdit: false,
        headers: [
          { text: "Id", align: "center", value: "campaignId" },
          { text: "Campaign Name", align: "center", value: "title" },
          {
            text: "Description",
            align: "center",
            value: "description",
            sortable: false
          },
          { text: "Duration From", align: "center", value: "startDate" },
          { text: "Duration To", align: "center", value: "endDate" }
        ]
      };
    },
    created() {
      axios
        .get(`${API.BASEURL}/email/get-all-topic`)
        .then(res => {
          this.templates = res.data;
          this.emailTemplates.titles = res.data.map(item => item.title);
          this.emailTemplates.ids = res.data.map(item => item.emaiTemplateId);
        })
        .catch(err => {
          // TODO: log this err
        });
      axios.get(`${API.BASEURL}/email/getAllCampaignDetail`).then(res => {
        res.data.map(item => {
          item.campaign.startDate = item.campaign.startDate.substring(0, 10);
          item.campaign.endDate = item.campaign.endDate.substring(0, 10);
          this.campaigns.push(item.campaign);
        });
        this.customers = res.data[0].customerList;
        this.customers.map(
          customer =>
            (customer.fullName = customer.firstName + " " + customer.lastName)
        );
      });
    },
    mounted() {
      $("#myTable").Datatable();
    },
    components: {},
    methods: {
      updateTemplate(record, index) {
        this.isEdit = !this.isEdit;
      }
    }
  };
</script>
<style scoped>
  .index {
    color: red;
    width: 25px !important;
  }
  tr td,
  th {
    text-align: center;
  }

  .tooltips {
    position: relative;
  }
  .tooltip-text {
    width: 150px;
    position: absolute;
    top: 25px;
    left: -65px;
    visibility: hidden;
    background-color: gray;
    color: #fff;
    text-align: center;
    padding: 0;
    border-radius: 10px;
    z-index: 1;
  }
  .tooltips:hover .tooltip-text {
    visibility: visible;
  }
  .hidden {
    display: none;
  }
</style>