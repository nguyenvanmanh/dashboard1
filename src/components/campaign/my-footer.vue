<template>
  <div class="v-data-footer" style="padding: 5px; height: 60px">
    <div tyle="margin-right: 5px 20px">
      <span>Rows per page:</span>
    </div>
    <div style="border: 1px solid lightgrey;margin: 5px 20px">
      <select class="rowperpage2" v-model="rowPerPage">
        <option value="10" selecte="selected">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
    <span>{{`${start} - ${end} of ${totalElement}`}}</span>
    <div>
      <i class="material-icons" :id="isMinPage ? 'hidden': ''" @click="back">navigate_before</i>
    </div>
    <div>
      <i class="material-icons" @click="next" :id="isMaxPage ? 'hidden': ''">navigate_next</i>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      totalElement: Number,
      rowPerPageProps: Number
    },
    watch: {
      rowPerPage() {
        this.$emit("updateTable", {
          currentPage: this.currentPage,
          rowPerPage: this.rowPerPage
        });
        let end = this.rowPerPage * this.currentPage;

        if (end >= this.totalElement) this.end = this.totalElement;
        else this.end = end;
        this.start = (this.currentPage - 1) * this.rowPerPage + 1;
      }
    },
    mounted() {
      this.rowPerPage = this.rowPerPageProps;
    },
    data() {
      return {
        currentPage: 1,
        start: 1,
        end: 10,
        rowPerPage: 10,
        isMaxPage: false,
        isMinPage: true
      };
    },
    methods: {
      next() {
        let pages = Math.floor(this.totalElement / this.rowPerPage + 1);
        if (this.currentPage < pages) {
          this.currentPage++;

          let end = this.rowPerPage * this.currentPage;

          if (end >= this.totalElement) this.end = this.totalElement;
          else this.end = end;
          this.start = (this.currentPage - 1) * this.rowPerPage + 1;

          // api call to get next page
          this.$emit("updateTable", {
            currentPage: this.currentPage,
            rowPerPage: this.rowPerPage
          });
        }
        if (this.currentPage === pages) {
          this.isMaxPage = true;
        }
        this.isMinPage = false;
      },
      back() {
        if (this.currentPage === 1) {
          this.isMinPage = true;
          this.isMaxPage = false;
          return;
        }
        this.currentPage--;
        this.start = (this.currentPage - 1) * this.rowPerPage + 1;
        let end = this.rowPerPage * this.currentPage;

        if (end >= this.totalElement) this.end = this.totalElement;
        else this.end = end;
        this.start = (this.currentPage - 1) * this.rowPerPage + 1;
        //api call to get priveous
        this.$emit("updateTable", {
          currentPage: this.currentPage,
          rowPerPage: this.rowPerPage
        });
        if (this.currentPage === 1) {
          this.isMinPage = true;
        }
        this.isMaxPage = false;
      }
    }
  };
</script>
<style  scoped>
  i.material-icons {
    cursor: pointer;
    margin-left: 20px;
  }
  #hidden {
    opacity: 0.5;
  }
</style>