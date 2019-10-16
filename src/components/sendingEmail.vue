<template>
  <v-layout>
    <v-flex>
      <v-data-table :headers="headers" :items="users" sort-by="userId" class="elevation-1" data-app>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>USER MANAGEMENT</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <div class="flex-grow-1"></div>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark  v-on="on">New Item</v-btn>
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
                        <v-text-field v-model="editedItem.username" label="UserName" disabled></v-text-field>
                      </v-row>
                      <v-row cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                      </v-row>
                      <v-row cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.dob"
                          label="DOB"
                          placeholder=" YYYY-MM-DD"
                        ></v-text-field>
                      </v-row>

                      <v-row cols="12" sm="6" md="4" justify="space-around">
                        <v-radio-group v-model="radioGroup">
                          <v-radio label="Customer" :value="1"></v-radio>
                          <v-radio label="Employee" :value="2"></v-radio>
                          <v-radio label="Manager" :value="3"></v-radio>
                          <v-radio label="Admin" :value="4"></v-radio>
                        </v-radio-group>
                      </v-row>
                      <v-row align="center">
                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select :items="department" label="Department" dense></v-select>
                        </v-col>
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
          </v-toolbar>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" dark @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      radioGroup: 2,
      department: ["DU1", "DU2", "DU3"],
      headers: [
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
        { text: "UserName", value: "password" },
        { text: "Date of Birth", value: "dob" },
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
        dob: ""
      },
      defaultItem: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        dob: ""
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
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    fetchUsers() {
      axios
        .get("http://172.30.56.77:8080/rest/user-management", {
          headers: { Authorization: localStorage.getItem("tocken") }
        })
        .then(response => {
          this.users = response.data;
          // console.log(this.users[0].roleId);
        });
    },
    initialize() {
      this.fetchUsers();
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.users.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        axios
          .delete("http://172.30.56.77:8080/rest/user-management", {
            headers: { Authorization: localStorage.getItem("tocken") }
          })
          .then(response => {
            this.users.splice(index, 1);
          });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        console.log("edited data");
        console.log(this.editedItem);
        axios
          .post("" + this.editedItem.id, {
            firstName: this.editedItem.firstName,
            lastName: this.editedItem.lastName,
            email: this.editedItem.email,
            username: this.editedItem.username,
            password: this.editedItem.password,
            dob: this.editedItem.dob
          })
          .then(response => {
            console.log(response);
          });
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        console.log("created data");
        console.log(this.editedItem);
        axios
          .post("", {
            firstName: this.editedItem.firstName,
            lastName: this.editedItem.lastName,
            email: this.editedItem.email,
            username: this.editedItem.username,
            password: this.editedItem.password,
            dob: this.editedItem.dob
          })
          .then(response => {
            console.log(response);
          });

        this.users.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
</style>

