<template>
  <v-app id="inspire">
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers.campaigns"
          :items="campaigns"
          item-key="id"
          v-model="selected"
          class="elevation-1"
          data-app
          show-select
          hide-default-footer
        >
          <!-- end of footer -->
          <template v-slot:item.index="{item}">
            <span>{{campaigns.map( (item) => item.campaignId).indexOf(item.campaignId) + 1 }}</span>
          </template>

          <!-- New Item popup -->
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Campaing Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <!-- Dialog button add new campaign -->
              <v-dialog v-model="dialogs.addCampaign" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                  <v-btn small dark color="blue lighten-2" v-on="on">
                    <v-icon small>library_add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Create New Campaign</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-col>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="newCampaign.title" label="Campaign Name"></v-text-field>
                        </v-row>
                        <v-row cols="12" sm="6" md="4">
                          <v-text-field v-model="newCampaign.description" label="Description"></v-text-field>
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
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="dates" scrollable range no-title></v-date-picker>
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
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogs.addCampaign = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="createCampaign">Create</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- End of Dialog button add new campaign -->

              <div class="flex-grow-1"></div>
              <!-- Send email for selected campaigns button -->
              <v-alert
                transition="scale-transition"
                dark
                type="success"
                v-model="alerts.sendMail"
                dismissible
              >
                <span>Send success</span>
              </v-alert>
              <v-btn color="primary" dark @click="sendAll">Send All</v-btn>
            </v-toolbar>
          </template>
          <!-- End of New Item popup -->

          <!-- Action icons  -->
          <template v-slot:item.action="{ item }">
            <div style="display:flex; justify-content: space-around">
              <div class="tooltips">
                <v-icon
                  color="orange darken-2"
                  @click="changeTemplateDialog(item.id)"
                >rounded_corner</v-icon>
                <span class="tooltip-text">Change email template</span>
              </div>
              <div class="tooltips">
                <v-icon
                  color="green darken-2"
                  @click="chooseCustomer(item.id)"
                >supervised_user_circle</v-icon>
                <span class="tooltip-text">Choose customers</span>
              </div>
              <div class="tooltips">
                <v-icon color="teal darken-2" @click="sendMail(item.id)">email</v-icon>
                <span class="tooltip-text">Send email</span>
              </div>
            </div>
          </template>
          <!-- End of Action Icons -->
        </v-data-table>
        <data-footer :totalElement="totalElements"></data-footer>

        <!-- select list customer for sending email -->
        <v-dialog v-model="dialogs.listCustomer" scrollable persistent max-width="600px">
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
              <v-btn color="blue darken-1" text @click="dialogs.listCustomer = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="saveCustomer">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- end of select customer -->

        <!-- change Template for campaign -->
        <v-dialog v-model="dialogs.changeTemplate" scrollable max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Choose template email for this campaign</span>
            </v-card-title>
            <v-data-table :headers="headers.templates" hide-default-footer>
              <template v-slot:body>
                <tr v-for="item in templates" :key="item.emaiTemplateId">
                  <td>{{item.title}}</td>
                  <td>{{item.body}}</td>
                </tr>
              </template>
            </v-data-table>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialogs.changeTemplate = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="dialogs.changeTemplate = false">Save</v-btn>
            </v-card-actions>
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
  import DataTable from "./campaign/DataTable";
  const baseUrl = API.BASEURL;

  export default {
    components: {
      DataTable,
      DataFooter
    },
    data() {
      return {
        selectedCampaignId: null,
        totalElements: null,
        alerts: {
          sendMail: false
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
          required: value => !!value || "Required."
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
        edits: {
          templates: {}
        },
        templates: [],
        campaignCustomers: [],
        allCampaignDetails: []
      };
    },
    computed: {
      dateFormated() {
        return this.dates.join("~");
      }
    },
    created() {
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
      API.getCampaigns(0, 20).then(res => {
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
    },
    methods: {
      changeTemplateDialog(id) {
        this.edits.templates.campaignId = id;
        this.dialogs.changeTemplate = true;
      },
      createCampaign() {
        // get template id for new campaign
        this.emailTemplates.titles.forEach((element, id) => {
          this.newCampaign.emailTemplateId = this.emailTemplates.ids[id];
        });
        // get start date and due date
        this.dates.sort();
        this.newCampaign.startDate = this.dates[0];
        this.newCampaign.endDate = this.dates[1];
        axios
          .post(`${baseUrl}/email/add-campaign`, this.newCampaign)
          .then(res => {
            if (res.status === 200);
            {
              this.newCampaign.campaignId = res.data;
              this.campaigns.push(this.newCampaign);
              this.dates = [];
              this.newCampaign = {};
              this.dialogs.addCampaign = false;
            }
          });
      },
      saveCustomer() {
        this.allCampaignDetails.forEach(item => {
          if (item.campaign.id === this.selectedCampaignId) {
            item.customerCheck = this.selectedCustomer;
            return;
          }
        });
        this.dialogs.listCustomer = false;
      },
      chooseCustomer(campaignId) {
        //open dialog
        this.dialogs.listCustomer = true;
        this.selectedCampaignId = campaignId;
        // find the selected campaign rows details
        let selectedCampaign = this.allCampaignDetails.find(item => {
          if (item.campaign.id === campaignId) return item.customerCheck;
        });
        this.selectedCustomer = selectedCampaign.customerCheck;
        //
        // let listCustomer = this.campaignCustomers.find(
        //   item => item.campaignId === campaign
        // );
        // if (!listCustomer) {
        //   this.campaignCustomers.push({
        //     campaignId: campaign,
        //     list: this.allCampaignDetails.find(item => {
        //       if (item.campaign.id === campaign) return item.customerCheck;
        //     })
        //   });
        // } else {
        // }
        // this.selectedCustomer = this.campaignCustomers.find(item => {
        //   if (item.campaignId === campaign) return item.list;
        // });
      },
      sendMail(campaignId) {
        API.sendMail(item.campaignId, this.selectedCustomer);
        then(res => {
          if (res.status === 200) this.alerts.sendMail = true;
        });
      },
      sendAll() {
        let ids = this.selected.map(item => item.campaignId);
        API.sendMailAll(ids, this.selectedCustomer).then(res => {
          debugger;
          this.alerts.sendMail = true;
          this.selected = [];
        });
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
    z-index: 20;
  }
  .tooltips:hover .tooltip-text {
    visibility: visible;
  }

  .rowperpage2 {
    width: 50px !important;
  }
</style>