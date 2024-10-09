<template>

</template>

<script>
  export default{
    name: '',
    props: {
      receivedTransactionInfo: {
        type: Object,
        default: null
      }
    },
    data(){
      return{

      }
    },
    methods: {
      unitTransactionInfoReceived(newVal){
        console.log('El newVal recibido en el componente del Modal para la modificación o eliminación de la transacción seleccionada es el siguiente: ');
        console.log(newVal);
      }
    },
    watch: {
      receivedTransactionInfo: {
        handler(newVal) {
          if(newVal && Object.keys(newVal).length > 0){
            this.unitTransactionInfoReceived(newVal);
          }
        },
        inmediate: true
      }
    }
  }
</script>

<style scoped>

</style>