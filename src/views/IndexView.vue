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
    <div class="RainCoin">
      <img src="../assets/RainCoinGif.gif" alt="Another coin rain" id="EntryFormGifs">
    </div>
    <div class="FooterCredits">
      <h3>For educational purpose i made this proyect for a university test... So, i deserve the rights to eat onions while you travel whit a racoon...</h3>
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
    display: grid;
    margin: 0 auto;
    grid-template-columns: auto auto auto;
    justify-content: space-around;
    padding: 10px;
  }

  .CoinRain {
    grid-column: 1/3;
    width: 125px;
    height: 125px;
  }

  .FooterCredits {
    width: 400px;
    grid-column: 2/3;
    text-align: center;
    padding: 10px;
  }

  .RainCoin {
    grid-column: 3/3;
  }

  #EntryFormGifs{
    width: 125px;
    height: 125px;
  }

  .IndexHeaderBox {
    display: flex;
  }
</style>