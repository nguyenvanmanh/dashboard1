<template>
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
    currentPage: {
      default: 0
    },
    sizePage: {
      default: 10
    },
    clickHandler: {}
  },

  data: () => ({}),

  methods: {
    getPrevious() {
      this.clickHandler(this.currentPage);
      this.currentPage = this.currentPage - 1;
    },
    getNext() {
      this.clickHandler(this.currentPage + 2);
      this.currentPage = this.currentPage + 1;
    },
    getPage(item) {
      this.clickHandler(item);
      this.currentPage = item - 1;
    }
  },

  watch: {
    clickHandler: function() {}
  }
};
</script>