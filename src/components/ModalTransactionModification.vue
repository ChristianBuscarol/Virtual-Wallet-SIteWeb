<template>
  <body>
    <div v-show="modalVisibility" ref="modalRendering" class="ModalRendering">
      <div ref="modalContent" class="ModalContent" @click.stop>
        <div class="ModalPurchaseTransactionModification" v-if="userTransaction.transactionInfoLevel == 1">
          <h3>Hola a todos!...</h3>
        </div>

        <div class="ModalPurchaseTransactionElimination" v-if="userTransaction.transactionInfoLevel == 2">
          <h3>¿Are you sure you want to delete this transaction?</h3>
          <button type="button" @click="delteOfTransactionSelected()" v-show="!interactionOfPurchaseTransactionDelete" :disabled="interactionOfPurchaseTransactionDelete" class="btnEliminationConfirmation">Yes</button>
          <button type="button" @click="closeModalTransaction()" v-show="!interactionOfPurchaseTransactionDelete" :disabled="interactionOfPurchaseTransactionDelete" class="btnEliminationNegation">No</button>
          <h3 v-if="this.moneyCalculationForDelete < 0">The 'Deletion' of the selected transaction is't ready to be made for insufficient money.</h3>
          <button type="button" @click="closeModalTransaction()" v-show="interactionOfPurchaseTransactionDelete" :disabled="!interactionOfPurchaseTransactionDelete" class="btnCloseModal">CLose.</button>
        </div>

        <div class="ModalSaleTransactionModification" v-if="userTransaction.transactionInfoLevel == 3">
          <h3>Hola a todos!...</h3>
        </div>

        <div class="ModalSaleTransactionElimination" v-if="userTransaction.transactionInfoLevel == 4">
          <h3>¿Are you sure you want to delete this transaction?</h3>
          <button type="button" @click="delteOfTransactionSelected()" v-show="!interactionOfSaleTransactionDelete" :disabled="interactionOfSaleTransactionDelete" class="btnEliminationConfirmation">Yes</button>
          <button type="button" @click="closeModalTransaction()" v-show="!interactionOfSaleTransactionDelete" :disabled="interactionOfSaleTransactionDelete" class="btnEliminationNegation">No</button>
          <h3 v-if="this.userTransaction.crypto_amount >= this.userTransaction.cryptoAmountAvailable">The 'Deletion' of the selected transaction is't ready to be made for insufficient coin part.</h3>
          <button type="button" @click="closeModalTransaction()" v-show="interactionOfSaleTransactionDelete" :disabled="!interactionOfSaleTransactionDelete" class="btnCloseModal">CLose.</button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
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
        interactionOfPurchaseTransactionDelete: false,
        interactionOfSaleTransactionDelete: false,
        userTransaction: {
          transactionInfoLevel: 0,
          id: '',
          action: '',
          crypto_code: '',
          crypto_amount: 0,
          cryptoAmountAvailable: 0,
          money: 0,
          transactionMoney: 0,
          datetime: 0
        },
        moneyCalculationForDelete: 0
      }
    },
    methods: {
      unitTransactionInfoReceived(newVal){
        this.userTransaction.transactionInfoLevel = newVal.transactionInfoLevel;
        this.userTransaction.id = newVal.id;
        this.userTransaction.action = newVal.action;
        this.userTransaction.crypto_code = newVal.crypto_code;
        this.userTransaction.crypto_amount = newVal.crypto_amount;
        this.userTransaction.cryptoAmountAvailable = newVal.cryptoAmountAvailable;
        this.userTransaction.money = newVal.money;
        this.userTransaction.transactionMoney = newVal.transactionMoney;
        this.userTransaction.datetime = newVal.datetime;

        console.log('El objeto del Modal para la modificación o elimnación de la transacción seleccionada contiene la sieguiente info: ');
        console.log(this.userTransaction);
        this.showModalTransaction();
        this.evaluateTypeTransactionDeletion();
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
          this.interactionOfPurchaseTransactionDelete = true;
        }
      },
      confirmationOfSaleTransactionDelete(){
        this.moneyCalculationForDelete += parseFloat(this.userTransaction.money - this.userTransaction.transactionMoney);

        if (this.moneyCalculationForDelete < 0){
          this.interactionOfSaleTransactionDelete = true;
        }
      },
      delteOfTransactionSelected(){
        ApiCallService.deleteSelectedTransaction(this.userTransaction.id);
      },
      refreshTheView(){
        this.$emit('refresh-the-view');
      }
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
    width: 40%;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    transform: scale(0.8); /* Comienza más pequeño */
    transition: transform 1s ease-in-out; /* Animación de expansión */
  }

  .ModalContent.show {
    transform: scale(1); /* Expande a su tamaño normal */
  }

  .btnCloseModal {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
  }
</style>