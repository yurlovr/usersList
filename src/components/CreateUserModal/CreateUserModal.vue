<template>
  <Modal :closeModal="close"
          :header="MODAL_TITLE.CREATE"
          :heightModal="'600px'">
    <div class="create" v-if="!getUserCreated">
      <IInput
        :label="INPUT_LABEL.NAME"
        :type="'text'"
        :placeholder="INPUT_LABEL.NAME"
        :value="getUserName"
        :errorText="REQUIRED_FIELD"
        v-model="userName"
      />
      <IInput
        :label="INPUT_LABEL.CUSTOM"
        :type="'text'"
        :placeholder="INPUT_LABEL.CUSTOM"
        :value="getUserName"
        :errorText="REQUIRED_FIELD"
        v-model="userCustomName"
      />
      <IInput
        :label="INPUT_LABEL.EMAIL.label"
        :type="'text'"
        :placeholder="INPUT_LABEL.EMAIL.placeholder"
        :value="getUserName"
        :errorText="REQUIRED_FIELD"
        :error="!emailVaild"
        v-model="userEmail"
      />
      <div class="buttons_container">
        <BButton :label="BUTTON_LABEL.CREATE"
                :onClick="createUser"
                :disabled="!userName || !userEmail || !userCustomName || !emailVaild"
        />
        <BButton :label="BUTTON_LABEL.CLOSE"
                :onClick="close"
        />
      </div>
    </div>
    <div v-else class="message">
      <p class="text">
        {{getUserCreated}}
      </p>
    </div>
  </Modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import uuid from 'uuid'
import Modal from '../Modal/Modal'
import IInput from '../IInput/IInput'
import BButton from '../BButton/BButton'
import { EMAIL_REG_EXP,
          REQUIRED_FIELD,
          BUTTON_LABEL,
          INPUT_LABEL,
          MODAL_TITLE } from '../../const/const'

export default {
  name: 'CreateUserModal',
  components: {
    Modal,
    IInput,
    BButton
  },
  data() {
    return {
      emailVaild: true,
      REQUIRED_FIELD,
      BUTTON_LABEL,
      INPUT_LABEL,
      MODAL_TITLE
    }
  },
  computed: {
    ...mapGetters('user', [
      'getUserName',
      'getUserCustomName',
      'getUserEmail'
    ]),
    ...mapGetters('app', [
      'getUserCreated'
    ]),
    userName: {
      get () {
        return this.getUserName
      },
      set (val) {
        this.setUserName({
          meta: uuid(),
          data: val
        })
      }
    },
    userCustomName: {
      get () {
        return this.getUserCustomName
      },
      set (val) {
        this.setUserCustomName({
          meta: uuid(),
          data: val
        })
      }
    },
    userEmail: {
      get () {
        return this.getUserEmail
      },
      set (val) {
        if(!EMAIL_REG_EXP.test(val)) {
          this.emailVaild = false
        } else {
          this.emailVaild = true
        }
        this.setUserEmail({
          meta: uuid(),
          data: val
        })
      }
    }
  },
  methods: {
    ...mapActions('modal', [
      'setCreateUser'
    ]),
    ...mapActions('user', [
      'setUserName',
      'setUserCustomName',
      'setUserEmail',
    ]),
    ...mapActions('app', [
      'setCreateNewUser'
    ]),
    close() {
      this.setCreateUser({
        meta: uuid(),
        data: false
      })
    },
    createUser(event) {
      event.preventDefault()
      this.setCreateNewUser({
        meta: uuid()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.create {
  overflow: auto;
}
.message {
  width: 500px;
  margin-top: 100px;
  margin-bottom: auto;
  align-self: center;
  font-size: 24px;
  text-align: center;
}
</style>