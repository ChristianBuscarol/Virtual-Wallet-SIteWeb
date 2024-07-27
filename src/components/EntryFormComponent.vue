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
        <p><strong>Nombre: Cant. de carácteres '°{{ this.idLetters}}' & Cant. de números '°{{ this.idNumbers }}'</strong></p><br><br>
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
        userData : {
          userNameRegister: "",
          userIdRegister: ""
        },
        localStorageComparison: 0
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
            this.userRegister();
            this.userId = "",
            this.userName = "",
            this.dateValidation = false
          }
        }
      },
      localStorageGettingItems(){
        // Se pregunta a Local Storage si tiene datos referidos al usuario (Nombre y ID), si es afirmativo llenará el objeto 'userData' con los datos obtenidos.
        if(JSON.parse(localStorage.getItem('userData')) != null){
          this.userData.userNameRegister = JSON.parse(localStorage.getItem('userData.userNameRegister'));
          this.userData.userIdRegister = JSON.parse(localStorage.getItem('userData.userIdRegister'));
        }
      },
      userObjectConstructor(){
        // Se llenará el objeto 'userData' con el Nombre y ID recién ingresados por el usuario una vez todo esté en orden para continuar.
        this.userData.userNameRegister = this.userName;
        this.userData.userIdRegister = this.userId;
      },
      localStorageSettingItems(){
        //Se llamará al método que está justo arriba para preparar e igualar el objeto 'userData' con los datos ingresados por el usuario.
        this.userObjectConstructor();
        
        // Una vez listo nuestro 'userData' se empuja dicho objeto al Local Storage.
        localStorage.setItem('userData', JSON.stringify(this.userData))
      },
      userRegisterValidation(){
        // Se llama al método de consulta del Local Storage para su posterior evaluación en el mismo método.
        this.localStorageGettingItems()

        if(this.userData != null){
          if(this.userId != this.userData.userIdRegister){
            this.localStorageComparison = 1;
            this.localStorageSettingItems();
          }
          else if (this.userName != this.userData.userNameRegister){
            this.localStorageComparison = 2;
            this.localStorageSettingItems();
          }
        } else {
          this.localStorageComparison = 3;
          this.localStorageSettingItems();
        }
      },
      userRegister(){
        // Se emite el evento 'user-register' para que la vista Index lo escuche y realice las operaciones necesarias.
        this.$emit('user-register', this.userData);
      },
      attemptIncrement(){
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
    },
    async created(){
      let response = await ApiCallService.getTransactionInfo();
      console.log(response.data);
    },
    mounted(){
      this.localStorageGettingItems();
    }
  }
</script>

<style scoped>

</style>