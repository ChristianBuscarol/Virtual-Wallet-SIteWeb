<template>
  <div class="catalogue">
    <header>
      <div class="CoinCatalogue">
        <h1>This is an catalogue page</h1>
        <UserProfileComponent :receivedData="emitUserDataReceived"/>
      </div>
    </header>
    <body>
      <div class="CriptoCoinsListComponent">
        <CriptoCoinsListComponent @open-transaction-modal="openTransactionModal"/>
        <ModalTransactionComponent :receivedSelectedCoinInfo="preparingSelectedCoinInfo"/>
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
        emitUserDataReceived: {}
      }
    },
    methods: {
      openTransactionModal(infoSelectedCoin){
        this.preparingSelectedCoinInfo = infoSelectedCoin;
      },
      KeepingUserInfoActive(){
        this.emitUserDataReceived = JSON.parse(localStorage.getItem('userData'));
      }
    },
    mounted(){
      this.KeepingUserInfoActive();
    }
  }
</script>

<style scoped>

</style>