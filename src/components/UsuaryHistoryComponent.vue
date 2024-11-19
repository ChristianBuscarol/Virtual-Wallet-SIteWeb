<template>
  <body>
    <div class="UsuaryHistoryTransactions">
      <!--En el 'Div' de acá abajo se renderizará el historial de compras de criptomonedas del usuario mediante el lado izquierdo de la pantalla.-->
      <div class="ShoppingHistoryBox">
        <h3 id="PurchaseHistoryTittle">Table of purchased CriptoCoins...</h3>
        <div v-if="this.userPurchasesHistory.length == 0" class="NoTransactionInfo">
          <h3>There are no transaction to show here...</h3>
          <h3>or...</h3>
          <h3>the query to the Api is taking is taking a long time.</h3>
        </div>
        <div v-else class="UnitPurchaseTransaction" v-for="(UserP, index) in userPurchasesHistory" :key="index" @mouseover="captureTransactionInfoIndex(index)">
          <h4>CriptoCoin purchased: {{ UserP.crypto_code }}</h4>
          <h4>Money spent on the transaction: {{ UserP.money }}</h4>
          <h4>Amount of CriptoCoin purchased: {{ UserP.crypto_amount }}</h4>
          <h4>DateTime of purchase: {{ UserP.datetime }}</h4>

          <button type="button" @click="transactionInfoObjectConstructor(this.transactionObjectLevel = 1)" id="btnEditPurchasedCoin">Edit Transaction</button>
          <button type="button" @click="transactionInfoObjectConstructor(this.transactionObjectLevel = 2)" id="btnDeletePurchasedCoin">Delete Transaction</button>
        </div>
      </div>

      <!--En el 'Div' de acá abajo se renderizará el historial de ventas de criptomonedas del usuario mediante el lado derecho de la pantalla.-->
      <div class="SalesHistoryBox">
        <h3 id="SaleHistoryTittle">Table of CriptoCoins sold...</h3>
        <div v-if="this.userPurchasesHistory.length == 0" class="NoTransactionInfo">
          <h3>There are no transaction to show here...</h3>
          <h3>or...</h3>
          <h3>the query to the Api is taking is taking a long time.</h3>
        </div>
        <div class="UnitSaleTransaction" v-for="(UserS, index) in userSalesHistory" :key="index" @mouseover="captureTransactionInfoIndex(index)">
          <h4>CriptoCoin sold: {{ UserS.crypto_code }}</h4>
          <h4>Money earned on the transaction: {{ UserS.money }}</h4>
          <h4>Amount of CriptoCoin sold: {{ UserS.crypto_amount }}</h4>
          <h4>DateTime of sale: {{ UserS.datetime }}</h4>

          <button type="button" @click="transactionInfoObjectConstructor(this.transactionObjectLevel = 3)" id="btnEditCoinSold">Edit Transaction</button>
          <button type="button" @click="transactionInfoObjectConstructor(this.transactionObjectLevel = 4)" id="btnDeleteCoinSold">Delete Transaction</button>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  export default{
    name: 'UsuaryHistoryComponent',
    props: {
      receivedUserHistoryData: {
        type: Object,
        default: null
      }
    },
    data(){
      return{
        userTransactionHistory: [],
        userPurchasesHistory: [],
        userSalesHistory: [],
        transactionInfoIndex: 0,
        transactionObjectLevel: 0,
        transactionInfo: {
          transactionInfoLevel: 0,
          id: '',
          action: '',
          crypto_code: '',
          crypto_amount: 0,
          cryptoAmountAvailable: 0,
          money: 0,
          transactionMoney: 0,
          datetime: 0,
          unitCoinAmount: {}
        },
        unitCoinAmount: {
          bitcoinAmount: 0,
          dogecoinAmount: 0,
          ethereumAmount: 0,
          litecoinAmount: 0,
          solanaAmount: 0,
          usdcAmount: 0
        }
      }
    },
    methods: {
      userTransactionHistoryReceived(newVal){
        for(let i = 0; i < newVal.length; i++){
          if(isNaN(newVal[i].money) != true){
            this.userTransactionHistory.push(newVal[i]);
          }
        }
        
        this.changeCoinTittleToUpperCase()
        this.separateTransactionByType();
      },
      changeCoinTittleToUpperCase(){
        for(let i = 0; i < this.userTransactionHistory.length; i++){
          let wololoName = this.userTransactionHistory[i].crypto_code;
          this.userTransactionHistory[i].crypto_code = wololoName.toUpperCase();
        }
      },
      separateTransactionByType(){
        for(let i = 0; i < this.userTransactionHistory.length; i++){
          if(this.userTransactionHistory[i].action == 'purchase'){
            this.userPurchasesHistory.push(this.userTransactionHistory[i]);
          }
          else if(this.userTransactionHistory[i].action == 'sale'){
            this.userSalesHistory.push(this.userTransactionHistory[i]);
          }
        }

        this.prepareUserInfoForTransactionMod();
      },
      prepareUserInfoForTransactionMod(){
        this.sumOfCoins();
        this.restOfCoins();
        this.sumOfUserMoney();
      },
      sumOfCoins(){
        for(let i = 0; i < this.userPurchasesHistory.length; i++){
          if(this.userPurchasesHistory[i].crypto_code == 'BITCOIN' || this.userPurchasesHistory[i].crypto_code == 'Bitcoin' || this.userPurchasesHistory[i].crypto_code == 'bitcoin'){
            this.unitCoinAmount.bitcoinAmount += parseFloat(this.userPurchasesHistory[i].crypto_amount);
          }
          else if (this.userPurchasesHistory[i].crypto_code == 'DOGECOIN' || this.userPurchasesHistory[i].crypto_code == 'Dogecoin' || this.userPurchasesHistory[i].crypto_code == 'dogecoin'){
            this.unitCoinAmount.dogecoinAmount += parseFloat(this.userPurchasesHistory[i].crypto_amount);
          }
          else if (this.userPurchasesHistory[i].crypto_code == 'ETHEREUM' || this.userPurchasesHistory[i].crypto_code == 'Ethereum' || this.userPurchasesHistory[i].crypto_code == 'ethereum'){
            this.unitCoinAmount.ethereumAmount += parseFloat(this.userPurchasesHistory[i].crypto_amount);
          }
          else if (this.userPurchasesHistory[i].crypto_code == 'LITECOIN' || this.userPurchasesHistory[i].crypto_code == 'Litecoin' || this.userPurchasesHistory[i].crypto_code == 'litecoin'){
            this.unitCoinAmount.litecoinAmount += parseFloat(this.userPurchasesHistory[i].crypto_amount);
          }
          else if (this.userPurchasesHistory[i].crypto_code == 'SOLANA' || this.userPurchasesHistory[i].crypto_code == 'Solana' || this.userPurchasesHistory[i].crypto_code == 'solana'){
            this.unitCoinAmount.solanaAmount += parseFloat(this.userPurchasesHistory[i].crypto_amount);
          }
          else if (this.userPurchasesHistory[i].crypto_code == 'USDC' || this.userPurchasesHistory[i].crypto_code == 'usdc'){
            this.unitCoinAmount.usdcAmount += parseFloat(this.userPurchasesHistory[i].crypto_amount);
          }
        }
      },
      restOfCoins(){
        for(let i = 0; i < this.userSalesHistory.length; i++){
          if(this.userSalesHistory[i].crypto_code == 'BITCOIN' || this.userSalesHistory[i].crypto_code == 'Bitcoin' || this.userSalesHistory[i].crypto_code == 'bitcoin'){
            this.unitCoinAmount.bitcoinAmount -= parseFloat(this.userSalesHistory[i].crypto_amount);
          }
          else if (this.userSalesHistory[i].crypto_code == 'DOGECOIN' || this.userSalesHistory[i].crypto_code == 'Dogecoin' || this.userSalesHistory[i].crypto_code == 'dogecoin'){
            this.unitCoinAmount.dogecoinAmount -= parseFloat(this.userSalesHistory[i].crypto_amount);
          }
          else if (this.userSalesHistory[i].crypto_code == 'ETHEREUM' || this.userSalesHistory[i].crypto_code == 'Ethereum' || this.userSalesHistory[i].crypto_code == 'ethereum'){
            this.unitCoinAmount.ethereumAmount -= parseFloat(this.userSalesHistory[i].crypto_amount);
          }
          else if (this.userSalesHistory[i].crypto_code == 'LITECOIN' || this.userSalesHistory[i].crypto_code == 'Litecoin' || this.userSalesHistory[i].crypto_code == 'litecoin'){
            this.unitCoinAmount.litecoinAmount -= parseFloat(this.userSalesHistory[i].crypto_amount);
          }
          else if (this.userSalesHistory[i].crypto_code == 'SOLANA' || this.userSalesHistory[i].crypto_code == 'Solana' || this.userSalesHistory[i].crypto_code == 'solana'){
            this.unitCoinAmount.solanaAmount -= parseFloat(this.userSalesHistory[i].crypto_amount);
          }
          else if (this.userSalesHistory[i].crypto_code == 'USDC' || this.userSalesHistory[i].crypto_code == 'usdc'){
            this.unitCoinAmount.usdcAmount -= parseFloat(this.userSalesHistory[i].crypto_amount);
          }
        }
      },
      sumOfUserMoney(){
        for(let i = 0; i < this.userSalesHistory.length; i++){
          this.transactionInfo.money += parseFloat(this.userSalesHistory[i].money);
        }

        this.restOfUserMoney();
      },
      restOfUserMoney(){
        for(let i = 0; i < this.userPurchasesHistory.length; i++){
          this.transactionInfo.money -= parseFloat(this.userPurchasesHistory[i].money);
        }
      },
      captureTransactionInfoIndex(index){
        this.transactionInfoIndex = index;
      },
      transactionInfoObjectConstructor(){
        if(this.transactionObjectLevel == 1){
          this.searchOfPurchaseTransactionSelected();
          this.moneyAssigmentFromPurchaseTransactionSelected();
          this.transactionInfo.transactionInfoLevel = 1;
        }
        else if(this.transactionObjectLevel == 2){
          this.searchOfPurchaseTransactionSelected();
          this.transactionInfo.transactionInfoLevel = 2;
        }
        else if(this.transactionObjectLevel == 3){
          this.searchOfSaleTransactionSelected();
          this.moneyAssigmentFromSaleTransactionSelected();
          this.transactionInfo.transactionInfoLevel = 3;
        }
        else if(this.transactionObjectLevel == 4){
          this.searchOfSaleTransactionSelected();
          this.moneyAssigmentFromSaleTransactionSelected();
          this.transactionInfo.transactionInfoLevel = 4;
        }
        this.transactionInfo.unitCoinAmount = this.unitCoinAmount;

        console.log('La lista de las porciones de criptomonedas disponibles del usuario que se envía al Modal de modificación y/o eliminación es la siguiente: ');
        console.log(this.transactionInfo.unitCoinAmount);
        this.transactionInfoCoinAmountAssignment();
        this.openTransactionModificationModal();
      },
      searchOfPurchaseTransactionSelected(){
        this.transactionInfo.id = this.userPurchasesHistory[this.transactionInfoIndex]._id;
        this.transactionInfo.action = this.userPurchasesHistory[this.transactionInfoIndex].action;
        this.transactionInfo.crypto_code = this.userPurchasesHistory[this.transactionInfoIndex].crypto_code;
        this.transactionInfo.crypto_amount += parseFloat(this.userPurchasesHistory[this.transactionInfoIndex].crypto_amount);
        this.transactionInfo.datetime = this.userPurchasesHistory[this.transactionInfoIndex].datetime;
      },
      searchOfSaleTransactionSelected(){
        this.transactionInfo.id = this.userSalesHistory[this.transactionInfoIndex]._id;
        this.transactionInfo.action = this.userSalesHistory[this.transactionInfoIndex].action;
        this.transactionInfo.crypto_code = this.userSalesHistory[this.transactionInfoIndex].crypto_code;
        this.transactionInfo.crypto_amount += parseFloat(this.userSalesHistory[this.transactionInfoIndex].crypto_amount);
        this.transactionInfo.datetime = this.userSalesHistory[this.transactionInfoIndex].datetime;
      },
      transactionInfoCoinAmountAssignment(){
        if(this.transactionInfo.crypto_code == 'BITCOIN'){
          this.transactionInfo.cryptoAmountAvailable += parseFloat(this.unitCoinAmount.bitcoinAmount);
        }
        else if(this.transactionInfo.crypto_code == 'DOGECOIN'){
          this.transactionInfo.cryptoAmountAvailable += parseFloat(this.unitCoinAmount.dogecoinAmount);
        }
        else if(this.transactionInfo.crypto_code == 'ETHEREUM'){
          this.transactionInfo.cryptoAmountAvailable += parseFloat(this.unitCoinAmount.ethereumAmount);
        }
        else if(this.transactionInfo.crypto_code == 'LITECOIN'){
          this.transactionInfo.cryptoAmountAvailable += parseFloat(this.unitCoinAmount.litecoinAmount);
        }
        else if(this.transactionInfo.crypto_code == 'SOLANA'){
          this.transactionInfo.cryptoAmountAvailable += parseFloat(this.unitCoinAmount.solanaAmount);
        }
        else if(this.transactionInfo.crypto_code == 'USDC'){
          this.transactionInfo.cryptoAmountAvailable += parseFloat(this.unitCoinAmount.usdcAmount);
        }
      },
      moneyAssigmentFromPurchaseTransactionSelected(){
        this.transactionInfo.transactionMoney += parseFloat(this.userPurchasesHistory[this.transactionInfoIndex].money);
      },
      moneyAssigmentFromSaleTransactionSelected(){
        this.transactionInfo.transactionMoney += parseFloat(this.userSalesHistory[this.transactionInfoIndex].money);
      },
      openTransactionModificationModal(){
        console.log('La cantidad de compras realizadas por el usuario es: ');
        console.log(this.userPurchasesHistory.length);
        console.log('Y la cantidad de ventas realizadas por el usuario es:');
        console.log(this.userSalesHistory.length);
        
        this.$emit('open-transaction-modification-modal', this.transactionInfo)
      }
    },
    watch: {
      receivedUserHistoryData: {
        handler(newVal) {
          if(newVal && Object.keys(newVal).length > 0){
            this.userTransactionHistoryReceived(newVal);
          }
        },
        inmediate: true
      }
    }
  }
</script>

<style>
  .UsuaryHistoryTransactions{
    display: grid;
    grid-template-columns: auto auto;
    margin: 0 auto;
    justify-content: space-around;
  }

  .ShoppingHistoryBox{
    grid-column: 1/2;
    text-align: center;
  }

  .SalesHistoryBox{
    grid-column: 2/2;
    text-align: center;
  }

  #PurchaseHistoryTittle{
    text-decoration: underline;
  }

  #SaleHistoryTittle{
    text-decoration: underline;
  }

  .NoTransactionInfo{
    border: 1px solid black;
    font-weight: bold;
    background-color: lightsalmon;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del div */
    border-radius: 10%;
    padding: 10px;
    margin: 5px;
  }

  .UnitSaleTransaction{
    border: 1px solid red;
    color: red;
    border-radius: 10%;
    font-weight: bold; 
    padding: 10px;
    margin: 10px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del div */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .UnitSaleTransaction:hover{
    background-color: lightsalmon;
    border: 1px solid black;
    color: black;
    box-shadow: 4px 6px 8px rgb(221, 29, 29); /* Sombra del div */
  }

  .UnitPurchaseTransaction{
    border: 1px solid blue;
    color: blue;
    border-radius: 10%;
    font-weight: bold; 
    padding: 10px;
    margin: 10px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del div */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .UnitPurchaseTransaction:hover{
    background-color: lightblue;
    border: 1px solid black;
    color: black;
    box-shadow: 4px 6px 8px rgb(81, 84, 240); /* Sombra del div */
  }

  #btnEditPurchasedCoin, #btnDeletePurchasedCoin, #btnEditCoinSold, #btnDeleteCoinSold{
    width: 90px;
    height: 40px;
    margin: 5px;
    font-weight: bold; 
    cursor: pointer;
    border-radius: 10px;  /* Bordes redondeados */
    border: 1px solid black;
    background-color: white;
    color: black;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del botón */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  #btnEditPurchasedCoin:hover, #btnDeletePurchasedCoin:hover{
    border: 1px solid black;
    background-color: rgb(59, 245, 235);
    color: black;
    box-shadow: 2px 6px 8px rgb(255, 255, 255); /* Sombra del botón */
  }

  #btnEditCoinSold:hover, #btnDeleteCoinSold:hover{
    border: 1px solid black;
    background-color: rgba(239, 241, 97, 0.774);
    color: black;
    box-shadow: 2px 6px 8px rgb(255, 255, 255); /* Sombra del botón */
  }
</style>