<template>
  <body>
    <div class="EntryFormInteraction">
      <!--Sector de ingreso de Datos (Nombre y ID) aquí abajo-->
      <div class="LogginInputsBox">
        <label for="ingresoNombre"><strong>Nombre: </strong></label><br>
        <input type="text" v-model="userName" id="registroNombre" name="ingresoNombre" placeholder="Ingresar Nombre aquí..."><br><br>
        <label for="ingresoID"><strong>'ID': </strong></label><br>
        <input type="text" v-model="userId" id="registroId" name="ingresoID" placeholder="Ingresar ID aquí...">
      </div>

      <!--Sector de información para el usuario aquí abajo-->
      <div class="InfoBox">
        <h3>'{{ stateMessage }}'</h3><br>
        <h3>Intentos realizados: <strong>°{{ this.entryAttempts }}</strong> --- Cantidad máxima de intentos: °3</h3>
        <p v-show="vShowMessage"><strong>Se ha realizado todos los intentos disponibles para poder continuar por el sitio, recargue la página para volver a intentar...</strong></p>
      </div>
    </div>

    <!--Sector de botones aquí abajo-->
    <div class="LogginButtonsBox">
      <button type="button" @click="btnDateValidation()" v-show="vShowButton" :disabled="!dateValidation" id="btnValidarIngreso">Validar Datos</button><br><br>
      <button type="button" @click="btnEntryValidation()" v-show="validatedStep" :disabled="!validatedStep" id="btnValidarIngreso">Puede continuar</button>
    </div>
  </body>
</template>

<script>
  export default {
    name: 'EntryFormComponent',
    data() {
      return{
        stateMessage: "'Nombre' y 'ID' deben ser ingresados para poder continuar...",
        idLetters: 0,
        idNumbers: 0,
        nameLetters: 0,
        nameNumbers: 0,
        userId: "",
        userName: "",
        dateValidation: true,
        validatedStep: false,
        entryAttempts: 0,
        userData: {
          userNameRegister: "",
          userIdRegister: "",
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
            this.stateMessage= "Felicitaciones!!!... Supongo...Cada dato ingresado es correcto y sea bienvenido/a a continuar por la aplicación...",
            this.attemptIncrement();
            this.userRegisterValidation();
            this.dateValidation = false,
            this.validatedStep = true,
            this.userId = "",
            this.userName = ""
          }
        }
      },
      userRegisterValidation(){
        this.userObjectConstructor();
        this.localStorageSetUserItems();
        this.userRegister();
      },
      userObjectConstructor(){
        // Se llenará el objeto 'userData' con el Nombre y ID recién ingresados por el usuario una vez todo esté en orden para continuar.
        this.userData.userNameRegister = this.userName;
        this.userData.userIdRegister = this.userId;
      },
      localStorageSetUserItems(){
        localStorage.setItem('userData', JSON.stringify(this.userData))
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
  body {
    background-color: #a39b9bd3; /* Color de fondo de toda la página */
    color: #070707;
  }

  .EntryFormInteraction {
    display: grid;
    margin: 0 auto;
    grid-template-columns: auto auto;
    justify-content: space-around;
    padding: 20px;
  }

  .LogginInputsBox {
    grid-column: 1/2;
    text-align: left;
    align-items: center;
    width: 200px;
    height: 100px;
    padding: 15px;
    margin-top: 25px;
  }

  .InfoBox {
    grid-column: 2/2;
    text-align: center;
    align-items: center;
    padding: 15px;
    margin: 15px;
  }

  .LogginButtonsBox {
    padding: 10px;
    text-align: center;
  }

  #btnValidarIngreso{
    cursor: pointer;
    width: 90px;  /* Ancho del botón */
    height: 50px; /* Alto del botón */
    border: 1px solid gold;  /* Borde dorado.*/
    border-radius: 10px;  /* Bordes redondeados */
    background-color: black;  /* Color de fondo */
    color: #fff;  /* Color de texto */
    text-transform: uppercase; /* Convierte el texto a mayúsculas */
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; /* Fuente */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Sombra del botón */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  #btnValidarIngreso:hover{
    border: 1px solid #007bff;  /* Borde sólido azul */
    background-color: white;  /* Color de fondo */
    color: #000000;  /* Color de texto */
    font-weight: bold;     /* Negrita */
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; /* Fuente */
    cursor: pointer; /* Cambia el cursor a una mano al pasar */
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5); /* Sombra más intensa al pasar el cursor */
  }

  #registroNombre, #registroId {
    width: 200px;
    height: 30px;
    border: 1px solid black;
  }
</style>