<template>
  <el-table
    :data="data"
    border
    fit
    :style="{'width': tableWidth}"
    :highlight-current-row="true"
    >
    <el-table-column
      prop="operation_id"
      label="Operation Id"
      width="110"
      show-overflow-tooltip
      >
    </el-table-column>
    <el-table-column
      prop="transaction_id"
      label="Transaction Id"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="coupon_id"
      label="Coupon Id"
      width="100"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="coupon_code"
      label="Coupon Code"
      width="115"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="comment"
      label="Comment"
      width="110"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="date"
      label="Date"
      width="100">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="Amount"
      width="90">
    </el-table-column>
    <el-table-column
      prop="user_balance"
      label="Balance"
      width="90">
    </el-table-column>
    <el-table-column
      prop="sum"
      label="Sum"
      width="100">
    </el-table-column>
    <el-table-column
      prop="currency"
      label="Currency"
      width="90">
    </el-table-column>
    <el-table-column
      prop="status"
      label="Status"
      width="74">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    tableWidth: {
      type: String
    },
    data: {
      type: Array
    }
  },
}
</script>