<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="existingUsers"
      :items-per-page="10"
      item-key="name"
      show-select
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{status}} Employee</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <!-- <v-btn color="primary" dark class="mb-2" v-on="on">Delete All</v-btn>
          -->
        </v-toolbar>
      </template>

      <template v-slot:item.action="{ item }" v-if="status==='add'">
        <v-icon small @click="addEmployee(item)">add</v-icon>
      </template>

      <template v-slot:item.action="{ item }" v-else>
        <v-icon small>delete</v-icon>
      </template>
    </v-data-table>
    <div>
      <button @click="goBackToDepartments">Go Back</button>
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
const base_ip_address = "http://172.30.56.87";
const base_port = 8081;
const base_url = `${base_ip_address}:${base_port}`;

import axios from "axios";
export default {
  name: "editemployee",

  props: ["status"],
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
          text: "Role Name",
          value: "roleName"
        },
        {
          text: "Action",
          value: "action"
        }
      ],
      existingUsers: []
    };
  },

  mounted() {
    let departmentId = localStorage.getItem("departmentId");
    let self = this;
    axios
      .get(`${base_url}/rest/getListEmployeeNotInDepartment/${departmentId}`)
      .then(function(response) {
        self.existingUsers = response.data;
        // console.log(response.data)
        console.log("lslkdjfslkdf", self.existingUsers);
      })

      .catch(err => console.log(err));
      
      
  },
  methods: {
    submit() {
      axios
        .post(`${base_url}/rest/addNewEmployeeToDepartment`, this.testUser)
        .then(function(response) {
          if (response.status.code === 201) {
            alert("Successfully user ${} added to department ${}");
          }
        })

        .catch(err => console.log(err));
    },
    goBackToDepartments() {
      this.$router.push("/departments");
      window.location.reload();
    },
    addEmployee(user) {
      console.log("user", user);
      let self = this;
      axios
        .post(`${base_url}/rest/addNewEmployeeToDepartment`, testUser)
        .then(function(response) {
          //  if(response.status.code === 200){
          //     alert('Successfully user ${} added to department ${}')
          //  }
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
</style>