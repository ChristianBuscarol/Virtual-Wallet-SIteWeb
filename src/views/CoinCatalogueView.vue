<template>
  <div class="catalogue">
    <header>
      <div class="CoinCatalogue">
        <h1>This is an catalogue page</h1>
        <UserProfileComponent @emit-user-info-to-modal="sendUserInfoToModal" :receivedData="emitedLocalStorageUserData"/>
      </div>
    </header>
    <body>
      <div class="CriptoCoinsListComponent">
        <CriptoCoinsListComponent @open-transaction-modal="openTransactionModal" :receivedUserProfileData="prepareUserProfileInfo"/>
        <ModalTransactionComponent @refresh-the-view="refreshTheView" :receivedSelectedCoinInfo="prepareSelectedCoinInfo"/>
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
        prepareSelectedCoinInfo: {},
        emitedLocalStorageUserData: {},
        prepareUserProfileInfo: {}
      }
    },
    methods: {
      openTransactionModal(infoSelectedCoin){
        this.prepareSelectedCoinInfo = infoSelectedCoin;
      },
      KeepingUserInfoActive(){
        this.emitedLocalStorageUserData = JSON.parse(localStorage.getItem('userData'));
      },
      sendUserInfoToModal(dataUserProfile){
        this.prepareUserProfileInfo = dataUserProfile;
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

</style>