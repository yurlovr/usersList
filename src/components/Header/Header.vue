<template>
  <div  class="header_block">
    <div v-if="getShowBtnCreateUser === HEADER_BUTTON_STATE.HIDE" class="button_wrapper back">
      <BButton :label="BUTTON_LABEL.BACK" :onClick="goBack"/>
    </div>
    <div v-if="getShowBtnCreateUser === HEADER_BUTTON_STATE.SHOW" class="empty"/>
    <p class="text">Users List</p>
    <div v-if="getShowBtnCreateUser  === HEADER_BUTTON_STATE.SHOW" class="button_wrapper create">
      <BButton :label="BUTTON_LABEL.CREATE_USER" :onClick="createUser"/>
    </div>
    <div v-if="getShowBtnCreateUser === HEADER_BUTTON_STATE.HIDE" class="empty"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import uuid from 'uuid'
import BButton from '../BButton/BButton'
import { BUTTON_LABEL, HEADER_BUTTON_STATE } from '../../const/const'

export default {
  name: 'Header',
  components: {
    BButton
  },
  data() {
    return {
      BUTTON_LABEL,
      HEADER_BUTTON_STATE
    }
  },
  computed: {
    ...mapGetters('app', [
      'getShowBtnCreateUser'
    ])
  },
  methods: {
    ...mapActions('modal', [
      'setCreateUser'
    ]),
    createUser() {
      this.setCreateUser({
        meta: uuid(),
        data: true
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.header_block {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background-color: inherit;
  & .text {
    margin-left: auto;
    margin-right: auto;
    padding: 0;
    font-size: 32px;
    line-height: 37px;
    text-align: center;
    letter-spacing: 0.04em;
    font-weight: bold;
    text-shadow: 3px 2px 4px #3964a5;
  }
}
.button_wrapper {
  display: flex;
  width: 250px;
  &.back {
    justify-content: flex-start;
  }
  &.create {
    justify-content: flex-end;
  }
}
.empty {
  width: 250px;
}
</style>