<template>
  <div>
    <v-dialog v-model="employeeDialog" max-width="500px" emitToDepartmentDialog >
      <v-card>
        <v-card-title>
          <span>{{status}} Add Employee</span>
          <v-spacer></v-spacer>
          <v-menu bottom left>
            <template v-slot:activator="{ on }" >
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <!-- <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item> -->
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="employeeDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as API from "../service/API";

const base_ip_address = "http://172.30.56.57";
const base_port = 8081;
const base_url = API.BASEURL;

import axios from "axios";
export default {
  name: "editemployee",
  props: ["status", "id"],
  data() {
    return {
      employeeDialog: false,
      existingUsers: [],
      selected: [],
      headers: [
        {
          text: "First Name",
          value: "firstName"
        },
        {
          text: "Last Name",
          value: "lastName"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Seniority",
          value: "seniority"
        },
        {
          text: "Action",
          value: "action"
        }
      ]
    };
  },

  mounted() {
    let self = this;

    if (this.$props.status == "add") {
      axios
        .get(
          `${base_url}/rest/getListEmployeeNotInDepartment/${this.$props.id}`
        )
        .then(function(response) {
          self.existingUsers = response.data;
          // console.log(response.data)
        })

        .catch(err => console.log(err));
    }

    if (this.$props.status == "delete") {
      axios
        .get(`${base_url}/rest/getListEmployeeOfDepartment/${this.$props.id}`)
        .then(function(response) {
          self.existingUsers = response.data;
        })

        .catch(err => console.log(err));
    }
  },
  methods: {
     emitToDepartmentDialog (event) { //emit the state of employee dialog to the parent component - department
      this.$emit('openEmployeeDialog', this.employeeDialog)
      console.log(this.employeeDialog)
    },
    
    goBackToDepartments() {
      this.$router.push("/departments");
    },

    submitEmployeeToDept() {
      // let self = this;

      if (this.selected.length == 0) {
        alert("Please select an employee to add!");
        return;
      }
      let selectedEmployeesToAdd = this.selected.slice();

      //add the new id to the departments array
      for (let i = 0; i < selectedEmployeesToAdd.length; i++) {
        //loop through each employee object in the selectedEmployees array
        //find the departments array
        //push the id that the selected employees need to be added to
        selectedEmployeesToAdd[i]["departments"].unshift({
          id: Number(this.$props.id)
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
            // console.log("Success");
            window.location.reload(); //needs to re-render without reloadinig page
          }
        })
        .catch(err => console.log(err));
    },
    removeEmployeeFromDept() {
      //repeated code - need refactoring!
      if (this.selected.length == 0) {
        alert("Please select an employee to remove!");
        return;
      }
      let selectedEmployeesToRemove = this.selected.slice();
      for (let i = 0; i < selectedEmployeesToRemove.length; i++) {
        selectedEmployeesToRemove[i]["departments"].unshift({
          id: Number(this.$props.id)
        });
      }
      axios
        .post(
          `${base_url}/rest/removeEmployeeFromDepartment`,
          selectedEmployeesToRemove
        )
        .then(function(response) {
          if (response.status == 201) {
            window.location.reload();
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.v-toolbar__title {
  text-transform: capitalize;
}
.theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #1e90ff;
}
</style>