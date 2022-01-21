<template>
  <img :src="userToDisplay.profilPic" alt="Profil picture">
  <br>
  <h3>{{ userToDisplay.firstName }} {{ userToDisplay.lastName }}</h3>
  <br>
  <strong>{{ userToDisplay.bio }}</strong>
  <div class="container" v-if="userConnected.admin || pageAccount">
    <div v-if="!showInputProfilPic">
        <button type="button" v-on:click="showInputProfilPic = true">Changer de photo</button>
    </div>
    <div v-if="showInputProfilPic">
        <input type="file" id="uploadFile" @change="handleFileUpload( $event )"/><br>
        <button type="button" v-on:click="sendProfilPicForm">Enregistrer</button>
        <button type="button" v-on:click="showInputProfilPic = !showInputProfilPic">Annuler</button>
    </div>
    <div v-if="!bioForm">
        <button type="button" v-on:click="displayBioForm">Modifier la biographie</button>
    </div>
    <div v-else>
        <textarea type="text" v-model="newBio" id="newBio" name="newBio"></textarea><br>
        <button type="button" v-on:click="sendBioForm">Enregistrer</button>
        <button type="button" v-on:click="bioForm = !bioForm">Annuler</button>
    </div>
    <div v-if="!passwordForm">
        <button type="button" v-on:click="passwordForm = !passwordForm">Changer de mot de passe</button> 
    </div>
    <div v-else>
        <!-- pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" -->
        <label for="password">Ancien mot de passe:</label><br>
        <input type="text" id="oldPassword" name="oldPassword" v-model="oldPassword" ><br>
        <label for="password">Nouveau mot de passe:</label><br>
        <input type="text" id="newPassword" name="newPassword" v-model="newPassword" ><br>
        <button type="button" v-on:click="sendPasswordForm">Enregistrer</button>
        <button type="button" v-on:click="passwordForm = !passwordForm">Annuler</button>
    </div>
    <button type="button" v-on:click="deleteProfil()">Supprimer le compte</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { useRoute } from 'vue-router';
import Axios from 'axios';


export default {
  name: 'displayUser',
  data: function() {
    return { 
      userId: null, 
      userToDisplay: '',
      pageAccount: false,

      showInputProfilPic: false,
      newprofilPic: '',
      bioForm: false,
      newBio: '',
      passwordForm: false,
      oldPassword: '',
      newPassword: '',

      threadHistory: '',
      commentHistory:  '',

      route: '',

      userDeleted: false,
    };
  },
   computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
        }),
        ...mapGetters([
          'getRequestConfig',
        ])
  },
  created(){
    this.route = useRoute();
    // console.log("created", this.userConnected);
    if(this.$route.path == "/account"){
        this.pageAccount = true;
    }
  },
  mounted(){
    this.route = useRoute();
    console.log("MOUNTED", this.$route.path);
      
    if(this.$route.path == "/account"){
        // console.log("IF");
        // console.log("connected", this.userConnected);

        // this.pageAccount = true;
        this.userToDisplay = this.userConnected;
    } else {

        console.log("MOUNTED 2", this.userConnected);
        
        this.userId = this.route.params.id;

        // let config = {
        //     headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem   ('groupomaniaToken'))}
        // }
        // console.log(config);
        Axios.post("/user/getUserById", this.route.params)
            .then( res => {
                console.log("/user/getUserById", res);
                this.userToDisplay = res.data.user; 
        });
    
    }     
  },
  updated(){
   
    //TODO: put this in created ? or mounted ? or beforeRoute ?

    if(this.userToDisplay == '' && this.$route.fullPath == '/account'){
      this.userToDisplay = this.userConnected;
    }
    if(this.userConnected.id == this.route.params.id && !this.userDeleted){
      // console.log("coucou");
      this.$router.push("/account");
    }
  },
  methods: {
    displayBioForm(){
      console.log(this.userConnected)
      this.newBio = this.userToDisplay.bio;
      this.bioForm = !this.bioForm;
    },
    displayPasswordForm(){
      this.bioForm = !this.bioForm;
    },
    handleFileUpload( event ){
      this.file = event.target.files[0];
      console.log(this.file);
    },
    sendProfilPicForm(){
      let bio = {bio: this.newProfilPic};
      
      let formData = new FormData();
      formData.append('image', this.file);
      formData.append('userIdToModify', this.userToDisplay.id);
      // let userInfos = {
      //     profilpic: this.file
      //   };
      console.log("sendProfilPicForm", bio);
      Axios.post("/user/modifyProfilPic", formData, this.$store.getters.getRequestConfig)
           .then( res => {
              console.log("modifyProfilPic ", res)
              if(res.status == 200){
                  //change bio in store
                  let updateUser = this.userConnected;
                  updateUser.profilPic = res.data.newProfilPic;
                  // faire direct this.userConnected.bio = this.newBio et faire this.userConnected dans le dispatch
                  this.$store.dispatch('userInfo', updateUser);
                  this.resetValues();
                  this.showInputProfilPic = false;
              }
           })
           .catch(error => console.log(error));
    },
    sendBioForm(){
      let bio = {bio: this.newBio};
      console.log("sendBioForm", bio);
      Axios.post("/user/" + this.userToDisplay.id +"/modifyBio" , bio)
           .then( res => {
              console.log("modifyBio ", res)
              if(res.status == 200){
                  //change bio in store
                  //change 2 lines after that
                  let updateUser = this.userConnected;
                  updateUser.profilPic = this.newprofilPic;
                  // faire direct this.userConnected.bio = this.newBio et faire this.userConnected dans le dispatch
                  this.$store.dispatch('userInfo', updateUser);
                  this.userToDisplay.bio = this.newBio;
                  this.bioForm = !this.bioForm;
              }
           })
           .catch(error => console.log(error));
    },
    sendPasswordForm(){
      let passwords = {oldPassword: this.oldPassword, newPassword: this.newPassword};

      Axios.post("/user/modifyPassword", passwords, this.$store.getters.getRequestConfig)
           .then( res => {
              console.log("modifyBio ", res)
              if(res.status == 200){
                this.bioForm = !this.passwordForm;
              }
           })
           .catch(error => console.log(error));
           
    },
    resetValues(){
        console.log("reset values");
        //two way bindings
        let input = document.getElementsByTagName("input")[0];
        input.value = ""; 
        // this.threadTitle = "";
        // this.threadContent = "";
        // this.file = "";
    },
    deleteProfil(){
      console.log("delete user")
      console.log("route", this.$route);
      let idToDelete = this.$route.params.id ? this.$route.params.id : this.userConnected.id;

      Axios.delete("/user/" + idToDelete, this.$store.getters.getRequestConfig)
           .then( res => {
             console.log("res deleting account");
             if(res.status == 200){
                console.log("delete successfull");

                if(this.$route.fullPath == "/account"){
                  console.log("disconnecting");
                  this.$store.dispatch('userInfo', '');
                  this.$store.dispatch('requestConfig', '');
                  localStorage.removeItem("groupomaniaToken");
                  this.userDeleted = true;
                  // this.$router.push('/');
                  this.$router.push({ name: 'Welcome' });
                } else {
                  this.$router.go('Home');
                }
             }
           });
    }
  }
}
</script>

<style scoped lang="scss">
img{
  width: 20%;
  margin: auto;
}

.container {
  width: 900px !important;
}

button {
  width: 150px;
  margin: auto;
}


</style>