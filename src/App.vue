<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Spinner :isLoading="!!getIsLoading"/>
    <CreateUserModal v-if="getCreateUser"/>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import Spinner from './components/Spinner/Spinner'
import Header from './components/Header/Header'
import CreateUserModal from './components/CreateUserModal/CreateUserModal'

export default {
  name: 'App',
  components: {
    Spinner,
    Header,
    CreateUserModal
  },
  computed: {
    ...mapGetters('app', [
      'getIsLoading',
    ]),
    ...mapGetters('modal', [
      'getCreateUser'
    ])
  }
}
</script>

<style lang="scss">
@import './assets/app.scss';
</style>
