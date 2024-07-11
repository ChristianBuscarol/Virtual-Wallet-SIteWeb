<template>
  <div class="UserProfile">
    <header>
      <h4>Actual usuary acount:</h4>
      <p><strong>Name: {{ dataUserProfile.userName }}</strong></p>
      <p><strong>Available money: {{ dataUserProfile.userWallet }}</strong></p>
    </header>
  </div>
</template>

<script>
  export default{
    name: 'UserProfileComponent',
    data(){
      return{
        dataUserProfile: {
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
        console.log(JSON.parse(localStorage.getItem('userData.userIdRegister')));
      }
    }
  }
</script>

<style scoped>

</style>