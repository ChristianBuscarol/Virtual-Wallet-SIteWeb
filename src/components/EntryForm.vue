<template>
  <div class="EntryFormCss">
    <label for="ingresoNombre">Nombre: </label>
    <input type="text" v-model="userName" id="registroNombre" name="ingresoNombre" placeholder="Ingresar Nombre aquí..."><br><br>
    <label for="ingresoID">'ID': </label>
    <input type="text" v-model="userId" id="registroId" name="ingresoID" placeholder="Ingresar ID aquí..."><br><br>
    <button type="button" @click="btnDateValidation()" :disabled="entryAttemptsFalied()" id="btnValidarIngreso">Validar Datos...</button>
    <div class="Casilla-Loggin">
      <p><strong>Estado de entrada: '{{ stateMessage }}'
        <br>Elementos del ingreso del 'ID': Cant. de carácteres '°{{idLetters}}' & Cant. de números '°{{ idNumbers }}'
      </strong></p><br>
      <p>Intentos realizados: °{{ attemptIncremented }} --- Cantidad máxima de intentos: °3</p>
      <p v-show="vShowMessage">Se ha realizado todos los intentos disponibles para poder continuar por el sitio, recargue la página para volver a intentar...</p>
      <button type="button" @click="btnEntryValidation()" :disabled="entryAttemptsFalied()" id="btnValidarIngreso">Puede continuar por aquí...</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntryForm',
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
      userObectCheck: null,
      userData : {
        userNameRegister: "",
        userIdRegister: ""
      }
    }
  },
  methods: {
    nameValidation() {
      debugger
      for (let i = 0; i < this.userName.length; i++){
        let charName = this.userName[i]

        if(!isNaN(Number(charName))){this.nameNumbers++}
        else if(/[a-zA-Z]/.test(charName)){this.nameLetters++}
      }
    },
    IDValidation() {
      debugger
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
        this.stateMessage= "Uno o todos los campos de la entrada de datos a quedado vacío, por favor, revise e ingrese cada dato que se solicite...",
        this.attemptIncrement()
      }
      else{
        if (this.nameNumbers > 0 || this.nameLetters < 3){
          this.stateMessage= "El 'Nombre' ingresado es incorrecto, el dato requiere de un mínimo de 3 letras y no se permite números en el...";
          this.attemptIncrement()
        }
        else if (this.idLetters < 5 || this.idNumbers == 0){
          this.stateMessage= "El 'ID' está flojo de papeles, se requiere de un mínimo de 3 letras y al menos 1 número, intente de nuevo...";
          this.attemptIncrement()
        }
        else if (this.nameNumbers >= 1 || this.nameLetters <= 2 && this.idLetters <= 4 || this.idNumbers < 1){
          this.stateMessage= "Uno o ambos datos ingresados ha sido de manera icorrecta, intente de nuevo..."
          this.attemptIncrement()
        }
        else{
          this.stateMessage= "Felicitaciones!!!... Supongo...Cada dato solicitado ha sido ingresado correctamente, así que sea bienvenido/a a continuar por el sitio web y también lo invito a no asustarse por el precio de las Criptos...",
          this.localStorageSettingItems();
          this.userId = "",
          this.userName = ""
        }
      }
    },
    userObjectConstructor(){
      this.userData.userNameRegister = this.userName;
      this.userData.userIdRegister = this.userId;
    },
    localStorageSettingItems(){
      this.userObjectConstructor();
      
      localStorage.setItem('userData', JSON.stringify(this.userData))

      console.log('Nombre del usuario en Local Storage: ' + this.userData.userNameRegister)
      console.log('ID del usuario en Local Storage: ' + this.userData.userIdRegister)
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
    siteContinuation(){
      this.entryAttemptsFalied();

      if (this.dateValidation == false){
        return true;
      }
      else{
        return false;
      }
    },
    attemptIncremented(){
      return this.entryAttempts;
    }
  }
}
</script>

<style scoped>

</style>
