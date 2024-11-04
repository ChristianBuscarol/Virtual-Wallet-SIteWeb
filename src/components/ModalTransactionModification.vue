<template>
  <body>
    <div v-show="modalVisibility" ref="modalRendering" class="ModalRendering">
      <div ref="modalContent" class="ModalContent" @click.stop>
        <!--De aquí para abajo se encontrarán toda la infomación, 'input' y botones referidos hacia la modificación de la transacción seleccionada...-->
        <div class="ModalTransactionModification" v-if="this.transactionInfoLevel == 1 || this.transactionInfoLevel == 3">
          <div v-if="this.transactionInfoLevel == 1" class="PurchaseTransactionInfo">
            <h3>Selected Transaction:</h3>
            <h4>Action: <strong>'Purchase'</strong></h4>
            <h4>Coin purchased: {{ this.userTransaction.crypto_code }}</h4>
            <h4>Amount: {{ this.userTransaction.crypto_amount }}</h4>
            <h4>Money spent: {{ this.userTransaction.transactionMoney }}</h4>
            <h4>DateTime: {{ this.userTransaction.datetime }}</h4>
          </div>
          
          <div v-if="this.transactionInfoLevel == 3" class="SaleTransactionInfo">
            <h3>Selected Transaction:</h3>
            <h4>Action: <strong>'Sale'</strong></h4>
            <h4>Coin sold: {{ this.userTransaction.crypto_code }}</h4>
            <h4>Amount: {{ this.userTransaction.crypto_amount }}</h4>
            <h4>Money earned: {{ this.userTransaction.transactionMoney }}</h4>
            <h4>DateTime: {{ this.userTransaction.datetime }}</h4>
          </div>

          <div class="ModificationOptionsBox">
            <h3>Modification options...</h3>

            <label for="actionSelected">Choose the 'Action'
              <select name="actionSelected" v-model="transactionModification.action">
                <option value="purchase">Purchase</option>
                <option value="sell">Sell</option>
              </select>
            </label><br><br>
            
            <label for="coinSelection">Choose the 'Coin': 
              <select name="coinSelection" v-model="transactionModification.crypto_code">
                <option value="Bitcoin">Bitcoin</option>
                <option value="Dogecoin">Dogecoin</option>
                <option value="Ethereum">Ethereum</option>
                <option value="Litecoin">Litecoin</option>
                <option value="Solana">Solana</option>
                <option value="USDC">USDC</option>
              </select>
            </label><br><br>

            <label for="coinPartSelection">Coin amount: <input type="number" v-model="transactionModification.crypto_amount" step="0.1" min="0.00001" name="coinPartSelection" class="coinPortionModification" placeholder="Put the coin part here to mod..."></label><br><br>

            <label>Date: <input type="date" v-model="dateSelected" class="dateModification" placeholder="Put the date here to mod..."></label>

            <label>Time: <input type="time" v-model="timeSelected" class="timeModification" placeholder="Put the time here to mod..."></label>
          </div>

          <div class="ModificationButtonsBox" v-if="this.disabledOfTransactionMod == 0">
            <h3>¿Wanna do this modification?</h3>
            <button type="button" @click="prepareInfoForTransactionMod()" v-show="!enableTransactionModificationButtons" :disabled="enableTransactionModificationButtons" class="btnModificationAccepted">Yes</button>
            <button type="button" @click="closeModalTransaction()" v-show="!enableTransactionModificationButtons" :disabled="enableTransactionModificationButtons" class="btnModificationDenied">No</button>
            <button type="button" @click="closeModalTransaction()" v-show="enableTransactionModificationButtons" :disabled="!enableTransactionModificationButtons" class="btnCloseModal">Close</button>
          </div>

          <div class="" v-if="this.disabledOfTransactionMod == 3">
            <h3>The modification of the selected transaction has been completed successfully</h3>
            <button type="button" @click="closeModalTransaction()" v-show="!modificationDone" :disabled="modificationDone" class="btnCloseModal">Close</button>
          </div>

          <div class="" v-if="this.disabledOfTransactionMod == 1 || this.disabledOfTransactionMod == 2">
            <h3 v-if="this.disabledOfTransactionMod == 1">The transaction has been denied due to insufficient amount of money to make the modification...</h3>
            <h3 v-if="this.disabledOfTransactionMod == 2">The transaction has been denied due to insufficient amount of coins to make the modification...</h3>
            <button type="button" @click="closeModalTransaction()" v-show="!modificationCancel" :disabled="modificationCancel" class="btnCloseModal">CLose.</button>
          </div>
        </div>

        <!--De aquí para abajo se encontrarán todos los 'divs, botones e información referida a la eliminación de la transacción seleccionada...'-->
        <div class="ModalTransactionDelete" v-if="this.transactionInfoLevel == 2 || this.transactionInfoLevel == 4">
          <div v-if="this.transactionInfoLevel == 2 && this.disabledOfTransactionDeletion == 0" class="PurchaseDeleteInfo">
            <h3 v-if="this.disabledOfTransactionDeletion == 0">¿Are you sure you want to delete this purchase?</h3>
            <h3 v-if="this.disabledOfTransactionDeletion == 1">The 'Deletion' of the selected purchase is't ready to be made for insufficient money.</h3>
          </div>

          <div v-if="this.transactionInfoLevel == 4 && this.disabledOfTransactionDeletion == 0" class="SaleDeleteInfo">
            <h3 v-if="this.disabledOfTransactionDeletion == 0">¿Are you sure you want to delete this sale?</h3>
            <h3 v-if="this.disabledOfTransactionDeletion == 1">The 'Deletion' of the selected sale is't ready to be made for insufficient coin part.</h3>
          </div>
          
          <div v-if="this.transactionInfoLevel == 2 || this.transactionInfoLevel == 4 && this.disabledOfTransactionDeletion == 0" class="DeletionButtonsBox">
            <button type="button" @click="deleteOfTransactionSelected()" v-show="!deleteConfirmation" :disabled="deleteConfirmation" class="btnDeleteAccepted">Yes</button>
            <button type="button" @click="closeModalTransaction()" v-show="!deleteConfirmation" :disabled="deleteConfirmation" class="btnDeleteDenied">No</button>
            <button type="button" @click="closeModalTransaction()" v-show="deleteConfirmation" :disabled="!deleteConfirmation" class="btnCloseModal">CLose.</button>
          </div>

          <div v-if="this.disabledOfTransactionDeletion == 2">
            <h3>The deletion of the selected transaction has been completed successfully</h3>
            <button type="button" @click="closeModalTransaction()" v-show="!deletionDone" :disabled="deletionDone" class="btnDeleteDenied">Close.</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import axios from "axios";
  import ApiCallService from '@/services/ApiCallService';

  export default{
    name: 'ModalTransactionModification',
    props: {
      receivedTransactionInfo: {
        type: Object,
        default: null
      }
    },
    data(){
      return{
        modalVisibility: false,
        modificationDone: true,
        modificationCancel: true,
        deletionDone: true,
        deleteConfirmation: false,
        surplusOfCoinAmount: false,
        moneyCalculationForDelete: 0,
        dateSelected: new Date(),
        timeSelected: new Date(),
        transactionInfoLevel: 0,
        urlCoinIndex: 0,
        unitCoinPrice: 0,
        disabledOfTransactionDeletion: 0,
        disabledOfTransactionMod: 0,
        unitCoinAmount: {},
        userTransaction: {
          id: '',
          action: '',
          crypto_code: '',
          crypto_amount: 0,
          cryptoAmountAvailable: 0,
          money: 0,
          transactionMoney: 0,
          datetime: 0
        },
        urlCoins: [
          'https://criptoya.com/api/satoshitango/btc/ars',
          'https://criptoya.com/api/satoshitango/doge/ars',
          'https://criptoya.com/api/satoshitango/eth/ars',
          'https://criptoya.com/api/satoshitango/ltc/ars',
          'https://criptoya.com/api/satoshitango/sol/ars',
          'https://criptoya.com/api/satoshitango/usdc/ars'
        ],
        transactionModification: {
          id: '',
          user_id: '',
          action: '',
          crypto_code: '',
          crypto_amount: 0,
          money: 0,
          datetime: 0
        },
        localStorageItems: {}
      }
    },
    methods: {
      // De aquí para abajo se encontrara tanto la apertura como el cierre del Modal, así como la preparación y uso de la información recibida en el componente y entre algunas otras utilidades más.
      getLocalStorageUserInfo(){
        this.localStorageItems = JSON.parse(localStorage.getItem('userData'));
      },
      putUserIdInModificationObject(){
        if(this.transactionInfoLevel == 1 || this.transactionInfoLevel == 2){
          this.transactionModification.user_id = this.localStorageItems.userIdRegister;
        }
      },
      unitTransactionInfoReceived(newVal){
        this.transactionInfoLevel = newVal.transactionInfoLevel;
        this.userTransaction.id = newVal.id;
        this.userTransaction.action = newVal.action;
        this.userTransaction.crypto_code = newVal.crypto_code;
        this.userTransaction.crypto_amount = newVal.crypto_amount;
        this.userTransaction.cryptoAmountAvailable = newVal.cryptoAmountAvailable;
        this.userTransaction.money = newVal.money;
        this.userTransaction.transactionMoney = newVal.transactionMoney;
        this.userTransaction.datetime = newVal.datetime;
        this.unitCoinAmount = newVal.unitCoinAmount;

        console.log('El objeto del Modal para la modificación o elimnación de la transacción seleccionada contiene la sieguiente info: ');
        console.log(this.userTransaction);
        console.log('Y la lista de las porciones de monedas disponibles del usuario para su evaluación y uso es la siguiente: ');
        console.log(this.unitCoinAmount);
        this.showModalTransaction();
        this.prepareIndexFromCoinSelected();
        if (this.transactionInfoLevel == 2 || this.transactionInfoLevel == 4){
          this.evaluateTypeTransactionDeletion();
        }
        else if (this.transactionInfoLevel == 1 || this.transactionInfoLevel == 3){
          this.putUserIdInModificationObject();
        }
      },
      prepareIndexFromCoinSelected(){
        if (this.transactionModification.crypto_code == 'Dogecoin'){
          this.urlCoinIndex += 1;
        }
        else if (this.transactionModification.crypto_code == 'Ethereum'){
          this.urlCoinIndex += 2;
        }
        else if (this.transactionModification.crypto_code == 'Litecoin'){
          this.urlCoinIndex += 3;
        }
        else if (this.transactionModification.crypto_code == 'Solana'){
          this.urlCoinIndex += 4;
        }
        else if (this.transactionModification.crypto_code == 'USDC'){
          this.urlCoinIndex += 5;
        }

        this.obtainPrice();
      },
      async obtainPrice(){
        let response = await axios.get(this.urlCoins[this.urlCoinIndex]);
        this.unitCoinPrice = response.data.totalAsk;
      },
      
      showModalTransaction(){
        this.modalVisibility = true;

        if(this.$refs.modalRendering && this.$refs.modalContent){
          this.$nextTick(() => {
            this.$refs.modalRendering.classList.add('show');
            this.$refs.modalContent.classList.add('show');
          });
        }
      },
      closeModalTransaction(){
        if(this.$refs.modalContent){
          this.$refs.modalContent.classList.remove('show');
        }

        setTimeout(() => {
          if(this.$refs.modalRendering){
            this.$refs.modalRendering.classList.remove('show');
          }
          this.modalVisibility = false;
          this.$emit('close');
        },500);

        this.refreshTheView('refresh-the-view');
      },
      // De aquí para abajo se encontrarán todas las funciones dedicadas a la 'Eliminación' de la transacción seleccionada.
      evaluateTypeTransactionDeletion(){
        if (this.userTransaction.transactionInfoLevel == 2){
          this.confirmationOfPurchaseTransactionDelete();
        }
        else if (this.userTransaction.transactionInfoLevel == 4){
          this.confirmationOfSaleTransactionDelete();
        }
      },
      confirmationOfPurchaseTransactionDelete(){
        if (this.userTransaction.crypto_amount >= this.userTransaction.cryptoAmountAvailable){
          this.disabledOfTransactionDeletion += 1;
          this.deleteConfirmation = true;
        }
      },
      confirmationOfSaleTransactionDelete(){
        if (this.userTransaction.money < this.userTransaction.transactionMoney){
          this.disabledOfTransactionDeletion += 1;
          this.deleteConfirmation = true;
        }
      },
      deleteOfTransactionSelected(){
        ApiCallService.deleteSelectedTransaction(this.userTransaction.id);

        this.enableTheModalCloseAfterDeletion();
      },
      enableTheModalCloseAfterDeletion(){
        this.disabledOfTransactionDeletion += 2;
        this.deletionDone = false;
      },
      // De aquí para abajo se encontrarán todas las funciones dedicadas a la 'Modificación' de la transacción seleccionada.
      prepareInfoForTransactionMod(){
        this.transactionModification.id = this.userTransaction.id;
        this.objectConstructorForTransactionMod();
      },
      objectConstructorForTransactionMod(){
        this.moneyCalculationFromCoinSelected();
        this.prepareDateTimeSelectedForTransactionMod();
        this.evaluationOfModificationInfo();
      },
      coinAmountComparison(){
        if (this.transactionModification.crypto_code == 'Bitcoin' || this.transactionModification.crypto_code == 'bitcoin' || this.transactionModification.crypto_code == 'BITCOIN'){
          if (this.transactionModification.crypto_amount > this.unitCoinAmount.bitcoinAmount){
            this.surplusOfCoinAmount = true;
          }
        }
        else if (this.transactionModification.crypto_code == 'Dogecoin' || this.transactionModification.crypto_code == 'dogecoin' || this.transactionModification.crypto_code == 'DOGECOIN'){
          if (this.transactionModification.crypto_amount > this.unitCoinAmount.dogecoinAmount){
            this.surplusOfCoinAmount = true;
          }
        }
        else if (this.transactionModification.crypto_code == 'Ethereum' || this.transactionModification.crypto_code == 'ethereum' || this.transactionModification.crypto_code == 'ETHEREUM'){
          if (this.transactionModification.crypto_amount > this.unitCoinAmount.ethereumAmount){
            this.surplusOfCoinAmount = true;
          }
        }
        else if (this.transactionModification.crypto_code == 'Litecoin' || this.transactionModification.crypto_code == 'litecoin' || this.transactionModification.crypto_code == 'LITECOIN'){
          if (this.transactionModification.crypto_amount > this.unitCoinAmount.litecoinAmount){
            this.surplusOfCoinAmount = true;
          }
        }
        else if (this.transactionModification.crypto_code == 'Solana' || this.transactionModification.crypto_code == 'solana' || this.transactionModification.crypto_code == 'SOLANA'){
          if (this.transactionModification.crypto_amount > this.unitCoinAmount.solanaAmount){
            this.surplusOfCoinAmount = true;
          }
        }
        else if (this.transactionModification.crypto_code == 'USDC' || this.transactionModification.crypto_code == 'usdc' || this.transactionModification.crypto_code == 'Usdc'){
          if (this.transactionModification.crypto_amount > this.unitCoinAmount.usdcAmount){
            this.surplusOfCoinAmount = true;
          }
        }
      },
      moneyCalculationFromCoinSelected(){
        let totalCost = this.transactionModification.crypto_amount * this.unitCoinPrice;
        this.transactionModification.money = totalCost;
      },
      prepareDateTimeSelectedForTransactionMod(){
        let prepareDateTime = new Date(this.dateSelected + ' ' + this.timeSelected).toISOString();
        console.log('El tiempo preparado para la modificación de la transacción seleccionada es el siguiente:');
        console.log(prepareDateTime);

        if (prepareDateTime != null || prepareDateTime != undefined){
          this.transactionModification.datetime = prepareDateTime;
        }
        else {
          this.transactionModification.datetime = this.userTransaction.datetime;
        }
      },
      evaluationOfModificationInfo(){
        if (this.transactionInfoLevel == 1){
          this.evaluatePurchaseTransactionActionChange();
        }
        else if (this.transactionInfoLevel == 3){
          this.evaluateSaleTransactionActionChange();
        }
      },
      evaluatePurchaseTransactionActionChange(){
        if (this.transactionModification.action != this.userTransaction.action){
          this.coinAmountComparison();
          this.evaluatePossibleIssueWhithUserMoneyAndCoinChange();
        }
        else if (this.transactionModification.action == this.userTransaction.action){
          this.evaluatePossibleIssueWhithUserMoney();
        }
      },
      evaluateSaleTransactionActionChange(){
        if (this.transactionModification.action != this.userTransaction.action){
          this.evaluatePossibleIssueWhithUserMoney();
        }
        else if (this.transactionModification.action == this.userTransaction.action){
          this.coinAmountComparison();
          this.evaluatePossibleIssueWhithUserMoneyAndCoinChange();
        }
      },
      evaluatePossibleIssueWhithUserMoney(){
        if (this.transactionModification.money > this.userTransaction.money){
          this.disabledOfTransactionMod = 1;
          this.modificationCancel = false;
        } else {
          this.disabledOfTransactionMod = 3;
          this.modificationDone = false;
          this.modificationOfTransactionSelected();
          console.log('El objeto que se prepara para la modificación de la compra seleccionada es el siguiente:');
          console.log(this.transactionModification);
        }
      },
      evaluatePossibleIssueWhithUserMoneyAndCoinChange(){
        if (this.surplusOfCoinAmount == true){
          this.disabledOfTransactionMod = 2;
          this.modificationCancel = false;
        } else {
          this.disabledOfTransactionMod = 3;
          this.modificationDone = false;
          this.modificationOfTransactionSelected();
          console.log('El objeto que se prepara para la modificación de la venta seleccionada es el siguiente:');
          console.log(this.transactionModification);
        }
      },
      modificationOfTransactionSelected(){
        ApiCallService.patchSelectedTransaction(this.transactionModification.id, this.transactionModification);
      },
      // Este último método de aquí abajo (Antes del 'watch') es el encargado de emitir el evento que, una vez escuchado en el padre (La vista), se recargará dicha vista con todos sus componentes juntos (Esto permite volver a cargar los datos y reflejar los cambios realizados).
      refreshTheView(){
        this.$emit('refresh-the-view');
      }
    },
    computed: {
      enableTransactionModificationButtons(){
        while(this.transactionModification.crypto_amount == 0){
          return true;
        }
        return false;
      }
    },
    mounted(){
      this.getLocalStorageUserInfo();
    },
    watch: {
      receivedTransactionInfo: {
        handler(newVal) {
          if(newVal && Object.keys(newVal).length > 0){
            this.unitTransactionInfoReceived(newVal);
          }
        },
        inmediate: true
      }
    }
  }
</script>

<style scoped>
  .ModalRendering {
    display: flex;
    justify-content: center;
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
    background-color: #fff;
    width: 45%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(0.8); /* Comienza más pequeño */
    transition: transform 1s ease-in-out; /* Animación de expansión */
  }

  .ModalContent.show {
    transform: scale(1); /* Expande a su tamaño normal */
  }

  .ModalTransactionModification {
    display: grid;
    grid-template-columns: auto auto;
    margin: 0 auto;
    justify-content: space-around;
  }

  .PurchaseTransactionInfo,
  .SaleTransactionInfo {
    padding: 15px 30px 15px;
    grid-column: 1/2;
  }

  .ModificationButtonsBox {
    padding: 5px 5px 5px;
    grid-column: 2/2;
  }

  .ModificationOptionsBox {
    padding: 15px 30px 15px;
    grid-column: 2/2;
  }

  .btnCloseModal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
</style>