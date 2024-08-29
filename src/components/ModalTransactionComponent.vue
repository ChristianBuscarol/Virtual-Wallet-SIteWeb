<template>
  <body>
    <div v-if="modalVisibility == true" class="ModalRendering">
      <div class="ModalContent" @click.stop>
        <!--Info del usuario para el modal aquí abajo.-->
        <h3>{{ this.infoSelectedCoinReceived.userName }}</h3>
        <h3>Money ready for this transaction: {{ this.infoSelectedCoinReceived.userMoneyAvailable }}</h3>

        <!--Info de la moneda seleccionada para el modal aquí abajo.-->
        <h3>Coin selected for the transaction: {{ this.infoSelectedCoinReceived.coinTittle }}</h3>
        <h3>Coin image display:</h3>
        <img :src="this.infoSelectedCoinReceived.coinImage" alt="GifSelectedCoin" class="Coin-Circle">
        <h3>Price: {{ this.infoSelectedCoinReceived.coinPrice }}</h3>

        <!--Pequeño sector de información para el usuario según el tipo de transacción que ha elegido.-->
        <h3 v-if="infoSelectedCoinReceived.typeTransaction == 'purchase'">Type of transaction: Purchase!...</h3>
        <label for="coinAmountEntry" v-if="infoSelectedCoinReceived.typeTransaction == 'purchase'">Coin amount to buy: </label>

        <h3 v-if="infoSelectedCoinReceived.typeTransaction == 'sell'">Type of transaction: Sell!...</h3>
        <label for="coinAmountEntry" v-if="infoSelectedCoinReceived.typeTransaction == 'sell'">Coin amount to sold: </label>
        
        <!--Sector de interacción para realizar la transacción aquí abajo.-->
        <h3>Transaction cost: </h3>
        <input type="number" v-model="coinPartToBuy" name="coinAmountEntry" step="0.1" min="0.00001" id="coinRecordAmount" placeholder="Enter coin amount here...">
        <button type="button" class="PaymentConfirmation" @click="transactionPaymentOperation()" :disabled="enablingOfPaymentButton" id="btnPaymentConfirmation">Confirm payment.</button>
        <button type="button" class="ClosingModal" @click="changingVisibilityVariableOnFalse()" id="btnValidateSale">Cancel.</button>
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
        infoSelectedCoinReceived: {
          userName: '',
          userId: '',
          userMoneyAvailable: 0,
          coinTittle: '',
          coinPrice: 0,
          coinImage: '',
          typeTransaction: ''
        },
        userAvailableCoinList: {},
        modalVisibility: false,
        paymentController: false,
        coinPartToBuy: 0,
        resultOfPaymentOperation: 0
      }
    },
    methods: {
      transactionDataLoading(newVal){
        // Una vez enviado el objeto después de haberse hecho click en uno de los botones de compra o venta, dicho objeto pasa por el ciclo de vida 'watch' de este componente y llama a esta función.
        this.infoSelectedCoinReceived.userName = newVal.userName;
        this.infoSelectedCoinReceived.userId = newVal.userId;
        this.infoSelectedCoinReceived.userMoneyAvailable = newVal.userMoneyAvailable;
        this.infoSelectedCoinReceived.coinTittle = newVal.coinTittle;
        this.infoSelectedCoinReceived.coinImage = newVal.coinImage;
        this.infoSelectedCoinReceived.coinPrice = newVal.coinPrice;
        this.infoSelectedCoinReceived.typeTransaction = newVal.typeTransaction;

        this.availableCoinListLoading(newVal);
      },
      availableCoinListLoading(newVal){
        this.userAvailableCoinList = newVal.recordOfAvailableCoinsList;

        this.changingVisibilityVariableOnTrue();
      },
      changingVisibilityVariableOnTrue(){
        this.modalVisibility = true;

        this.showModalTransaction();
      },
      changingVisibilityVariableOnFalse(){
        this.modalVisibility = false;

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
          setTimeout(() => {this.$refs.ModalRendering.classList.remove('show');}, 1500);
        }

        this.emptyingSelectedCoinInfoObect();
      },
      emptyingSelectedCoinInfoObect(){
        this.infoSelectedCoinReceived = null;
        console.log('El objeto de la información de la moneda seleccionada ha sido vaciado!...');
      },
      checkingPaymentController(){
        if(this.coinPartToBuy == 0){
          this.paymentController = false;
        }
        else if (this.coinPartToBuy > 0){
          this.paymentController = false;
        }
      },
      transactionPaymentOperation(){
        if(this.infoSelectedCoinReceived.typeTransaction == 'purchase'){
          this.purchaseTransactionCalculation();
        }
        else if(this.infoSelectedCoinReceived.typeTransaction == 'sell'){
          this.saleTransactionCalculation();
        }
      },
      purchaseTransactionCalculation(){
        this.resultOfPaymentOperation = this.infoSelectedCoinReceived.coinPrice * this.coinPartToBuy;
        
        console.log(this.resultOfPaymentOperation);
      },
      saleTransactionCalculation(){
        this.resultOfPaymentOperation = this.infoSelectedCoinReceived.coinPrice / (this.coinPartToBuy * 10);

        console.log(this.resultOfPaymentOperation);
      }
    },
    computed: {
      enablingOfPaymentButton(){
        while(this.coinPartToBuy == 0){
          return true;
        }
        return false;
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
    transition: opacity 1.0s ease-in-out, visibility 1.0s ease-in-out;
    opacity: 1;
    visibility: visible;
  }

  .ModalContent{
    background-color: #fff;
    width: 33%; /* Ocupa un tercio de la pantalla */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(0);
    transition: transform 1.0s ease-in-out, opacity 1.0s ease-in-out;
    transform: scale(1); /* Se expande a tamaño completo */
  }

  .ClosingModal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }

  .ClosingModal:hover,
  .ClosingModal:focus {
    color: black;
    text-decoration: none;
  }
</style>