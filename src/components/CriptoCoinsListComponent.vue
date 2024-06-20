<template>
  <div class="CriptoCoinsList">
    <body>
      <img>
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
            consultaPrecio: 0,
            url: 'https://criptoya.com/api/satoshitango/btc/ars',
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
    }
  }
</script>

<style scoped>

</style>