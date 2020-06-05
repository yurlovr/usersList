<template>
  <section class="results">
    <h1 class=header>
      User's transactions: {{getCurrentUser ? getCurrentUser.user_name : ''}}
    </h1>
    <DatePicker
                :title="'Select dates to receive transactions'"
                :disabledDate="disabledDate"
                :defaultDate="getDefaultDate()"
                :value="getPeriod"
                v-on:period="changePeriod"
    />
    <div class="buttons">
      <BButton :onClick="getTransactions"
                :label="BUTTON_LABEL.REPORT"
                :disabled="!getPeriod"/>
    </div>
    <div v-if="getUserTransactions" class="report">
      <p v-if="!getUserTransactions.length" class="report_title">
        No transactions found during this period<br/>
        <span class="report_title-period">
          from {{dateForRender(getPeriod[0])}} to {{dateForRender(getPeriod[1])}}
        </span>
      </p>
      <div v-else>
        <p class="report_title">
          Transactions Report from<br/>
          <span class="report_title-period">
            from {{dateForRender(getPeriod[0])}} to {{dateForRender(getPeriod[1])}}
          </span>
        </p>
        <Table :data="getDataForRender(getUserTransactions)"
              :tableWidth="'100%'" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import uuid from 'uuid'
import * as dayjs from 'dayjs'
import DatePicker from '../DatePicker/DatePicker'
import BButton from '../BButton/BButton'
import Table from '../Table/Table'
import { DATE_FORMAT_RENDER,
          DATE_FORMAT_MMDDYYYY,
          BUTTON_LABEL,
          LOADING_ACTIONS } from '../../const/const'
import { endTommorow } from '../../libs/helperFunction'

export default {
  name: 'Transactions',
  components: {
    DatePicker,
    BButton,
    Table
  },
    props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      BUTTON_LABEL,
      LOADING_ACTIONS
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
    ...mapGetters('app', [
      'getCurrentUser',
      'getCurrentUserId',
    ]),
    ...mapGetters('user', [
      'getUserTransactions',
      'getPeriod'
    ]),
    period: {
      get () {
        return this.getPeriod
      },
      set (val) {
        this.setPeriod({
          meta: uuid(),
          data: val
        })
      }
    }
  },
  methods: {
    ...mapActions('app',[
      'setCurrentUserId',
      'setIsLoading'
    ]),
    ...mapActions('user', [
      'setPeriod',
    ]),
    disabledDate(date) {
      return dayjs(date).format(DATE_FORMAT_MMDDYYYY) > endTommorow().format(DATE_FORMAT_MMDDYYYY)
    },
    getDefaultDate() {
      return dayjs().subtract(1, 'month').format()
    },
    changePeriod(period){
      this.period = period
    },
    getTransactions() {
      this.setIsLoading({
        meta: uuid(),
        data: LOADING_ACTIONS.REPORT
      })
    },
    dateForRender(date){
      return dayjs(date).format(DATE_FORMAT_RENDER)
    },
    getDataForRender(data) {
      return data.map(d => {
        return {
          ...d,
          operation_id: d.operation_id.toString(),
          transaction_id: d.transaction_id || '---',
          coupon_id: d.coupon_id || '---' ,
          coupon_code: d.coupon_code || '---',
          date: dayjs(d.date).format(DATE_FORMAT_RENDER),
          amount: d.amount ? d.amount.toFixed(2) : '---',
          user_balance: d.user_balance ? d.user_balance.toFixed(2) : '---',
          sum: d.sum ? d.sum.toFixed(2) : '---',
          currency: d.currency || '---',
        }
      })
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
  & .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 50px;
  }
}
.report {
  &_title {
    width: 700px;
    margin: 0 auto;
    font-size: 24px;
    text-align: center;
    &-period {
      font-size: 20px;
    }
  }
}
</style>