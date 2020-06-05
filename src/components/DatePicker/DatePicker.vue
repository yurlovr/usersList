<template>
  <div class="block">
    <p class="title">{{title}}</p>
    <el-date-picker
      v-model="model"
      type="daterange"
      align="center"
      :start-placeholder="DATE_PICKER_CONST.START_HOLDER"
      :end-placeholder="DATE_PICKER_CONST.END_HOLDER"
      :default-time="[DATE_PICKER_CONST.DEFAULT_TIME.begin, DATE_PICKER_CONST.DEFAULT_TIME.end]"
      :editable="false"
      :format="DATE_PICKER_CONST.FORMAT"
      :unlink-panels="false"
      :picker-options="{
        disabledDate
      }"
      :default-value="defaultDate"
      size="large"
      >
    </el-date-picker>
  </div>
</template>

<script>
import { DATE_PICKER_CONST } from '../../const/const'
export default {
  name: 'DatePicker',
  props: {
    title: {
      type: String
    },
    startDate: {
      type: String
    },
    endDate: {
      type: String
    },
    defaultDate: {
      type: String
    },
    disabledDate: {
      type: Function
    },
    value: {
      type: Array
    }
  },
  data() {
    return {
      DATE_PICKER_CONST
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('period', val)
      }
    }
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  & p.title {
    margin-bottom: 25px;
    font-size: 22px;
  }
}
.el-input__inner {
  border-color: rgba(0, 0, 0, 0.5);
}
</style>>