<template>
  <div class="v-data-footer" style="padding: 5px; height: 60px">
    <div style="margin-right:20px">
      <span>Rows per page:</span>
    </div>
    <div style="marin-right: 20px">
      <select class="rowperpage2" v-model="rowPerPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
    <span>{{`${start}-${start + rowPerPage} of ${total}`}}</span>
    <div>
      <i class="material-icons" @click="back">navigate_before</i>
    </div>
    <div>
      <i class="material-icons" @click="next">navigate_next</i>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentPage: 1,
        start: null,
        end: null,
        total: 42,
        rowPerPage: 10,
        isMaxPage: false,
        isMinPage: true
      };
    },
    methods: {
      next() {
        debugger;
        let pages = this.total / this.rowPerPage + 1;
        if (this.currentPage < pages) {
          this.currentPage++;
          // api call to get next page
        }
        if (this.currentPage === pages) this.isMaxPage = true;

        this.isMinPage = false;
      },
      back() {
        if (this.currentPage === 1) {
          this.isMinPage = true;
          this.isMaxPage = false;
          return;
        }
        this.currentPage--;
        //api call to get priveous
      }
    }
  };
</script>
<style  scoped>
  i.material-icons {
    cursor: pointer;
    margin-left: 20px;
  }
  .hidden {
    opacity: 0.5;
  }
</style>