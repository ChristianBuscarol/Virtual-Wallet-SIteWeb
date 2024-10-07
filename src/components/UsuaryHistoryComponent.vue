<template>
  <body>
    <div class="UsuaryHistoryTransactions">
      <!--En el 'Div' de acá abajo se renderizará el historial de compras de criptomonedas del usuario mediante el lado izquierdo de la pantalla.-->
      <div class="ShoppingHistoryBox">
        <h3>Table of purchased CriptoCoins...</h3>
        <div class="UnitPurchaseTransaction" v-for="(UserP, index) in userPurchasesHistory" :key="index">
          <h4>CriptoCoin purchased: {{ UserP.crypto_code }}</h4>
          <h4>Money spent on the transaction: {{ UserP.money }}</h4>
          <h4>Amount of CriptoCoin purchased: {{ UserP.crypto_amount }}</h4>
          <h4>DateTime of purchase: {{ UserP.datetime }}</h4>

          <button type="button" id="btnEditPurchasedCoin">Edit Transaction</button>
          <button type="button" id="btnDeletePurchasedCoin">Delete Transaction</button>
        </div>
      </div>

      <!--En el 'Div' de acá abajo se renderizará el historial de ventas de criptomonedas del usuario mediante el lado derecho de la pantalla.-->
      <div class="SalesHistoryBox">
        <h3>Table of CriptoCoins sold...</h3>
        <div class="UnitSaleTransaction" v-for="(UserS, index) in userSalesHistory" :key="index">
          <h4>CriptoCoin sold: {{ UserS.crypto_code }}</h4>
          <h4>Money earned on the transaction: {{ UserS.money }}</h4>
          <h4>Amount of CriptoCoin sold: {{ UserS.crypto_amount }}</h4>
          <h4>DateTime of sale: {{ UserS.datetime }}</h4>

          <button type="button" id="btnEditCoinSold">Edit Transaction</button>
          <button type="button" id="btnDeleteCoinSold">Delete Transaction</button>
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
        userSalesHistory: []
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
        console.log('Y la lista de transacciones ya preparada en el componente del historial es el siguiente: ');
        console.log(this.userTransactionHistory);
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
          else if(this.userTransactionHistory[i].action == 'sell'){
            this.userSalesHistory.push(this.userTransactionHistory[i]);
          }
        }
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

  .UnitSaleTransaction{
    background-color: lightgray;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
  }

  .UnitPurchaseTransaction{
    background-color: lightgray;
    border: 1px solid black;
    padding: 10px;
    margin: 10px;
  }
</style>