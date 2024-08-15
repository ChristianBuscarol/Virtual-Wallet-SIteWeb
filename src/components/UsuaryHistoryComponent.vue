<template>
  <body>
    <div class="UsuaryHistoryTransactions">
      <!--En el 'Div' de acá abajo se renderizará el historial de compras de criptomonedas del usuario mediante el lado izquierdo de la pantalla.-->
      <div class="ShoppingHistoryBox">
        <h3>Table of purchased CriptoCoins...</h3>
        <div v-for="(PurchaseT, index) in usuaryPurchaseTransactions" :key="index">
          <h4>CriptoCoin purchased: {{ PurchaseT.criptoCoin }}</h4>
          <h4>Money spent on the transaction: {{ PurchaseT.spentMoney }}</h4>
          <h4>Amount of CriptoCoin sold: {{ PurchaseT.criptoCoinAmount }}</h4>
          <h4>DateTime of purchase: {{ PurchaseT.dateTime }}</h4>
        </div>
        <!--Sector de botones para la configuración de las monedas compradas aquí abajo.-->
        <div class="PurchasedCoinsConfigButtons">
          <button type="button" id="btnEditPurchasedCoin">Edit Transaction</button>
          <button type="button" id="btnDeletePurchasedCoin">Delete Transaction</button>
        </div>
      </div>

      <!--En el 'Div' de acá abajo se renderizará el historial de ventas de criptomonedas del usuario mediante el lado derecho de la pantalla.-->
      <div class="SalesHistoryBox">
        <h3>Table of CriptoCoins sold...</h3>
        <div v-for="(SalesT, index) in usuarySalesTransactions" :key="index">
          <h4>CriptoCoin sold: {{ SalesT.criptoCoin }}</h4>
          <h4>Money earned on the transaction: {{ PurchaseT.spentMoney }}</h4>
          <h4>Amount of CriptoCoin purchased: {{ PurchaseT.criptoCoinAmount }}</h4>
          <h4>DateTime of sale: {{ PurchaseT.dateTime }}</h4>
        </div>
        <!--Sector de botones para la configuración de las monedas vendidas aquí abajo.-->
        <div class="CoinsSoldConfigButtons">
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
    data(){
      return{
        usuaryPurchaseTransactions: [],
        usuarySalesTransactions: []
      }
    },
    methods: {

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
  }

  .SalesHistoryBox{
    grid-column: 2/2;
  }
</style>