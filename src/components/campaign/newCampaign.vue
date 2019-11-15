<template>
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
</template>