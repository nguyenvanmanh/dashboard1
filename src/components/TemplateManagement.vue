<template>
  <v-app id="inspire">
    <v-data-table :headers="headers" :items="dataTemplates" sort-by="calories" class="elevation-1" :search="search">
      <template v-slot:item.index="{ item }">
        <!-- {{dem}} -->
        {{dataTemplates.map(function(x) {
        return x.emaiTemplateId;
        }).indexOf(item.emaiTemplateId)+1}}
      </template>
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Templates Management</v-toolbar-title>
         <v-divider class="mx-4" inset vertical></v-divider>
          <div class="flex-grow-1"></div>

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

          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Template</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                    
                  <v-row v-model="row_input">
                    <v-col cols="12">
                      <v-text-field label="Title" v-model="title_input" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea label="Body" v-model="body_input" required></v-textarea>
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
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
      </template>
    </v-data-table>
  </v-app>
</template>

<script>
import axios from "axios";
import * as API from "../service/API"

const base_url = API.BASEURL;
export default {
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      {
        text: "Index",
        align: "left",
        value: "index"
      },
      { text: "Template ID", value: "emaiTemplateId" },
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Template" : "Edit Template";
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
      this.id_template = item.emaiTemplateId;
      this.title_input = item.title;
      this.body_input = item.body;
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
      this.title_input=""
      this.body_input=""
    },

    save() {
      let data = {};
      if (this.id_template !== "") {
        data = {
          emaiTemplateId: this.id_template,
          title: this.title_input,
          body: this.body_input
        };
        axios
          .post(`${base_url}/email/edit-topic/`, data)
          .then(response => {
            this.fetchAllTemplate();
          })
          .catch(e => {});
        this.close();
      } else {
        data = {
          title: this.title_input,
          body: this.body_input
        };
        axios
          .post(`${base_url}/email/add-topic/`, data)
          .then(response => {
            this.fetchAllTemplate();
          })
          .catch(e => {});
        this.close();
      }
    }
  }
};
</script>
