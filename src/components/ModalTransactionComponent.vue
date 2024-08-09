<template>
  <body>
    <div v-if="modalVisibility" class="ModalRendering">
      <h3>Coin selected for the transaction: </h3>
      <h3>Type of transaction</h3>
      <h3>Coin image display:</h3>
      <img src="" alt="GifSelectedCoin" class="Coin-Circle">
      <h3>Price</h3>
      <button type="button" @click="closeModalTransaction()" id="btnValidateSale">Cancel.</button>
    </div>
  </body>
</template>

<script>
  export default{
    name: 'ModalTransactionComponent',
    props: {
      receivedSelectedCoinInfo: {
        type: Object,
        default: null,
        required: true
      }
    },
    data(){
      return{
        modalVisibility: false,
        infoSelectedCoinReceived: {}
      }
    },
    methods: {
      showModalTransaction(){
        this.modalVisibility = true;
      },
      closeModalTransaction(){
        this.modalVisibility = false;
      },
      transactionDataLoading(newVal){
        this.infoSelectedCoinReceived = newVal;
        console.log(this.infoSelectedCoinReceived);
      }
    },
    watch: {
      receivedData: {
        handler(newVal) {
          if(newVal){
            this.transactionDataLoading(newVal);
          }
        },
        inmediate: true
      }
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

  .ModalRendering{
    display: flex;
  }
</style>