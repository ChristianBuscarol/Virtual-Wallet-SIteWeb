<template>
  <div class="CriptoCoinsList">
    <body>
      <div class="CriptoInfoBox">
        <!--Sector de muestra de información sobre la moneda seleccionada en la lista de miniaturas aquí abajo-->
        <div class="SelectedCoinBox">
          <div class="InfoSelectedCoinBox">
            <h3>Selected Coin: <p><strong>{{ showCoinTitleSelected }}</strong></p></h3>
            <h3>Image of the Coin:</h3>
            <img :src="showCoinImageSelected" alt="GifSelectedCoin" class="Coin-Circle">
            <h3>Price: </h3><p><strong>{{ this.Coins[selectedCoin].price }}</strong></p>
          </div>

          <!--Sector de botones para la compra y venta de monedas aquí abajo-->
          <div class="TransactionsButtonsBox">
            <button type="button" id="btnValidatePurchase">Buy...</button><br><br>
            <button type="button" id="btnValidateSale">Sell...</button><br><br>
            <!--<button type="button" @click="obtainPrice()" id="btnRefreshPrices">Refresh Prices...</button>-->
          </div>
        </div>

        <!--Sector de la lista de imagenes en miniatura sobre las monedas disponibles aquí abajo-->
        <div class="ListDisplayBox">
          <div v-for="(Coin, index) in Coins" :key="Coin.id"  @mouseover="actualCoinSelected(index)">
            <img :src="Coin.image" class="Coin-Circle" alt="GifCoinListPart">
          </div>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
  import axios from "axios";

  export default{
    name: 'CriptoCoinsListComponent',
    data(){
      return{
        selectedCoin: 0,
        Coins: [
          {
            id: 1,
            title: "Bitecoin",
            price: 0,
            image: require('@/assets/BitecoinGif.gif'),
            url: 'https://criptoya.com/api/satoshitango/btc/ars'
          },
          {
            id: 2,
            title: "Dogecoin",
            price: 0,
            image: require('@/assets/DogecoinGif.gif'),
            url: 'https://criptoya.com/api/satoshitango/doge/ars'
          },
          {
            id: 3,
            title: 'Ethereum',
            price: 0,
            image: require('@/assets/EthereumGif.gif'),
            url: 'https://criptoya.com/api/satoshitango/eth/ars'
          },
          {
            id: 4,
            title: "Litecoin",
            price: 0,
            image: require('@/assets/LitecoinGif.gif'),
            url: 'https://criptoya.com/api/satoshitango/ltc/ars'
          },
          {
            id: 5,
            title: "Solana",
            price: 0,
            image: require('@/assets/SolanaCoinGif.webp'),
            url: 'https://criptoya.com/api/satoshitango/sol/ars'
          },
          {
            id: 6,
            title: "USDC",
            price: 0,
            image: require("@/assets/USDCgif.gif"),
            url: 'https://criptoya.com/api/satoshitango/usdc/ars'
          }
        ]
      }
    },
    methods: {
      actualCoinSelected(index){
        this.selectedCoin = index;
      },
      async obtainPrice(){
        for(let i = 0; i < this.Coins.length; i++){
          let response = await axios.get(this.Coins[i].url);
          this.Coins[i].price = response.data.totalAsk;
        }
        
        console.log('Hola a todos!');
      }
    },
    computed: {
      showCoinTitleSelected(){
        return this.Coins[this.selectedCoin].title
      },
      showCoinImageSelected(){
        return this.Coins[this.selectedCoin].image
      }
    },
    async created() {
      this.obtainPrice()

      setInterval(() => {this.obtainPrice();}, 15000);
    }
  }
</script>

<!--
  .Coin-Circle{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-style: inherit black;
    border: 1.5px;
    margin-top: 5px;
    margin: 10px;
    background-position: center;
    background-size: cover;
    display: inline-block;
  }
-->

<style scoped>
  .Coin-Circle{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px;
    border-style: groove;
    border-color: black;
  }

  body{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgreen;
  }

  .CriptoInfoBox{
    display: grid;
    grid-template-columns: auto auto;
    margin: 0 auto;
    justify-content: space-around;
  }

  .InfoSelectedCoinBox{
    grid-column: 1/2;
  }

  .TransactionsButtonsBox{
    grid-column: 2/2;
    width: 100px;
    height: 100px;
    text-align: center;
  }

  .SelectedCoinBox{
    display: grid;
    grid-template-columns: auto auto;
    max-width: 250px;
    max-height: 250px;
    grid-column: 1/2;
    width: 90%;
    border: 2px solid black;
  }

  .ListDisplayBox{
    grid-column: 2/2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 300px;
    max-height: 300px;
    margin: 0 auto;
    width: 90%;
    border: 2px solid black;
  }
</style>