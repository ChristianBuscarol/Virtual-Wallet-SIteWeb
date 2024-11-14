<template>
  <div class="HeaderContent">
    <p class="UserInfoText"><strong>Name: {{ vShowUserName }}</strong></p>  <p class="UserInfoText"><strong>Money: {{ vShowMoneyUser }}</strong></p>
    <button @click="btnCloseSession()" class="btnCloseSession">Log Out.</button>
  </div>
</template>

<script>
  import ApiCallService from '@/services/ApiCallService';

  export default{
    name: 'UserProfileComponent',
    props: {
      receivedData: {
        type: Object,
        default: null
      }
    },
    data(){
      return{
        historyOfUserMovementsTransactions: [],
        historyOfPurchaseTransactions: [],
        historyOfSaleTransactions: [],
        dataUserProfile: {
          userName: '',
          userId: '',
          userWallet: 0,
          totalMoneySpent: 0,
          totalMoneyEarned: 0,
          totalCoinsPurchased: 0,
          totalCoinsSold: 0,
          unitCoinAmount: {
            bitcoinAmount: 0,
            dogecoinAmount: 0,
            ethereumAmount: 0,
            litecoinAmount: 0,
            solanaAmount: 0,
            usdcAmount: 0
          }
        }
      }
    },
    methods: {
      receiverEventData(newVal){
        this.dataUserProfile.userName = newVal.userNameRegister;
        this.dataUserProfile.userId = newVal.userIdRegister;
        this.consultingApiForUserMovements();
      },
      async consultingApiForUserMovements(){
        // Esta función llamará a la Api para pedir la información del usuario requerida según el Id que le pasamos como parámetro y después, llamamos a otra función para analizar la información que conseguimos y a la vez le pasamos como parámetro también.
        await ApiCallService.getUserTransactionsInfo(this.dataUserProfile.userId).then(response => {
          if(response.data.length > 0){
            this.fillingUserHistoryArraySpace(response);
          } 
          else if (response.data.length == 0) {
            this.firstConnectionMoneyGift();
          }

          console.log('La información del usuario que se obtuvo de la llamada a la Api es la siguiente:');
          console.log(response);
        });
      },
      firstConnectionMoneyGift(){
        // Este va a ser un pequeño regalo para el usuario en caso de conectarse por °1 vez y no haber hecho transacciones aún.
        this.dataUserProfile.userWallet += 1500000;
      },
      fillingUserHistoryArraySpace(response){
        for(let i = 0; i < response.data.length; i++){
          this.historyOfUserMovementsTransactions[i] = response.data[i];
        }

        this.separatingTransactionsByType();
      },
      separatingTransactionsByType(){
        for(let i = 0; i < this.historyOfUserMovementsTransactions.length; i++){
          if(this.historyOfUserMovementsTransactions[i].action == 'purchase'){
            this.historyOfPurchaseTransactions.push(this.historyOfUserMovementsTransactions[i]);
          }
          else if(this.historyOfUserMovementsTransactions[i].action == 'sale'){
            this.historyOfSaleTransactions.push(this.historyOfUserMovementsTransactions[i]);
          }
        }

        this.calculateUserMoneyAvailable();
      },
      calculateUserMoneyAvailable(){
        this.sumOfMoney();
        this.restOfMoney();
        this.totalUserAvailableMoney();
      },
      sumOfMoney(){
        for(let i = 0; i < this.historyOfSaleTransactions.length; i++){
          if(isNaN(this.historyOfSaleTransactions[i].money) != true){
            this.dataUserProfile.totalMoneyEarned = this.dataUserProfile.totalMoneyEarned + parseFloat(this.historyOfSaleTransactions[i].money);
          }
        }
      },
      restOfMoney(){
        for(let i = 0; i < this.historyOfPurchaseTransactions.length; i++){
          if(isNaN(this.historyOfPurchaseTransactions[i].money) != true){
            this.dataUserProfile.totalMoneySpent = this.dataUserProfile.totalMoneySpent + parseFloat(this.historyOfPurchaseTransactions[i].money);
          }
        }
      },
      totalUserAvailableMoney(){
        this.dataUserProfile.userWallet = this.dataUserProfile.totalMoneyEarned - this.dataUserProfile.totalMoneySpent;

        this.calculateUserCoinsAvailable();
      },
      calculateUserCoinsAvailable(){
        this.sumOfCoins();
        this.restOfCoins();
        this.calculateTransactionCoinQuantity();
      },
      sumOfCoins(){
        for(let i = 0; i < this.historyOfPurchaseTransactions.length; i++){
          if(this.historyOfPurchaseTransactions[i].crypto_code == 'bitcoin' || this.historyOfPurchaseTransactions[i].crypto_code == 'Bitcoin'){
            this.dataUserProfile.unitCoinAmount.bitcoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'dogecoin' || this.historyOfPurchaseTransactions[i].crypto_code == 'Dogecoin'){
            this.dataUserProfile.unitCoinAmount.dogecoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'ethereum' || this.historyOfPurchaseTransactions[i].crypto_code == 'Ethereum'){
            this.dataUserProfile.unitCoinAmount.ethereumAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'litecoin' || this.historyOfPurchaseTransactions[i].crypto_code == 'Litecoin'){
            this.dataUserProfile.unitCoinAmount.litecoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'solana' || this.historyOfPurchaseTransactions[i].crypto_code == 'Solana'){
            this.dataUserProfile.unitCoinAmount.solanaAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'usdcd'){
            this.dataUserProfile.unitCoinAmount.usdcAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
        }
      },
      restOfCoins(){
        for(let i = 0; i < this.historyOfSaleTransactions.length; i++){
          if(this.historyOfSaleTransactions[i].crypto_code == 'bitcoin' || this.historyOfSaleTransactions[i].crypto_code == 'Bitcoin'){
            this.dataUserProfile.unitCoinAmount.bitcoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'dogecoin' || this.historyOfSaleTransactions[i].crypto_code == 'Dogecoin'){
            this.dataUserProfile.unitCoinAmount.dogecoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'ethereum' || this.historyOfSaleTransactions[i].crypto_code == 'Ethereum'){
            this.dataUserProfile.unitCoinAmount.ethereumAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'litecoin' || this.historyOfSaleTransactions[i].crypto_code == 'Litecoin'){
            this.dataUserProfile.unitCoinAmount.litecoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'solana' || this.historyOfSaleTransactions[i].crypto_code == 'Solana'){
            this.dataUserProfile.unitCoinAmount.solanaAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'usdcd'){
            this.dataUserProfile.unitCoinAmount.usdcAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
        }
      },
      calculateTransactionCoinQuantity(){
        this.sumOfPurchasedCoinQuantity();
        this.sumOfSoldCoinQuantity();
        this.emitUserInfoToModal();
        this.emitUserInfoForUserHistory();
      },
      sumOfPurchasedCoinQuantity(){
        for(let i = 0; i < this.historyOfPurchaseTransactions.length; i++){
          this.dataUserProfile.totalCoinsPurchased += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
        }
      },
      sumOfSoldCoinQuantity(){
        for(let i = 0; i < this.historyOfSaleTransactions.length; i++){
          this.dataUserProfile.totalCoinsSold += parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
        }
      },
      emitUserInfoToModal(){
        this.$emit('emit-user-info-to-modal', this.dataUserProfile);
      },
      emitUserInfoForUserHistory(){
        this.$emit('emit-user-info-for-user-history', this.historyOfUserMovementsTransactions);
      },
      btnCloseSession(){
        if(this.dataUserProfile.userName != '' && this.dataUserProfile.userId != ''){
          this.emptyTheUserInfo();
          this.removeLocalStorageItems();
          this.changeTheView();
        }
      },
      emptyTheUserInfo(){
        this.dataUserProfile.userName = null;
        this.dataUserProfile.userId = null;
        this.dataUserProfile.userWallet = 0;
        this.dataUserProfile.totalMoneySpent = 0;
        this.dataUserProfile.totalMoneyEarned = 0;
        this.dataUserProfile.totalCoinsPurchased = 0;
        this.dataUserProfile.totalCoinsSold = 0;
        this.dataUserProfile.unitCoinAmount.bitcoinAmount = 0;
        this.dataUserProfile.unitCoinAmount.dogecoinAmount = 0;
        this.dataUserProfile.unitCoinAmount.ethereumAmount = 0;
        this.dataUserProfile.unitCoinAmount.litecoinAmount = 0;
        this.dataUserProfile.unitCoinAmount.solanaAmount = 0;
        this.dataUserProfile.unitCoinAmount.usdcAmount = 0;
      },
      removeLocalStorageItems(){
        localStorage.removeItem('userData');
      },
      changeTheView(){
        window.location.href = '/';
      }
    },
    computed: {
      vShowUserName(){
        if(this.dataUserProfile.userName != ''){
          return this.dataUserProfile.userName;
        } else {
          return '(°o°)';
        }
      },
      vShowMoneyUser(){
        if(this.dataUserProfile.userWallet != 0){
          return this.dataUserProfile.userWallet;
        } else {
          return '(°¬°)';
        }
      }
    },
    watch: {
      receivedData: {
        handler(newVal) {
          if(newVal){
            this.receiverEventData(newVal);
          }
        },
        inmediate: true
      }
    }
  }
</script>

<style scoped>
 .HeaderContent{
  width: 200px;
  display: flex;
  padding: 10px;
  justify-content: center;
 }

 .UserInfoText{
  text-align: left;
  margin: 10px;
 }

 .btnCloseSession{
  text-align: right;
  align-items: center;
  width: 45px;
  height: 50px;
  margin: 5px;
  border-radius: 15%;
  font-weight: bold;     /* Negrita */
  border: 1px solid black;
  background-color: white;
  color: black;
  box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.3); /* Sombra del botón */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
 }

 .btnCloseSession:hover{
  border: 1px solid white;
  background-color: black;
  color: white;
  box-shadow: 4px 6px 8px white(0, 0, 0, 0.3); /* Sombra del botón */
  text-transform: uppercase; /* Convierte el texto a mayúsculas */
 }
</style>