<template>
  <body>
    <div class="CriptoInfoBox">
      <!--Sector de muestra de información sobre la moneda seleccionada en la lista de miniaturas aquí abajo-->
      <div class="SelectedCoinBox">
        <div class="InfoSelectedCoinBox">
          <h3 id="textDecoration">Selected Coin: </h3><h3><strong>{{ showCoinTitleSelected }}</strong></h3>
          <h3 id="textDecoration">Image of the Coin:</h3>
          <img :src="showCoinImageSelected" alt="GifSelectedCoin" class="Coin-Circle">
          <h3 id="textDecoration">Price: </h3><p><strong>{{ this.Coins[selectedCoin].price }}</strong></p>
        </div>

        <!--Sector de botones para la compra y venta de monedas aquí abajo-->
        <div class="TransactionsButtonsBox">
          <button type="button" @click="openTransactionModal(this.functionParameterEvent = 1)" class="interactionButton" id="btnValidatePurchase">Buy</button><br><br>
          <button type="button" @click="openTransactionModal(this.functionParameterEvent = 2)" class="interactionButton" id="btnValidateSale">Sell</button><br><br>
          <button type="button" @click="btnHistoryEntry()" class="interactionButton" id="btnGoToTransactionHistory">Trasaction History</button>
        </div>
      </div>

      <!--Sector de la lista de imagenes en miniatura sobre las monedas disponibles aquí abajo-->
      <div class="ListDisplayBox">
        <div v-for="(Coin, index) in Coins" :key="Coin.id"  @mouseover="actualCoinSelected(index)" id="GifCoinListPart">
          <img :src="Coin.image" class="Coin-Circle" alt="A gif of the Coin list part">
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import axios from "axios";

  export default{
    name: 'CriptoCoinsListComponent',
    props: {
      receivedUserProfileData: {
        type: Object,
        default: null
      }
    },
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
      getUserAccountinfo(newVal){
        // En esta parte de aquí abajo se prepara los datos del usuario que se utilizarán para la transacción que el mismo deseará realizar.
        this.infoSelectedCoin.userName = newVal.userName;
        this.infoSelectedCoin.userId = newVal.userId;
        this.infoSelectedCoin.userMoneyAvailable = newVal.userWallet;
        this.userCoinListAvailables = newVal.unitCoinAmount;
        console.log('Lista de monedas disponibles para la transacción:');
        console.log(this.userCoinListAvailables);
      },
      capturingInfoSelectedCoin(){
        this.coinAmountLoading();
        // Y en esta parte de aquí abajo, se prepara la información de la moneda seleccionada para a transacción que el usuario realizará.
        this.infoSelectedCoin.coinTittle = this.Coins[this.selectedCoin].title;
        this.infoSelectedCoin.coinPrice = this.Coins[this.selectedCoin].price;
        this.infoSelectedCoin.coinImage = this.Coins[this.selectedCoin].image;
        if(this.functionParameterEvent == 1){
          this.infoSelectedCoin.typeTransaction = 'purchase'
        } else if (this.functionParameterEvent == 2){
          this.infoSelectedCoin.typeTransaction = 'sale'
        }
      },
      coinAmountLoading(){
        if(this.Coins[this.selectedCoin].title == 'Bitcoin'){
          this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables.bitcoinAmount;
        }
        else if(this.Coins[this.selectedCoin].title == 'Dogecoin'){
          this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables.dogecoinAmount;
        }
        else if(this.Coins[this.selectedCoin].title == 'Ethereum'){
          this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables.ethereumAmount;
        }
        else if(this.Coins[this.selectedCoin].title == 'Litecoin'){
          this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables.litecoinAmount;
        }
        else if(this.Coins[this.selectedCoin].title == 'Solana'){
          this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables.solanaAmount;
        }
        else if(this.Coins[this.selectedCoin].title == 'USDC'){
          this.infoSelectedCoin.userCoinPartAvailable = this.userCoinListAvailables.usdcAmount;
        }
      },
      openTransactionModal(functionParameterEvent){
        this.capturingInfoSelectedCoin(functionParameterEvent);
        console.log('El objeto con la información para el Modal es la siguiente: ');
        console.log(this.infoSelectedCoin);

        this.$emit('open-transaction-modal', this.infoSelectedCoin)
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
    watch: {
      receivedUserProfileData: {
        handler(newVal) {
          if(newVal && Object.keys(newVal).length > 0){
            this.getUserAccountinfo(newVal);
            console.log('el newVal que recibe el componente del catálogo de las monedas es el siguiente: ');
            console.log(newVal);
          }
        },
        inmediate: true
      }
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
    margin: 10px;
  }

  .CriptoInfoBox{
    display: grid;
    grid-template-columns: auto auto;
    margin: 0 auto;
    justify-content: space-around;
  }

  .SelectedCoinBox{
    display: flex;
    grid-column: 1/2;
    padding: 5px;
    margin-left: 100px;
  }

  .InfoSelectedCoinBox{
    text-align: center;
    border: 1px dashed black;
    padding: 10px;
  }

  .TransactionsButtonsBox{
    text-align: center;
    margin: 10px;
    margin-left: 20px;
  }

  #GifCoinListPart{
    border: 1px dotted black;
    padding: 5px;
    margin: 10px;
    margin-bottom: 10px;
  }

  .ListDisplayBox{
    grid-column: 2/2;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 400px;
    height: 250px;
    margin-right: 100px;
    margin-top: 30px;
  }

  .interactionButton{
    width: 80px;
    height: 40px;
    cursor: pointer;
    border-radius: 10px;  /* Bordes redondeados */
    border: 1px solid blue;
    background-color: white;
    color: blue;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; /* Fuente */
    text-transform: uppercase; /* Convierte el texto a mayúsculas */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del botón */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  #btnGoToTransactionHistory{
    width: 100px;
    height: 50px;
  }

  #btnGoToTransactionHistory:hover{
    border: 1px solid white;
    background-color: blue;
    color: white;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* Sombra más intensa al pasar el cursor */
  }

  #btnValidatePurchase:hover{
    border: 1px solid white;
    background-color: lawngreen;
    color: black;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* Sombra más intensa al pasar el cursor */
  }

  #btnValidateSale:hover{
    border: 1px solid white;
    background-color: rgb(151, 16, 106);
    color: white;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* Sombra más intensa al pasar el cursor */
  }

  #textDecoration{
    text-decoration: underline;
  }
</style>