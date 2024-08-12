<template>
  <body>
    <div v-if="modalVisibility == true" class="ModalRendering">
      <div class="ModalContent" @click.stop>
        <h3>Coin selected for the transaction: {{ this.infoSelectedCoinReceived.coinTittle }}</h3>
        <h3>Type of transaction: {{ this.infoSelectedCoinReceived.typeTransaction }}</h3>
        <h3>Coin image display:</h3>
        <img :src="this.infoSelectedCoinReceived.coinImage" alt="GifSelectedCoin" class="Coin-Circle">
        <h3>Price: {{ this.infoSelectedCoinReceived.coinPrice }}</h3>
        <button type="button" @click="changingVisibilityVariableOnFalse()" id="btnValidateSale">Cancel.</button>
      </div>
    </div>
  </body>
</template>

<script>
  export default{
    name: 'ModalTransactionComponent',
    props: {
      receivedSelectedCoinInfo: {
        type: Object,
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
      changingVisibilityVariableOnTrue(){
        this.modalVisibility = true;
        console.log(this.modalVisibility)

        this.showModalTransaction();
      },
      changingVisibilityVariableOnFalse(){
        this.modalVisibility = false;
        console.log(this.modalVisibility)

        this.closeModalTransaction();
      },
      showModalTransaction(){
        this.$nextTick(() => {
          if(this.$refs.ModalRendering && this.$refs.ModalContent){
            this.$refs.ModalRendering.classList.add('show');
            this.$refs.ModalContent.classList.add('show');
          }
        });
      },
      closeModalTransaction(){
        if(this.$refs.ModalRendering && this.$refs.modalOverlay){
          this.$refs.ModalContent.classList.remove('show');
          setTimeout(() => {this.$refs.ModalRendering.classList.remove('show');}, 1000);
        }
      },
      transactionDataLoading(newVal){
        this.infoSelectedCoinReceived = newVal;
        console.log(this.infoSelectedCoinReceived);
        this.changingVisibilityVariableOnTrue();
      }
    },
    watch: {
      receivedSelectedCoinInfo: {
        inmediate: true,
        handler(newVal) {
          if(newVal && Object.keys(newVal).length > 0){
            this.transactionDataLoading(newVal);
          }
        }
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
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); /* Fondo opaco */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
    opacity: 1;
    visibility: visible;
  }

  .ModalContent{
    background-color: #fff;
    width: 33%; /* Ocupa un tercio de la pantalla */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(1);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: scale(1); /* Se expande a tamaño completo */
  }
</style>