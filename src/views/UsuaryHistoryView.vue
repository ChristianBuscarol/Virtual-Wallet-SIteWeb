<template>
  <header class="HistoryHeaderBox">
    <UserProfileComponent/>
    <h3>Records table of the usuary: </h3>
  </header>
  <body>
    <UsuaryHistoryComponent/>
  </body>
  <footer class="HistoryFooterBox">

  </footer>
</template>

<script>
  import UsuaryHistoryComponent from '@/components/UsuaryHistoryComponent.vue';
  import UserProfileComponent from '@/components/UserProfileComponent.vue';

  export default {
    name: 'UsuaryHistoryView',
    components: {
      UsuaryHistoryComponent,
      UserProfileComponent
    }
  }
</script>

<style scoped>

</style>