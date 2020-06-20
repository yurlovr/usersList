<template>
  <section class="results">
    <ul class="results_list">
      <li class="results_item"
          v-for="user in getUsersData"
          :key="user.user_id"
      >
        <UserCardItem :user="user"
                      :clickButton="showUser"/>
      </li>
    </ul>
    <Pagination v-if="!getIsLoading"
                :totalRecords="getTotalRecords"
                :values="LIMIT_VALUES"
                :limitRecords="getLimit"
                :setPage="changePage"
                :currentPage="getPage"
                :changeLimitRecords="changeLimitRecords"
    />
  </section>
</template>

<script>
import UserCardItem from '../UserCardItem/UserCardItem'
import Pagination from '../Pagination/Pagination'
import { LIMIT_VALUES } from '../../const/const'
import uuid from "uuid"
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UsersResult',
  components: {
    UserCardItem,
    Pagination
  },
  props: {
    users: Array
  },
  data() {
    return {
      LIMIT_VALUES
    }
  },
  mounted() {
    this.setShowBtnCreateUser({
        meta: uuid(),
        data: 'show'
      })
  },
  computed: {
    ...mapGetters('page', [
      'getTotalRecords',
      'getPage',
      'getLimit'
    ]),
    ...mapGetters('app', [
      'getUsersData',
      'getIsLoading'
    ]),
  },
  methods: {
    ...mapActions('page', [
      'setPage',
      'setLimit',
    ]),
    ...mapActions('app', [
      'setCurrentUserId',
      'setShowBtnCreateUser'
    ]),
    showUser(event) {
      const userId = event.target.id
      this.setCurrentUserId({
        meta: uuid(),
        data: userId
      })
      this.$router.push(`/user/${userId}`)
    },
    changePage(pageNum){
      this.setPage({
          meta: uuid(),
          data: pageNum
        })
      this.scrollToTop()
    },
    changeLimitRecords(limit){
      const meta = uuid()
      this.setLimit({
        meta,
        data: limit
      })
      this.scrollToTop()
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.results {
  &_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  &_item {
    display: flex;
    margin-bottom: 30px;
    margin-right: 25px;
    border-radius: 20px;
    &:hover {
      box-shadow: 1px 1px 12px 4px rgba(109, 221, 255, 0.7);
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>