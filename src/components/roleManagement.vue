<template>
  <div id="roleManagement">
    <v-data-table :headers="headers" :items="roleItems" sort-by="index" class="elevation-1">
      <template v-slot:top data-app>
        <v-toolbar flat color="white">
          <v-toolbar-title>Role Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.index" label="Index"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.roleName" label="Role Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.roleCode" label="Role Code"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Implement button and dropdownlist-->
          <div
            class="btn-group"
            id="js-demo-nesting"
            role="group"
            aria-label="Button group with nested dropdown"
          >
            <div class="btn-group" role="group">
              <v-button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
              >Name</v-button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="javascript:void(0)">Dropdown link</a>
                <a class="dropdown-item" href="javascript:void(0)">Dropdown link</a>
              </div>
              <v-button
                type="button"
                class="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                color
              >Code</v-button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="javascript:void(0)">Dropdown link</a>
                <a class="dropdown-item" href="javascript:void(0)">Dropdown link</a>
              </div>
            </div>
            <!-- End Implement button and dropdownlist-->

           

            <v-spacer></v-spacer>
          </div>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const base_ip_address = "http://172.30.56.87";
const base_port = 8081;
const base_url = `${base_ip_address}:${base_port}`;

const axios = require("axios");
export default {
  name: "roleManagement",
  data() {
    return {
      dialog: false,
      headers: [
        { text: "No.", value: "index" },
        {
          text: "Role Name",
          align: "left",
          sortable: false,
          value: "roleName"
        },
        { text: "Code", value: "roleCode" },
        { text: "Actions", value: "action", sortable: false }
      ],
      roleItems: [],
      editedIndex: -1,
      editedItem: {
        index: 0,
        roleName: "",
        roleCode: ""
      },
      defaultItem: {
        index: 0,
        roleName: "",
        roleCode: ""
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
    initialize() {
      this.roleItems = [
        {
          roleName: "Admin",
          roleCode: "AD",
          index: 1
        },
        {
          roleName: "Developer",
          roleCode: "Dev",
          index: 2
        },
        {
          roleName: "Tester",
          roleCode: "T",
          index: 3
        },
        {
          roleName: "Team Lead",
          roleCode: "TL",
          index: 4
        },
        {
          roleName: "PM",
          roleCode: "P",
          index: 5
        },
        {
          roleName: "BA",
          roleCode: "B",
          index: 6
        },
        {
          roleName: "SA",
          roleCode: "S",
          index: 7
        },
        {
          roleName: "Manager",
          roleCode: "M",
          index: 8
        },
        {
          roleName: "Director",
          roleCode: "D",
          index: 9
        },
        {
          roleName: "Group Director",
          roleCode: "GD",
          index: 10
        }
      ];
    },
    editItem(item) {
      this.editedIndex = this.roleItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
        Object.assign(this.roleItems[this.editedIndex], this.editedItem);
      } else {
        this.roleItems.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

