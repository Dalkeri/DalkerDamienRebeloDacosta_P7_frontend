<template>
  <headerNav />

  <displayUser />
</template>

<script>
import { mapState, mapGetters } from "vuex"
// import Axios from 'axios';
import displayUser from '../components/displayUser.vue';
import headerNav from '../components/headerNav.vue';



export default {
  components: { 
    displayUser,
    headerNav
    },
  name: 'Account',
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

      threadHistory: '',
      commentHistory:  '',
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
  methods: {
    // getThreadHistory(){
    //   console.log("getThreadHistory");

    //   Axios.get("/thread/getThreadFromUser/" + this.userConnected.id, this.$store.getters.getRequestConfig)
    //        .then( res => {
    //          console.log(res);
    //          this.threadHistory = res.data;
    //        })
    //        .catch(error => console.log("trouble while fetching thread history: ", error)
    //        );
    // },
    // getThreadsFromComments(){
    //   console.log("getThreadsFromComments");

    //   Axios.get("/thread//getThreadFromUserComments/"+ this.userConnected.id,this.$store.getters.getRequestConfig)
    //        .then( res => {
    //          console.log(res);
    //          this.commentHistory = res.data;
    //        })
    //        .catch(error => console.log("trouble while fetching comment history: ", error)
    //        );
    // },
    // displayBioForm(){
    //   console.log(this.userConnected)
    //   this.newBio = this.userConnected.bio;
    //   this.bioForm = !this.bioForm;
    // },
    // displayPasswordForm(){
    //   this.bioForm = !this.bioForm;
    // },
    // changeMenuItem(item){
    //   console.log("changeMenuItem ", item);
    //   this.navItem = item;
    //   switch(item){
    //     case 'account':
    //       this.accountActive = true;
    //       this.threadActive = false;
    //       this.commentActive = false;
    //       break;
        
    //     case 'threadsHistory':
    //       this.accountActive = false;
    //       this.threadActive = true;
    //       this.commentActive = false;
    //       if(!this.threadHistory){
    //         this.getThreadHistory();
    //       }
    //       break;

    //       case 'commentsHistory':
    //       this.accountActive = false;
    //       this.threadActive = false;
    //       this.commentActive = true;
    //       if(!this.commentHistory){
    //         this.getThreadsFromComments();
    //       }
    //       break;
    //   }
    // },
    // handleFileUpload( event ){
    //   this.file = event.target.files[0];
    //   console.log(this.file);
    // },
    // sendProfilPicForm(){
    //   let bio = {bio: this.newProfilPic};
      
    //   let formData = new FormData();
    //   formData.append('image', this.file);
    //   formData.append('userToModify');
    //   // let userInfos = {
    //   //     profilpic: this.file
    //   //   };
    //   console.log("sendProfilPicForm", bio);
    //   Axios.post("/user/modifyProfilPic", formData, this.$store.getters.getRequestConfig)
    //        .then( res => {
    //           console.log("modifyProfilPic ", res)
    //           if(res.status == 200){
    //               //change bio in store
    //               let updateUser = this.userConnected;
    //               updateUser.profilPic = res.data.newProfilPic;
    //               // faire direct this.userConnected.bio = this.newBio et faire this.userConnected dans le dispatch
    //               this.$store.dispatch('userInfo', updateUser);
    //               this.resetValues();
    //               this.showInputProfilPic = false;
    //           }
    //        })
    //        .catch(error => console.log(error));
    // },
    // sendBioForm(){
    //   let bio = {bio: this.newBio};
    //   console.log("sendBioForm", bio);
    //   Axios.post("/user/modifyBio", bio, this.$store.getters.getRequestConfig)
    //        .then( res => {
    //           console.log("modifyBio ", res)
    //           if(res.status == 200){
    //               //change bio in store
    //               //change 2 lines after that because it's shitty
    //               let updateUser = this.userConnected;
    //               updateUser.profilPic = this.newprofilPic;
    //               // faire direct this.userConnected.bio = this.newBio et faire this.userConnected dans le dispatch
    //               this.$store.dispatch('userInfo', updateUser);
    //               this.bioForm = !this.bioForm;
    //           }
    //        })
    //        .catch(error => console.log(error));
    // },
    // sendPasswordForm(){
    //   let passwords = {oldPassword: this.oldPassword, newPassword: this.newPassword};

    //   Axios.post("/user/modifyPassword", passwords, this.$store.getters.getRequestConfig)
    //        .then( res => {
    //           console.log("modifyBio ", res)
    //           if(res.status == 200){
    //             this.bioForm = !this.passwordForm;
    //           }
    //        })
    //        .catch(error => console.log(error));
           
    // },
    // resetValues(){
    //     console.log("reset values");
    //     //two way bindings
    //     let input = document.getElementsByTagName("input")[0];
    //     input.value = ""; 
    //     // this.threadTitle = "";
    //     // this.threadContent = "";
    //     // this.file = "";
    //   }
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