<template>
  <v-app id="inspire">
    <div class="row">
      <div class="col-xl-12">
        <div id="panel-1" class="panel">
          <div class="panel-hdr-overide">
            <span>
              <h3 style="display:inline">
                Customers
                <span class="fw-100">
                  <i>Table</i>
                </span>
              </h3>
            </span>
            <div class="search-form">
              <button
                class="btn btn-outline-secondary dropdown-toggle waves-effect waves-themed"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >{{nameTypeSearch}}</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" @click="searchBy('name')">Name</a>
                <a class="dropdown-item" @click="searchBy('email')">Email</a>
                <a class="dropdown-item" @click="searchBy('company')">Company</a>
              </div>
              <input
                type="text"
                id="simpleinput"
                class="input-search"
                v-model="search_text"
                placeholder="Enter search key words"
                @change="someHandler() "
              />
            </div>
          </div>
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
                      <label class="form-label" for="simpleinputInvalid">First Name</label>
                      <input
                        type="text"
                        v-bind:class="[formControl, firstNameValidate]"
                        id="simpleinputInvalid"
                        v-model="firstNameInput"
                        required
                      />
                      <div
                        class="invalid-feedback"
                        :style="{display: firstNameValidate}"
                      >Please enter text in here.</div>
                    </v-col>
                    <v-col cols="12">
                      <label class="form-label" for="example-password">Last Name</label>
                      <input
                        type="text"
                        v-bind:class="[formControl, lastNameValidate]"
                        id="simpleinputInvalid"
                        v-model="lastNameInput"
                        required
                      />
                      <div
                        class="invalid-feedback"
                        :style="{display: lastNameValidate}"
                      >Please enter text in here.</div>
                    </v-col>
                    <v-col cols="12">
                      <label class="form-label" for="example-password">Date of Birth</label>

                      <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
                        <template v-slot:activator="{ on }">
                          <v-text-field :value="dobInput" clearable readonly v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="dobInput" @change="menu1 = false"></v-date-picker>
                      </v-menu>
                      <div
                        class="invalid-feedback"
                        :style="{display: dobValidate}"
                      >Please enter text in here.</div>
                    </v-col>
                    <v-col cols="12">
                      <label class="form-label" for="example-password">Email</label>
                      <input
                        type="text"
                        v-bind:class="[formControl, emailValidate]"
                        id="simpleinputInvalid"
                        v-model="emailInput"
                        required
                      />
                      <div
                        class="invalid-feedback"
                        :style="{display: emailValidate}"
                      >Please enter text in here.</div>
                    </v-col>

                    <v-col cols="12">
                      <label class="form-label" for="example-password">Address</label>
                      <input
                        type="text"
                        v-bind:class="[formControl, addressValidate]"
                        id="simpleinputInvalid"
                        v-model="addressInput"
                        required
                      />
                      <div
                        class="invalid-feedback"
                        :style="{display: addressValidate}"
                      >Please enter text in here.</div>
                    </v-col>
                    <v-col cols="12">
                      <label class="form-label" for="example-password">Company</label>
                      <input
                        type="text"
                        v-bind:class="[formControl, companyValidate]"
                        id="simpleinputInvalid"
                        v-model="companyInput"
                        required
                      />
                      <div
                        class="invalid-feedback"
                        :style="{display: companyValidate}"
                      >Please enter text in here.</div>
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
          <div class="panel-container show">
            <div class="panel-content">
              <!-- datatable start -->
              <DataTable :data="dataCustomer" :header="dataHeader">
                <template slot="#" slot-scope="dataRow">
                  <td>{{dataCustomer.map(function(x) {return x.id; }).indexOf(dataRow.row.id) +count}}</td>
                </template>
                <template slot="Action" slot-scope="dataRow">
                  <td>
                    <a
                      @click="deleteItem(dataRow.row)"
                      class="btn btn-sm btn-outline-danger mr-2"
                      title="Delete Record"
                    >
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
                :totalPages="totalPages"
                :sizePage="[10,20,30]"
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
    firstNameInput: "",
    lastNameInput: "",
    dobInput: new Date().toISOString().substr(0, 10),
    emailInput: "",
    companyInput: "",
    addressInput: "",
    firstNameValidate: "",
    lastNameValidate: "",
    dobValidate: "",
    emailValidate: "",
    companyValidate: "",
    addressValidate: "",

    id_customer: "",

    show: true,
    typeAlert: "",
    messageAlert: "",
    formControl: "form-control",
    isInvalid: "",
    titleValidate: "none",
    dialog: false,
    dataCustomer: [],
    editedIndex: 0,
    id_template: "",
    title_input: "",
    body_input: "",
    row_input: "",
    numberOfElements: "",
    totalPages: 0,
    currentPage: 0, // start = 0
    sizePage: 10,

    date: new Date().toISOString().substr(0, 10),
    menu1: false,
    menu2: false,
    search_text: "",
    search_type: "name",
    nameTypeSearch: "Name",
    count: 0
  }),

  components: {
    AlertAction,
    DataTable,
    Pagination
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Customer" : "Edit Customer";
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

    // computedDateFormattedMomentjs() {
    //   return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    // },

    clickCallback(targetPage, numOfItem) {
      this.sizePage = numOfItem;
      this.currentPage = targetPage - 1;
      this.count = this.sizePage * this.currentPage + 1;
      this.fetchCustomerByPage(numOfItem, targetPage - 1);
    },
    someHandler() {
      // console.log(this.search_text);
      this.fetchDataBySearch(this.search_type, this.search_text);
    },
    fetchCustomerByPage(size, targetPage) {
      axios
        .get(`${base_url}/customer/get-all-customer`, {
          params: {
            page: targetPage,
            size: size
          }
        })
        .then(response => {
          this.dataCustomer = response.data.content;
          this.totalPages = response.data.totalPages;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },

    fetchAllCustomers() {
      axios
        .get(`${base_url}/customer/get-all-customer`)
        .then(response => {
          this.dataCustomer = response.data.content;
          this.totalPages = response.data.totalPages;
          this.currentPage = response.data.number;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    },

    deleteItem(item) {
      if (confirm("Do you really want to delete?")) {
        axios
          .post(`${base_url}/customer/delete-customer?id=${item.id}`)
          .then(response => {
            this.fetchCustomerByPage(this.sizePage, this.currentPage);
            this.typeAlert = "success";
            this.messageAlert = "Delete Success";
            this.show = !this.show;
          })
          .catch(e => {
            this.typeAlert = "fail";
            this.messageAlert = e.toString();
            this.show = !this.show;
          });
      }
    },

    editItem(item) {
      this.dialog = true;
      this.id_customer = item.id;

      this.firstNameInput = item.firstName;
      this.lastNameInput = item.lastName;
      this.dobInput = item.dob;
      this.emailInput = item.email;
      this.addressInput = item.address;
      this.companyInput = item.company;
    },

    close() {
      this.dialog = false;
      this.firstNameInput = "";
      this.lastNameInput = "";
      this.dobInput = "";
      this.emailInput = "";
      this.addressInput = "";
      this.companyInput = "";
      this.firstNameValidate = "";
      this.lastNameValidate = "";
      this.dobValidate = "";
      this.emailValidate = "";
      this.addressValidate = "";
      this.companyValidate = "";
    },

    save() {
      let data = {};
      if (this.id_customer !== "") {
        let checkNull = true;
        if (this.firstNameInput === "") {
          this.firstNameValidate = "is-invalid";
          checkNull = false;
        } else {
          this.firstNameValidate = "";
        }

        if (this.lastNameInput === "") {
          this.lastNameValidate = "is-invalid";
          checkNull = false;
        } else {
          this.lastNameValidate = "";
        }

        // if (this.dobInput === "") {
        //   this.dobValidate = "is-invalid";
        //   checkNull = false;
        // } else {
        //   this.dobValidate = "";
        // }

        if (this.emailInput === "") {
          this.emailValidate = "is-invalid";
          checkNull = false;
        } else {
          this.emailValidate = "";
        }

        if (this.addressInput === "") {
          this.addressValidate = "is-invalid";
          checkNull = false;
        } else {
          this.addressValidate = "";
        }
        if (this.companyInput === "") {
          this.companyValidate = "is-invalid";
          checkNull = false;
        } else {
          this.companyValidate = "";
        }

        if (checkNull === true) {
          data = {
            id: this.id_customer,
            firstName: this.firstNameInput,
            lastName: this.lastNameInput,
            dob: this.dobInput,
            email: this.emailInput,
            address: this.addressInput,
            company: this.companyInput
          };

          axios
            .post(`${base_url}/customer/edit-customer`, data)
            .then(response => {
              this.fetchCustomerByPage(this.sizePage, this.currentPage);
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
      }
    },

    searchBy(type) {
      this.search_type = type;
      if (type === "name") {
        this.nameTypeSearch = "Name";
      } else if (type === "company") {
        this.nameTypeSearch = "Company";
      } else if (type === "email") {
        this.nameTypeSearch = "Email";
      }
      this.fetchDataBySearch(this.search_type, this.search_text);
    },

    fetchDataBySearch(search_type, search_text) {
      axios
        .post(`${base_url}/customer/search-customer`, {
          [this.search_type]: this.search_text
        })
        .then(response => {
          console.log(response.data);
          this.dataCustomer = response.data.content;
          this.totalPages = response.data.totalPages;
          this.currentPage = 0;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        });
    }
  }
};
</script>
<style scoped>
.input-search {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-left: 15px;
  width: 350px;
}
.search-form {
  float: right;
}
.panel-hdr-overide {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  min-height: 3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 4px 4px 0 0;
  -webkit-transition: background-color 0.4s ease-out;
  transition: background-color 0.4s ease-out;
  padding: 15px;
}
</style>