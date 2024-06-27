<template>
  <div class="CriptoCoinsList">
    <body>
      <div class="CriptoInfoBox">
        <!--Sector de muestra de información sobre la moneda seleccionada en la lista de miniaturas aquí abajo-->
        <div class="imageSelectedDisplay">{{ showCoinTitleSelected }}</div>
        <h3>Coin: </h3><p><strong>{{ showCoinImageSelected }}</strong></p>
        <h3>Price: </h3><p><strong>{{ this.Coins.price }}</strong></p>

        <!--Sector de botones para la compra y venta de monedas aquí abajo-->
        <div class="">
          <button type="button" id="btnValidatePurchase">Buy...</button><br><br>
          <button type="button" id="btnValidateSale">Sell</button>
        </div>

        <!--Sector de la lista de imagenes en miniatura sobre las monedas disponibles aquí abajo-->
        <div v-for="(Coin, index) in Coins" :key="Coin.id" class="Coin-Circle" @mouseover="actualCoinSelected(index)" :style="{backgroundImage: this.Coins[index].image}">{{ Coin.image }}</div>
        <!---->
      </div>
    </body>
  </div>
</template>

<script>
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
            image: '../assets/BitcoinGif.gif',
            url: 'https://criptoya.com/api/satoshitango/btc/ars'
          },
          {
            id: 2,
            title: "Dogecoin",
            price: 0,
            image: '../assets/DogecoinGif.gif',
            url: 'https://criptoya.com/api/satoshitango/doge/ars'
          },
          {
            id: 3,
            title: 'Ethereum',
            price: 0,
            image: '../assets/EthereumGif.gif',
            url: 'https://criptoya.com/api/satoshitango/eth/ars'
          },
          {
            id: 4,
            title: "Litecoin",
            price: 0,
            image: '../assets/LitecoinGif.gif',
            url: 'https://criptoya.com/api/satoshitango/ltc/ars'
          },
          {
            id: 5,
            title: "Solana",
            price: 0,
            image: '../assets/SolanaCoinGif.webp',
            url: 'https://criptoya.com/api/satoshitango/sol/ars'
          },
          {
            id: 6,
            title: "USDC",
            price: 0,
            image: "../assets/USDCgif.gif",
            url: 'https://criptoya.com/api/satoshitango/usdc/ars'
          }
        ]
      }
    },
    async created() {
      const response = await fetch(this.Coins[this.selectedCoin].url);
      const json = await response.json();
      this.Coins[this.selectedCoin].price = json.totalAsk;
    },
    methods: {
      actualCoinSelected(index){
        this.selectedCoin = index;
      }
    },
    computed: {
      showCoinTitleSelected(){
        return this.Coins[this.selectedCoin].title
      },
      showCoinImageSelected(){
        return this.Coins[this.selectedCoin].image
      }
    }
  }
</script>

<style scoped>
  .Coin-Circle{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-style: inherit black;
    border: 1.5px;
    margin-top: 5px;
  }
</style>