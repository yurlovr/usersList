<template>
  <div class="pagination_block">
    <paginate
      :page-count="Math.ceil(totalRecords / limitRecords)"
      :page-range="3"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page'"
      :next-class="'next'"
      :prev-class="'prev'"
      v-model="page"
      >
    </paginate>
    <CountRecords :changeLimit="changeLimitRecords"
                  :currentLimit="limitRecords"
                  :values="values"/>
  </div>
</template>

<script>
import Paginate from 'vuejs-paginate'
import CountRecords from '../CountRecords/CountRecords'

export default {
  name: 'Pagination',
  components: {
    Paginate,
    CountRecords
  },
  props: {
    totalRecords: {
      type: Number
    },
    limitRecords: {
      type: Number
    },
    values: {
      type: Array
    },
    setPage: {
      type: Function
    },
    currentPage: {
      type: Number
    },
    changeLimitRecords: {
      type: Function
    }
  },
  computed: {
    page: {
      get () {
        return this.currentPage
      },
      set(val) {
        this.setPage(val)
      }
    }
  }
}
</script>

<style lang="scss">
.pagination_block {
  margin-top: auto;
}
.pagination {
  display: flex;
  justify-content: center;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: auto;
  padding: 0;
  list-style: none;
  color: #3964a6;
  & li.active {
    color: #FFFFFF;
    background-color: #3964a6;
  }
  .page {
    margin-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid;
    border-radius: 5px;
    &.disabled {
      align-self: flex-end;
      border: none;
    }
  }
  .next {
    padding-top: 5px;
  }
  .prev {
    margin-right: 10px;
    padding-top: 5px;
  }
}
</style>