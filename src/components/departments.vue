
<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="departments"
        :items-per-page="10"
        :search="search"
        class="elevation-1"
        data-app
      >
        <template v-slot:top data-app>
          <v-toolbar flat color="white">
            <v-toolbar-title>Department Management</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>

            <!--Implement Active and All radio buttons-->
            <!-- <v-radio-group v-model="radios" row :mandatory="false">
            <v-radio label="Active" value="0">Active</v-radio>
            <v-radio label="All" value="1">All</v-radio>
            </v-radio-group>-->
            <!--End radio buttons-->

            <!--Implement popup dialog form-->
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-icon large dark color="blue lighten-2" v-on="on">library_add</v-icon>
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
                        <div>{{editedDept.id}}</div>
                      </v-col>
                      <v-col cols="12" v-else></v-col>
                      <v-col cols="12">
                        <label>Department Name</label>
                        <v-text-field required v-model="editedDept.name"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <label>Department Code</label>
                        <v-text-field required v-model="editedDept.code"></v-text-field>
                      </v-col>
                      <v-col cols="12" v-if="computedDialog">
                        <label>Department Status:</label>
                        <!-- <span>{{editedDept.isActivated===0? "Inactive": "Active"}}</span> -->
                        <span>
                          <v-radio-group v-model="row" row>
                            <v-radio label="Active" value="active"></v-radio>
                            <v-radio label="Inactive" value="inactive"></v-radio>
                          </v-radio-group>
                        </span>
                      </v-col>
                      <v-col cols="12" class="my-2" v-if="computedDialog">
                        <label>Number of Employees:</label>
                        <span> {{editedDept.numberOfEmployee}} employees </span>
                        <div class="add_remove_employee-Icons">
                          <router-link :to="'/departments/editEmployee/add/'+ editedDept.id">
                            <v-icon md class="mr-2">mdi-account-plus</v-icon>
                          </router-link>
                          <router-link :to="'/departments/editEmployee/delete/'+ editedDept.id">
                            <v-icon md class="mr-2">mdi-account-remove</v-icon>
                          </router-link>
                        </div>
                      </v-col>
                      <v-col cols="12" v-else></v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>

                  <v-btn class="modal_bottom-buttons" text @click="close">Cancel</v-btn>
                  <v-btn class="modal_bottom-buttons" text @click="save" type="submit">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div class="flex-grow-1"></div>
            <!--End popup dialog-->
            <!-- Implement dropdown-->

            <v-select
              v-model="enabled"
              :items="dropdown_status"
              label="Department Status"
              clearable
              style="margin-top: 24px; width: 100px"
            ></v-select>

            <!--end dropdown-->

            <v-divider class="mx-4" inset vertical></v-divider>
            <!-- Implement search bar-->

            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search by name, code"
              single-line
              hide-details
            ></v-text-field>

            <!--End searchbar-->
          </v-toolbar>
        </template>
        <!--Implement edit, deactivate and reactivate buttons for each department-->

        <template v-slot:item.action="{ item }">
          <v-row>
            <v-icon class="mr-2" @click="editDept(item)">mdi-pencil</v-icon>

            <v-col v-if="item.isActivated == 1">
              <v-icon class="mr-2" @click="deactivateDept(item)">mdi-lock-open</v-icon>
            </v-col>

            <v-col v-else>
              <v-icon class="mr-2" @click="reactivateDept(item)">mdi-lock</v-icon>
            </v-col>
          </v-row>
        </template>

        <!--End buttons -->
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import * as API from "../service/API";
import axios from "axios";
const base_url = API.BASEURL;
import DepartmentApiService from "../service/department-api-service";

export default {
  name: "department",
  data() {
    return {
      loading: true,
      error: false,
      dialog: false,
      seen: true,
      enabled: "",
      search: "",
      radios: "0",
      editedIndex: -1,
      editedDept: {
        name: "",
        numberOfEmployee: 0
      },
      defaultDept: {
        name: "",
        numberOfEmployee: 0
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
        { text: "Department Name", value: "name", sortable: true },
        { text: "Department Code", value: "code", sortable: true },
        { text: "Number of Employees", value: "numberOfEmployee" },

        { text: "Action", value: "action", sortable: false }
      ],
      dropdown_status: [
        { text: "Active", callback: () => console.log("list") },
        { text: "Inactive", callback: () => console.log("favorite") },
        { text: "All", callback: () => console.log("favorite") }
      ]
    };
  },

  mounted() {
    //load all departments on screen when the app first starts
    let self = this;
    DepartmentApiService.getAllDepartments().then(
      resJson => (self.departments = resJson)
    );
    // this.loading = false;
  },

  computed: {
    formTitle() {
      //render dialog title
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
    computedDialog() {
      //if 'New Department' dialog, then hide id and numberOfEmployee
      //else don't hide
      if (this.editedIndex === -1) {
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
    // radios: "changeDeptStatus"
    enabled: "changeDeptStatus"
  },

  methods: {
    // employeeEditRoute(status) {
    //   //when clicked on Edit button in each dept
    //   //status can be either delete - or add + existing employee
    //   this.$router.push("/departments/editEmployee" + status);
    // },

    editDept(dept) {
      this.editedIndex = this.departments.indexOf(dept);
      this.editedDept = Object.assign({}, dept);
      this.dialog = true;
    },

    deactivateDept(dept) {
      confirm("Are you sure you want to deactivate this department?") &&
        DepartmentApiService.deactivateDepartment(dept).catch(err => {
          this.error = err;
          console.log(this.error);
        });
    },

    reactivateDept(dept) {
      //send back to db the updated status

      confirm("Are you sure you want to reactivate this department?") &&
        DepartmentApiService.reactivateDepartment(dept).catch(err => {
          this.error = err;
          console.log(this.error);
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
      //save dialog after edit/add info
      if (this.editedIndex > -1) {
        Object.assign(this.departments[this.editedIndex], this.editedDept);
        DepartmentApiService.updateDepartment(this.editedDept).catch(error => {
          alert(` ${error.response.data}`);
          // window.location.reload();
        });
      } else {
        axios
          .post(`${base_url}/rest/insertDepartment`, this.editedDept)
          .then(response => {
            if (response.status === 201) {
              alert("New Department successfully added!");
            }
          })
          .catch(error => {
            // eslint-disable-next-line
            alert(` ${error.response.data}`);

            window.location.reload(); //need to fix: update without loading
          });
      }
      this.close();
    },

    changeDeptStatus() {
      //Active vs Inactive Department-> load corresponding data
      let self = this;
      //O is inactive dept
      if (this.enabled === "All") {
        axios
          .get(`${base_url}/rest/getListAllDepartment`)

          .then(function(response) {
            self.departments = response.data;
          })

          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      }
      if (this.enabled === "Active") {
        axios
          .get(`${base_url}/rest/getListDepartmentInActive`)

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
.status-dropdown {
  position: relative;
  top: 4px;
  margin-right: 10px;
  padding-top: 7px;
}
button {
  margin-right: 3px;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #1e90ff;
}
.modal_bottom-buttons {
  color: #1e90ff;
}
.displayError {
  color: red;
}
</style>
