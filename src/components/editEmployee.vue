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

          <v-btn color="primary" dark class="mb-2" v-on="on"  @click="addEmployee(item)">Add All</v-btn>
         
        </v-toolbar>
      
       {{selected}}
      </template>
    <!--Add Employee to Department-->
      <template v-slot:item.action="{ item }" v-if="status==='add'">
        <v-icon small @click="addEmployee(item)">add</v-icon>
       
      </template>
    <!--Remove Employee from Department -->
      <template v-slot:item.action="{ item }" v-else>
        <v-icon small>delete</v-icon>
      </template>
    </v-data-table>
    <div>
      <button @click="goBackToDepartments">Go Back</button><v-spacer></v-spacer>
    </div>
  </div>
  
</template>

<script>
const base_ip_address = "http://172.30.56.189";
const base_port = 8081;
const base_url = `${base_ip_address}:${base_port}`;
let departmentId = localStorage.getItem("departmentId"); //fix this 
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
          text: "Action",
          value: "action"
        }
      ],
      existingUsers: []
    };
  },

  mounted() {
    
    
    let self = this;
    axios
      .get(`${base_url}/rest/getListEmployeeNotInDepartment/${departmentId}`)
      .then(function(response) {
        self.existingUsers = response.data;
      //  console.log(self.existingUsers)
      })

      .catch(err => console.log(err));
      
      
  },
  methods: {
   
    goBackToDepartments() {
      this.$router.push("/departments");
      window.location.reload();
    },
    addEmployee(user) {
      let self = this;
      
    axios
        .post(`${base_url}/rest/addNewEmployeeToDepartment`, this.selected)
        .then(function(response) {
          //add an array of "selected" employees to the current department
          let numOfAddedEmployees = self.selected.length
           if (response.status === 201) {
              alert(
                `Added employees successfully!`
              );
        
            
              // this.$router.push("/departments");
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
</style>