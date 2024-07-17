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
    data(){
      return{
        dataUserProfile: {
          gettingUserData: ['', ''],
          userName: '',
          userId: '',
          userWallet: 0,
          actionMade: ['purchase', 'sell'],
          totalMoneySpent: 0,
          totalCoinsPurchased: 0,
          totalCoinsSold: 0,
          unitCoinAmount: {
            bitcoinAmount: 0,
            dogecoinAmount: 0,
            ethereumAmount: 0,
            litecoinAmount: 0,
            solana: 0,
            usdcAmount: 0
          },
          totalMoneyEarned: 0,
          totalMoneyLost: 0
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
      userCheck() {
        this.localStorageGetUserName();
        this.localStorageGetUserID();

        this.dataUserProfile.userName = this.dataUserProfile.gettingUserData[0];
        this.dataUserProfile.userId = this.dataUserProfile.gettingUserData[1];
      },
      localStorageGetUserName(){
        this.dataUserProfile.gettingUserData[0] = JSON.parse(localStorage.getItem('userData.userNameRegister'));
        console.log('El Nombre del usuario de la última conexión es: ', localStorage.getItem('userData.userNameRegister'))
        console.log(this.dataUserProfile.gettingUserData[0]);
      },
      localStorageGetUserID(){
        this.dataUserProfile.gettingUserData[1] = JSON.parse(localStorage.getItem('userData.userIdRegister'));
        console.log('El ID del usuario de la última conexión es: ', localStorage.getItem('userData.userIdRegister'))
        console.log(this.dataUserProfile.gettingUserData[1]);
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
    }
  }
</script>

<style scoped>

</style>