<template>
  <div>
    <!-- pagination start -->
    <ul class="pagination" style="float: right">
      <li v-if="this.currentPage==0" id="pre-page " class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" @click="getPrevious()">Previous</a>
      </li>
      <li v-else id="pre-page " class="page-item">
        <a class="page-link" href="#" tabindex="-1" @click="getPrevious()">Previous</a>
      </li>
      <template v-for="index in totalPages">
        <li
          v-if="index == (currentPage+1)"
          :key="index"
          :id="`page_${index}`"
          class="page-item active"
        >
          <a class="page-link" href="#" tabindex="-1" @click="getPage(index)">{{index}}</a>
        </li>
        <li v-else :key="index" :id="`page_${index}`" class="page-item">
          <a class="page-link" href="#" tabindex="-1" @click="getPage(index)">{{index}}</a>
        </li>
      </template>

      <li v-if="(this.currentPage+1) ==this.totalPages" id="next-page" class="page-item disabled">
        <a class="page-link" href="#" @click="getNext()">Next</a>
      </li>
      <li v-else id="next-page" class="page-item">
        <a class="page-link" href="#" @click="getNext()">Next</a>
      </li>
    </ul>
    <!-- pagination end -->
    <button
      class="btn btn-outline-secondary dropdown-toggle waves-effect waves-themed btn-dropdown"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >{{numberOfItem}}</button>
    <div
      class="dropdown-menu"
      x-placement="bottom-start"
      style="position: absolute; will-change: top, left; top: 37px; left: 0px; min-width: 56.06px"
    >
      <a
        v-for="(item, index)  in sizePage"
        class="dropdown-item"
        v-bind:key="index"
        @click="setSize(item)"
      >
        <span>{{item}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    totalPages: {
      default: 1
    },
    sizePage: {
      default: [10, 20, 50]
    },
    clickHandler: {}
  },
  data: () => ({
    numberOfItem: 10,
    currentPage: 0
  }),
  methods: {
    getPrevious() {
      this.clickHandler(this.currentPage, this.numberOfItem);
      this.currentPage = this.currentPage - 1;
    },
    getNext() {
      this.clickHandler(this.currentPage + 2, this.numberOfItem);
      this.currentPage = this.currentPage + 1;
    },
    getPage(item) {
      let crp = item - 1;
      this.currentPage = crp;
      this.clickHandler(item, this.numberOfItem);
    },
    setSize(item) {
      this.numberOfItem = item;
      this.clickHandler(1, item);
      this.currentPage = 0;
    }
  },
  watch: {
    clickHandler: function() {}
  }
};
</script>

<style scoped>
.btn-dropdown {
  float: right;
}
</style>