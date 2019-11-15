<template>
  <v-app id="inspire">
    <v-dialog scrollable max-width="600px" v-model="dialogs.setRole">
      <v-card>
        <v-card-title>Set permission for this role</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="2" align-self="center">
                <h6 style="color: black">Role:</h6>
              </v-col>

              <v-text-field label="Role" v-model="role.name"></v-text-field>
            </v-row>
            <v-row>
              <v-col cols="2" align-self="center">
                <h6 style="color: black">Code:</h6>
              </v-col>
              <v-text-field label="code" v-model="role.code"></v-text-field>
            </v-row>
            <!-- <v-row>
              <div>{{ selected }}</div>
            </v-row>-->
            <!-- <v-row style="height: 40px" v-for="page in pages" :key="page">
              <v-col cols="2"></v-col>
              <v-checkbox></v-checkbox>
              <span class="pages">{{ page }}</span>
            </v-row>-->

            <ul>
              <li v-for="(page, index) in pages" :key="index">
                <div>
                  <v-checkbox
                    :key="index"
                    v-model="selected"
                    :value="page"
                    :label="page"
                  ></v-checkbox>
                </div>
              </li>
            </ul>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogs.setRole = false"
            right
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text right @click="SaveDialog"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- add role dialog -->

    <!-- end of add role dialog -->
    <div class="row">
      <div class="col-xl-12">
        <div id="panel-1" class="panel">
          <div class="panel-hdr">
            <span class="heading">Role Management</span>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn small dark color="blue lighten-1" @click="openAddRoleDialog">
              <v-icon small>library_add</v-icon>
            </v-btn>
          </div>
          <div class="panel-container show">
            <div class="panel-content">
              <!-- <loading
                :type="'pointing'"
                :style="`display:${loadingDisplay}`"
              ></loading>-->
              <!-- datatable start -->
              <DataTable :data="data" :header="headers">
                <template slot="#">
                  <td>#</td>
                </template>
                <template slot="Action" slot-scope="dataRow">
                  <td>
                    <v-icon
                      dark
                      flat
                      color="grey darken-2"
                      @click="openEditRoleDialog(dataRow.row)"
                      >edit</v-icon
                    >
                    <v-icon
                      dark
                      flat
                      class="mx-3"
                      color="grey darken-2"
                      @click="dialogs.setRole = true"
                      >delete</v-icon
                    >
                  </td>
                </template>
              </DataTable>
              <!-- datatable end -->

              <!-- pagination start -->
              <!-- <Pagination
                :clickHandler="clickCallback"
                :totalPages="totalPages"
                :sizePage="[10, 20, 50]"
              ></Pagination>-->
              <!-- pagination end -->

              <!-- dropdown choose number of element -->
              <!-- end dropdown -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <alert-action
      :message="messageAlert"
      :typeAlert="typeAlert"
      :show="show"
    ></alert-action>-->
  </v-app>
</template>

<script>
import * as API from "../service/API";
import DataTable from "./share/DataTable";
export default {
  components: {
    DataTable
  },
  mounted() {
    API.getRoles(1, 10).then(res => {
      this.data = res.data.list;
      this.rolePermissions = [];
      res.data.map(item => {
        // console.log("map");
        API.getPagesRoleId(item.id).then(res2 => {
          this.rolePermissions.push({
            id: item.id,
            listPages: res2.data
          });
        });
      });
    });
    API.getListPages().then(
      res => (this.pages = res.data.map(item => item.url))
    );
  },
  methods: {
    openAddRoleDialog() {
      this.dialogs.mode = "create";
      this.role = {};
      this.selected = [];
    },
    openEditRoleDialog(role) {
      this.dialogs.mode = "edit";
      this.dialogs.setRole = true;
      this.role.name = role.name;
      this.role.code = role.code;
      this.role.id = role.id;
      let selectedItem = this.rolePermissions.find(item => {
        if (item.id === role.id) {
          return item;
        }
      });
      this.selected = selectedItem.listPages;
      // console.log(this.selected);
    },
    SaveDialog() {
      if (this.dialogs.mode === "edit") {
        // TODO: API call to edit role
      } else if (this.dialogs.mode === "create") {
        // TODO: API call to add role
      }
      this.dialogs.setRole = false;
      this.dialogs.mode = null;
    }
  },
  data() {
    return {
      rolePermissions: [],
      pages: [],
      selected: [],
      dialogs: {
        setRole: false,
        addRole: false,
        mode: null
      },
      role: {},
      headers: [
        { name: "#", dataFormat: "", width: "5" },
        { name: "id", dataFormat: "id", width: "5" },
        { name: "Name", dataFormat: "name", width: "" },
        { name: "Code", dataFormat: "code", width: "" },
        { name: "Action", dataFormat: "", width: "15" }
      ],
      data: []
    };
  },
  computed: {}
};
</script>

<style scoped>
.flexs {
  height: 30px;
  align-self: auto;
}
.pages {
  color: black;
  align-self: center;
  height: 20px;
  margin: 0;
  padding: 0;
}
ul li {
  list-style: none;
  padding: 0;
  color: black;
}
.v-input--selection-controls,
.v-input--selection-controls__ripple,
.v-input__control div.v-input__slot {
  padding: 0;
  margin: 0 !important;
}
.v-messages .theme--light {
  visibility: hidden;
}
.v-input__control {
  height: 320px !important;
}
.v-label {
  color: black;
}
</style>
