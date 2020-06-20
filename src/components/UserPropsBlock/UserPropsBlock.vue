<template>
  <div class="card_name">
    <p class="name">
      <span>{{title}}:</span>
      <span v-if="!isEdit && saveProp" class="text">{{SAVE_USER_PROP}}: {{userProps || '---'}}</span>
      <span v-else-if="!isEdit" class="text">{{userProps || '---'}}</span>
      <IInput v-else
              :type="'text'"
              :placeholder="userProps"
              :value="userProps"
              v-on:input="changeValue"
              :error="!isValid"
      />
    </p>
      <div v-if="showButtons" class="buttons">
        <BButton :label="!isEdit ? BUTTON_LABEL.EDIT : BUTTON_LABEL.BACK"
                  :onClick="clickEdit"
                  :buttonId="editButtonId"
                  :small="true"/>
        <BButton :label="BUTTON_LABEL.SAVE"
                  :onClick="clickSave"
                  :disabled="!isEdit || !isValid"
                  :buttonId="saveButtonId"
                  :small="true"/>
      </div>
  </div>
</template>

<script>
import IInput from '../IInput/IInput'
import BButton from '../BButton/BButton'
import { BUTTON_LABEL, SAVE_USER_PROP } from '../../const/const'

export default {
  name: 'UserPropsBlock',
  components: {
    IInput,
    BButton
  },
  props: {
    title: {
      type: String
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    userProps: {
      type: String
    },
    showButtons: {
      type: Boolean,
      default: true
    },
    editButtonId: {
      type: String
    },
    saveButtonId: {
      type: String
    },
    clickEdit: {
      type: Function,
      default: () => {}
    },
    clickSave: {
      type: Function,
      default: () => {}
    },
    changeValue: {
      type: Function,
      default: () => {}
    },
    isValid: {
      type: Boolean,
      default: true
    },
    saveProp: {
      type: Boolean
    }
  },
  data() {
    return {
      BUTTON_LABEL,
      SAVE_USER_PROP
    }
  }
}
</script>

<style lang="scss" scoped>
.card_name {
    display: flex;
    margin-bottom: 30px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  & .name {
    display: flex;
    width: 900px;
    min-height: 150px;
    padding-left: 50px;
  }
  & span {
    width: 225px;
    align-self: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 29px;
  }
  & span.text {
    width: 600px;
    word-wrap: break-word;
    font-weight: normal;
    text-align: center;
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-self: center;
    min-width: 230px;
    margin-left: auto;
    & .button_small {
      width: 80px;
      padding: 9px 15px;
      background-color: #FFFFFF;
      border-radius: 12px;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      text-align: center;
      color: #000000;
      box-shadow: 3px 5px 7px 3px rgba(0, 0, 0, 0.2);
      &:hover {
        box-shadow: 1px 1px 12px 4px rgba(0, 196, 255, 0.9);
      }
    &[disabled] {
      background-color: grey;
      color: #FFFFFF;
      &:hover {
        box-shadow: 3px 5px 7px 3px rgba(0, 0, 0, 0.2);
      }
    }
    }
    & button + button {
      margin-left: 20px;
    }
  }
}
/deep/ .label {
  align-self: center;
  padding-top: 15px;
}
</style>