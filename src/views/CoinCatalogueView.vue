<template>
  <div class="catalogue">
    <header>
      <div class="CoinCatalogue">
        <h1>This is an catalogue page</h1>
        <UserProfileComponent/>
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
  import UserProfileComponent from '@/components/UserProfileComponent.vue';

  export default{
    name: 'CoinCatalogueView',
    components: {
      CriptoCoinsListComponent,
      UserProfileComponent
    }
  }
</script>

<style scoped>

</style>