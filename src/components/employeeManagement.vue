<template>
  <v-app id="inspire">
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headersTitle"
          :items="users"
          sort-by="userId"
          class="elevation-1"
          data-app
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>USER MANAGEMENT</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on">New Item</v-btn>
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
                            :rules="[rules.required, rules.min]"
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
                            :rules="[rules.required, rules.min]"
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
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon color="teal darken-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon color="green darken-2" v-if="item.isActivated === 0">radio_button_checked</v-icon>
            <v-icon color="red lighten-2" v-if="item.isActivated === 1">radio_button_unchecked</v-icon>
            <v-icon color="purple darken-2" dark @click="showDialog">supervised_user_circle</v-icon>
          </template>
        </v-data-table>
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
                    <v-overflow-btn class="my-2" label="Department" target="#dropdown-example"></v-overflow-btn>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <p>Role</p>
                    <v-overflow-btn class="my-2" label="Role" segmented target="#dropdown-example"></v-overflow-btn>
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
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
      dialog1: false,
      modal: false,
      check_activate: false,
      check_inactivate: false,
      show1: false,
      rules: {
        required: value => !!value || "Required."
      },
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
        { text: "UserName", value: "password" },
        { text: "Date of Birth", value: "dob" },
        { text: "Registed Date", value: "registedDate" },
        { text: "Activated Date Date", value: "activatedDate" },
        { text: "End Date", value: "endDate" },
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
        .get("http://localhost:3000/user", {
          headers: { Authorization: localStorage.getItem("tocken") }
        })
        .then(response => {
          this.users = response.data;
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
    showDialog() {
      this.dialog1 = true;
    },
    // deleteItem(item) {
    //   const index = this.users.indexOf(item);
    //   confirm("Are you sure you want to delete this item?") &&
    //     axios.delete("http://172.30.56.77:8080/rest/user-management", {
    //       headers: { Authorization: localStorage.getItem("tocken") }
    //     });
    // },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .post("" + this.editedItem.id, {
            firstName: this.editedItem.firstName,
            lastName: this.editedItem.lastName,
            email: this.editedItem.email,
            username: this.editedItem.username,
            password: this.editedItem.password,
            dob: this.editedItem.dob
          })
          .then(response => {});
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        axios
          .post("", {
            firstName: this.editedItem.firstName,
            lastName: this.editedItem.lastName,
            email: this.editedItem.email,
            username: this.editedItem.username,
            password: this.editedItem.password,
            dob: this.editedItem.dob
          })
          .then(response => {});

        this.users.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
</style>

