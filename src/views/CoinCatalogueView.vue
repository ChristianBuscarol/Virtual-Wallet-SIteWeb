<template>
  <div class="catalogue">
    <header>
      <div class="CoinCatalogue">
        <h1>This is an catalogue page</h1>
      </div>
    </header>
    <div class="CriptoCoinsListComponent">
      <CriptoCoinsListComponent/>
    </div>
    <footer>
      <div>

      </div>
    </footer>
  </div>
</template>

<script>
  import CriptoCoinsListComponent from '@/components/CriptoCoinsListComponent.vue';

  export default{
    name: 'CoinCatalogueView',
    components: {
      CriptoCoinsListComponent
    }
  }
</script>

<style scoped>

</style>