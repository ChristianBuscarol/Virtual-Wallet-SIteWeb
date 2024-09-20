<template>
  <div class="catalogue">
    <header>
      <div class="CoinCatalogue">
        <h1>This is an catalogue page</h1>
        <UserProfileComponent :receivedData="emitUserDataReceived" :transactionInfo="userMoneyUpdate"/>
      </div>
    </header>
    <body>
      <div class="CriptoCoinsListComponent">
        <CriptoCoinsListComponent @open-transaction-modal="openTransactionModal" @keeping-user-info-active="KeepingUserInfoActive"/>
        <ModalTransactionComponent :receivedSelectedCoinInfo="preparingSelectedCoinInfo" @account-money-update="accountMoneyUpdate"/>
      </div>
    </body>
    <footer>
      <div>

      </div>
    </footer>
  </div>
</template>

<script>
  import CriptoCoinsListComponent from '@/components/CriptoCoinsListComponent.vue';
  import UserProfileComponent from '@/components/UserProfileComponent.vue';
  import ModalTransactionComponent from '@/components/ModalTransactionComponent.vue';

  export default{
    name: 'CoinCatalogueView',
    components: {
      CriptoCoinsListComponent,
      UserProfileComponent,
      ModalTransactionComponent
    },
    data(){
      return{
        preparingSelectedCoinInfo: {},
        emitUserDataReceived: {},
        userMoneyUpdate: {}
      }
    },
    methods: {
      openTransactionModal(infoSelectedCoin){
        this.preparingSelectedCoinInfo = infoSelectedCoin;
      },
      KeepingUserInfoActive(){
        this.emitUserDataReceived = JSON.parse(localStorage.getItem('userData'));
      },
      accountMoneyUpdate(requestBody){
        this.userMoneyUpdate = requestBody;
        console.log(this.userMoneyUpdate);
      }
    }
  }
</script>

<style scoped>

</style>