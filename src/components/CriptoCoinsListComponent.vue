<template>
  <div class="CriptoCoinsList">
    <body>
      <div class="CriptoInfoBox">
        <img src="" alt="">
        <h3>Coin: </h3><p><strong>{{  }}</strong></p>
        <h3>Price: </h3><p><strong>{{  }}</strong></p>

        <div class="">
          <button type="button" id="btnValidatePurchase">Buy...</button>
          <button type="button" id="btnValidateSale">Sell</button>
        </div>
      </div>
      <div v-for="Coin in Coins" :key="Coin.id" class="Coin-Circle" @mouseover="showActualImageOver(Coin.image)" :style="{backgroundImage: Coins.image}"></div>
    </body>
  </div>
</template>

<script>
  export default{
    name: 'CriptoCoinsListComponent',
    data(){
      return{
        Coins: [
          {
            id: 1,
            title: "Bitecoin",
            price: 0,
            image: '../assets/BitcoinGif.gif',
            url: 'https://criptoya.com/api/satoshitango/btc/ars',
            consultaPrecio: 0
          },
          {
            id: 2,
            title: "Dogecoin",
            price: 0,
            image: '../assets/DogecoinGif.gif',
            url: 'https://criptoya.com/api/satoshitango/doge/ars',
            consultaPrecio: 1
          },
          {
            id: 3,
            title: 'Ethereum',
            price: 0,
            image: '../assets/EthereumGif.gif',
            url: 'https://criptoya.com/api/satoshitango/eth/ars',
            consultaPrecio: 2
          },
          {
            id: 4,
            title: "Litecoin",
            price: 0,
            image: '../assets/LitecoinGif.gif',
            url: 'https://criptoya.com/api/satoshitango/ltc/ars',
            consultaPrecio: 3
          },
          {
            id: 5,
            title: "Solana",
            price: 0,
            image: '../assets/SolanaCoinGif.webp',
            url: 'https://criptoya.com/api/satoshitango/sol/ars',
            consultaPrecio: 4
          },
          {
            id: 6,
            title: "USDC",
            price: 0,
            image: "../assets/USDCgif.gif",
            url: 'https://criptoya.com/api/satoshitango/usdc/ars',
            consultaPrecio: 5
          }
        ]
      }
    },
    methods: {
      showActualImageOver(CoinImage){
        this.image = CoinImage;
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