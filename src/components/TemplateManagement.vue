<template>
  <v-app id="inspire">
    <div class="row">
      <div class="col-xl-12">
        <div id="panel-1" class="panel">
          <div class="panel-hdr">
            <span>
              <h3>
                Templates
                <span class="fw-100">
                  <i>Table</i>
                </span>
              </h3>
            </span>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-dialog v-model="dialog" max-width="800px">
              <!-- <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Template</v-btn>
              </template>-->
              <template v-slot:activator="{ on }">
                <v-btn small dark color="blue lighten-2" v-on="on">
                  <v-icon small>library_add</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row v-model="row_input">
                      <v-col cols="12">
                        <label class="form-label" for="simpleinputInvalid">Title</label>
                        <input
                          type="text"
                          v-bind:class="[formControl, isInvalid]"
                          id="simpleinputInvalid"
                          v-model="title_input"
                          required
                        />
                        <div
                          class="invalid-feedback"
                          :style="{display: titleValidate}"
                        >Please enter text in here.</div>
                      </v-col>
                      <v-col cols="12">
                        <label class="form-label" for="example-password">Body</label>
                      </v-col>
                      <v-col cols="12">
                        <vue-editor label="Body" v-model="body_input"></vue-editor>
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
          </div>
          <div class="panel-container show">
            <div class="panel-content">
              <loading :type="'pointing'" :style="`display:${loadingDisplay}`"></loading>
              <!-- datatable start -->
              <DataTable
                :style="`display:${tableDisplay}`"
                :data="dataTemplates"
                :header="dataHeader"
              > 
                <template slot="#" slot-scope="dataRow">
                  <td>{{dataTemplates.map(function(x) {return x.id; }).indexOf(dataRow.row.id) +count}}</td>
                </template>
                <template slot="Action" slot-scope="dataRow">
                  <td>
                    <a
                      @click="editItem(dataRow.row)"
                      class="btn btn-sm btn-outline-primary mr-2"
                      title="Edit"
                    >
                      <i class="fal fa-edit"></i>
                    </a>
                  </td>
                </template>
              </DataTable>
              <!-- datatable end -->

              <!-- pagination start -->
              <Pagination
                :clickHandler="clickCallback"
                :totalPages="totalPages"
                :sizePage="[10,20,50]"
              ></Pagination>
              <!-- pagination end -->

              <!-- dropdown choose number of element -->
              <!-- end dropdown -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <alert-action :message="messageAlert" :typeAlert="typeAlert" :show="show"></alert-action>
  </v-app>
</template>

<script>
import axios from "axios";
import * as API from "../service/API";
import { VueEditor } from "vue2-editor";
import AlertAction from "./share/Alert";
import DataTable from "./share/DataTable";
import Vue from "vue";
import Pagination from "./share/Pagination";
import Loading from "./share/Loading";

const base_url = API.BASEURL;
export default {
  data: () => ({
    dataHeader: [
      { name: "#", dataFormat: "", width: "5" },
      { name: "Title", dataFormat: "title", width: "" },
      { name: "Body", dataFormat: "body", width: "" },
      { name: "Action", dataFormat: "", width: "15" }
    ],
    show: true,
    typeAlert: "",
    messageAlert: "",
    formControl: "form-control",
    isInvalid: "",
    titleValidate: "none",
    dialog: false,
    dataTemplates: [],
    editedIndex: -1,
    id_template: "",
    title_input: "",
    body_input: "",
    row_input: "",
    totalPages: 0,
    currentPage: 0, // start = 0
    sizePage: 10,
    tableDisplay: "none",
    loadingDisplay: "block",
    count: 0
  }),

  components: {
    VueEditor,
    AlertAction,
    DataTable,
    Pagination,
    Loading
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Template" : "Edit Template";
    }
  },

  mounted() {
    this.fetchTemplateByPage(this.sizePage, 0);
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
    initialize() {},
    clickCallback(targetPage, sizeOfItem) {
      this.sizePage = sizeOfItem;
      this.currentPage = targetPage - 1;
      this.count = this.sizePage * this.currentPage +1
      this.fetchTemplateByPage(sizeOfItem, targetPage - 1);
    },

    fetchTemplateByPage(size, targetPage) {
      axios
        .get(`${base_url}/email/get-all-topic`, {
          params: {
            page: targetPage,
            size: size
          }
        })
        .then(response => {
          this.dataTemplates = response.data.content;
          this.totalPages = response.data.totalPages;
          this.tableDisplay = "";
          this.loadingDisplay = "none";
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
          this.tableDisplay = "";
          this.loadingDisplay = "none";
        });
    },

    editItem(item) {
      this.dialog = true;
      this.editedIndex = 0;
      this.id_template = item.id;
      this.title_input = item.title;
      this.body_input = item.body;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      this.title_input = "";
      this.body_input = "";
      this.titleValidate = "none";
      this.isInvalid = "";
      this.id_template = "";
      // this.closeAlert();
    },

    save() {
      let data = {};
      if (this.id_template !== "") {
        if (this.title_input == "") {
          this.titleValidate = "block";
          this.isInvalid = "is-invalid";
        } else {
          data = {
            id: this.id_template,
            title: this.title_input,
            body: this.body_input
          };
          axios
            .post(`${base_url}/email/edit-topic/`, data)
            .then(response => {
              this.fetchTemplateByPage(this.sizePage, this.currentPage);
              this.typeAlert = "success";
              this.messageAlert = "Edit Success";
              this.show = !this.show;
            })
            .catch(e => {
              this.typeAlert = "fail";
              this.messageAlert = e.toString();
              this.show = !this.show;
            });
          this.close();
        }
      } else {
        if (this.title_input == "") {
          this.titleValidate = "block";
          this.isInvalid = "is-invalid";
        } else {
          data = {
            title: this.title_input,
            body: this.body_input
          };
          axios
            .post(`${base_url}/email/add-topic/`, data)
            .then(response => {
              this.fetchTemplateByPage(this.sizePage, this.currentPage);
              this.typeAlert = "success";
              this.messageAlert = "Add Success";
              this.show = !this.show;
            })
            .catch(e => {
              this.typeAlert = "fail";
              this.messageAlert = e.toString();
              this.show = !this.show;
            });
          this.close();
        }
      }
    }
  }
};
</script>
<style scoped>
.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
}
.text-center {
  text-align: center;
}

ul.pagination_lib {
  display: inline-block;
  padding: 0;
  margin: 0;
}

ul.pagination_lib li {
  display: inline;
}

ul.pagination_lib li a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
}

ul.pagination_lib li a.active {
  background-color: #4caf50;
  color: white;
}

ul.pagination_lib li a:hover:not(.active) {
  background-color: #ddd;
}
</style>