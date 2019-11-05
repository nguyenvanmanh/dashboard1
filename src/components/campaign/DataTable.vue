<template>
  <table id="dt-basic-example" class="table table-bordered table-hover table-striped w-100">
    <thead>
      <tr>
        <th>Index</th>
        <th v-for="header in headers" :key="header.text">{{header.text}}</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(record, index) in campaigns" :key="record.title">
        <td>{{ index }}</td>
        <td>{{ record.campaignId }}</td>
        <td>{{ record.title }}</td>
        <td>{{ record.startDate }}</td>
        <td>{{ record.endDate }}</td>
        <td>{{ record.description }}</td>
        <td>
          <div>
            <i
              class="material-icons"
              style="color: ongrage; cursor: pointer"
              @click="updateTemplate(record.campaignId)"
            >rounded_corner</i>
          </div>
          <i
            class="material-icons"
            @click="updateTemplate(record.campaignId)"
            style="color: green; cursor: pointer"
          >supervised_user_circle</i>
          <i
            class="material-icons"
            @click="updateTemplate(record.campaignId)"
            style="color: grey; cursor: pointer"
            right
          >email</i>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    data() {
      return {
        campaigns: [
          {
            campaignId: 1,
            title: "summer sale",
            startDate: "2019-11-09",
            endDate: "2019-12-12",
            description: " fuga a!"
          },
          {
            campaignId: 2,
            title: "winter sale",
            startDate: "2019-11-09",
            endDate: "2019-12-12",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia autem totam molestias sunt quo deleniti facilis necessitatibus corrupti fuga a!"
          },
          {
            campaignId: 3,
            title: "spring sale",
            startDate: "2019-11-09",
            endDate: "2019-12-12",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia autem totam molestias sunt quo deleniti facilis necessitatibus corrupti fuga a!"
          },
          {
            campaignId: 4,
            title: "autum sale",
            startDate: "2019-11-09",
            endDate: "2019-12-12",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia autem totam molestias sunt quo deleniti facilis necessitatibus corrupti fuga a!"
          },
          {
            campaignId: 5,
            title: "year around sale",
            startDate: "2019-11-09",
            endDate: "2019-12-12",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia autem totam molestias sunt quo deleniti facilis necessitatibus corrupti fuga a!"
          }
        ],
        headers: [
          { text: "Id", align: "center", value: "campaignId" },
          { text: "Campaign Name", align: "center", value: "title" },
          { text: "Duration From", align: "center", value: "startDate" },
          { text: "Duration To", align: "center", value: "endDate" },
          {
            text: "Description",
            align: "center",
            value: "description",
            sortable: false
          }
        ]
      };
    },
    created() {},
    components: {},
    methods: {
      updateTemplate(campaignId) {
        alert("change template" + campaignId);
      }
    }
  };
</script>
<style scoped>
  .index {
    color: red;
    width: 25px !important;
  }
</style>