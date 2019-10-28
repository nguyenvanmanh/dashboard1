<template>
    <v-data-table
      :headers="headers"
      :items="campaigns"
      item-key="id"
      v-model="valu2"
      show-select
      class="elevation-1"
    >
    </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      valu2: [],
      headers: [
        { text:"STT", align:"center", value:"stt" },
        { text:"Id", align:"center", value:"id" },
        { text:"Campaign Name", align:"center", value:"campaignName" },
        { text:"Duration From", align:"center", value:"durationFrom" },
        { text:"Duration To", align:"center", value:"durationTo" },
        { text:"Description", align:"center", value:"description" },
      ],
      campaigns: [
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
        }

      ],
    }
  }
}
</script>