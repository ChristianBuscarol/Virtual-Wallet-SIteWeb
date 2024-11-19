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
    <div class="FooterImageLeftBox">
      <img src="../assets/PenguinOnComputer.webp" alt="A penguin in bicicle whit coins..." class="FooterGifs">
    </div>
    <div class="FooterCredits">
      <h3>You have come to the final part of this proyect, i hope you enjoyed the interactions and i will see you soon whit more updates...</h3>
      <h3>(If you want to go back to the coin catalogue page press the button right here below)</h3>
      <button type="button" @click="btnCatalogueEntry()" class="btnGoToCataloguePage">Catalogue Page</button>
    </div>
    <div class="FooterImageRightBox">
      <img src="../assets/PenguinOnBicicleWhitCoins.webp" alt="The Pug whit the most edit dance possible..." class="FooterGifs">
    </div>
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
      },
      btnCatalogueEntry(){
        window.location.href = '/CoinCatalogueView';
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

  footer{
    background-color: #a39b9bd3;
  }

  .HistoryFooterBox{
    display: flex;
    justify-content: space-between; /* Distribuye los contenedores */
    align-items: center;  /* Alinea verticalmente */
    padding: 10px;
  }

  .FooterImageLeftBox{
    text-align: left;
  }

  .FooterCredits{
    text-align: center;
  }

  .FooterImageRightBox{
    text-align: right;
  }

  .FooterGifs{
    width: 200px;
    height: 200px
  }

  .btnGoToCataloguePage{
    width: 100px;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;  /* Bordes redondeados */
    border: 1px solid blue;
    background-color: white;
    color: blue;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; /* Fuente */
    text-transform: uppercase; /* Convierte el texto a mayúsculas */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del botón */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .btnGoToCataloguePage:hover{
    border: 1px solid white;
    background-color: blue;
    color: white;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* Sombra más intensa al pasar el cursor */
  }
</style>