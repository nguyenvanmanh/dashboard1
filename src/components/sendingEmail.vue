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

      <template>
        <v-card>
          <v-card-title>
            Upload Customer
          </v-card-title>

          <div class="panel-container show">
            <div class="panel-content">
              <!-- datatable start -->
              <DataTable :data="desserts" :header="dataHeader">
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
      messageAlert:"",
      typeAlert:"",
      show: true
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
      axios
        .post(`${base_url}/email/cover-excel-to-FE`, formData, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.desserts = response.data;
          this.messageAlert = "Upload success"
          this.typeAlert="success",
          this.show = !this.show
          console.log(response)
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },

    submitFile() {
      let formData = new FormData();
      formData.append("file", this.file);
      axios
        .post(`${base_url}/email/cover-excel-to-DB`, formData, {
          headers: {
            "Content-Type": "application/vnd.ms-excel",
            "Content-Disposition": "attachment; filename='\test.xlsx'"
          }
        })
        .then(function(response) {
          window.open(`${base_url}/email/cover-excel-to-File`);
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!!");
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

