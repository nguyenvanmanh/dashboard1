<template>
  <v-app id="inspire">
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers.campaigns"
          :items="campaigns"
          item-key="id"
          v-model="selected"
          show-select
          hide-default-footer
          sort-by="index"
          :items-per-page="rowPerPage"
        >
          <!-- index collum -->
          <template v-slot:item.index="{ item }">
            <span>{{
              campaigns.map(item => item.id).indexOf(item.id) + 1
            }}</span>
          </template>

          <!-- New Item popup -->
          <!-- STATUS: DONE -->
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Campaing Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <!-- Dialog button add new campaign -->
              <v-dialog
                v-model="dialogs.addCampaign"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn small dark color="blue lighten-1" v-on="on">
                    <v-icon small>library_add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Create New Campaign</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="valid" ref="newCampaignForm">
                      <v-container>
                        <v-col>
                          <v-row cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newCampaign.title"
                              label="Campaign Name"
                              :rules="rules.title"
                            ></v-text-field>
                          </v-row>
                          <v-row cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="newCampaign.description"
                              :rules="rules.description"
                              label="Description"
                            ></v-text-field>
                          </v-row>
                          <v-row>
                            <v-col cols="12" lg="6">
                              <v-menu
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="dateFormated"
                                    label="Duration"
                                    prepend-icon="event"
                                    readonly
                                    :rules="rules.dates"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="dates"
                                  scrollable
                                  range
                                  no-title
                                ></v-date-picker>
                              </v-menu>
                            </v-col>
                            <v-col cols="6">
                              <v-select
                                v-model="selectedTemplate"
                                :items="emailTemplates.titles"
                                menu-props="auto"
                                label="Email Template"
                                hide-details
                                single-line
                                :rules="rules.templates"
                              ></v-select>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-container>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogs.addCampaign = false"
                      >Close</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="createCampaign"
                      >Create</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                small
                dark
                color="red"
                class="mx-1"
                :disabled="!selected.length ? true : false"
                @click="deleteCampaign()"
              >
                <v-icon small>delete</v-icon>
              </v-btn>
              <!-- End of Dialog button add new campaign -->
              <alert-action
                :message="alerts.messageAlert"
                :typeAlert="alerts.typeAlert"
                :show="alerts.show"
              ></alert-action>

              <div class="flex-grow-1"></div>
              <!-- Send email for selected campaigns button -->
              <v-btn
                color="primary"
                dark
                @click="sendAll"
                :disabled="selected.length === 0 ? true : false"
                >Send All</v-btn
              >
            </v-toolbar>
          </template>
          <!-- End of New Item popup -->

          <!-- Action icons  -->
          <!-- STATUS: DONE -->
          <template v-slot:item.action="{ item }">
            <div style="display:flex; justify-content: space-around">
              <div class="tooltips">
                <v-icon
                  color="orange darken-2"
                  @click="changeTemplateDialog(item.id)"
                  >rounded_corner</v-icon
                >
                <span class="tooltip-text">Change email template</span>
              </div>
              <div class="tooltips">
                <v-icon color="green darken-2" @click="chooseCustomer(item.id)"
                  >supervised_user_circle</v-icon
                >
                <span class="tooltip-text">Choose customers</span>
              </div>
              <div class="tooltips">
                <v-icon color="teal darken-2" @click="sendMailOne(item.id)"
                  >email</v-icon
                >
                <span class="tooltip-text">Send email</span>
              </div>
            </div>
          </template>
          <!-- End of Action Icons -->
        </v-data-table>
        <!-- <data-table :data="campaigns" :headers="headers.campaigns"></data-table> -->
        <data-footer
          :totalElement="totalElements"
          :rowPerPageProps="rowPerPage"
          v-on:updateTable="updateCampaign($event)"
        ></data-footer>

        <!-- select list customer for sending email -->
        <!-- STATUS: DONE -->
        <v-dialog
          v-model="dialogs.listCustomer"
          scrollable
          persistent
          max-width="600px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Choose customers for this campaign</span>
            </v-card-title>

            <v-data-table
              :headers="headers.customers"
              :items="customers"
              v-model="selectedCustomer"
              item-key="email"
              show-select
              hide-default-footer
            ></v-data-table>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="dialogs.listCustomer = false"
                >Close</v-btn
              >
              <v-btn color="blue darken-1" text @click="saveCustomer"
                >Save</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- end of select customer -->

        <!-- change Template for campaign -->
        <!-- STATUS: Working -->
        <v-dialog v-model="dialogs.changeTemplate" scrollable max-width="420px">
          <v-card>
            <v-card-title>
              <span class="headline">Choose email template</span>
            </v-card-title>
            <v-data-table
              :headers="headers.templates"
              :items="templates"
              hide-default-footer
            >
              <template v-slot:body>
                <tr
                  v-for="item in templates"
                  :key="item.emaiTemplateId"
                  @click="showAlert(item)"
                  class="template_records"
                  style="border: 1px solid lightgrey"
                >
                  <td>{{ item.title }}</td>
                  <td v-html="item.body"></td>
                </tr>
              </template>
              <!-- <template v-slot:body="{items}">
                <tr @click="showAlert(items)">
                  <td>{{ item.title }}</td>
                  <td class="text-xs-right">{{ item.body }}</td>
                </tr>
              </template>-->
            </v-data-table>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import DataFooter from "./campaign/my-footer";
import axios from "axios";
import * as API from "../service/API";
import DataTable from "./share/DataTable";
import AlertAction from "./share/Alert";
const baseUrl = API.BASEURL;

export default {
  components: {
    DataTable,
    AlertAction,
    DataFooter
  },
  data() {
    return {
      rowPerPage: 10,
      valid: null,
      buttons: { selectedCampaignId: null },
      totalElements: null,
      alerts: {
        show: false,
        typeAlert: "",
        messageAlert: "",
        failAlert: "none",
        successAlert: "none"
      },
      dates: [],
      selectedTemplate: null,
      emailTemplates: {},
      newCampaign: {},
      selected: [],
      customers: [],
      selectedCustomer: [],
      campaigns: [],
      dialogs: {
        addCampaign: false,
        changeTemplate: false,
        listCustomer: false
      },
      rules: {
        title: [value => !!value || "title can not be empty!"],
        description: [value => !!value || "description can not be empty!"],
        dates: [
          v => !!v || "Choose duration for this campaign",
          value => value.length > 15 || "Pick an end date"
        ],
        templates: [value => !!value || "Choose a template for this campaign!"],
        email: value => true || "Email must be valid"
      },
      headers: {
        customers: [
          { text: "Name", value: "fullName" },
          { text: "Email", value: "email" }
        ],
        campaigns: [
          { text: "#", align: "center", value: "index", sortable: false },
          { text: "Id", align: "center", value: "id" },
          { text: "Campaign Name", align: "center", value: "title" },
          {
            text: "Description",
            align: "center",
            value: "description",
            sortable: false
          },
          { text: "Duration From", align: "center", value: "startDate" },
          { text: "Duration To", align: "center", value: "endDate" },
          { text: "Action", align: "center", value: "action", sortable: false }
        ],
        templates: [
          { text: "Title", value: "title" },
          { text: "body", value: "body" }
        ]
      },
      templates: [],
      allCampaignDetails: []
    };
  },
  computed: {
    dateFormated() {
      return this.dates.join("~");
    }
  },
  created() {
    API.getCampaigns(0, this.rowPerPage).then(res => {
      res.data.content.map(item => {
        this.totalElements = res.data.totalElements;
        item.campaign.startDate = item.campaign.startDate.substring(0, 10);
        item.campaign.endDate = item.campaign.endDate.substring(0, 10);
        this.campaigns.push(item.campaign);
        this.allCampaignDetails = res.data.content;
      });

      this.customers = res.data.content[0].customerList;
      this.customers.map(
        customer =>
          (customer.fullName = customer.firstName + " " + customer.lastName)
      );
    });
    axios
      .get(`${baseUrl}/email/get-all-topic`)
      .then(res => {
        this.templates = res.data.content;
        this.emailTemplates.titles = res.data.content.map(item => item.title);
        this.emailTemplates.ids = res.data.content.map(item => item.id);
      })
      .catch(err => {
        // TODO: log this err
      });
  },
  methods: {
    changeTemplateDialog(campaignId) {
      this.buttons.selectedCampaign = campaignId;
      this.dialogs.changeTemplate = true;
    },
    createCampaign() {
      // get template id for new campaign
      if (!this.$refs.newCampaignForm.validate()) return;
      this.emailTemplates.titles.forEach((element, id) => {
        this.newCampaign.emailTempaleId = this.emailTemplates.ids[id];
      });
      // get start date and due date
      this.dates.sort();
      this.newCampaign.startDate = this.dates[0];
      this.newCampaign.endDate = this.dates[1];
      axios
        .post(`${baseUrl}/email/add-campaign`, this.newCampaign)
        .then(res => {
          this.alerts.typeAlert = "success";
          this.alerts.messageAlert = `added ${this.newCampaign.title} campaign`;
          this.alerts.show = !this.alerts.show;
          this.campaigns = [];
          this.dates = [];
          this.newCampaign = {};
          res.data.map(item => {
            item.campaign.startDate = item.campaign.startDate.substring(0, 10);
            item.campaign.endDate = item.campaign.endDate.substring(0, 10);
            this.campaigns.push(item.campaign);
            this.allCampaignDetails = res.data.content;
          });
          this.dialogs.addCampaign = false;
        });
    },
    saveCustomer() {
      this.allCampaignDetails.forEach(item => {
        if (item.campaign.id === this.buttons.selectedCampaignId) {
          item.customerCheck = this.selectedCustomer;
          return;
        }
      });
      this.dialogs.listCustomer = false;
    },
    chooseCustomer(campaignId) {
      //open dialog
      this.dialogs.listCustomer = true;
      this.buttons.selectedCampaignId = campaignId;
      // find the selected campaign rows details
      let selectedCampaign = this.allCampaignDetails.find(item => {
        if (item.campaign.id === campaignId) return item.customerCheck;
      });
      this.selectedCustomer = selectedCampaign.customerCheck;
    },

    sendMailOne(campaignId) {
      let selectedItem = this.allCampaignDetails.find(
        item => item.campaign.id === campaignId
      );
      API.sendMail(campaignId, selectedItem.customerCheck)
        .then(res => {
          if (res.status === 200) {
            this.alerts.typeAlert = "success";
            this.alerts.messageAlert = "Sent email for campaign " + campaignId;
            this.alerts.show = !this.alerts.show;
          }
        })
        .catch(err => {
          this.alerts.typeAlert = "fail";
          this.alerts.messageAlert = err.response.data;
          this.alerts.show = !this.alerts.show;
        });
    },
    showAlert(template) {
      API.editCampaignTemplate(this.buttons.selectedCampaign, template.id)
        .then(res => {
          //TODO: alert for user
          this.alerts.typeAlert = "success";
          this.alerts.messageAlert =
            "Updated template for campaign " + this.buttons.selectedCampaign;
          this.alerts.show = !this.alerts.show;
        })
        .catch(err => {
          this.alerts.typeAlert = "fail";
          this.alerts.messageAlert = "something wrong";
          this.alerts.show = !this.alerts.show;
        });
      this.dialogs.changeTemplate = false;
    },
    sendAll() {
      if (this.selected.length === 0) return;
      let ids = this.selected.map(item => item.campaignId);
      API.sendMailAll(ids, this.selectedCustomer)
        .then(res => {
          this.alerts.typeAlert = "success";
          this.alerts.messageAlert = "Sent mails the selected campaigns";
          this.alerts.show = !this.alerts.show;
          this.selected = [];
        })
        .catch(err => {
          this.alerts.typeAlert = "fail";
          this.alerts.messageAlert = "something wrong";
          this.alerts.show = !this.alerts.show;
        });
    },
    updateCampaign(page) {
      this.rowPerPage = parseInt(page.rowPerPage);
      API.getCampaigns(page.currentPage - 1, page.rowPerPage).then(res => {
        this.campaigns = [];
        res.data.content.map(item => {
          this.totalElements = res.data.totalElements;
          item.campaign.startDate = item.campaign.startDate.substring(0, 10);
          item.campaign.endDate = item.campaign.endDate.substring(0, 10);
          this.campaigns.push(item.campaign);
        });
        this.allCampaignDetails = res.data.content;
      });
    },
    deleteCampaign() {
      let promise = [];
      this.selected.map(item => {
        promise.push(API.deleteCampaign(item.id));
      });
      Promise.all(promise).then(res =>
        this.updateCampaign({ rowPerPage: this.rowPerPage, currentPage: 1 })
      );
    }
  }
};
</script>
<style scoped>
.tooltips {
  position: relative;
}
.tooltip-text {
  width: 100px;
  position: absolute;
  top: 25px;
  left: -40px;
  visibility: hidden;
  background-color: gray;
  color: #fff;
  text-align: center;
  padding: 0;
  border-radius: 10px;
  z-index: 2;
}
.tooltips:hover .tooltip-text {
  visibility: visible;
}

.rowperpage2 {
  width: 50px !important;
}
.template_records:hover {
  background-color: #ccbfdf;
}
</style>
