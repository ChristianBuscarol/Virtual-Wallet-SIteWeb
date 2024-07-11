<template>
  <header class="IndexHeaderBox">
    <div class="Header-Box">
      <h1>Trinance Interactive Corp.</h1>
      <UserProfileComponent @user-register="userCheck"/>
    </div>
  </header>
  <div class="EntryForm">
    <EntryFormComponent/>
  </div>
  <footer class="IndexFooterBox">
      <div class="Footer-Box">
        <img src="../assets/CoinRainGif.gif" alt="Coin Rain..." id="EntryFormGifs">
        <ul>
          <li>Ingrese los 2 únicos Datos necesarios para poder continuar por la plataforma...</li>
          <li>Una vez ingresado evalúe las pocas pero diferentes monedas virtuales en busca del mejor precio...</li>
          <li>Compre y venda en el momento adecuado para generar ganancias...</li>
          <li>Analice, interactúe y disfruta del proceso...</li>
        </ul>
        <img src="../assets/PenguinCheckingMoney.webp" alt="A cute penguin checking and counting his money" id="EntryFormGifs">
        <p>For educational purpose i made this proyect for a university final... So, i deserve the rights to eat onions while you travel whit a racoon...</p>
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
    }
  }
</script>

<style scoped>
  #EntryFormGifs{
    width: 125px;
    height: 125px;
  }
  
</style>