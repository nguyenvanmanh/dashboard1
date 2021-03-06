<template>
  <div id="department">
    <v-data-table
      :headers="headers"
      :items="departments"
      :items-per-page="10"
      class="elevation-1"
      data-app
    >
      <template v-slot:top data-app>
        <v-toolbar flat color="white">
          <v-toolbar-title>Department Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>

          <v-radio-group v-model="radios" row :mandatory="false">
            <v-radio label="Active" value="0">Active</v-radio>
            <v-radio label="All" value="1">All</v-radio>
          </v-radio-group>

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Department</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" v-if="computedDialog">
                      <label>Department ID</label>
                      <div>{{editedDept.departmentId}}</div>
                    </v-col>
                    <v-col cols="12" v-else></v-col>
                    <v-col cols="12">
                      <label>Department name</label>
                      <v-text-field required v-model="editedDept.departmentName"></v-text-field>
                    </v-col>
                    <v-col cols="12" class="my-2" v-if="computedDialog">
                      <label>Number of Employees</label>
                      <span>{{editedDept.numberOfEmployees}}</span>

                      <router-link to="/department/editEmployee">
                        <v-icon small class="mr-2">mdi-plus</v-icon>
                      </router-link>
                      <router-link to="/department/editEmployee">
                        <v-icon small class="mr-2">mdi-minus</v-icon>
                      </router-link>
                    </v-col>
                    <v-col cols="12" v-else></v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>

                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }" v-if="computeDeptStatus">
        <v-icon small class="mr-2" @click="editDept(item)">mdi-pencil</v-icon>
        <v-icon small class="mr-2" @click="deleteDept(item)">mdi-delete</v-icon>
      </template>
      <template v-else>
        <v-container fluid>
          <v-switch v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"></v-switch>
          <v-switch v-model="switch2" :label="`Switch 2: ${switch2.toString()}`"></v-switch>
        </v-container>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "department",
  data() {
    return {
      dialog: false,
      seen: true,
      deptsStatus: 1,
      radios: "0",
      editedIndex: -1,
      editedDept: {
        name: "",
        numOfEmployees: 0
      },
      defaultDept: {
        name: "",
        numOfEmployees: 0
      },
      departments: [],
      headers: [
        //columns names
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "id"
        },
        { text: "Department Name", value: "departmentName", sortable: true },
        { text: "Number of Employees", value: "numberOfEmployees" },

        { text: "Action", value: "action", sortable: false }
      ]
    };
  }, //end of data

  // serializeId(id) {

  // },

  mounted() {
    //load all active departments when the app first starts
    let self = this; //closure

    axios
      .get("http://192.168.9.171:8081/rest/getListDepartmentActive")

      .then(function(response) {
        self.departments = response.data;
      })

      .catch(err => {
        // eslint-disable-next-line
        console.log(err);
      });
  },

  computed: {
    formTitle() {
      //conditionals for dialog title
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
    computedDialog() {
      //if New Department dialog, then hide id and numOfEmployees
      //else don't hide
      if (this.editedIndex === -1) {
        return this.seen == false;
      } else {
        return this.seen == true;
      }
    },
    computeDeptStatus() {
      //if department status is 0 (inactive), hide Edit and Delete buttons
      //if department status is 1 (active), leave them be
      if (this.editedDept.status === 0) {
        return this.seen == false;
      } else {
        return this.seen == true;
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    radios: "changeDeptStatus"
  },

  methods: {
    editDept(dept) {
      this.editedIndex = this.departments.indexOf(dept);
      this.editedDept = Object.assign({}, dept);
      this.dialog = true;
    },
    deleteDept(dept) {
      //get id => click ok=> call API

      this.editedDept = Object.assign({}, dept);

      confirm("Are you sure you want to delete this department?") &&
        axios
          .post(
            `http://192.168.9.171:8081/rest/inActiveDepartment`,
            this.editedDept
          )
          .then(response => {
            if (response.status === 201) {
              alert(
                `Deleted department ${this.editedDept.departmentName} successfully!`
              );
              window.location.reload();
            }
          })

          .catch(error => {
            // eslint-disable-next-line
            console.log(error.response);
          });
    },

    close() {
      //close dialog
      this.dialog = false;
      setTimeout(() => {
        this.editedDept = Object.assign({}, this.defaultDept);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      //save dialog after edit
      if (this.editedIndex > -1) {
        Object.assign(this.departments[this.editedIndex], this.editedDept);
        axios
          .post(
            "http://192.168.9.171:8081/rest/updateDepartmentInfomation",
            this.editedDept
          )
          .then(response => {
            if (response.status === 201) {
              alert(
                `Department ${this.editedDept.departmentName} successfully modified!`
              );
              window.location.reload();
            }
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error.response);
          });
      } else {
        this.departments.push(this.editedDept);
        axios
          .post(
            "http://192.168.9.171:8081/rest/insertDepartment",
            this.editedDept
          )
          .then(response => {
            if (response.status === 201) {
              alert(`New Department successfully added!`);
              window.location.reload();
            }
          });
      }
      this.close();
    },

    changeDeptStatus() {
      //Active vs Inactive Department-> load corresponding data
      let self = this;
      //O is inactive dept
      if (this.radios === "0") {
        console.log("made it to active");
        axios
          .get("http://192.168.9.171:8081/rest/getListDepartmentActive")

          .then(function(response) {
            self.departments = response.data;
          })

          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      } else {
        console.log("made it to all");
        axios
          .get("http://192.168.9.171:8081/rest/getAllListDepartment")

          .then(function(response) {
            self.departments = response.data;
          })

          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      }
    }
  }
};
</script>
<style scoped>
#department {
  max-width: 950px;
}

.status-dropdown {
  position: relative;
  top: 4px;
  margin-right: 10px;
  padding-top: 7px;
}
button {
  margin-right: 3px;
}
</style>
