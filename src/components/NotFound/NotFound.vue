<template>
  <section class="results">
    <div class="not">
      <p class="not_title">
        404
      </p>
      <p class="not_description">
        Page Not Found
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 100px;
  &_title {
    font-weight: bold;
    margin-bottom: 0;
    margin-top: 0;
  }
  &_description {
    font-size: 60px;
  }
}
</style>