<template>
  <Modal :closeModal="closeModal"
        :heightModal="'500px'"
        :widthModal="'600px'"
        :header="MODAL_TITLE.EDIT_BALANCE + name"
        :marginTop="'200px'"
  >
  <div v-if="!getBalanceChanged" class="balance_current">
    Current Balance: <span>{{currentBalance.toFixed(2)}}</span>
  </div>
  <div v-if="!getBalanceChanged" class="balance" >
    <IInput
            :label="INPUT_LABEL.BALANCE.label"
            :type="'number'"
            :errorText="REQUIRED_FIELD"
            v-model="balance"
            :value="getChangeUserBalance"
            :placeholder="INPUT_LABEL.BALANCE.placeholder"
    />

    <IInput
            :label="INPUT_LABEL.REASON"
            :type="'text'"
            :placeholder="INPUT_LABEL.REASON"
            :errorText="REQUIRED_FIELD"
            v-model="reason"
            :value="getReasonChangeBalance"
    />
  </div>
  <div v-else class="balance balance_new">
    {{getBalanceChanged}} {{currency || '---'}}
  </div>
  <div  v-if="showButtons" class="buttons_container">
    <BButton :label="BUTTON_LABEL.SAVE" :onClick="saveNewBalance" :disabled="!balance || !reason"/>
    <BButton :label="BUTTON_LABEL.CLOSE" :onClick="closeModal" />
  </div>
  </Modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import uuid from 'uuid'
import Modal from '../Modal/Modal'
import IInput from '../IInput/IInput'
import BButton from '../BButton/BButton'
import { MODAL_TITLE,
          REQUIRED_FIELD,
          INPUT_LABEL,
          BUTTON_LABEL } from '../../const/const'

export default {
  name: 'EditBalance',
  components: {
    Modal,
    IInput,
    BButton
  },
  props: {
    closeModal: {
      type: Function
    },
    saveNewBalance: {
      type: Function
    },
    name: {
      type: String
    },
    currentBalance: {
      type: Number
    },
    currency: {
      type: String
    },
    showButtons: {
      type: Boolean
    }
  },
  data() {
    return {
      MODAL_TITLE,
      REQUIRED_FIELD,
      INPUT_LABEL,
      BUTTON_LABEL
    }
  },
  computed: {
    ...mapGetters('user', [
      'getChangeUserBalance',
      'getReasonChangeBalance',
      'getBalanceChanged'
    ]),
    balance: {
      get () {
        return this.getChangeUserBalance
      },
      set (val) {
        this.setChangeUserBalance({
          meta: uuid(),
          data: val
        })
      }
    },
    reason: {
      get () {
        return this.getReasonChangeBalance
      },
      set (val) {
        this.setReasonChangeBalance({
          meta: uuid(),
          data: val
        })
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'setChangeUserBalance',
      'setReasonChangeBalance'
    ])
  }
}
</script>

<style lang="scss" scoped>
.balance{
  margin-top: 5px;
  margin-bottom: auto;
  &_current {
    margin-top: 20px;
    font-size: 30px;
    text-align: center;
    & span {
      font-weight: bolder;
    }
  }
  &_new {
    width: 500px;
    margin-top: 100px;
    align-self: center;
    font-size: 28px;
    text-align: center;
  }
}
.error {
  left: 14%;
}
</style>