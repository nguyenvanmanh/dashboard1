<template>
  <div id="app">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="existingUsers"
      :items-per-page="10"
      item-key="userId"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{status}} Employee</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="submitEmployeeToDept"
            v-if="status==='add'"
          >Add All</v-btn>
          <v-btn color="primary" dark class="mb-2" @click="removeEmployeeFromDept" v-else>Delete All</v-btn>
        </v-toolbar>
        {{selected}}
      </template>
      <!--Add Employee to Department-->
      <template v-slot:item.action="{ item }" v-if="status==='add'">
        <v-icon @click="submitEmployeeToDept">add</v-icon>
      </template>
      <!--Remove Employee from Department -->
      <template v-slot:item.action="{ item }" v-else>
        <v-icon @click="removeEmployeeFromDept">delete</v-icon>
      </template>
    </v-data-table>
    <div>
      <button @click="goBackToDepartments">Go Back</button>
      <v-spacer></v-spacer>
    </div>
  </div>
</template>

<script>
const base_ip_address = "http://172.30.56.57";
const base_port = 8081;
const base_url = `${base_ip_address}:${base_port}`;
// let departmentId = localStorage.getItem("departmentId");

import axios from "axios";
export default {
  name: "editemployee",
  props: ["status", "departmentId"],
  data() {
    return {
      testUser: [
        {
          userId: 1,
          firstName: "duc",
          lastName: "duc",
          email: "admin@gmail.com",
          seniority: 1,
          userRoleId: 1,
          roleId: 1,
          roleName: "admin",
          userDepartmentId: 1,
          departmentId: 6,
          departmentName: "dada"
        }
      ],
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
          `${base_url}/rest/getListEmployeeNotInDepartment/${this.$props.departmentId}`
        )
        .then(function(response) {
          self.existingUsers = response.data;
          // console.log(response.data)
        })

        .catch(err => console.log(err));
    }

    if (this.$props.status == "delete") {
      axios
        .get(
          `${base_url}/rest/getListEmployeeOfDepartment/${this.$props.departmentId}`
        )
        .then(function(response) {
          self.existingUsers = response.data;
          
        })

        .catch(err => console.log(err));
    }
  },
  methods: {
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

      //add the new departmentId to the departments array
      for (let i = 0; i < selectedEmployeesToAdd.length; i++) {
        //loop through each employee object in the selectedEmployees array
        //find the departments array
        //push the departmentId that the selected employees need to be added to
        selectedEmployeesToAdd[i]["departments"].unshift({
          departmentId: Number(this.$props.departmentId)
        });
      }
      axios
        .post(`${base_url}/rest/addNewEmployeeToDepartment`, selectedEmployeesToAdd)
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
      let selectedEmployeesToRemove = this.selected.slice()
      for (let i = 0; i < selectedEmployeesToRemove.length; i++) {
        selectedEmployeesToRemove[i]["departments"].unshift({
          departmentId: Number(this.$props.departmentId)
        });
      }
      axios
        .post(
          `${base_url}/rest/removeEmployeeFromDepartment`, selectedEmployeesToRemove
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