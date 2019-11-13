<template>
  <v-layout>
    <v-flex>
      <div>
        <label>
          File
          <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
        </label>
        <v-btn v-on:click="submitFile()">Submit</v-btn>
      </div>

      <div v-if="checkUpload === false" class="panel-tag">
        <span>File upload not success</span>
        <button
          style="margin-left: 10px" 
          type="button"
          class="btn btn-danger waves-effect waves-themed"
          @click="downloadFile()"
        >Download</button>
      </div>

      <div v-if="checkUpload === true" class="panel-tag">
        <span>File update success</span>
        <router-link to="/customerManagement" title="customerManagement" data-filter-tags="tables">
          <button style="margin-left: 10px"  type="button" class="btn btn-success waves-effect waves-themed"> Go To Management Customers</button>
        </router-link>
      </div>
      <template>
        <v-card>
          <v-card-title>Upload Customer</v-card-title>

          <div class="panel-container show">
            <div class="panel-content">
              <!-- datatable start -->
              <DataTable :data="desserts" :header="dataHeader">
                <template slot="#" slot-scope="dataRow">
                  <td>{{desserts.map(function(x) {return x.id; }).indexOf(dataRow.row.id) +count +1 }}</td>
                </template>
              </DataTable>
            </div>
          </div>
        </v-card>
        <alert-action :message="messageAlert" :typeAlert="typeAlert" :show="show"></alert-action>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
const base_ip_address = "http://192.168.32.88";
const base_port = 8081;
import * as API from "../service/API";
const base_url = API.BASEURL;
import AlertAction from "./share/Alert";
import DataTable from "./share/DataTable";

export default {
  data() {
    return {
      checkUpload: "",
      dem: 1,
      dialog: false,
      radioGroup: 3,
      search: "",
      department: ["DU1", "DU2", "DU3"],
      dataHeader: [
        {
          name: "#",
          dataFormat: "index",
          width: "5"
        },
        { name: "Customer Name", dataFormat: "firstName", width: "" },
        { name: "Compapy", dataFormat: "company", width: "" },
        { name: "Email", dataFormat: "email", width: "" },
        { name: "Address", dataFormat: "address", width: "15" }
      ],
      users: [],
      editedIndex: -1,
      desserts: [],
      messageAlert: "",
      typeAlert: "",
      show: true,
      count:0
    };
  },
  components: {
    DataTable,
    AlertAction
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      this.checkUpload="";
      axios
        .post(`${base_url}/email/cover-excel-to-FE`, formData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.desserts = response.data;
          this.messageAlert = "Upload success";
          (this.typeAlert = "success"), (this.show = !this.show);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },
    downloadFile() {
      window.open(`${base_url}/email/cover-excel-to-File`);
    },

    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(`${base_url}/email/cover-excel-to-DB`, formData, {
        })
        .then(response =>{
          if (response.data == true) {
            this.checkUpload = true;
          } else {
            this.checkUpload = false;
          }
        })
        .catch((e) => {
          
        });
    },

    initialize() {},

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    }
  }
};
</script>

<style scoped>
</style>

