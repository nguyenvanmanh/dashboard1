<template>
  <v-app id="inspire">
    <v-data-table
      :headers="headers"
      :items="dataTemplates"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:item.index="{ item }">
        <!-- {{dem}} -->
        {{dataTemplates.map(function(x) {
        return x.id;
        }).indexOf(item.id)+1}}
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Templates Management</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <!-- <div class="flex-grow-1"></div> -->

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

          <!-- Implement search bar-->
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <!--End searchbar-->
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      </template>
    </v-data-table>

    <alert-action :message="messageAlert" :typeAlert="typeAlert" :show="show"></alert-action>
  </v-app>
</template>

<script>
import axios from "axios";
import * as API from "../service/API";
import { VueEditor } from "vue2-editor";
import AlertAction from "./share/Alert";

const base_url = API.BASEURL;
export default {
  data: () => ({
    show: true,
    typeAlert: "",
    messageAlert: "",
    failAlert: "none",
    successAlert: "none",
    formControl: "form-control",
    isInvalid: "",
    titleValidate: "none",
    dialog: false,
    search: "",
    headers: [
      {
        text: "Index",
        align: "left",
        value: "index"
      },
      // { text: "Template ID", value: "emailTemplateId" },
      { text: "Title", value: "title" },
      { text: "Body", value: "body" },
      { text: "Edit", value: "action", sortable: false }
    ],
    dataTemplates: [],
    editedIndex: -1,
    id_template: "",
    title_input: "",
    body_input: "",
    row_input: ""
  }),

  components: {
    VueEditor,

    // props: ["massage"],
    AlertAction
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Template" : "Edit Template";
    }
  },

  mounted() {
    this.fetchAllTemplate();
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

    fetchAllTemplate() {
      axios
        .get(`${base_url}/email/get-all-topic`)
        .then(response => {
          this.dataTemplates = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
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
      this.closeAlert();
    },

    closeAlert() {
      setTimeout(function() {
        this.successAlert = "none";
      }, 3000);
    },

    save() {
      let data = {};
      if (this.id_template !== "") {
        if (this.title_input == "") {
          this.titleValidate = "block";
          this.isInvalid = "is-invalid";
        } else {
          data = {
            emailTemplateId: this.id_template,
            title: this.title_input,
            body: this.body_input
          };
          axios
            .post(`${base_url}/email/edit-topic/`, data)
            .then(response => {
              this.fetchAllTemplate();
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
              this.fetchAllTemplate();
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
</style>