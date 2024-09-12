<template>
  <body>
    <div v-if="modalVisibility == true" class="ModalRendering">
      <div class="ModalContent" @click.stop>
        <!--Info del usuario para el modal aquí abajo.-->
        <div class="ModalUserInfoBox">
          <h3>{{ this.infoSelectedCoinReceived.userName }}</h3>
          <h3>Money ready for this transaction: {{ this.infoSelectedCoinReceived.userMoneyAvailable }}</h3>
        </div>

        <!--Info de la moneda seleccionada para el modal aquí abajo.-->
        <div class="ModalSelectedCoinInfoBox">
          <h3>Coin selected for the transaction: {{ this.infoSelectedCoinReceived.coinTittle }}</h3>
          <h3>Coin image display:</h3>
          <img :src="this.infoSelectedCoinReceived.coinImage" alt="GifSelectedCoin" class="Coin-Circle">
          <h3>Price: {{ this.infoSelectedCoinReceived.coinPrice }}</h3>
        </div>

        <!--Pequeño sector de información para el usuario según el tipo de transacción que ha elegido.-->
        <div class="ModalTransactionInfoBox">
          <div v-if="infoSelectedCoinReceived.typeTransaction == 'purchase'">
            <h3>Type of transaction: Purchase!...</h3>
            <h3 for="coinAmountEntry">Coin limit to buy: {{ showCoinLimit }}</h3>
          </div>
          
          <div v-if="infoSelectedCoinReceived.typeTransaction == 'sell'">
            <h3>Type of transaction: Sell!...</h3>
            <h3 for="coinAmountEntry">Coin portion ready to sold: {{ this.infoSelectedCoinReceived.userCoinPartAvailable }}</h3>
            <h3>Proceeds from sale: {{ showProceedsFromSale }}</h3>
          </div>
        </div>
        
        <!--Sector de interacción para realizar la transacción aquí abajo.-->
        <div class="ModalInteractionBox">
          <h3>Transaction cost: </h3>
          <input type="number" v-model="coinPartToBuy" name="coinAmountEntry" step="0.1" min="0.00001" id="coinRecordAmount" placeholder="Enter coin amount here...">
          <button type="button" class="PaymentConfirmation" @click="requestBodyObjectFilled()" :disabled="enablingOfPaymentButton" id="btnPaymentConfirmation">Confirm payment.</button>
          <button type="button" class="PaymentConfirmation" v-show="lastConfirmationButton" :disabled="lastConfirmationButton">¿Sure?...</button>
          <button type="button" class="ClosingModal" @click="changingVisibilityVariableOnFalse()" id="btnValidateSale">Cancel.</button>
        </div>
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
          userCoinPartAvailable: 0,
          coinTittle: '',
          coinPrice: 0,
          coinImage: '',
          typeTransaction: ''
        },
        requestBody: {
          userId: '',
          action: '',
          money: 0,
          coinTittle: '',
          coinAmount: 0,
          dateTime: 0
        },
        modalVisibility: false,
        paymentController: false,
        coinPartToBuy: 0,
        resultOfPaymentOperation: 0,
        lastConfirmationButton: false
      }
    },
    methods: {
      transactionDataLoading(newVal){
        // Una vez enviado el objeto después de haberse hecho click en uno de los botones de compra o venta, dicho objeto pasa por el ciclo de vida 'watch' de este componente y llama a esta función.
        // Aquí abajo se prepara los datos del usuario que se necesitará para la transacción, esto incluye la lista de monedas aparte ya que no necesitaremos todas, y la llamada a la función que solicitará la cantidad disponible de la moneda seleccionada para la operación.
        this.infoSelectedCoinReceived.userName = newVal.userName;
        this.infoSelectedCoinReceived.userId = newVal.userId;
        this.infoSelectedCoinReceived.userMoneyAvailable = newVal.userMoneyAvailable;
        this.infoSelectedCoinReceived.userCoinPartAvailable = newVal.userCoinPartAvailable;

        // Aquí abajo, se prepara los datos de la moneda seleccionada para que el usuario pueda interactuar antes de la operación una vez el Modal esté abierto.
        this.infoSelectedCoinReceived.coinTittle = newVal.coinTittle;
        this.infoSelectedCoinReceived.coinImage = newVal.coinImage;
        this.infoSelectedCoinReceived.coinPrice = newVal.coinPrice;
        this.infoSelectedCoinReceived.typeTransaction = newVal.typeTransaction;
        
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
      requestBodyObjectFilled(){
        let transactionTime = new Date();

        this.requestBody.userId = this.infoSelectedCoinReceived.userId;
        this.requestBody.action = this.infoSelectedCoinReceived.typeTransaction;
        this.transactionMoneyCalculation();
        this.requestBody.coinTittle = this.infoSelectedCoinReceived.coinTittle;
        this.requestBody.coinAmount = this.coinPartToBuy;
        this.requestBody.dateTime = transactionTime.toISOString();
      },
      transactionMoneyCalculation(){
        
      }
    },
    computed: {
      enablingOfPaymentButton(){
        while(this.coinPartToBuy == 0){
          return true;
        }
        return false;
      },
      showCoinLimit(){
        return this.infoSelectedCoinReceived.userMoneyAvailable / this.infoSelectedCoinReceived.coinPrice;
      },
      showProceedsFromSale(){
        return this.infoSelectedCoinReceived.userCoinPartAvailable * this.infoSelectedCoinReceived.coinPrice;
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
    width: 40%; /* Ocupa un tercio de la pantalla */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(0);
    transition: transform 1.0s ease-in-out, opacity 1.0s ease-in-out;
    transform: scale(1); /* Se expande a tamaño completo */
    display: grid;
    grid-template-columns: auto auto;
    margin: 0 auto;
    justify-content: space-around;
  }

  .ModalUserInfoBox {
    grid-column: 1/2;
  }

  .ModalSelectedCoinInfoBox {
    grid-column: 1/2;
  }

  .ModalTransactionInfoBox {
    grid-column: 2/2;
  }

  .ModalInteractionBox {
    grid-column: 2/2;
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