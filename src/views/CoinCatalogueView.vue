<template>
  <div class="catalogue">
    <header>
      <div class="CoinCatalogue">
        <img src="../assets/LittleAnimation.webp" alt="A little animation in the header section..." class="HeaderImage" id="HeaderImageGif">
        <h1 class="CatalogueTittle">Trinance: 'Coin Catalogue Page'</h1>
        <UserProfileComponent @emit-user-info-to-modal="sendUserInfoToModal" :receivedData="emitedLocalStorageUserData" class="HeaderUserInfo"/>
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
  .CoinCatalogue{
    background-color: lightskyblue;
    display: flex;
    justify-content: space-between;
    align-items: center;  /* Alinea verticalmente */
  }

  #HeaderImageGif{
    width: 180px;
    height: 150px;
  }

  .HeaderImage{
    text-align: left;
  }

  .CatalogueTittle{
    width: 250px;
    text-align: center;
    text-decoration: underline;
  }

  .HeaderUserInfo{
    text-align: right;
  }
</style>