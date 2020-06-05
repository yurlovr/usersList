<template>
  <div class="service__container">
    <div class="service__container-content"
        :style="{'height': heightModal || '400px',
        'marginTop': marginTop || '120px',
        'width': widthModal}">
      <button @click="closeModal" class="button button-close"/>
      <p class="header">
        {{header}}
      </p>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: {
    header: {
      type: String
    },
    closeModal: {
      type: Function
    },
    heightModal: {
      type: String
    },
    widthModal: {
      type: String
    },
    marginTop: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.service__container {
  z-index: 2500;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0px;
  display: flex;
  justify-content: center;
  background-color: rgba(0,0,0,0.4);
  &-content {
    position: relative;
    width: 900px;
    margin-top: 150px;
    z-index: 20;
    background-color: #f1f1f1;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &-buttons {
    width: 700px;
    border-radius: 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
  }

  .header {
    margin-bottom: 0;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }

  .button {
    &-close {
      position: absolute;
      width: 32px;
      height: 32px;
      top: -15px;
      right: -15px;
      background-image: url('../../assets/images/close.svg');
      background-repeat: no-repeat;
      background-position: center;
    }
  }
    & .label {
    display: block;
    font-size: 24px;
    line-height: 43px;
    text-align: center;
    }
    & .input {
      display: block;
      margin-top: 20px;
      margin-bottom: 30px;
      margin-left: auto;
      margin-right: auto;
      display: block;
      width: 420px;
      padding-left: 30px;
      padding-top: 20px;
      padding-bottom: 20px;
      font-size: 24px;
      line-height: 29px;
      box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.05);
      background: #FFFFFF;
      border: 2px solid #f1f1f1;
      border-radius: 15px;
      &-error {
        border-color:#D9457C;
      }
    }
    & .error {
        color:#D9457C;
        font-size: 14px;
        line-height: 0;
        padding-left: 20px;
        position: absolute;
        top: 25%;
        left: 32%;
    }
    input[disabled] {
        background-color: #c5bebe;
        border: 2px solid #D9457C;
        &::placeholder {
          color: #D9457C;
        }
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .button_game-modal {
      width: 316px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: auto;
      &[disabled] {
        background-color: grey;
      }
    }
    form {
      width: 100%;
      margin-bottom: 40px;
    }
}
</style>