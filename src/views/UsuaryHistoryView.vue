<template>
  <header class="HistoryHeaderBox">
    <h3>Records table of the usuary: </h3>
    <UserProfileComponent @emit-user-info-for-user-history="prepareUserTransactionsHistory" :receivedData="emitUserDataReceived"/>
  </header>
  <body>
    <UsuaryHistoryComponent @open-transaction-modification-modal="prepareTransactionInfoForModModal" :receivedUserHistoryData="emitUserTransactionsHistory"/>
    <ModalTransactionModification :receivedTransactionInfo="emitUserUnitTransactionInfo"></ModalTransactionModification>
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
      }
    },
    mounted(){
      this.KeepingUserInfoActive();
    }
  }
</script>

<style scoped>

</style>