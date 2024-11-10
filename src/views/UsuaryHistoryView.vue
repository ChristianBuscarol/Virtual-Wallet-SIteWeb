<template>
  <header class="HistoryHeaderBox">
    <img src="../assets/PenguinCheckingMoney.webp" alt="A cute penguin counting anda checking his money" class="HeaderImage" id="HeaderImageGif">
    <h1 class="TransactionHistoryTittle">Trinance: 'User Transaction History Page'</h1>
    <UserProfileComponent @emit-user-info-for-user-history="prepareUserTransactionsHistory" :receivedData="emitUserDataReceived" class="HeaderUserInfo"/>
  </header>
  <body>
    <UsuaryHistoryComponent @open-transaction-modification-modal="prepareTransactionInfoForModModal" :receivedUserHistoryData="emitUserTransactionsHistory"/>
    <ModalTransactionModification @refresh-the-view="refreshTheView" :receivedTransactionInfo="emitUserUnitTransactionInfo"></ModalTransactionModification>
  </body>
  <footer class="HistoryFooterBox">

  </footer>
</template>

<script>
  import UsuaryHistoryComponent from '@/components/UsuaryHistoryComponent.vue';
  import UserProfileComponent from '@/components/UserProfileComponent.vue';
  import ModalTransactionModification from '@/components/ModalTransactionModification.vue';

  export default {
    name: 'UsuaryHistoryView',
    components: {
      UsuaryHistoryComponent,
      UserProfileComponent,
      ModalTransactionModification
    },
    data(){
      return{
        emitUserDataReceived: {},
        emitUserTransactionsHistory: {},
        emitUserUnitTransactionInfo: {}
      }
    },
    methods: {
      KeepingUserInfoActive(){
        this.emitUserDataReceived = JSON.parse(localStorage.getItem('userData'));
      },
      prepareUserTransactionsHistory(historyOfUserMovementsTransactions){
        this.emitUserTransactionsHistory = historyOfUserMovementsTransactions;
      },
      prepareTransactionInfoForModModal(transactionInfo){
        this.emitUserUnitTransactionInfo = transactionInfo;
      },
      refreshTheView(){
        window.location.reload();
      }
    },
    mounted(){
      this.KeepingUserInfoActive();
    }
  }
</script>

<style scoped>
  .HistoryHeaderBox{
    background-color: lightskyblue;
    display: flex;
    justify-content: space-between;
    align-items: center;  /* Alinea verticalmente */
  }

  .HeaderImageGif{
    text-align: left;
  }

  #HeaderImageGif{
    width: 150px;
    height: 150px;
    margin: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  }

  .TransactionHistoryTittle{
    width: 250px;
    text-align: center;
    text-decoration: underline;
  }

  .HeaderUserInfo{
    text-align: right;
  }
</style>