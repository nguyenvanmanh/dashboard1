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
            <!-- Implement search bar-->
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
            <!--End searchbar-->
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" class="elevation-1" :search="search">
            <template v-slot:item.index="{ item }">
              <!-- {{dem}} -->
              {{desserts.map(function(x) {
              return x.customerEmail;
              }).indexOf(item.customerEmail)+1}}
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
const base_ip_address = "http://192.168.32.88";
const base_port = 8081;
const base_url = `${base_ip_address}:${base_port}`;
export default {
  data() {
    return {
      dem: 1,
      dialog: false,
      radioGroup: 3,
      search: "",
      department: ["DU1", "DU2", "DU3"],
      headers: [
        {
          text: "Index",
          align: "left",
          value: "index"
        },
        { text: "Customer Name", value: "firstName" },
        { text: "Compapy", value: "company" },
        { text: "Email", value: "customerEmail" },
        { text: "Address", value: "address" }
      ],
      users: [],
      editedIndex: -1,
      desserts: []
    };
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
            "Content-Disposition": "attachment; filename='\test.xlsx\'",
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

