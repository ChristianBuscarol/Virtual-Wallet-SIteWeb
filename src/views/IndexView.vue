<template>
  <header class="IndexHeaderBox">
    <div class="HeaderBox">
      <h1>Trinance Interactive Corp.</h1>
      <UserProfileComponent :receivedData="emitUserDataReceived"/>
    </div>
  </header>
  <div class="EntryForm">
    <EntryFormComponent @user-register="userCheck"/>
  </div>
  <footer class="IndexFooterBox">
    <div class="CoinRain">
      <img src="../assets/CoinRainGif.gif" alt="Coin rain..." id="EntryFormGifs">
    </div>
    <div class="FooterCredits">
      <h3>For educational purpose i made this proyect for a university test... So, i deserve the rights to eat onions while you travel whit a racoon...</h3>
    </div>
    <div class="RainCoin">
      <img src="../assets/RainCoinGif.gif" alt="Another coin rain" id="EntryFormGifs">
    </div>
  </footer>
</template>

<script>
  // @ is an alias to /src
  import EntryFormComponent from '@/components/EntryFormComponent.vue';
  import UserProfileComponent from '@/components/UserProfileComponent.vue';

  export default {
    name: 'IndexView',
    components: {
      EntryFormComponent,
      UserProfileComponent
    },
    data(){
      return{
        emitUserDataReceived: {}
      }
    },
    methods: {
      userCheck(userData){
        this.emitUserDataReceived = userData;
      }
    }
  }
</script>

<style scoped>
  .IndexFooterBox{
    display: flex;
    justify-content: space-between; /* Distribuye los contenedores */
    align-items: center;  /* Alinea verticalmente */
    padding: 10px;
  }

  .CoinRain {
    text-align: left;
  }

  .FooterCredits {
    text-align: center;
  }

  .RainCoin {
    text-align: right;
  }

  #EntryFormGifs{
    width: 125px;
    height: 125px;
  }

  .IndexHeaderBox {
    display: flex;
  }
</style>