<template>
  <div>
    <v-card style="z-index: 1;">
      <v-toolbar extension-height flat fruid>
        <v-toolbar-title class="btn-group">
          <p>Department Management</p>
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="btn-group">
          <v-btn color="grey" class="ma-1" dark @click="dialog = true">
            <v-icon
              medium
              dark
              color="grey lighten-2"
              v-on="on"
              title="Add new department"
            >library_add</v-icon>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-divider class="mx-4" inset vertical></v-divider>
        <!-- Implement search bar-->
        <!-- <v-toolbar-items> -->
        <div class="btn-group">
          <v-text-field
            light
            v-model="search"
            clearable
            flat
            prepend-inner-icon="search"
            label="Search by name, code"
            hide-details
            single-line
          ></v-text-field>
        </div>
        <!--End searchbar-->

        <!-- Implement status dropdown-->
        <!-- <v-select
            v-model="enabled"
            :items="dropdown_status"
            label="Department Status"
            clearable
            style=" width: 100px"
        ></v-select>-->
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="btn-group">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{actionDisplay}}</button>
          <div class="dropdown-menu">
            <button class="dropdown-item" @click="active">Active</button>
            <button class="dropdown-item" @click="inactive">Inactive</button>
            <button class="dropdown-item" @click="all">All</button>
          </div>
        </div>
        <!-- </v-toolbar-items> -->
        <!--End dropdown-->
      </v-toolbar>
    </v-card>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-content>
      <v-card>
        <template>
          <!-- <v-container>
            <v-data-iterator
              :items="departments"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search"
              hide-default-footer
          >-->
          <template>
            <v-data-table
              :headers="headers"
              :items="departments"
              :sort-desc="[false, true]"
              :items-per-page="sizePage"
              :search="search"
              hide-default-footer
              multi-sort
              class="elevation-1"
              data-app
            >
              <!--Implement edit, deactivate and reactivate buttons for each department-->
              <template v-slot:item.action="{ item }">
                <v-row>
                  <v-icon class="mr-2" @click="editDept(item)" title="Edit Department">mdi-pencil</v-icon>
                  <v-col v-if="item.isActivated == 1">
                    <v-icon
                      class="mr-2"
                      @click="deactivateDept(item)"
                      title="Active Department"
                    >mdi-lock-open-variant</v-icon>
                  </v-col>
                  <v-col v-else>
                    <v-icon
                      class="mr-2"
                      @click="reactivateDept(item)"
                      title="InactiveDepartment"
                    >mdi-lock</v-icon>
                  </v-col>
                </v-row>
              </template>
              <!--End buttons -->
            </v-data-table>
          </template>
          <!-- </v-data-iterator>
          </v-container>-->
        </template>
      </v-card>
    </v-content>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-card class="text-center">
      <!-- pagination start -->
      <Pagination :clickHandler="clickCallback" :totalPages="totalPages" :sizePage="[5, 10, 15]"></Pagination>
      <!-- pagination end -->
    </v-card>
    <v-dialog v-model="dialogConfirmation" max-width="20%">
      <v-card>
        <v-card-title class="headline">Message</v-card-title>

        <v-card-text>Are you sure?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="grey darken-1" text @click="dialogConfirmation = false">Disagree</v-btn>
          <v-btn color="grey darken-1" text @click="dialogConfirmation = false">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Begin Dialog -->
    <v-dialog
      v-model="dialog"
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
      max-width="30%"
      max-height="50%"
    >
      <v-card>
        <v-toolbar flat dark color="white" height="auto">
          <v-card-title>
            <span class="headline">{{ formTitleDialog1 }}</span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" v-if="computedDialog">
                <div>
                  <label>Department ID</label>
                </div>
                <div>{{ editedDept.id }}</div>
              </v-col>
              <v-col cols="12" v-else></v-col>
              <v-col cols="12">
                <v-text-field label="Name" v-model="editedDept.name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Code" v-model="editedDept.code"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-radio-group v-model="picked" row>
                  {{ radioactive }}
                  <v-radio label="Active" value="1"></v-radio>
                  <v-radio label="Inactive" value="0"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" class="my-2" v-if="computedDialog">
                <v-row no-gutters>
                  <v-col cols="5">
                    <label>Number of Employees :&nbsp;&nbsp;&nbsp;&nbsp; {{ editedDept.numberOfEmployee }}</label>
                  </v-col>
                  <v-col>
                    <div class="add_remove_employee-Icons">
                      &nbsp;&nbsp;&nbsp;
                      <v-tooltip>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            md
                            class="mr-2"
                            @click="actionAddEmployee()"
                            title="Add new employees into department"
                          >mdi-account-plus</v-icon>
                        </template>
                        Add new employees into department
                      </v-tooltip>&nbsp;
                      <v-tooltip>
                        <template v-slot:activator="{ on }">
                          <v-icon
                            md
                            class="mr-2"
                            @click="actionRemoveEmployee()"
                            title="Remove employees from department"
                          >mdi-account-minus</v-icon>
                        </template>
                        Remove employees from department
                      </v-tooltip>
                      <!-- <router-link
                        :to="
                            '/departments/editEmployee/delete/' + editedDept.id
                          "
                        title="Remove employee"
                      >
                        <v-icon md class="mr-2">mdi-account-remove</v-icon>
                      </router-link>-->
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" v-else></v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn class="modal_bottom-buttons" text @click="dialog = false">Cancel</v-btn>
          <v-btn cass="modal_bottom-buttons" text @click="save" type="submit">Save</v-btn>
        </v-card-actions>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
    <!-- Dialog #2. Show list employee -->
    <v-dialog v-model="dialog2" scrollable max-width="60%" max-height="60%" justify="center">
      <v-card>
        <v-toolbar flat dark color="primary" height="auto">
          <v-toolbar-title>
            <span class="headline">{{ formTitleDialog2 }}</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- Implement search bar-->
          <div class="btn-group">
            <v-text-field
              v-model="search"
              clearable
              flat
              prepend-inner-icon="search"
              label="Search by name, code"
              hide-details
              single-line
            ></v-text-field>
          </div>
          <!--End searchbar-->
          <!-- Implement icon close-->
          <v-btn icon dark @click="dialog2 = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <!-- End icon close -->
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-data-table
            v-model="selected"
            :headers="headersDialog"
            :items="employees"
            :sort-desc="[false, true]"
            :items-per-page="sizePageDialog"
            :search="searchDialog"
            item-key="userId"
            hide-default-footer
            multi-sort
            class="elevation-1"
            data-app
            show-select
          >
            <!--Add Employee to Department-->
            <template v-if="this.actionIndex==1" v-slot:item.action="{ item }">
              <v-icon @click="submitEmployeeToDept()">add</v-icon>
            </template>
            <!--Remove Employee from Department -->
            <template v-slot:item.action="{ item }" v-else>
              <v-icon @click="removeEmployeeFromDept()">delete</v-icon>
            </template>
          </v-data-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <!--  -->
          <!-- <v-btn color="primary" text @click="dialog2 = false">Back</v-btn>
          <v-spacer></v-spacer>-->
          <!-- pagination start -->
          <Pagination :clickHandler="clickCallbackDialog2" :totalPages="5" :sizePage="[5, 10, 15]"></Pagination>
          <!-- pagination end -->
        </v-card-actions>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn class="modal_bottom-buttons" text @click="dialog2 = false">Back</v-btn>
          <v-btn class="modal_bottom-buttons" text @click="save" type="submit">Save</v-btn>
        </v-card-actions>
      </v-card>
      <alert :message="messageAlert" :typeAlert="typeAlert" :show="show"></alert>
    </v-dialog>
    <template></template>
  </div>
</template>
<script>
import * as API from "../service/API";
import Alert from "./share/Alert";
import DepartmentApiService from "../service/department-api-service";
import EditEmployee from "./editEmployee";
import Pagination from "./share/Pagination";
import { mdiAccount } from "@mdi/js";
export default {
  name: "department",
  components: { EditEmployee, Pagination, Alert },
  data() {
    return {
      actionDisplay: "",
      itemsPerPageArray: [5, 10, 15],
      page: 1,
      itemsPerPage: 5,
      svgPath: mdiAccount,
      employeeDialog: false, // This value is set to the value emitted by the child Employee Dialog
      loading: true,
      currentPage: 1,
      sizePage: 10,
      totalPages: 0,
      // total page dialog
      totalPagesDialog: 0,
      // size page dialog
      sizePageDialog: 5,
      error: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      seen: true,
      enabled: "",
      search: "",
      // variable for dialog
      searchDialog: "",
      picked: "",
      editedIndex: -1,
      actionIndex: -1,
      editedDept: {
        name: "",
        code: "",
        isActivated: "",
        numberOfEmployee: 0
      },
      defaultDept: {
        name: "",
        code: "",
        isActivated: "",
        numberOfEmployee: 0
      },
      departments: [],
      selected: [],
      employees: [],
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
      headersDialog: [
        //columns names
        {
          text: "#",
          align: "left",
          sortable: false,
          value: "userId"
        },
        { text: "First Name", value: "firstName", sortable: true },
        { text: "Last Name", value: "lastName", sortable: true },
        { text: "User Name", value: "username", sortable: true },
        { text: "Email", value: "email" },
        { text: "Seniority", value: "seniority" },
        { text: "Action", value: "action" }
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
    this.actionDisplay = "All";
    DepartmentApiService.getAllDepartments(
      this.currentPage,
      this.sizePage
    ).then(function(resJson) {
      console.log(resJson.list);
      console.log(resJson.pages);
      self.departments = resJson.list;
      self.totalPages = resJson.pages;
    });
  },

  computed: {
    formTitleDialog1() {
      //render dialog1 title
      return this.editedIndex === -1 ? "New Department" : "Edit Department";
    },
    formTitleDialog2() {
      //render dialog2 title
      return this.actionIndex === 1 ? "Add Employee" : "Remove Employee";
    },
    computedDialog() {
      //if 'New Department' dialog, then hide id and numberOfEmployee
      //else don't hide
      if (this.editedIndex === -1) {
        return this.seen == false;
      } else {
        return this.seen == true;
      }
    },
    radioactive() {
      this.editedDept.isActivated == 1
        ? (this.picked = "1")
        : (this.picked = "0");
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    enabled: "renderListOfDepts"
  },

  methods: {
    submitEmployeeToDept() {
      // let self = this;
      // if (this.selected.length == 0) {
      //   alert("Please select an employee to add!");
      //   return;
      // }
      let selectedEmployeesToAdd = this.selected.slice();
      console.log("selectedEmployeesToAdd", selectedEmployeesToAdd);
      //add the new departmentId to the departments array
      for (let i = 0; i < selectedEmployeesToAdd.length; i++) {
        //loop through each employee object in the selectedEmployees array
        //find the departments array
        //push the departmentId that the selected employees need to be added to
        selectedEmployeesToAdd[i]["departments"].unshift({
          id: Number(this.editedDept.id)
        });
      }
      axios
        .post(
          `${base_url}/rest/addNewEmployeeToDepartment`,
          selectedEmployeesToAdd
        )
        .then(function(response) {
          //add an array of "selected" employees to the selected department
          if (response.status == 201) {
            console.log("Success");
            //window.location.reload(); //needs to re-render without reloadinig page
          }
        })
        .catch(err => console.log(err));
    },
    removeEmployeeFromDept() {
      //repeated code - need refactoring!
      // if (this.selected.length == 0) {
      //   alert("Please select an employee to remove!");
      //   return;
      // }
      let selectedEmployeesToRemove = this.selected.slice();
      for (let i = 0; i < selectedEmployeesToRemove.length; i++) {
        selectedEmployeesToRemove[i]["departments"].unshift({
          departmentId: Number(this.$props.departmentId)
        });
      }
      axios
        .post(
          `${base_url}/rest/removeEmployeeFromDepartment`,
          selectedEmployeesToRemove
        )
        .then(function(response) {
          if (response.status == 201) {
            //window.location.reload();
          }
        })
        .catch(err => console.log(err));
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    clickCallback(targetPage, sizeOfItem) {
      console.log(targetPage);
      console.log(sizeOfItem);
      let self = this;
      if (this.actionDisplay === "All") {
        DepartmentApiService.getAllDepartments(targetPage, sizeOfItem).then(
          function(resJson) {
            console.log(resJson.list);
            console.log(resJson.pages);
            self.departments = resJson.list;
            self.totalPages = resJson.pages;
            self.sizePage = resJson.pageSize;
          }
        );
      }
      if (this.actionDisplay === "Active") {
        DepartmentApiService.getListDepartmentActive(
          targetPage,
          sizeOfItem
        ).then(function(resJson) {
          console.log(resJson.list);
          console.log(resJson.pages);
          self.departments = resJson.list;
          self.totalPages = resJson.pages;
          self.sizePage = resJson.pageSize;
        });
      }
      if (this.actionDisplay === "Inactive") {
        DepartmentApiService.getListDepartmentInActive(
          targetPage,
          sizeOfItem
        ).then(function(resJson) {
          console.log(resJson.list);
          console.log(resJson.pages);
          self.departments = resJson.list;
          self.totalPages = resJson.pages;
          self.sizePage = resJson.pageSize;
        });
      }
    },
    clickCallbackDialog(targetPage, sizeOfItem) {
      console.log(targetPage);
      console.log(sizeOfItem);
      let self = this;
      if (this.actionIndex == 1) {
        DepartmentApiService.getListEmployeeNotInDepartment(
          targetPage,
          sizeOfItem
        ).then(function(resJson) {
          console.log(resJson.list);
          console.log(resJson.pages);
          //self.employees = resJson.list;
          self.totalPages = resJson.pages;
          self.sizePage = resJson.pageSize;
        });
      }
    },
    onAddEmployee(value) {
      this.employeeDialog = value;
    },

    editDept(dept) {
      this.editedIndex = this.departments.indexOf(dept);
      this.editedDept = Object.assign({}, dept);
      this.dialog = true;
    },

    deactivateDept(dept) {
      let self = this;
      confirm("Are you sure you want to deactivate this department?") &&
        DepartmentApiService.deactivateDepartment(dept)
          .then(function(resJson) {
            console.log("resJson:", resJson);
            self.departments = resJson.list;
            self.totalPages = resJson.pages;
            self.actionDisplay = "Inactive";
          })
          .catch(err => {
            this.error = err;
            console.log(this.error);
          });
    },

    reactivateDept(dept) {
      let self = this;
      //send back to db the updated status

      confirm("Are you sure you want to reactivate this department?") &&
        DepartmentApiService.reactivateDepartment(dept)
          .then(function(resJson) {
            console.log("resJson:", resJson);
            self.departments = resJson.list;
            self.totalPages = resJson.pages;
            self.actionDisplay = "Active";
          })
          .catch(err => {
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
      let self = this;
      if (this.editedIndex > -1) {
        this.editedDept.isActivated = this.picked;
        Object.assign(this.departments[this.editedIndex], this.editedDept);
        DepartmentApiService.updateDepartment(this.editedDept) //doesnt work
          .then(function(resJson) {
            self.departments = resJson;
            //self.totalPages = resJson.pages;
          })
          .catch(error => {
            alert(` ${error.response.data}`);
          });
      } else {
        console.log("pickl", this.picked);
        this.editedDept.isActivated = this.picked;
        DepartmentApiService.insertDepartment(this.editedDept) //why doesn't the popup close?
          .then(function(resJson) {
            self.departments = resJson;
            //self.totalPages = resJson.pages;
          })
          .catch(error => {
            alert(` ${error.response.data}`);
          });
      }
      this.close();
    },

    renderListOfDepts() {
      let self = this;
      if (this.enabled == "All") {
        DepartmentApiService.getAllDepartments()
          .then(resJson => (self.departments = resJson))
          .catch(err => {
            console.log(err);
          });
      }
      if (this.enabled == "Active") {
        DepartmentApiService.getActiveDepartments()
          .then(resJson => (self.departments = resJson))

          .catch(err => {
            console.log(err);
          });
      }
      if (this.enabled == "Inactive") {
        DepartmentApiService.getInactiveDepartments()
          .then(resJson => (self.departments = resJson))
          .catch(err => {
            console.log(err);
          });
      }
    },
    all() {
      //load all departments on screen when the app first starts
      let self = this;
      this.actionDisplay = "All";
      DepartmentApiService.getAllDepartments(
        this.currentPage,
        this.sizePage
      ).then(function(resJson) {
        console.log(resJson.list);
        console.log(resJson.pages);
        self.departments = resJson.list;
        self.totalPages = resJson.pages;
      });
    },
    active() {
      //load all departments on screen when the app first starts
      let self = this;
      this.actionDisplay = "Active";
      DepartmentApiService.getListDepartmentActive(
        this.currentPage,
        this.sizePage
      ).then(function(resJson) {
        console.log(resJson.list);
        console.log(resJson.pages);
        self.departments = resJson.list;
        self.totalPages = resJson.pages;
      });
    },
    inactive() {
      //load all departments on screen when the app first starts
      let self = this;
      this.actionDisplay = "Inactive";
      DepartmentApiService.getListDepartmentInActive(
        this.currentPage,
        this.sizePage
      ).then(function(resJson) {
        console.log(resJson.list);
        console.log(resJson.pages);
        self.departments = resJson.list;
        self.totalPages = resJson.pages;
      });
    },
    actionAddEmployee() {
      // Initialize variable this
      let self = this;
      // set department id target
      var id = this.editedDept.id;
      // Set action for variabale = add employee
      this.actionIndex = 1;
      // Enable dialog2
      this.dialog2 = true;
      // Call API show list employee not in department
      DepartmentApiService.getListEmployeeNotInDepartment(id, 1, 5)
        .then(function(resJson) {
          self.employees = resJson.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    actionRemoveEmployee() {
      console.log("*********actionRemoveEmployee");
      // Initialize variable this
      let self = this;
      // set department id target
      var id = this.editedDept.id;
      // Set action for variabale = add employee
      this.actionIndex = 0;
      // Enable dialog2
      this.dialog2 = true;
      // Call API show list employee of department
      DepartmentApiService.getListEmployeeOfDepartment(id, 1, 5)
        .then(function(resJson) {
          self.employees = resJson.list;
        })
        .catch(err => {
          console.log(err);
        });
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
