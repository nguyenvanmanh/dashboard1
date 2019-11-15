<template>
  <div>
    <div class="row toolbar">
      <span>Left Text</span>
      <v-spacer></v-spacer>
      <span>Right Text</span>
    </div>
    <div class="row">
      <data-table></data-table>
    </div>
  </div>
</template>
<script>
  import DataTable from "../components/campaign/DataTable";
  export default {
    components: {
      DataTable
    }
  };
</script>
<style  scoped>
  .toolbar {
    background-color: lightgray;
    margin: 1em 2em;
  }
</style>