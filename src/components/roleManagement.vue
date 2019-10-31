
<template>
  <div id="roleManagement">
    <v-data-table
      :headers="headers"
      :items="roleManagements"
      :items-per-page="10"
      :search="search"
      class="elevation-1"
      data-app
    >
      <template v-slot:top data-app>
        <v-toolbar flat color="white">
          <v-toolbar-title>Role Management</v-toolbar-title>
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

         

          <!--Implement popup dialog form-->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" value="false" dark class="mb-2" v-on="on">New Role Management</v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" v-if="computedDialog">
                      <label>Role ID</label>
                      <div>{{editedRole.roleId}}</div>
                    </v-col>
                    <v-col cols="12" v-else></v-col>
                    <v-col cols="12">
                      <label>Role Name</label>
                      <v-text-field required v-model="editedRole.roleName"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <label>Role Code</label>
                      <v-text-field required v-model="editedRole.roleCode"></v-text-field>
                    </v-col>
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
          <v-icon small class="mr-2" @click="editRole(item)">mdi-pencil</v-icon>
          <v-icon small class="mr-2" @click="editRole1(item)">mdi-settings-outline</v-icon>
        </v-row>
      </template>
      <!--End buttons -->
    </v-data-table>

    <!--Implement popup dialog form with drop downlist-->
    <v-dialog v-model="dialog2" scrollable max-width="500px">
      <v-card>
        <v-card-title>Select web page</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-checkbox-group v-model="dialogm1" column>
            <v-select
              v-model="e6"
              :menu-props="{ maxHeight: '400' }"
              multiple
              hint="Choose your webpage"
              persistent-hint
              :items="callWebPage"
              item-text="pagesName"
            ></v-select>
          </v-checkbox-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="close1">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--END Implement popup dialog form with drop downlist-->
  </div>
</template>

<script>
const base_ip_address = "http://172.30.56.57";
const base_port = 8081;
const base_url = `${base_ip_address}:${base_port}`;
const axios = require("axios");
export default {
  name: "roleManagement",
  data() {
    return {
      loading: true,
      dialog: false,
      seen: true,
      search: "",
      radios: "0",
      dialogm1: "",
      dialog2: false,
      editedIndex: -1,

      editedRole: {
        name: ""
      },
      defaultDept: {
        name: ""
      },

      defaultWeb: {
        name: ""
      },

      editedWeb: {
        name: ""
      },

      roleManagements: [],
      callWebPage: [],

      headers: [
        //columns names
        {
          text: "#",
          align: "left",

          value: "roleId"
        },
        { text: "Role Name", value: "roleName", sortable: true },
        { text: "Role Code", value: "roleCode", sortable: true },
        { text: "Action", value: "action", sortable: false }
      ]
    };
  },

  mounted() {
    //load all active departments when the app first starts
    let self = this;

    axios
      .get(`${base_url}/rest/getAllListRole`)

      .then(function(response) {
        self.roleManagements = response.data;
      })

      .catch(err => {
        // eslint-disable-next-line
        console.log(err);
      });

    axios
      .get(`${base_url}/rest/getAllListPages`)

      .then(function(response) {
        self.callWebPage = response.data;
      })

      .catch(err => {
        // eslint-disable-next-line
        console.log(err);
      });
  },

  computed: {
    formTitle() {
      //conditionals to render dialog title
      return this.editedIndex === -1
        ? "New Role Mangagment"
        : "Edit Role Mangagment";
    },
    computedDialog() {
      //if New Department dialog, then hide id and numOfEmployees
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
    editRole(role) {
      this.editedIndex = this.roleManagements.indexOf(role);
      this.editedRole = Object.assign({}, role);
      localStorage.setItem("roleId", role.roleId);
      this.dialog = true;
    },
    editRole1(role) {
      this.dialog2 = true;
      this.form = Object.assign({}, this.defaultDept);
      this.$refs.form.reset();
    },

    close1() {
      //close dialog2 with dropdownlist
      this.dialog2 = false;
    },

    close() {
      //close dialog
      this.dialog = false;
      setTimeout(() => {
        this.editedRole = Object.assign({}, this.defaultDept);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      //save dialog after edit
      if (this.editedIndex > -1) {
        Object.assign(this.roleManagements[this.editedIndex], this.editedRole);
        axios
          .post(`${base_url}/rest/updateRoleInfomation`, this.editedRole)
          .then(response => {
            if (response.status === 201) {
              alert(
                `Role Name ${this.editedRole.roleName} successfully modified!`
              );
              window.location.reload();
            }
          })
          .catch(error => {
            // eslint-disable-next-line
            console.log(error.response);
          });
      } else {
        this.roleManagements.push(this.editedRole);
        axios
          .post(`${base_url}/rest/insertRole`, this.editedRole)
          .then(response => {
            if (response.status === 201) {
              alert("New Role successfully added!");
              window.location.reload();
            }
          });
      }
      this.close();
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
background-color: #1E90FF;}
</style>
