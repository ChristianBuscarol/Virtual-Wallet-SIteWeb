<template>
  <div class="UserProfile">
    <body>
      
    </body>
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

        },
        dataTransaction: {
          userName: '',
          userId: '',
          actionMade: '',
          spentMoney: 0
        }
      }
    }
  }
</script>

<style scoped>

</style>