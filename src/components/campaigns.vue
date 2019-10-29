<template>
 
    <v-app id="inspire">
    <v-layout>
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="campaigns"
          v-model="selected"
          class="elevation-1"
          data-app
          show-select
        >
          <!-- New Item popup -->
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Campaing Management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <div class="flex-grow-1"></div>
                  <v-btn color="primary" dark @click ="asd">Send All</v-btn>
     
            </v-toolbar>
          </template>
          <!-- End of New Item popup -->

          <template v-slot:item.action="{ item }">
            <v-icon color="orange darken-2" left >rounded_corner</v-icon>
            <v-icon color="green darken-2"  @click="showDialog">supervised_user_circle</v-icon>
            <v-icon color="teal darken-2" right >email</v-icon>
          </template>
          
        </v-data-table>
        <v-dialog v-model="listCustomerDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Choose customers for this campaign</span>
            </v-card-title>

            <v-data-table
              :headers="customerHeaders"
              :items="customers"
              item-key="customerEmail"
              show-select
              hide-default-footer          
            >
            </v-data-table>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="listCustomerDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" text @click="listCustomerDialog = false">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> 
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>

import axios from "axios";
export default {
  data() {
    return {
      selected: [],
      customers: [],
      customerHeaders: [
        {text: "Name", value:"firstName"},
        {text: "Email", value:"customerEmail"},
      ],
      selectedCustomer: [],
      campaigns: [],
      dialog: false,
      listCustomerDialog: false,
      modal: false,
      check_activate: false,
      check_inactivate: false,
      show1: false,
      rules: {
        required: value => !!value || "Required."
      },
      headers: [
        { text:"STT", align:"center", value:"stt" },
        { text:"Id", align:"center", value:"id" },
        { text:"Campaign Name", align:"center", value:"campaignName" },
        { text:"Duration From", align:"center", value:"durationFrom" },
        { text:"Duration To", align:"center", value:"durationTo" },
        { text:"Description", align:"center", value:"description", sortable:false },
        { text:"Action", align:"center", value:"action", sortable:false },
      ],     
    };
  },

  created() {
    this.initialize();
  },
  methods: {
    asd(){ alert(2)},
    fetchUsers() {
      axios
        .get("http://localhost:3000/user", {
          headers: { Authorization: localStorage.getItem("tocken") }
        })
        .then(response => {
          this.users = response.data;
        });
    },
    initialize() {
      axios.get('http://169.254.138.3:8081/email/getAllCampaignDetail')
      .then(res => {
        console.log(res.data);
        this.customers = res.data})
      .catch(err => console.err(err));

     this.customers = [
       {name: "john doe" , email: "jonh@jirin.com"},
       {name: "jane doe" , email: "jane@hotmail.com"},
       {name: "mark kize" , email: "markh@rapme.com"},
       {name: "mike martin" , email: "mike@gor.cc"},
     ];
     this.campaigns = [
        {
          stt: 1,
          id: 2,
          campaignName: "summer slam",
          durationFrom: new Date().getDate(),
          durationTo: new Date().getDate() + 1,
          description: "lorem islum mode te: Counting objects: 10 Total 5 (delta 3), reused 5 (delta 3), pack-reused 0"
        },
        {
          stt: 2,
          id: 0,
          campaignName: "blackfriday",
          durationFrom: new Date().getDate(),
          durationTo: new Date().getDate() + 2,
          description: "lorem islum mode te: Counting objects: 10 Total 5 (delta 3), reused 5 (delta 3), pack-reused 0"
        },
        {
          stt: 3,
          id: 9,
          campaignName: "blackfriday",
          durationFrom: new Date().getDate(),
          durationTo: new Date().getDate() + 2,
          description: "lorem islum mode te: Counting objects: 10 Total 5 (delta 3), reused 5 (delta 3), pack-reused 0"
        },
        {
          stt: 4,
          id: 8,
          campaignName: "blackfriday",
          durationFrom: new Date().getDate(),
          durationTo: new Date().getDate() + 2,
          description: "lorem islum mode te: Counting objects: 10 Total 5 (delta 3), reused 5 (delta 3), pack-reused 0"
        },
        
      ];
    },
    showDialog() {
      this.listCustomerDialog = true;
    },
    close() {
      this.dialog = false;
    },
    save() {
      
      this.close();
    }
  }
};

</script>