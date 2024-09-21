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
          totalMoneyLost: 0,
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
        this.dataUserProfile.userWallet = newVal.userMoneyRegister;
        this.dataUserProfile.totalMoneySpent = newVal.moneySpent;
        this.dataUserProfile.totalMoneyEarned = newVal.moneyEarned;
        this.dataUserProfile.unitCoinAmount= newVal.coinAvailableList;
      },
      receiptOfTransactionDoneInfo(newVol){
        if(newVol.action == 'purchase'){
          this.sumOfMoneyEarnedFromTransactionDone(newVol);
          this.sumOfCoins(newVol);
        }
        else if(newVol.action == 'sell'){
          this.restOfMoneySpentFromTransactionDone();
          this.restOfCoins(newVol);
        }
      },
      sumOfMoneyEarnedFromTransactionDone(){
        this.dataUserProfile.userWallet += this.newVol.money;
        this.dataUserProfile.totalMoneyEarned += this.newVol.money;
      },
      restOfMoneySpentFromTransactionDone(){
        this.dataUserProfile.userWallet -= this.newVol.money;
        this.dataUserProfile.totalMoneySpent += this.newVol.money;
      },
      sumOfCoins(){
        for(let i = 0; i < this.dataUserProfile.unitCoinAmount.length; i++){
          if(this.newVol.crypto_code == 'bitcoin'){
            this.dataUserProfile.unitCoinAmount[i] += parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'dogecoin'){
            this.dataUserProfile.unitCoinAmount[i] += parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'ethereum'){
            this.dataUserProfile.unitCoinAmount[i] += parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'litecoin'){
            this.dataUserProfile.unitCoinAmount[i] += parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'solana'){
            this.dataUserProfile.unitCoinAmount[i] += parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'usdcd'){
            this.dataUserProfile.unitCoinAmount[i] += parseFloat(this.newVol.crypto_amount);
          }
        }
      },
      restOfCoins(){
        for(let i = 0; i < this.dataUserProfile.unitCoinAmount.length; i++){
          if(this.newVol.crypto_code == 'bitcoin'){
            this.dataUserProfile.unitCoinAmount[i] -= parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'dogecoin'){
            this.dataUserProfile.unitCoinAmount[i] -= parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'ethereum'){
            this.dataUserProfile.unitCoinAmount[i] -= parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'litecoin'){
            this.dataUserProfile.unitCoinAmount[i] -= parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'solana'){
            this.dataUserProfile.unitCoinAmount[i] -= parseFloat(this.newVol.crypto_amount);
          }
          else if (this.newVol.crypto_code == 'usdcd'){
            this.dataUserProfile.unitCoinAmount[i] -= parseFloat(this.newVol.crypto_amount);
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