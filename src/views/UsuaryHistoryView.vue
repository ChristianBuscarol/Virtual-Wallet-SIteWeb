<template>
  <header class="HistoryHeaderBox">
    <h3>Records table of the usuary: </h3>
    <UserProfileComponent @emit-user-info-for-user-history="prepareUserTransactionsHistory" :receivedData="emitUserDataReceived"/>
  </header>
  <body>
    <UsuaryHistoryComponent :receivedUserHistoryData="emitUserTransactionsHistory"/>
  </body>
  <footer class="HistoryFooterBox">

  </footer>
</template>

<script>
  import UsuaryHistoryComponent from '@/components/UsuaryHistoryComponent.vue';
  import UserProfileComponent from '@/components/UserProfileComponent.vue';

  export default {
    name: 'UsuaryHistoryView',
    components: {
      UsuaryHistoryComponent,
      UserProfileComponent
    },
    data(){
      return{
        emitUserDataReceived: {},
        emitUserTransactionsHistory: []
      }
    },
    methods: {
      KeepingUserInfoActive(){
        this.emitUserDataReceived = JSON.parse(localStorage.getItem('userData'));
      },
      prepareUserTransactionsHistory(historyOfUserMovementsTransactions){
        this.emitUserTransactionsHistory = historyOfUserMovementsTransactions;
        console.log('La lista de transacciones pasadas por la vista del historial es el siguiente: ');
        console.log(this.emitUserTransactionsHistory);
      }
    },
    mounted(){
      this.KeepingUserInfoActive();
    }
  }
</script>

<style scoped>

</style>