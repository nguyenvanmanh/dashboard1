
<template>

  <div id="app">
   
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
          <div class="flex-grow-1"></div>
          <!-- Implement search bar-->
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <!--End searchbar-->

          <!--Implement Active and All radio buttons-->
          <v-radio-group v-model="radios" row :mandatory="false">
            <v-radio label="Active" value="0">Active</v-radio>
            <v-radio label="All" value="1">All</v-radio>
          </v-radio-group>
          <!--End radio buttons-->

          <!--Implement popup dialog form-->
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
                      <label>Department Name</label>
                      <v-text-field required v-model="editedDept.departmentName"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <label>Department Code</label>
                      <v-text-field required v-model="editedDept.departmentCode"></v-text-field>
                    </v-col>
                    <v-col cols="12"  v-if="computedDialog">
                      <label>Department Status:</label>
                      <span> {{editedDept.isActivated===0? "Inactive": "Active"}}</span>
                    </v-col>
                    <v-col cols="12" class="my-2" v-if="computedDialog">
                      <label>Number of Employees: </label>
                      <span>{{editedDept.numOfEmployees}}</span>
                      <!-- <router-link to="/departments/editEmployee/add/">
                        <v-icon small class="mr-2">mdi-plus</v-icon>
                      </router-link> -->
                       <!-- <router-link to="/departments/editEmployee/delete">
                        <v-icon small class="mr-2">mdi-minus</v-icon>
                      </router-link> -->

                       <router-link  :to="'/departments/editEmployee/add/'+ editedDept.departmentId">
                        <v-icon small class="mr-2">mdi-plus</v-icon>
                      </router-link>
                       <router-link  :to="'/departments/editEmployee/delete/'+ editedDept.departmentId">
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
          <!--End popup dialog-->
        </v-toolbar>
      </template>
      <!--Implement edit, delete and reactivate buttons for each department-->
      <template v-slot:item.action="{ item }">
        <v-row>
         
           <v-icon small class="mr-2" @click="editDept(item)">mdi-pencil</v-icon>
          <v-col v-if="item.isActivated == 1">
            
            <v-icon small class="mr-2" @click="deleteDept(item)">mdi-delete</v-icon>
          </v-col>
          <v-col v-else>
            <v-icon small class="mr-2" @click="reactivate(item)">mdi-cached</v-icon>
          </v-col>
        </v-row>
      </template>
      <!--End buttons -->
    
    </v-data-table>
   
  </div>
  
</template>

<script>
const base_ip_address = "http://172.30.56.57"
const base_port = 8081
const base_url = `${base_ip_address}:${base_port}`

const axios = require("axios");
export default {
  name: "department",
  data() {
    return {
      loading: true,
      dialog: false,
      seen: true,
      search: "",
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
          value: "departmentId"
        },
        { text: "Department Name", value: "departmentName", sortable: true },
        { text: "Department Code", value: "departmentCode", sortable: true },
        { text: "Number of Employees", value: "numberOfEmployees" },
        
        { text: "Action", value: "action", sortable: false }
      ]
    };
  },

  mounted() {
    //load all active departments on screen when the app first starts
    let self = this;

    axios
      .get(`${base_url}/rest/getListDepartmentActive`)

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
      //conditionals to render dialog title
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
    computedDialog() {
      //if 'New Department' dialog, then hide id and numOfEmployees
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
    radios: "changeDeptStatus"
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
    deleteDept(dept) {
      //get id => click ok=> call API

      this.editedDept = Object.assign({}, dept);

      confirm("Are you sure you want to delete this department?") &&
        axios
          .post(`${base_url}/rest/inActiveDepartment`, this.editedDept)
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

    reactivate(dept){
      //change status of inactive department to 1
      //restore the 'delete' icon for the reactivated department
      dept.isActivated == 1;
      console.log('dept',dept)
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
            `${base_url}/rest/updateDepartmentInfomation`,
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
          .post(`${base_url}/rest/insertDepartment`, this.editedDept)
          .then(response => {
            if (response.status === 201) {
              alert("New Department successfully added!");
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
        axios
          .get(`${base_url}/rest/getListDepartmentActive`)

          .then(function(response) {
            self.departments = response.data;
          })

          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      } else {
        axios
          .get(`${base_url}/rest/getAllListDepartment`)

          .then(function(response) {
            // eslint-disable-next-line

            self.departments = response.data;
            // console.log("all department data", self.departments);
          })

          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      }
    },
    
    // clickAddEmployee() {
    //   // eslint-disable-next-line
    //   console.log("click add employee");
    // },
    // clickRemoveEmployee() {
    //   axios
    //     .get(`${base_url}/rest/getListEmployeeOfDepartment`)
    //     .then(res => {
    //       // eslint-disable-next-line
    //       console.log(res);
    //     });
    // }
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
    background-color: 	#1E90FF;}
</style>
