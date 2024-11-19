<template>
  <body>
    <div v-show="modalVisibility" ref="modalRendering" class="ModalRendering">
      <div ref="modalContent" class="ModalContent" @click.stop>
        <!--Info del usuario para el modal aquí abajo.-->
        <div class="ModalUserInfoBox" v-if="this.showWarningMessageByNumber < 5">
          <h3 class="UserNameStyle">{{ this.infoSelectedCoinReceived.userName }}</h3>
          <h3>Money available for this 'Purchase': {{ this.infoSelectedCoinReceived.userMoneyAvailable }}</h3>
        </div>

        <!--Info de la moneda seleccionada para el modal aquí abajo.-->
        <div class="ModalSelectedCoinInfoBox" v-if="this.showWarningMessageByNumber < 5">
          <h3>Coin selected for the transaction: {{ this.infoSelectedCoinReceived.coinTittle }}</h3>
          <h3>Coin image:</h3>
          <img :src="this.infoSelectedCoinReceived.coinImage" alt="GifSelectedCoin" class="Coin-Circle">
          <h3>Unit price: {{ this.infoSelectedCoinReceived.coinPrice }}</h3>
        </div>

        <!--Pequeño sector de información para el usuario según el tipo de transacción que ha elegido.-->
        <div class="ModalTransactionInfoBox" v-if="this.showWarningMessageByNumber < 5">
          <div v-if="infoSelectedCoinReceived.typeTransaction == 'purchase'">
            <h3>Type of transaction: Purchase!...</h3>
            <h3 for="coinAmountEntry">Coin limit to buy: {{ showCoinLimit }}</h3>
            <h3 v-if="this.showWarningMessageByNumber == 1" class="OperationConfirmed">The 'Purchase' is ready to be made...</h3>
          </div>
            
          <div v-if="infoSelectedCoinReceived.typeTransaction == 'sale'">
            <h3>Type of transaction: Sell!...</h3>
            <h3 for="coinAmountEntry">Coin portion ready for this 'Sale': {{ this.infoSelectedCoinReceived.userCoinPartAvailable }}</h3>
            <h3>Earning from sale: {{ showEarningFromSale }}</h3>
            <h3 v-if="this.showWarningMessageByNumber == 3" class="OperationConfirmed">The 'Sale' is ready to be made...</h3>
          </div>
        </div>
        
        <!--Sector de interacción para realizar la transacción aquí abajo.-->
        <div class="ModalInteractionBox" v-if="this.showWarningMessageByNumber < 5">
          <h3 v-if="infoSelectedCoinReceived.typeTransaction == 'purchase'">Cost of the 'Purchase': {{ showMoneyTransactionCost() }}</h3>
          <h3 v-else-if="infoSelectedCoinReceived.typeTransaction == 'sale'">Coins remaining from the 'Sale': {{ showCoinPartTransactionCost() }}</h3>
          <h3 v-if="this.showWarningMessageByNumber == 2">The money available isn't enough to do this transaction.</h3>
          <h3 v-else-if="this.showWarningMessageByNumber == 4">The coin part available isn't enough to do this tranasaction.</h3>
          <input type="number" v-model="coinPartToTrade" name="coinAmountEntry" step="0.1" min="0.00001" id="coinRecordAmount" :disabled="confirmationOfTransactionInteraction" placeholder="Enter coin amount here..."><br>
          <button type="button" class="buttonInteraction" @click="requestBodyObjectFilled()" v-show="!enableFirstTransactionButton" :disabled="enableFirstTransactionButton" id="btnPrepareOperation">Prepare transaction</button>
          <button type="button" class="buttonInteraction" @click="transactionPostingOperation()" v-show="!lastConfirmationButton" :disabled="lastConfirmationButton" id="btnOperationConfirmation">¿Sure?...</button>
          <button type="button" class="buttonInteraction" @click="changingVisibilityVariableOnFalse()" v-show="!btnCloseModal" :disabled="btnCloseModal" id="btnCancelOperation">Cancel</button>
        </div>

        <div class="TransactionDone" v-if="this.showWarningMessageByNumber == 5">
          <img class="BussinesPenguins" src="../assets/BussinesPenguin.webp" alt="A meeting of bussines penguins...">
        </div>

        <div class="TransactionDone" v-if="this.showWarningMessageByNumber == 5">
          <h3>The transaction has been ¡Done!...</h3><br>
          <button type="button" class="buttonInteraction" @click="changingVisibilityVariableOnFalse()" v-show="!lastBtnCloseModal" :disabled="lastBtnCloseModal" id="btnCancelOperation">Cancel</button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import ApiCallService from '@/services/ApiCallService';

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
          user_id: '',
          action: '',
          money: 0,
          crypto_code: '',
          crypto_amount: 0,
          datetime: 0
        },
        modalVisibility: false,
        confirmationOfTransactionInteraction: false,
        lastConfirmationButton: true,
        btnCloseModal: false,
        lastBtnCloseModal: true,
        coinPartToTrade: 0,
        resultOfPaymentOperation: 0,
        showWarningMessageByNumber: 0
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
        
        this.showModalTransaction();
      },
      showModalTransaction(){
        this.modalVisibility = true;

        if(this.$refs.modalRendering && this.$refs.modalContent){
          this.$nextTick(() => {
            this.$refs.modalRendering.classList.add('show');

            setTimeout(() => {
              this.$refs.modalContent.classList.add('show');
            },500);
          });
        }
      },
      changingVisibilityVariableOnFalse(){
        this.modalVisibility = false;

        this.closeModalTransaction();
      },
      closeModalTransaction(){
        if(this.$refs.ModalRendering && this.$refs.modalOverlay){
          this.$refs.ModalContent.classList.remove('show');
          setTimeout(() => {this.$refs.ModalRendering.classList.remove('show');}, 1500);
        }

        this.emptyingSelectedCoinInfoObect();
        this.refreshTheView();
      },
      emptyingSelectedCoinInfoObect(){
        this.infoSelectedCoinReceived = null;
      },
      requestBodyObjectFilled(){
        let transactionTime = new Date();

        this.requestBody.user_id = this.infoSelectedCoinReceived.userId;
        this.requestBody.action = this.infoSelectedCoinReceived.typeTransaction;
        this.transactionMoneyEvaluation();
        this.requestBody.crypto_code = this.infoSelectedCoinReceived.coinTittle;
        this.requestBody.datetime = transactionTime.toISOString();
      },
      transactionMoneyEvaluation(){
        if(this.infoSelectedCoinReceived.typeTransaction == 'purchase'){
          this.transactionMoneySpentCalculated();
        }
        else if(this.infoSelectedCoinReceived.typeTransaction == 'sale'){
          this.transactionCoinPartSoldCalculation();
        }
      },
      transactionMoneySpentCalculated(){
        let totalCost = this.coinPartToTrade * this.infoSelectedCoinReceived.coinPrice;

        if (totalCost <= this.infoSelectedCoinReceived.userMoneyAvailable){
          this.loadingLastTwoResourcesPurchaseTransaction(totalCost);
          this.showLastButtonConfirmation();
          this.showWarningMessageByNumber = 1;
        }
        else if(totalCost > this.infoSelectedCoinReceived.userMoneyAvailable){
          this.showWarningMessageByNumber = 2;
        }
      },
      transactionCoinPartSoldCalculation(){
        let moneyEarned = this.coinPartToTrade * this.infoSelectedCoinReceived.coinPrice; 

        if(this.coinPartToTrade < this.infoSelectedCoinReceived.userCoinPartAvailable){
          this.loadingLastTwoResourcesSaleTransaction(moneyEarned);
          this.showLastButtonConfirmation();
          this.showWarningMessageByNumber = 3;
        }
        else if(this.coinPartToTrade > this.infoSelectedCoinReceived.userCoinPartAvailable){
          this.showWarningMessageByNumber = 4;
        }
      },
      loadingLastTwoResourcesPurchaseTransaction(totalCost){
        this.requestBody.money = totalCost.toFixed(2);
        this.requestBody.crypto_amount = this.coinPartToTrade;
        console.log(this.requestBody);
      },
      loadingLastTwoResourcesSaleTransaction(moneyEarned){
        this.requestBody.money = moneyEarned.toFixed(2);
        this.requestBody.crypto_amount = this.coinPartToTrade;
        console.log(this.requestBody);
      },
      showLastButtonConfirmation(){
        this.lastConfirmationButton = false;
        this.disabledTransactionFirstButtonOperation();
      },
      refreshTheView(){
        this.$emit('refresh-the-view');
      },
      disabledTransactionFirstButtonOperation(){
        this.coinPartToTrade = 0;
        this.disabledFirstButtonInteraction();
      },
      disabledFirstButtonInteraction(){
        this.confirmationOfTransactionInteraction = true;
      },
      transactionPostingOperation(){
        ApiCallService.postNewTransaction(this.requestBody);
        this.disabledTransactionLastButtonOperation();
        this.showLastModalContent();
      },
      disabledTransactionLastButtonOperation(){
        this.lastConfirmationButton = true;
      },
      showLastModalContent(){
        this.showWarningMessageByNumber = 5;

        this.changeLastButtonModalClose();
      },
      changeLastButtonModalClose(){
        this.btnCloseModal = true;
        this.lastBtnCloseModal = false;
      },
      showMoneyTransactionCost(){
        if (this.coinPartToTrade == 0){
          return '$ = 0';
        } else {
          return '$ = ' + parseFloat(this.infoSelectedCoinReceived.userMoneyAvailable - (this.coinPartToTrade * this.infoSelectedCoinReceived.coinPrice));
        }
      },
      showCoinPartTransactionCost(){
        if (this.coinPartToTrade == 0){
          return 'Waiting for the entrance of coin amount...';
        } else {
          return this.infoSelectedCoinReceived.userCoinPartAvailable - this.coinPartToTrade + ' amount.';
        }
      }
    },
    computed: {
      enableFirstTransactionButton(){
        while(this.coinPartToTrade == 0){
          return true;
        }
        return false;
      },
      showCoinLimit(){
        return parseFloat(this.infoSelectedCoinReceived.userMoneyAvailable / this.infoSelectedCoinReceived.coinPrice).toFixed(5);
      },
      showEarningFromSale(){
        if (this.coinPartToTrade <= this.infoSelectedCoinReceived.userCoinPartAvailable){
          return this.coinPartToTrade * this.infoSelectedCoinReceived.coinPrice;
        } else {
          return 'The amount of coin portion entered exceeds the limit of the coin part available...';
        }
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

  .ModalRendering {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); /* Fondo oscuro */
    opacity: 0; /* Comienza oculto */
    visibility: hidden; /* No visible */
    transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
  }

  .ModalRendering.show {
    opacity: 1; /* Se hace visible */
    visibility: visible;
  }

  .ModalContent {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Dos columnas de igual tamaño */
    gap: 10px; /* Espacio entre los elementos */
    background-color: #fff;
    width: 40%;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(0.5); /* Comienza más pequeño */
    transition: transform 1s ease-in-out; /* Animación de expansión */
  }

  .ModalContent.show {
    transform: scale(1); /* Expande a su tamaño normal */
  }

  .UserNameStyle, .OperationConfirmed{
    text-decoration: underline;
  }

  .ModalUserInfoBox, .ModalSelectedCoinInfoBox {
    border: 1px dotted black;
    text-align: center;
  }

  .ModalTransactionInfoBox, .ModalInteractionBox {
    border: 1px dotted black;
    text-align: center;
  }

  .TransactionDone {
    text-align: center;
  }

  .BussinesPenguins {
    width: 250px;
    height: 225px;
  }

  .buttonInteraction {
    width: 80px;
    height: 40px;
    margin: 5px;
    border-radius: 10px;  /* Bordes redondeados */
    border: 1px solid black;
    background-color: lightgrey;
    color: black;
    font-weight: bold;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del botón */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
  }

  #btnPrepareOperation {
    width: 85px;
    margin-bottom: 5px;
  }

  #btnPrepareOperation:hover{
    border: 1px solid black;
    background-color: darkturquoise;
    color: black;
    box-shadow: 2px 6px 8px rgba(36, 184, 6, 0.753); /* Sombra del botón */
  }

  #btnOperationConfirmation:hover{
    border: 1px solid black;
    background-color: chartreuse;
    color: black;
    box-shadow: 2px 6px 8px blue; /* Sombra del botón */
  }

  #btnCancelOperation:hover{
    border: 1px solid white;
    background-color: black;
    color: white;
    box-shadow: 2px 6px 8px rgba(96, 17, 148, 0.74); /* Sombra del botón */
  }

  #coinRecordAmount{
    width: 150px;
    height: 25px;
    border: 1px solid black;
  }
</style>