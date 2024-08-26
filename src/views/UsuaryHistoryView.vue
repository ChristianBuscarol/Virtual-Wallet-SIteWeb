<template>
  <header class="HistoryHeaderBox">
    <h3>Records table of the usuary: </h3>
    <UserProfileComponent :receivedData="emitUserDataReceived"/>
  </header>
  <body>
    <UsuaryHistoryComponent @keeping-user-info-active="KeepingUserInfoActive"/>
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
    },
    data(){
      return{
        emitUserDataReceived: {}
      }
    },
    methods: {
      KeepingUserInfoActive(){
        this.emitUserDataReceived = JSON.parse(localStorage.getItem('userData'));
        console.log(this.emitUserDataReceived);
      }
    }
  }
</script>

<style scoped>

</style>