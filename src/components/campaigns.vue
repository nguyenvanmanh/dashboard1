<template>
 
    <v-app id="inspire">
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers.campaigns"
          :items="campaigns"
          item-key="campaignId"
          v-model="selected"
          class="elevation-1"
          data-app
          show-select
        >
          <template v-slot:item.stt="{item}">
            <span> {{campaigns.map( (item) => item.campaignId).indexOf(item.campaignId) + 1 }}</span>
          </template>

          <!-- New Item popup -->
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Campaing Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <!-- Dialog button add new campaign -->
              <v-dialog v-model="dialogs.addCampaign" persistent max-width="600px">
                <template v-slot:activator="{ on }">            
                  <v-btn small dark color="blue lighten-2" v-on="on"><v-icon small>library_add</v-icon></v-btn>
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
                              <v-date-picker v-model="dates" scrollable range no-title ></v-date-picker>
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
              <v-alert  dark type="success" v-model="alerts.sendMail" dismissible>
                <span >Send success</span>
              </v-alert>
              <v-btn color="primary" dark @click="sendAll">Send All</v-btn>
            </v-toolbar>
          </template>
          <!-- End of New Item popup -->

          <!-- Action icons  -->
          <template v-slot:item.action="{ item }">
            <v-icon color="orange darken-2" @click="templateDialog(item.campaignId)" left >rounded_corner</v-icon>
            <v-icon color="green darken-2"  @click="showDialog">supervised_user_circle</v-icon>
            <v-icon color="teal darken-2" right @click="sendMail(item.campaignId)">email</v-icon>
          </template>
          <!-- End of Action Icons -->
          
        </v-data-table>
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
                  item-key="customerEmail"
                  show-select
                  hide-default-footer          
                >
                </v-data-table>

                <v-card-actions>
                  <!-- <span>{{ selectedCustomer }}</span> -->
                  
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialogs.listCustomer = false">Close</v-btn>
                  <v-btn color="blue darken-1" text @click="dialogs.listCustomer = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog> 
            <!-- end of select customer -->
        

        <!-- change Template for campaign -->
        <v-dialog v-model="dialogs.changeTemplate" scrollable max-width=600px>
          <v-card>
            <v-card-title>
              <span class="headline">Choose template email for this campaign</span>
            </v-card-title>
            

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

import axios from "axios";
import * as API from "../service/API"
const baseUrl = API.BASEURL;
export default {
  data() {
    return {
      alerts:{
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
        listCustomer: false,
      },
      rules: {
        required: value => !!value || "Required."
      },
      headers: {
        customers: [
          {text: "Name", value:"fullName"},
          {text: "Email", value:"customerEmail"},
        ],
        campaigns: [
          { text:"STT", align:"center", value:"stt" },
          { text:"Id", align:"center", value:"campaignId" },
          { text:"Campaign Name", align:"center", value:"title" },
          { text:"Duration From", align:"center", value:"startDate" },
          { text:"Duration To", align:"center", value:"endDate" },
          { text:"Description", align:"center", value:"description", sortable:false },
          { text:"Action", align:"center", value:"action", sortable:false },
        ], 
      }
    };
  },
  computed: {
    dateFormated(){
      return this.dates.join('~');
    }
  },
  created() {
    axios.get(`${baseUrl}/email/get-all-topic`)
      .then(res => {
        this.emailTemplates.titles = res.data.map( item => item.title );
        this.emailTemplates.ids = res.data.map(item => item.emaiTemplateId);
        } )
      .catch(err =>{ 
        // TODO: log this err
      });
    axios.get(`${baseUrl}/email/getAllCampaignDetail`)
      .then(res => {
          res.data.map(item => {
            item.campaign.startDate = item.campaign.startDate.substring(0,10);
            item.campaign.endDate = item.campaign.endDate.substring(0,10);
            this.campaigns.push(item.campaign)
          });
          this.customers =  res.data[0].customerList;
          this.customers.map( customer => customer.fullName = customer.firstName + ' ' + customer.lastName );
        });
        
  },
  methods: {
    templateDialog(id){
      this.dialogs.changeTemplate = true;
    },
    createCampaign(){
      // get template id for new campaign
      this.emailTemplates.titles.forEach((element,id) => {
        if(this.selectedTemplate === element)
          this.newCampaign.emailTemplateId = this.emailTemplates.ids[id];
      });
      // get start date and due date
      this.dates.sort();
      this.newCampaign.startDate = this.dates[0];
      this.newCampaign.endDate = this.dates[1];
      axios.post(`${baseUrl}/email/add-campaign`,this.newCampaign)
        .then(res =>{
          if(res.status === 200);
          {
            this.newCampaign.campaignId = res.data;
            this.campaigns.push(this.newCampaign);
            this.dates = [];
            this.newCampaign ={};  
            this.dialogs.addCampaign = false;
          }
        });
      
    },
    // fetchUsers() {
    //   axios
    //     .get(`${baseUrl}/user`, {
    //       headers: { Authorization: localStorage.getItem("tocken") }
    //     })
    //     .then(response => {
    //       this.users = response.data;
    //     });
    // },
    // List customer
    showDialog() {
      this.dialogs.listCustomer = true;
    },
    sendMail(campaignId){
      this.alerts.sendMail = true;

      // axios.post(`${baseUrl}/email/sendMail`, {
      //   customers: this.selectedCustomer,
      //   campaignId: campaignId,
      //   sendEmailUserId: 1
      // }).then(res=>{
      //   this.alerts.sendMail = true;
      // });
    }
    ,
    sendAll(){
      this.selected.map( item => {
        axios.post(`${baseUrl}/email/sendMail`, {
          customers: this.selectedCustomer,
          campaignId: item.campaignId,
          sendEmailUserId: 1
        }).then(res=>{
          this.selected = [];
          this.alerts.sendMail = true;
        });
      });
    },
  }
};

</script>