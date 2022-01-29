<template>
  <div class="displayUser">
    <img :src="userToDisplay.profilPic" alt="Profil picture">
    <h3>{{ userToDisplay.firstName }} {{ userToDisplay.lastName }}</h3>
    <div>Biographie :</div>
    <div class="biography">{{ userToDisplay.bio }}</div>
    <button type="button" class="btn btn-primary" v-on:click="disconnect" v-if="pageAccount">Se déconnecter</button>

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
          <input type="password"  class="form-control" id="newPassword" name="newPassword" v-model="newPassword" minlength="8" >
          <button type="submit" class="btn btn-primary" >Enregistrer</button>
          <button type="button" class="btn btn-primary" v-on:click="passwordForm = !passwordForm">Annuler</button>          
        </form>
        <hr />
      </div>

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
    </div>
  </div>
  
</template>

<script>
import { mapState } from "vuex";
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
    })
  },
  created(){
    this.route = useRoute();
    if(this.$route.path == "/account"){
        this.pageAccount = true;
    }
  },
  mounted(){
    this.route = useRoute();
      
    if(this.$route.path == "/account"){
        this.userToDisplay = this.userConnected;
    } else {        
        this.userId = this.route.params.id;

        Axios.get("/user/getUserById", this.route.params)
            .then( res => {
              if(res.status == 200){
                this.userToDisplay = res.data.user;
              }
            })
            .catch( () => {
                // console.log(error);
                this.$router.push('/home');
            });
    
    }     
  },
  updated(){
    if(this.userToDisplay == '' && this.$route.fullPath == '/account'){
      this.userToDisplay = this.userConnected;
    }
    if(this.userConnected.id == this.route.params.id && !this.userDeleted){
      this.$router.push("/account");
    }
  },
  methods: {
    disconnect(){
      localStorage.removeItem("groupomaniaToken");
      this.$store.dispatch('userInfo', '');
      this.$router.go('Welcome');
    },
    displayBioForm(){
      this.newBio = this.userToDisplay.bio;
      this.bioForm = !this.bioForm;
    },
    displayPasswordForm(){
      this.bioForm = !this.bioForm;
    },
    handleFileUpload( event ){
      this.file = event.target.files[0];
    },
    sendProfilPicForm(){      
      let formData = new FormData();
      formData.append('image', this.file);
      
      Axios.put("/user/" + this.userToDisplay.id +"/modifyProfilPic", formData)
           .then( res => {
              if(res.status == 200){
                  let updateUser = this.userConnected;
                  this.userToDisplay.profilPic = res.data.newProfilPic;
                  this.$store.dispatch('userInfo', updateUser);
                  this.newprofilPic = "";
                  this.profilPicForm = false;
              } else if(res.status == 500){ //TODO
                createToast(res.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
           })
           .catch(error => {
              // console.log(error);
              if(error.response.data.message){
                createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
            });
    },
    sendBioForm(){
      let bio = {bio: this.newBio};

      Axios.put("/user/" + this.userToDisplay.id +"/modifyBio" , bio)
           .then( res => {
              if(res.status == 200){
                  let updateUser = this.userConnected;
                  this.$store.dispatch('userInfo', updateUser);
                  this.userToDisplay.bio = this.newBio;
                  this.bioForm = !this.bioForm;
                  //TODO useless here ?
              } else if(res.status == 500){
                createToast(res.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
           })
           .catch(error => {
              // console.log(error);
              if(error.response.data.message){
                createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
            });
    },
    sendPasswordForm(){
      Axios.put("/user/"+ this.userToDisplay.id +"/modifyPassword", {newPassword: this.newPassword})
           .then( res => {
              if(res.status == 200){
                this.bioForm = !this.passwordForm;
                createToast(res.data.message,{type: 'success', timeout:2000, showIcon: true} );
                this.passwordForm = false;
                this.newPassword = "";
              } else if(res.status == 401){ //TODO
                createToast(res.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
           })
           .catch(error => {
              // console.log(error);
              if(error.response.data.message){
                createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
            });
           
    },
    deleteProfil(){
      let idToDelete = this.userToDisplay.id;

      Axios.delete("/user/" + idToDelete)
           .then( res => {
             if(res.status == 200){
                if(this.$route.fullPath == "/account"){
                  this.$store.dispatch('userInfo', '');
                  localStorage.removeItem("groupomaniaToken");
                  this.userDeleted = true;
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
    margin-bottom: 75px;
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

  input{
    width: 50%;
  }

  label{
    width: 100%;
  }

  textarea{
    width: 50%;
  }

  @media (max-width: 768px) {
    .biography{
      width: 80%;
      margin-right: auto;
      margin-left: auto;
    }

    button {
      width: 80%;
    }

    form{
      width: 80% !important;
    }

    input{
      width: 75%;
    }

    textarea{
      width: 75%;
    }
  }
</style>