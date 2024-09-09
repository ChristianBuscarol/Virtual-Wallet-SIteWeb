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
            <button type="button" @click="openTransactionModal(this.functionParameterEvent = 1)" id="btnValidatePurchase">Buy...</button><br><br>
            <button type="button" @click="openTransactionModal(this.functionParameterEvent = 2)" id="btnValidateSale">Sell...</button><br><br>
            <button type="button" @click="btnHistoryEntry()" id="btnGoToTransactionHistory">Trasaction History...</button>
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
        functionParameterEvent: 0,
        Coins: [
          {
            id: 1,
            title: "Bitcoin",
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
        ],
        infoSelectedCoin: {
          userName: '',
          userId: '',
          userMoneyAvailable: 0,
          userCoinPartAvailable: 0,
          coinTittle: '',
          coinPrice: 0,
          coinImage: '',
          typeTransaction: ''
        },
        userCurrentAccountinfo: {},
        userCoinListAvailables: [],
        coinAmountSelected: 0
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
      },
      gettingUserCurrentAccountinfo(){
        this.userCurrentAccountinfo = JSON.parse(localStorage.getItem('userData'));
        this.takingAmountsOfCoinAvailableList();
      },
      capturingInfoSelectedCoin(){
        // En esta parte de aquí abajo se prepara los datos del usuario que se utilizarán para la transacción que el mismo deseará realizar.
        this.infoSelectedCoin.userName = this.userCurrentAccountinfo.userNameRegister;
        this.infoSelectedCoin.userId = this.userCurrentAccountinfo.userIdRegister;
        this.infoSelectedCoin.userMoneyAvailable = this.userCurrentAccountinfo.userMoneyRegister;
        //this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables[this.selectedCoin];
        this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables[this.wololoCoinName()];

        // Y en esta parte de aquí abajo, se prepara la información de la moneda seleccionada para a transacción que el usuario realizará.
        this.infoSelectedCoin.coinTittle = this.Coins[this.selectedCoin].title;
        this.infoSelectedCoin.coinPrice = this.Coins[this.selectedCoin].price;
        this.infoSelectedCoin.coinImage = this.Coins[this.selectedCoin].image;
        if(this.functionParameterEvent == 1){
          this.infoSelectedCoin.typeTransaction = 'purchase'
        } else if (this.functionParameterEvent == 2){
          this.infoSelectedCoin.typeTransaction = 'sell'
        }

        console.log(this.infoSelectedCoin);
        console.log(this.userCoinListAvailables);
      },
      wololoCoinName(){
        let wololoName = this.Coins[this.selectedCoin].title;

        return wololoName.toLowerCase() + 'Amount';
      },
      takingAmountsOfCoinAvailableList(){
        this.userCoinListAvailables = this.userCurrentAccountinfo.coinAvailableList;
      },
      openTransactionModal(functionParameterEvent){
        this.capturingInfoSelectedCoin(functionParameterEvent);
        
        this.$emit('open-transaction-modal', this.infoSelectedCoin)
      },
      keepingUserInfoActive(){
        this.$emit('keeping-user-info-active');
      },
      btnHistoryEntry(){
        window.location.href = '/UsuaryHistoryView';
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

      setInterval(() => {this.obtainPrice();}, 10000);
    },
    mounted(){
      this.keepingUserInfoActive();
      this.gettingUserCurrentAccountinfo();
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