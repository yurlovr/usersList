<template>
  <div class="pages">
    <ul class="pages_list" @click="changeLimitRecords">
      <li v-for="item in values" :key="item"
          class="pages_item"
          :class="{'active': limit === item}"
          :id="item">
          {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CountRecords',
  props: {
    changeLimit: {
      type: Function
    },
    currentLimit: {
      type: Number
    },
    values: {
      type: Array
    }
  },
  data() {
    return {
      limit: this.currentLimit
    }
  },
  methods: {
    changeLimitRecords(event) {
      this.limit = this.values.find(value => value === +event.target.id)
      this.changeLimit(this.limit)
    }
  }
}
</script>

<style lang="scss" scoped>
.pages {
  display: flex;
  justify-content: center;
  &_list {
    display: flex;
  }
  &_item {
    min-width: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    background-color: #d3dbe6;
    color: #3964a6;
    cursor: pointer;
    &.active {
      background-color: #3964a6;
      color: #FFFFFF;
    }
  }
  &_item:last-child {
    margin-right: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
    &_item:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
</style>