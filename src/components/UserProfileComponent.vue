<template>
  <div class="UserProfile">
    <header>
      <h4>Actual usuary acount:</h4>
      <p><strong>Name: {{ vShowUserName }}</strong></p>
      <p><strong>Available money: {{ vShowMoneyUser }}</strong></p>
    </header>
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
      },
      userMoneyUpdate: {
        type: Object,
        default: null
      }
    },
    data(){
      return{
        dataUserProfile: {
          userName: '',
          userId: '',
          userWallet: 0,
          totalMoneySpent: 0,
          totalMoneyEarned: 0,
          totalCoinsPurchased: 0,
          totalCoinsSold: 0,
          historyOfUserMovementsTransactions: [],
          historyOfPurchaseTransactions: [],
          historyOfSaleTransactions: [],
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
        let response = await ApiCallService.getUserTransactionsInfo(this.userId);

        this.evaluatingUserFirstConnection(response);
      },
      evaluatingUserFirstConnection(response){
        if(response.data != null || response.data != undefined){
          this.fillingUserHistoryArraySpace(response);
        } else{
          this.firstConnectionMoneyGift();
        }
      },
      firstConnectionMoneyGift(){
        // Este va a ser un pequeño regalo para el usuario en caso de conectarse por °1 vez y no haber hecho transacciones aún.
        this.dataUserProfile.userWallet = 1000000;
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
          else if(this.historyOfUserMovementsTransactions[i].action == 'sell'){
            this.historyOfSaleTransactions.push(this.historyOfUserMovementsTransactions[i]);
          }
        }

        this.calculatingUserMoneyAvailable();
      },
      calculatingUserMoneyAvailable(){
        this.sumOfMoney();
        this.restOfMoney();
        this.totalUserAvailableMoney();
      },
      sumOfMoney(){
        for(let i = 0; i < this.historyOfSaleTransactions.length; i++){
          this.dataUserProfile.totalMoneyEarned = this.dataUserProfile.totalMoneyEarned + parseFloat(this.historyOfSaleTransactions[i].money);
        }
      },
      restOfMoney(){
        for(let i = 0; i < this.historyOfPurchaseTransactions.length; i++){
          this.dataUserProfile.totalMoneySpent = this.dataUserProfile.totalMoneySpent + parseFloat(this.historyOfPurchaseTransactions[i].money);
        }
      },
      totalUserAvailableMoney(){
        this.dataUserProfile.userMoneyRegister = this.dataUserProfile.totalMoneyEarned - this.dataUserProfile.totalMoneySpent;

        this.calculatingUserCoinsAvailable();
      },
      calculatingUserCoinsAvailable(){
        this.sumOfCoins();
        this.restOfCoins();
      },
      sumOfCoins(){
        for(let i = 0; i < this.historyOfPurchaseTransactions.length; i++){
          if(this.historyOfPurchaseTransactions[i].crypto_code == 'bitcoin'){
            this.dataUserProfile.unitCoinAmount.bitcoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'dogecoin'){
            this.dataUserProfile.unitCoinAmount.dogecoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'ethereum'){
            this.dataUserProfile.unitCoinAmount.ethereumAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'litecoin'){
            this.dataUserProfile.unitCoinAmount.litecoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'solana'){
            this.dataUserProfile.unitCoinAmount.solanaAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'usdcd'){
            this.dataUserProfile.unitCoinAmount.usdcAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
        }
      },
      restOfCoins(){
        for(let i = 0; i < this.historyOfSaleTransactions.length; i++){
          if(this.historyOfSaleTransactions[i].crypto_code == 'bitcoin'){
            this.dataUserProfile.unitCoinAmount.bitcoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'dogecoin'){
            this.dataUserProfile.unitCoinAmount.dogecoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'ethereum'){
            this.dataUserProfile.unitCoinAmount.ethereumAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'litecoin'){
            this.dataUserProfile.unitCoinAmount.litecoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'solana'){
            this.dataUserProfile.unitCoinAmount.solanaAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'usdcd'){
            this.dataUserProfile.unitCoinAmount.usdcAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
        }
      }
    },
    computed: {
      vShowUserName(){
        if(this.dataUserProfile.userName != ''){
          return this.dataUserProfile.userName;
        } else {
          return 'Esperando el ingreso de Datos para verificación...';
        }
      },
      vShowMoneyUser(){
        if(this.dataUserProfile.userWallet != 0){
          return this.dataUserProfile.userWallet;
        } else {
          return 'Esperando el ingreso de Datos para consultar a la Api...';
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
      },
      userMoneyUpdate: {
        handler(newVol) {
          if(newVol){
            this.receiptOfTransactionDoneInfo(newVol);
          }
        },
        inmediate: true
      }
    }
  }
</script>

<style scoped>

</style>