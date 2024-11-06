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
      <div class="FooterBox">
        <img src="../assets/CoinRainGif.gif" alt="Coin rain..." class="EntryFormGifs" id="CoinRain">
        <h3>For educational purpose i made this proyect for a university test... So, i deserve the rights to eat onions while you travel whit a racoon...</h3>
        <img src="../assets/RainCoinGif.gif" alt="Another coin rain" class="EntryFormGifs" id="RainCoin">
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
  }

  .EntryFormGifs{
    width: 125px;
    height: 125px;
  }
</style>