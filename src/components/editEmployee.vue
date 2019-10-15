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
        <v-icon small @click="addEmployee">add</v-icon>
      </template>

      <template v-slot:item.action="{ item }" v-else>
        <v-icon small @click="deleteEmployee">delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editemployee",
  props: ["status"],
  data() {
    return {
      selected: [],
      headers: [
        {
          text: "First Name",
          value: "first_name"
        },
        {
          text: "Last Name",
          value: "last_name"
        },
        {
          text: "Email",
          value: "email"
        },
        {
          text: "Tenure",
          value: "tenure"
        },
        {
          text: "Role Name",
          value: "role name"
        },
        {
          text: "Action",
          value: "action"
        }
      ],
      existingUsers: [
        {
          id: 1,
          first_name: "Chau",
          last_name: "Tran",
          tenure: "1",
          email: "cmtran@gmail.com"
        },
        {
          id: 2,
          first_name: "Quan",
          last_name: "Chua",
          email: "qt@yahoo.com"
        }
      ]
    };
  },

  mounted() {
    // axios
    //   .get("")
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
    console.log(this.status);
  },
  methods: {
    addEmployee() {},
    deleteEmployee(id) {
      this.editedEmployee = Object.assign({}, employee);

      confirm("Are you sure you want to delete this employee?") &&
        axios
          .post(
            `insert delete url here`,
            this.editedEmployee
          )
          .then(response => {
            if (response.status === 201) {
              alert(
                `Deleted employee ${this.editedEmployee.id} && ${this.editedEmployee.name} successfully!`
              );
              window.location.reload();
            }
          })

          .catch(error => {
            // eslint-disable-next-line
            console.log(error.response);
          });
    }
  }
};
</script>

<style scoped>
.v-toolbar__title {
  text-transform: capitalize;
}
</style>