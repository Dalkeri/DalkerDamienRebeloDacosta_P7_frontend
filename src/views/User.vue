<template>
  <img :src="user.profilPic" alt="Profil picture">
  <br>
  <h3>{{ user.firstName }} {{ user.lastName }}</h3>
  <br>
  <strong>{{ user.bio }}</strong>
  <div class="container">
    <ul class="nav nav-pills flex-column">
      <li class="nav-item" v-if="userConnected.admin">
        <a class="nav-link" :class="{ active: accountActive }"   v-on:click="changeMenuItem('account')">Modifier mon profil</a>
          <div v-if="navItem == 'account'" class="card border-secondary mb-3">
            <!-- <img :src="userConnected.profilPic" alt="Profil picture"> -->
            <!-- <br> -->
            <div v-if="!showInputProfilPic">
              <button type="button" v-on:click="showInputProfilPic = true">Changer de photo</button>
            </div>
            <div v-if="showInputProfilPic">
              <input type="file" id="uploadFile" @change="handleFileUpload( $event )"/><br>
              <button type="button" v-on:click="sendProfilPicForm">Enregistrer</button>
              <button type="button" v-on:click="showInputProfilPic = !showInputProfilPic">Annuler</button>
            </div>
            <!-- <h3>{{ userConnected.firstName }} {{ userConnected.lastName }}</h3> -->
            <div v-if="!bioForm">
              <button type="button" v-on:click="displayBioForm">Modifier votre biographie</button>
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
          </div>
      </li>
      <li class="nav-item">
        <a class="nav-link"  :class="{ active: threadActive }"  v-on:click="changeMenuItem('threadsHistory')">historique des postes</a>
        <div v-if="navItem == 'threadsHistory'" class="card bg-secondary mb-3">
          <h3>Liste des postes</h3>
        </div>
      </li>  
      <li class="nav-item">
        <a class="nav-link"  :class="{ active: commentActive }"  v-on:click="changeMenuItem('commentsHistory')">historique des postes commentés</a>
        <div v-if="navItem == 'commentsHistory'" class="card bg-secondary mb-3">
          <h3>Liste des Commentaires</h3>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import Axios from 'axios';
import { useRoute } from 'vue-router';


export default {
  name: 'User',

  data: function() {
    return { 
      navItem: "account",
      accountActive: true,
      threadActive: false,
      commentActive: false,

      showInputProfilPic: false,
      newprofilPic: '',
      bioForm: false,
      newBio: '',
      passwordForm: false,
      oldPassword: '',
      newPassword: '',

      user: '',
      route: '',
    };
  },
  created(){
    this.route = useRoute();
    console.log(this.route.params);
    
    //IF route.params.id ==  connectedUser.userId go to account route
    // console.log("userConnected created", this.userConnected);
    // console.log(this.route.params.id == this.userConnected.userId);    

     let config = {
          headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
     }
    console.log(config);
    Axios.post("/user/getUserById", this.route.params, config)
         .then( res => {
            console.log(res);
            this.user = res.data.user; 
         });
  },
  updated(){
    console.log("userConnected updated", this.userConnected);
    console.log(this.userConnected.id);
    if (this.userConnected.id == this.route.params.id) {
      this.$router.replace("/account");
    }
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
        }),
        ...mapGetters([
          'getRequestConfig',
          'getUserId',
        ])
  },
  methods: {
    displayBioForm(){
      console.log(this.userConnected)
      this.newBio = this.userConnected.bio;
      this.bioForm = !this.bioForm;
    },
    displayPasswordForm(){
      this.bioForm = !this.bioForm;
    },
    changeMenuItem(item){
      console.log("changeMenuItem ", item);
      this.navItem = item;
      switch(item){
        case 'account':
          this.accountActive = true;
          this.threadActive = false;
          this.commentActive = false;
          break;
        
        case 'threadsHistory':
          this.accountActive = false;
          this.threadActive = true;
          this.commentActive = false;
          break;

          case 'commentsHistory':
          this.accountActive = false;
          this.threadActive = false;
          this.commentActive = true;
          break;
      }
    },
    handleFileUpload( event ){
      this.file = event.target.files[0];
      console.log(this.file);
    },
    sendProfilPicForm(){
      let bio = {bio: this.newProfilPic};
      
      let formData = new FormData();
      formData.append('image', this.file);
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
      Axios.post("/user/modifyBio", bio, this.$store.getters.getRequestConfig)
           .then( res => {
              console.log("modifyBio ", res)
              if(res.status == 200){
                  //change bio in store
                  //change 2 lines after that because it's shitty
                  let updateUser = this.userConnected;
                  updateUser.profilPic = this.newprofilPic;
                  // faire direct this.userConnected.bio = this.newBio et faire this.userConnected dans le dispatch
                  this.$store.dispatch('userInfo', updateUser);
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