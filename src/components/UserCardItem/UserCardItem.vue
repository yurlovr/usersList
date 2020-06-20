<template>
  <div class="user">
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.NAME}}:</span>
      <span class="props name">
        {{user.user_name || '---'}}
      </span>
    </p>
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.ID}}:</span>
      <span class="props name">
        {{user.user_id || '---'}}
      </span>
    </p>
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.CUSTOM}}:</span>
      <span class="props name">
        {{user.user_custom || '---'}}
      </span>
    </p>
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.EMAIL}}:</span>
      <span class="props">
        {{user.email || '---'}}
      </span>
    </p>
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.REG_DATE}}:</span>
      <span class="props">
        {{getRegisterDate(user.register_date)}}
      </span>
    </p>
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.BALANCE}}:</span>
      <span class="props">
        {{user.balance.toFixed(2)}}
      </span>
    </p>
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.USER_BALANCE}}:</span>
      <span class="props">
        {{user.wallet_amount}} {{user.wallet_currency || '---'}}
      </span>
    </p>
    <p class="user_props">
      <span>{{USER_PROPS_TITLE.ENABLED}}:</span>
      <span class="props name">
        {{user.enabled ? 'Yes' : 'No'}}
      </span>
    </p>
    <div class="buttons_container">
      <BButton class="button_show"
                :label="BUTTON_LABEL.SHOW"
                :onClick="clickButton"
                :buttonId="user.user_id"/>
    </div>
  </div>
</template>

<script>
import { dateFormatDDMMYYYY } from '../../libs/helperFunction'
import { USER_PROPS_TITLE } from '../../const/const'
import BButton from '../BButton/BButton'
import { BUTTON_LABEL } from '../../const/const'

export default {
  name: 'UserCardItem',
  components: {
    BButton
  },
  props: {
    user: {
      type: Object,
    },
    clickButton: {
      type: Function
    }
  },
  data() {
    return {
      USER_PROPS_TITLE,
      BUTTON_LABEL
    }
  },
  methods: {
    getRegisterDate(date) {
      if(!date) return '---'
      return dateFormatDDMMYYYY(date)
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding-left: 30px;
  padding-right: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-shadow: 3px 5px 7px 3px rgba(0, 0, 0, 0.2);
  &_props {
    display: flex;
    flex-direction: column;
    & span:not(.props) {
      font-weight: bold;
    }
    .name {
      word-wrap: break-word;
    }
  }
}
.buttons_container {
  margin-top: auto;
}
</style>