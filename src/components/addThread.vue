<template>
  <div class="addThread">
    <form @submit.prevent="handleThread">
        <label for="fname" class="col-sm-2 col-form-label">Title:</label>
        <input type="text" v-model="threadTitle" id="threadTitle" name="threadTitle" class="form-control" >
        <label for="lname" class="col-sm-2 col-form-label">Content:</label>
        <input type="textarea" v-model="threadContent" id="threadContent" name="threadContent" class="form-control">
        <label class="col-sm-2 col-form-label">File</label>
        <input type="file" id="uploadFile" class="form-control" @change="handleFileUpload( $event )"/>
        <div v-if="this.threadImage">
          <input type="checkbox" class="form-check-input" v-model="deletePic" id="deletePic" name="deletePic">Supprimer l'image actuelle<br>
        </div>
        <input type="submit" value="Poster" class="btn btn-primary">
    </form> 
  </div>
</template>

<script>

import Axios from 'axios'
import { mapState } from "vuex"


export default {
  name: 'addThread',

  props: {
    thread: Object
  },
  data: function() {
    return { 
      datas: this.thread,
      threadTitle:"",
      threadContent:"",
      threadImage:"",
      deletePic:"",
      disable: true,
      file: ''
    };
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
            //ajouter user pour savoir si il est là ou pas, si oui, on affiche le connexion / s'inscrire, sinon "Mon profil"
        })
    },
  created(){
    if( this.datas ){
      console.log("CREATED de addThread avec this.datas");
      this.threadTitle = this.datas.title,
      this.threadContent = this.datas.content,
      this.threadImage = this.datas.image
    }
  },
  methods: {
      handleThread(e){
        e.preventDefault();
        console.log("handleThread");

        let formData = new FormData();

        formData.append('title', this.threadTitle);
        formData.append('content', this.threadContent);
        formData.append('userId', this.userConnected.id);
        formData.append('image', this.file);
        formData.append('deletePic', this.deletePic);
       
       
       let threadInfos = {
          title: this.threadTitle,
          content: this.threadContent,
          // userId: this.userConnected.id,
          contentImg: this.file
        };
        // console.log("threadInfos", threadInfos);

        console.log("threadInfos", threadInfos);
        // console.log("formdata", formData);
        for (var p of formData) {
          console.log(p);
        }

        //new creation
        if( !this.datas ) {
          // Axios.post("/thread/create", threadInfos, config )
          Axios.post("/thread/create", formData )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res);
                console.log("1 addThread emit updateThreadEvent to displayThread");
                this.$emit("updateThreadEvent");
                this.resetValues();
              });
        } else { //modification
          console.log("/thread/modify/" + this.datas.id);
          // Axios.put("/thread/modify/" + this.datas.id, threadInfos, config )
          Axios.put("/thread/modify/" + this.datas.id, formData )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res);
                if(res.status == 200){
                  console.log("2 addThread emit updateThreadEvent to displayThread");
                  this.$emit("updateThreadEvent");
                  this.resetValues();
                }
                // this.resetValues();
              });
        }
        // this.$emit("myEvent");
        

      },
      resetValues(){
        console.log("reset values");
        //two way bindings
        let form = document.getElementsByTagName("form")[0];
        form.reset(); 
        // this.threadTitle = "";
        // this.threadContent = "";
        // this.file = "";
      },
      handleFileUpload( event ){
        this.file = event.target.files[0];
        console.log(this.file);
      }

      // validatedFields(){
      //   if( this.threadTitle == "" || this.threadContent == ""){
      //     this.disable = true;
      //     console.log("1")
      //   } else {
      //     this.disable = false;
      //     console.log("2")

      //   }
      // }
  }
  // watch :{
  //   threadTitle: function(newVal, oldVal) {
  //     console.log(" reloadThread changed from ", oldVal, " to ", newVal);
  //     this.validatedFields();
  //   },
  //   threadContent: function(newVal, oldVal) {
  //     console.log(" reloadThread changed from ", oldVal, " to ", newVal);
  //     this.validatedFields();
  //   },
  // }
}

</script>

<style lang="scss">
    form{
        display: flex;
        align-items: center;
        margin-right: auto;
        margin-left: auto;
        flex-direction: column;
        width: 88% !important;

        color: white;
    }

    input{
        margin-bottom: 20px;
    }

    label{
        width: 50%;
    }

</style>