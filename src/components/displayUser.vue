<template>
  <div class="displayUser">
    <img :src="userToDisplay.profilPic" alt="Profil picture">
    <h3>{{ userToDisplay.firstName }} {{ userToDisplay.lastName }}</h3>
    <div>Biographie :</div>
    <div class="biography">{{ userToDisplay.bio }}</div>
    <div class="buttons" v-if="userConnected.admin || pageAccount">

      <div class="buttons__cat" v-if="!profilPicForm">
          <button type="button"  class="btn btn-primary"  v-on:click="profilPicForm = true">Changer de photo</button>
      </div>
      <div class="buttons__cat" v-if="profilPicForm">
          <hr />
          <form id="profilPicForm" @submit.prevent="sendProfilPicForm">
            <input type="file" id="uploadFile" class="form-control" @change="handleFileUpload( $event )"/><br>
            <button type="submit" class="btn btn-primary" >Enregistrer</button>
            <button type="button" class="btn btn-primary" v-on:click="profilPicForm = !profilPicForm">Annuler</button>
          </form>
          
          <hr />
      </div>

      <div class="buttons__cat" v-if="!bioForm">
          <button type="button" class="btn btn-primary" v-on:click="displayBioForm">Modifier la biographie</button>
      </div>
      <div class="buttons__cat" v-else>
          <hr />
          <form id="bioForm" @submit.prevent="sendBioForm">
            <textarea type="text" class="form-control" v-model="newBio" id="newBio" name="newBio"></textarea><br>
            <button type="submit" class="btn btn-primary" >Enregistrer</button>
            <button type="button" class="btn btn-primary" v-on:click="bioForm = !bioForm">Annuler</button>
          </form>
          
          <hr />
      </div>

      <div class="buttons__cat" v-if="!passwordForm">
          <button type="button" v-on:click="passwordForm = !passwordForm"  class="btn btn-primary" >Changer de mot de passe</button> 
      </div>
      <div class="buttons__cat" v-else>
        <hr />
        <form id="passwordForm" @submit.prevent="sendPasswordForm">
          <label for="password" class="col-sm-2 col-form-label">Nouveau mot de passe:</label>
          <input type="text"  class="form-control" id="newPassword" name="newPassword" v-model="newPassword" minlength="8" >
          <button type="submit" class="btn btn-primary" >Enregistrer</button>
          <button type="button" class="btn btn-primary" v-on:click="passwordForm = !passwordForm">Annuler</button>          
        </form>
        <hr />
      </div>

      <button type="button" class="btn btn-primary" v-on:click="disconnect">Se déconnecter</button>

      <div class="buttons__cat" v-if="!checkBeforeDelete">
          <button type="button" class="btn btn-primary"  v-on:click="checkBeforeDelete = !checkBeforeDelete">Supprimer le compte</button>
      </div>
      <div class="buttons__cat" v-else>
        <hr />
        <form @submit.prevent="deleteProfil">
          <label for="deleteProfil" class="col-sm-2 col-form-label">Voulez-vous supprimer le compte ?</label>
          <input type="submit" class="btn btn-primary" value="Oui">
          <button type="button" class="btn btn-primary" v-on:click="checkBeforeDelete = !checkBeforeDelete">Annuler</button>          
        </form>
        <hr />
      </div>
      <!-- <button type="button" class="btn btn-primary"  v-on:click="deleteProfil()">Supprimer le compte</button> -->
    </div>
  </div>
  
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { useRoute } from 'vue-router';
import Axios from 'axios';
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default {
  name: 'displayUser',
  data: function() {
    return { 
      userId: null, 
      userToDisplay: '',
      pageAccount: false,

      profilPicForm: false,
      newprofilPic: '',
      bioForm: false,
      newBio: '',
      passwordForm: false,
      newPassword: '',

      threadHistory: '',
      commentHistory:  '',

      checkBeforeDelete: false,

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
              if(res.status == 200){
                console.log("/user/getUserById", res);
                this.userToDisplay = res.data.user;
              }
            })
            .catch(error => {
                console.log(error);
                this.$router.push('/home');
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
    disconnect(){
      console.log("disconnect ?");
      // this.$store.dispatch('requestConfig', '');
      localStorage.removeItem("groupomaniaToken");
      this.$store.dispatch('userInfo', '');
      // this.$router.push({ path: '/' });
      this.$router.go('Welcome');

    },
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
      // let bio = {bio: this.newProfilPic};
      
      let formData = new FormData();
      formData.append('image', this.file);
      // formData.append('userIdToModify', this.userToDisplay.id);
      
      Axios.post("/user/" + this.userToDisplay.id +"/modifyProfilPic", formData)
           .then( res => {
              console.log("modifyProfilPic ", res)
              if(res.status == 200){
                  //change bio in store
                  let updateUser = this.userConnected;
                  this.userToDisplay.profilPic = res.data.newProfilPic;
                  // faire direct this.userConnected.bio = this.newBio et faire this.userConnected dans le dispatch
                  this.$store.dispatch('userInfo', updateUser);
                  this.newprofilPic = "";
                  this.profilPicForm = false;
              } else if(res.status == 500){
                createToast(res.data.message,{type: 'danger', timeout:2000, showIcon: true} );
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
                  // updateUser.profilPic = this.newprofilPic;
                  // faire direct this.userConnected.bio = this.newBio et faire this.userConnected dans le dispatch
                  this.$store.dispatch('userInfo', updateUser);
                  this.userToDisplay.bio = this.newBio;
                  this.bioForm = !this.bioForm;
              } else if(res.status == 500){
                createToast(res.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
           })
           .catch(error => console.log(error));
    },
    sendPasswordForm(){
      Axios.post("/user/"+ this.userToDisplay.id +"/modifyPassword", {newPassword: this.newPassword})
           .then( res => {
              console.log("modifyPassword ", res)
              if(res.status == 200){
                this.bioForm = !this.passwordForm;
                createToast(res.data.message,{type: 'success', timeout:2000, showIcon: true} );
                this.passwordForm = false;
                this.newPassword = "";
              } else if(res.status == 401){
                createToast(res.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
           })
           .catch(error => {
             console.log(error.response.data)
              createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );

             });
           
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

.displayUser{
  color: white;
}

.biography{
  margin-bottom: 20px;
}

img{
  width: 50%;
  margin-bottom: 20px;
}

.buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttons__cat{
  width: 100%;
}
button {
  width: 50%;
  // margin: auto;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
}

form{
  display: flex;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  flex-direction: column;
  width: 88% !important;
}

hr{
  width: 100%;
}
input{
  width: 50%;
}

label{
  width: 100%;
}

textarea{
  width: 50%;
}
</style>