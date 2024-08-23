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
      }
    },
    data(){
      return{
        dataUserProfile: {
          userName: '',
          userId: '',
          userWallet: 0,
          actionMade: ['purchase', 'sell'],
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
        },
        dataTransaction: {
          userId: '',
          actionMade: '',
          criptoCoin: '',
          criptoCoinAmount: '',
          spentMoney: 0,
          dateTime: null
        }
      }
    },
    methods: {
      userDataLoading(){
        this.$emit('user-data-loading');
      },
      receiverEventData(newVal){
        this.dataUserProfile.userName = newVal.userNameRegister;
        this.dataUserProfile.userId = newVal.userIdRegister;
        this.dataUserProfile.userWallet = newVal.userMoneyRegister;
        this.dataUserProfile.totalMoneySpent = newVal.moneySpent;
        this.dataUserProfile.totalMoneyEarned = newVal.moneyEarned;
        this.dataUserProfile.unitCoinAmount= newVal.coinAvailableList;
        console.log(this.dataUserProfile);
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
      }
    }
  }
</script>

<style scoped>

</style>