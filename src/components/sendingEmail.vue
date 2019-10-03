<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    item-key="username"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
    </template>
  </v-data-table>
</template>
<script>
export default {
  name: "sendingEmail",
  data() {
    return {
      selected: [],
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "username"
        },
        { text: "Calories", value: "calories" }
       
      ],
      desserts: [
        {
          username: "Frozen Yogurt",
          calories: 159
          
        },
        {
          username: "Ice cream sandwich",
          calories: 237
          
        },
        {
          username: "Eclair",
          calories: 262
          
        },
        {
          username: "Cupcake",
          calories: 305
          
        },
        {
          username: "Gingerbread",
          calories: 356
          
        },
        {
          username: "Jelly bean",
          calories: 375
          
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>