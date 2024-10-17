<template>
  <body>
    <div v-show="modalVisibility" ref="modalRendering" class="ModalRendering">
      <div ref="modalContent" class="ModalContent" @click.stop>
        <div class="ModalPurchaseTransactionModification" v-if="userTransaction.transactionInfoLevel == 1">
          <h3>Hola a todos!...</h3>
        </div>

        <div class="ModalPurchaseTransactionElimination" v-if="userTransaction.transactionInfoLevel == 2">
          <h3>¿Are you sure you want to delete this transaction?</h3>
          <button type="button" class="btnEliminationConfirmation">Yes</button>
          <button type="button" class="btnEliminationNegation">No</button>
          <button type="button" class="btnCloseModal">CLose this window</button>
        </div>

        <div class="ModalSaleTransactionModification" v-if="userTransaction.transactionInfoLevel == 3">
          <h3>Hola a todos!...</h3>
        </div>

        <div class="ModalSaleTransactionElimination" v-if="userTransaction.transactionInfoLevel == 4">
          <h3>¿Are you sure you want to delete this transaction?</h3>
          <button type="button" class="btnEliminationConfirmation">Yes</button>
          <button type="button" class="btnEliminationNegation">No</button>
          <button type="button" class="btnCloseModal">CLose this window</button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
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
        userTransaction: {
          transactionInfoLevel: 0,
          id: '',
          action: '',
          crypto_code: '',
          crypto_amount: 0,
          cryptoAmountAvailable: 0,
          money: 0,
          datetime: 0
        }
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
        this.userTransaction.datetime = newVal.datetime;

        this.showModalTransaction();
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