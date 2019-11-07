<template>
  <v-app id="inspire">
    <div class="row">
      <div class="col-xl-12">
        <div id="panel-1" class="panel">
          <div class="panel-hdr">
            <span>
              <h3>
                Customers
                <span class="fw-100">
                  <i>Table</i>
                </span>
              </h3>
            </span>
            <v-dialog v-model="dialog" max-width="800px">
              <!-- <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Template</v-btn>
              </template>-->
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
                        <input
                          type="text"
                          v-bind:class="[formControl, isInvalid]"
                          id="simpleinputInvalid"
                          v-model="title_input"
                          required
                        />
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
              <!-- datatable start -->
              <DataTable :data="dataTemplates" :header="dataHeader">
                <template slot="action" slot-scope="dataRow">
                  <td>
                    <a class="btn btn-sm btn-outline-danger mr-2" title="Delete Record">
                      <i class="fal fa-times"></i>
                    </a>
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
                :currentPage="currentPage"
                :totalPages="totalPages"
                :sizePage="sizePage"
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
import AlertAction from "./share/Alert";
import DataTable from "./share/DataTable";
import Vue from "vue";
import Pagination from "./share/Pagination";

const base_url = API.BASEURL;
export default {
  data: () => ({
    dataHeader: [
      { name: "#", width: "5" },
      { name: "Name ", dataFormat: "firstName", width: "" },
      { name: "Date of Birth ", dataFormat: "dob", width: "" },
      { name: "Email", dataFormat: "email", width: "" },
      { name: "Address", dataFormat: "address", width: "" },
      { name: "Company", dataFormat: "company", width: "" },
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
    numberOfElements: "",
    totalPages: 0,
    currentPage: 0, // start = 0
    sizePage: 10
  }),

  components: {
    AlertAction,
    DataTable,
    Pagination
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Template" : "Edit Template";
    }
  },

  mounted() {
    this.fetchAllCustomers();
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
    clickCallback(targetPage) {
      this.fetchCustomerByPage(this.sizePage, targetPage - 1);
    },

    fetchCustomerByPage(size, targetPage) {
      axios
        .get(`${base_url}/email/get-all-customer`, {
          params: {
            page: targetPage,
            size: size
          }
        })
        .then(response => {
          this.dataTemplates = response.data.content;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.number;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },

    fetchAllCustomers() {
      axios
        .get(`${base_url}/email/get-all-customer`)
        .then(response => {
          this.dataTemplates = response.data.content;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.number;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },

    editItem(item) {
      this.dialog = true;
      console.log(item);
      //   this.editedIndex = 0;
      //   this.id_template = item.id;
      //   this.title_input = item.title;
      //   this.body_input = item.body;
    },

    close() {
      this.dialog = false;
      this.closeAlert();
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