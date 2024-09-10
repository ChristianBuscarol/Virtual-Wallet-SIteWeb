<template>
  <div class="EntryForm">
    <body>
      <!--Sector de ingreso de Datos (Nombre y ID) aquí abajo-->
      <div class="Loggin-Inputs-Box">
        <label for="ingresoNombre">Nombre: </label>
        <input type="text" v-model="userName" id="registroNombre" name="ingresoNombre" placeholder="Ingresar Nombre aquí..."><br><br>
        <label for="ingresoID">'ID': </label>
        <input type="text" v-model="userId" id="registroId" name="ingresoID" placeholder="Ingresar ID aquí..."><br><br>
      </div>
      
      <!--Sector de botones aquí abajo-->
      <div class="Loggin-Buttons-Box">
        <button type="button" @click="btnDateValidation()" v-show="vShowButton" :disabled="!dateValidation" id="btnValidarIngreso">Validar Datos...</button><br><br>
        <button type="button" @click="btnEntryValidation()" v-show="!vShowButton" :disabled="dateValidation" id="btnValidarIngreso">Puede continuar por aquí...</button>
      </div>

      <!--Sector de información para el usuario aquí abajo-->
      <div class="Info-Box">
        <h3>Estado de entrada: '{{ stateMessage }}'</h3><br><br>
        <p v-if="localStorageComparison == 2">Sea bienvenido usted, '{{ this.userData.userNameRegister }}', a la plataforma virtual de transacciones de criptomonedas...</p>
        <p v-else-if="localStorageComparison == 1">Bienvenido de nuevo '{{ this.userData.userNameRegister }}'!...</p><br><br>
        <p>Intentos realizados: °{{ this.entryAttempts }} --- Cantidad máxima de intentos: °3</p>
        <p v-show="vShowMessage">Se ha realizado todos los intentos disponibles para poder continuar por el sitio, recargue la página para volver a intentar...</p>
      </div>
    </body>
  </div>
</template>

<script>
  import ApiCallService from '@/services/ApiCallService';

  export default {
    name: 'EntryFormComponent',
    data() {
      return{
        stateMessage: "Se requiere del formulario completo para continuar por el sitio web...",
        idLetters: 0,
        idNumbers: 0,
        nameLetters: 0,
        nameNumbers: 0,
        userId: "",
        userName: "",
        dateValidation: true,
        entryAttempts: 0,
        localStorageComparison: 0,
        historyOfUserMovementsTransactions: [],
        historyOfPurchaseTransactions: [],
        historyOfSaleTransactions: [],
        userData: {
          userNameRegister: "",
          userIdRegister: "",
          userMoneyRegister: 0,
          moneySpent: 0,
          moneyEarned: 0,
          coinAvailableList: {
            bitcoinAmount: 0,
            dogecoinAmount: 0,
            ethereumAmount: 0,
            litecoinAmount: 0,
            solanaAmount: 0,
            usdcAmount: 0
          }
        }
      }
    },
    methods: {
      nameValidation() {
        for (let i = 0; i < this.userName.length; i++){
          let charName = this.userName[i]

          if(!isNaN(Number(charName))){this.nameNumbers++}
          else if(/[a-zA-Z]/.test(charName)){this.nameLetters++}
        }
      },
      IDValidation() {
        for (let i = 0; i < this.userId.length; i++){
          let charId = this.userId[i]

          if(!isNaN(Number(charId))){this.idNumbers++}
          else if(/[a-zA-Z]/.test(charId)){this.idLetters++}
        }
      },
      btnDateValidation(){
        this.nameValidation();
        this.IDValidation();
        
        if(this.userId == "" || this.userName == ""){
          this.attemptIncrement()
          this.stateMessage= "Uno o todos los campos de la entrada de datos a quedado vacío, por favor, revise e ingrese cada dato que se solicite..."
        }
        else{
          if (this.nameNumbers > 0 || this.nameLetters < 3){
            this.attemptIncrement()
            this.stateMessage= "El 'Nombre' ingresado es incorrecto, el dato requiere de un mínimo de 3 letras y no se permite números en el...";
          }
          else if (this.idLetters < 5 || this.idNumbers == 0){
            this.attemptIncrement()
            this.stateMessage= "El 'ID' está flojo de papeles, se requiere de un mínimo de 3 letras y al menos 1 número, intente de nuevo..."
          }
          else if (this.nameNumbers >= 1 || this.nameLetters <= 2 && this.idLetters <= 4 || this.idNumbers < 1){
            this.attemptIncrement()
            this.stateMessage= "Uno o ambos datos ingresados ha sido de manera icorrecta, intente de nuevo...";
          }
          else{
            this.stateMessage= "Felicitaciones!!!... Supongo...Cada dato solicitado ha sido ingresado correctamente, así que sea bienvenido/a a continuar por el sitio web y también lo invito a no asustarse por el precio de las Criptos...",
            this.attemptIncrement();
            this.userRegisterValidation();
            this.dateValidation = false,
            this.userId = "",
            this.userName = ""
          }
        }
      },
      userObjectConstructor(){
        // Se llenará el objeto 'userData' con el Nombre y ID recién ingresados por el usuario una vez todo esté en orden para continuar.
        this.userData.userNameRegister = this.userName;
        this.userData.userIdRegister = this.userId;
      },
      firstConnectionMoneyGift(){
        // Este va a ser un pequeño regalo para el usuario en caso de conectarse por °1 vez y no haber hecho transacciones aún.
        this.userData.userMoneyRegister = 100000;
      },
      userRegisterValidation(){
        // Una vez los datos ingresados sean correctos, se llamará a este método, lo cual desencadenará una suceción de varios métodos más que investigarán anteriores conexiones del usuario en cuestión.
        this.consultingApiForUserMovements();
        this.userObjectConstructor();
      },
      async consultingApiForUserMovements(){
        // Esta función llamará a la Api para pedir la información del usuario requerida según el Id que le pasamos como parámetro y después, llamamos a otra función para analizar la información que conseguimos y a la vez le pasamos como parámetro también.
        let response = await ApiCallService.getUserTransactionsInfo(this.userId);

        this.evaluatingUserFirstConnection(response);
      },
      evaluatingUserFirstConnection(response){
        if(response.data != null || response.data != undefined){
          this.fillingUserHistoryArraySpace(response);
          this.localStorageComparison = 1;
        } else{
          this.firstConnectionMoneyGift();
          this.localStorageComparison = 2;
        }
      },
      fillingUserHistoryArraySpace(response){
        for(let i = 0; i < response.data.length; i++){
          this.historyOfUserMovementsTransactions[i] = response.data[i];
        }

        this.separatingTransactionsByType();
      },
      separatingTransactionsByType(){
        for(let i = 0; i < this.historyOfUserMovementsTransactions.length; i++){
          if(this.historyOfUserMovementsTransactions[i].action == 'purchase'){
            this.historyOfPurchaseTransactions.push(this.historyOfUserMovementsTransactions[i]);
          }
          else if(this.historyOfUserMovementsTransactions[i].action == 'sell'){
            this.historyOfSaleTransactions.push(this.historyOfUserMovementsTransactions[i]);
          }
        }

        this.calculatingUserMoneyAvailable();
      },
      calculatingUserMoneyAvailable(){
        this.sumOfMoney();
        this.restOfMoney();
        this.totalUserAvailableMoney();
      },
      restOfMoney(){
        for(let i = 0; i < this.historyOfPurchaseTransactions.length; i++){
          this.userData.moneySpent = this.userData.moneySpent + parseFloat(this.historyOfPurchaseTransactions[i].money);
        }
      },
      sumOfMoney(){
        for(let i = 0; i < this.historyOfSaleTransactions.length; i++){
          this.userData.moneyEarned = this.userData.moneyEarned + parseFloat(this.historyOfSaleTransactions[i].money);
        }
      },
      totalUserAvailableMoney(){
        this.userData.userMoneyRegister = this.userData.moneyEarned - this.userData.moneySpent;

        this.calculatingUserCoinsAvailable();
      },
      calculatingUserCoinsAvailable(){
        this.sumOfCoins();
        this.restOfCoins();
        this.localStorageSettingItems();
      },
      sumOfCoins(){
        for(let i = 0; i < this.historyOfPurchaseTransactions.length; i++){
          if(this.historyOfPurchaseTransactions[i].crypto_code == 'bitcoin'){
            this.userData.coinAvailableList.bitcoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'dogecoin'){
            this.userData.coinAvailableList.dogecoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'ethereum'){
            this.userData.coinAvailableList.ethereumAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'litecoin'){
            this.userData.coinAvailableList.litecoinAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'solana'){
            this.userData.coinAvailableList.solanaAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
          else if (this.historyOfPurchaseTransactions[i].crypto_code == 'usdcd'){
            this.userData.coinAvailableList.usdcAmount += parseFloat(this.historyOfPurchaseTransactions[i].crypto_amount);
          }
        }
      },
      restOfCoins(){
        for(let i = 0; i < this.historyOfSaleTransactions.length; i++){
          if(this.historyOfSaleTransactions[i].crypto_code == 'bitcoin'){
            this.userData.coinAvailableList.bitcoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'dogecoin'){
            this.userData.coinAvailableList.dogecoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'ethereum'){
            this.userData.coinAvailableList.ethereumAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'litecoin'){
            this.userData.coinAvailableList.litecoinAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'solana'){
            this.userData.coinAvailableList.solanaAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
          else if (this.historyOfSaleTransactions[i].crypto_code == 'usdcd'){
            this.userData.coinAvailableList.usdcAmount -= parseFloat(this.historyOfSaleTransactions[i].crypto_amount);
          }
        }
      },
      localStorageSettingItems(){
        // Una vez listo nuestro 'userData' se empuja dicho objeto al Local Storage.
        localStorage.setItem('userData', JSON.stringify(this.userData))
        
        // Una vez los datos del usuario han sido consultados, confirmados y guardados en el Local Storage, se llama al método dedicado a emitir el evento para que ejecute dicha función.
        this.userRegister();
      },
      userRegister(){
        // Se emite el evento 'user-register' para que la vista Index lo escuche y realice las operaciones necesarias.
        this.$emit('user-register', this.userData);
      },
      attemptIncrement(){
        // Cada vez que el usuario haga click en el botón de validar datos se incrementará este contador, que servirá para limitar el uso del formulario de entrada.
        this.entryAttempts++;
      },
      entryAttemptsFalied(){
        if (this.entryAttempts == 3){
          this.dateValidation = true;
        }
        else{
          this.dateValidation = false;
        }
      },
      btnEntryValidation(){
        window.location.href = '/CoinCatalogueView';
      }
    },
    computed: {
      vShowMessage(){
        if (this.entryAttempts == 3){
          return true;
        }
        else{
          return false;
        }
      },
      vShowButton(){
        while(this.entryAttempts < 3 && this.dateValidation == true){
          return true;
        }
        return false;
      }
    }
  }
</script>

<style scoped>

</style>