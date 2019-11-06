<template>
  <v-app id="inspire">
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headersTitle"
          :items="users"
          :search="search"
          sort-by="userId"
          class="elevation-1"
          data-app
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>USER MANAGEMENT</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <!-- User management's Edit Information Table -->
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-icon large dark color="blue lighten-2" v-on="on">library_add</v-icon>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-col>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.username" label="UserName"></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.password"
                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Password"
                            counter
                            @click:append="show1 = !show1"
                          ></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.verified_password"
                            :append-icon="show1 ? 'visibility' : 'visibility_off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="Verify your password "
                            counter
                            @click:append="show1 = !show1"
                            required
                          ></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="editedItem.dob"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="editedItem.dob"
                                label="DOB"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="editedItem.dob" scrollable>
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(editedItem.dob)"
                              >OK</v-btn>
                            </v-date-picker>
                          </v-dialog>
                        </v-row>
                      </v-col>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!--End  User management's Edit Information Table -->
              <!-- Implement search bar-->
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
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
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle bg-trans-gradient"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >View Users</button>
                <div class="dropdown-menu">
                  <v-radio-group v-model="radios" row :mandatory="false" style="margin-top: 2%">
                    <v-radio class="dropdown-item" label="Inactive" value="0"></v-radio>
                    <v-radio class="dropdown-item" label="Active" value="1"></v-radio>
                    <v-radio class="dropdown-item" label="All" value="2"></v-radio>
                  </v-radio-group>
                </div>
              </div>
              <!--End radio buttons-->
            </v-toolbar>
          </template>
          <!--Action Icon-->
          <template v-slot:item.action="{ item }">
            <v-icon v-if="item.isActivated === 1" @click="showPopupForActive">mdi-lock-open-variant</v-icon>
            <v-icon v-if="item.isActivated === 0 || null" @click="showPopupForInactive">mdi-lock</v-icon>
            <v-icon @click="showDialog">mdi-account-edit-outline</v-icon>
            <v-icon @click="editItem(item)">mdi-pencil</v-icon>
          </template>
          <!-- End Action Icon-->
        </v-data-table>
        <!--Set Department table pop up (Icon is supervised_user_circle ) -->
        <v-dialog v-model="dialog1" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">User's Department & Role</span>
            </v-card-title>
            <v-card-text>
              <v-container id="dropdown-example">
                <v-row>
                  <v-col cols="12" sm="6">
                    <p>Department</p>
                    <v-overflow-btn
                      class="my-2"
                      :items="departmentName"
                      label="Trung tâm phần mềm 1"
                      target="#dropdown-example"
                    ></v-overflow-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <p>Role</p>
                    <v-overflow-btn
                      class="my-2"
                      :items="roleName"
                      label="Developer"
                      target="#dropdown-example"
                    ></v-overflow-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog1  = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="dialog1= false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!--End Set Department table pop up-->
        <!-- Show dialog for deactivating users -->
        <v-dialog v-model="dialog2" max-width="400px">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Deactivating User</v-card-title>
            <p></p>
            <v-card-text>Are you sure, you want to deactivate this user ?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="reactivate_deactivate(item)">I agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- /.End deactivating users -->
        <!-- Show dialog for activating users -->
        <v-dialog v-model="dialog3" max-width="400px">
          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>Activate User</v-card-title>
            <p></p>
            <v-card-text>Are you sure, you want to activate this user ?</v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="reactivate_deactivate(item)">I agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- /End activating users -->
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import axios from "axios";
import * as API from "../service/API";

export default {
  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      modal: false,
      check_activate: false,
      check_inactivate: false,
      show1: false,
      search: "",
      radios: "2",
      departmentName: [
        "DU1",
        "DU2",
        "DU3",
        "DU4",
        "DU5",
        "DU6",
        "DU7",
        "DU8",
        "DU9",
        "DU10",
        "DU11",
        "DU12"
      ],
      roleName: [
        "Admin",
        "Manager",
        "Teamlead",
        "PM",
        "BA",
        "SA",
        "Developer",
        "Tester",
        "Directer"
      ],
      headersTitle: [
        {
          text: "UserID",
          align: "left",
          sortable: false,
          value: "userId"
        },
        { text: "Firstname", value: "firstName" },
        { text: "Lastname", value: "lastName" },
        { text: "Email", value: "email" },
        { text: "UserName", value: "username" },
        // { text: "Password", value: "password" },
        { text: "Date of Birth", value: "dob" },
        { text: "Department", value: "departmentCodeAll" },
        { text: "Registed Date", value: "registeredDate" },
        // { text: "Activated Date", value: "activatedDate" },
        // { text: "End Date", value: "endDate" },
        { text: "Seniority", value: "seniority" },
        { text: "Actions", value: "action", sortable: false }
      ],
      users: [],
      editedIndex: -1,
      editedItem: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        dob: "",
        departmentCodeAll: "",
        registeredDate: ""
      },
      defaultItem: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        dob: "",
        departmentCodeAll: "",
        registeredDate: ""
      }
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
    },
    radios: "changeUsersStatus"
  },
  created() {
    this.initialize();
  },

  methods: {
    // get employee's information from database by using axios
    fetchUsers() {
      axios
        .get(API.BASEURL + "/rest/users/list", {
          headers: { Authorization: localStorage.getItem("token") }
        })
        .then(response => {
          this.users = response.data;
        });
    },
    initialize() {
      this.fetchUsers();
    },
    // Edit Employee's Information
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      localStorage.setItem("userId", item.userId);
      this.dialog = true;
    },
    // Show dialog "Set Department table pop up (Icon is supervised_user_circle )""
    showDialog() {
      this.dialog1 = true;
    },
    // Show dialog to deactivate users
    showPopupForInactive() {
      this.dialog2 = true;
    },
    // Show dialog to ctivate users
    showPopupForActive() {
      this.dialog3 = true;
    },
    // Close dilog Edited employee's information
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    // Save dialog Edited employee's information
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
        axios
          .post(API.BASEURL + "/rest/users/edit", this.editedItem)
          .then(response => {
            if (response.status === 200) {
              this.users.$set(this.editedItem);
            }
          });
      } else {
        this.users.push(this.editedItem);
        axios
          .post(API.BASEURL + "/rest/users/add", this.editedItem)
          .then(response => {
            if (response.status === 200) {
              this.users.$set(this.editedItem);
            }
          });
      }
      this.close();
    },
    //Active & Inactive Users Button
    changeUsersStatus() {
      //Active vs Inactive Users-> load corresponding data
      let self = this;
      //O is inactive dept
      if (this.radios === "1") {
        axios
          .get(`${API.BASEURL}/rest/users/list/1`)

          .then(function(response) {
            self.users = response.data;
          })
          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      }
      if (this.radios === "0") {
        axios
          .get(`${API.BASEURL}/rest/users/list/0`)

          .then(function(response) {
            // eslint-disable-next-line
            self.users = response.data;
          })

          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      }
      if (this.radios === "2") {
        axios
          .get(`${API.BASEURL}/rest/users/list`)

          .then(function(response) {
            // eslint-disable-next-line
            self.users = response.data;
          })

          .catch(err => {
            // eslint-disable-next-line
            console.log(err);
          });
      }
    },
    //Reactivate && deactivate Users
    reactivate_deactivate(item) {
      axios
        .post(API.BASEURL + "/rest/users/activate-deactivate-user", item)
        .then(response => {
          if (response.status === 201) {
            this.users.$set(this.item);
          }
        });
    }
  }
};
</script>

<style scoped>
.v-application .primary {
  background-color: #1e90ff !important;
}
</style>

