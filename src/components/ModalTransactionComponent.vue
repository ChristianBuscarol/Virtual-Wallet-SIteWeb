<template>
  <body>
    <div v-if="modalVisibility" class="ModalRendering">
      <h3>Coin selected for the transaction: </h3>
      <h3>Type of transaction</h3>
      <h3>Coin image display:</h3>
      <img src="" alt="GifSelectedCoin" class="Coin-Circle">
      <h3>Price</h3>
      <button type="button" @click="closeModalTransaction()" id="btnValidateSale">Cancel and close this transaction window.</button>
    </div>
  </body>
</template>

<script>
  import { eventBus } from '@/utility/eventBusUtility';

  export default{
    name: 'ModalTransactionComponent',
    data(){
      return{
        modalVisibility: false
      }
    },
    methods: {
      showModalTransaction(){
        this.modalVisibility = true;
      },
      closeModalTransaction(){
        this.modalVisibility = false;
      }
    },
    mounted(){
      eventBus.$on('open-transaction-modal', this.showModalTransaction);
    },
    beforeDestroy(){
      eventBus.$off('open-transaction-modal', this.showModalTransaction);
    }
  }
</script>

<style scoped>
  .Coin-Circle{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px;
    border-style: groove;
    border-color: black;
  }
</style>