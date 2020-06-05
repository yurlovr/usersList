<template>
  <div>
    <section class="results">
      <h1 class=header>
        User {{getCurrentUser ? getCurrentUser.user_name || '---' : ''}}
      </h1>
      <UserCard v-if="getCurrentUser" :user="getCurrentUser"/>
      <div v-if="getCurrentUser" class="buttons_container">
        <BButton :label="BUTTON_LABEL.TRANSACTIONS"
                  :onClick="transactions"/>
        <BButton :label="BUTTON_LABEL.EDIT_BALANCE"
                  :onClick="editBalance"/>
        <BButton :label="BUTTON_LABEL.CLOSE"
                  :onClick="close"/>
      </div>
    </section>
    <EditBalance v-if="getEditBalance"
                  :name="getCurrentUser.user_name"
                  :closeModal="editBalance"
                  :saveNewBalance="saveNewBalance"
                  :currentBalance="getCurrentUser.balance"
                  :currency="getCurrentUser.wallet_currency"
                  :showButtons="showButtons"
                  />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import uuid from 'uuid'
import UserCard from'../UserCard/UserCard'
import BButton from '../BButton/BButton'
import EditBalance from '../EditBalance/EditBalance'
import { BUTTON_LABEL } from '../../const/const'

export default {
  name: 'User',
  components: {
    UserCard,
    BButton,
    EditBalance
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      showButtons: true,
      BUTTON_LABEL
    }
  },
  created() {
    if (!this.getCurrentUserId) {
      this.setCurrentUserId({
        meta: uuid(),
        data: this.id
      })
    }
  },
  computed: {
    ...mapGetters('app',[
      'getCurrentUser',
      'getCurrentUserId'
    ]),
    ...mapGetters('user', [
      'getEditBalance'
    ]),
  },
  methods: {
    ...mapActions('user', [
      'setEditBalance',
      'setNewUserBalance'
    ]),
    ...mapActions('app',[
      'setCurrentUserId',
    ]),
    editBalance() {
      this.showButtons = true
      this.setEditBalance({
        meta: uuid(),
        data: !this.getEditBalance
      })
    },
    saveNewBalance() {
      this.showButtons = false
      this.setNewUserBalance({
        meta: uuid()
      })
    },
    close() {
      this.setCurrentUserId({
        meta: uuid(),
        data: null
      })
      this.$router.push('/users')
    },
    transactions() {
      this.$router.push(`/transactions/${this.getCurrentUserId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.results {
  & .header {
    text-align: center;
    font-size: 28px;
    word-wrap: break-word;
  }
}
.user {
  width: 80%;
  padding-left: 80px;
  border-radius: 0px;
  box-shadow: none;
  border: none;
}
/deep/.user_props {
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 22px;
  & .props {
    margin-left: 20px;
    white-space: pre-wrap;
    word-break: break-word;
  }
}
.buttons_container {
  margin-top: auto;
  margin-bottom: 0;
}
</style>