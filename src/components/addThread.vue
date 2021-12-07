<template>
  <div class="addThread">
    <form @submit.prevent="createThread">
        <label for="fname">Title:</label><br>
        <input type="text" v-model="threadTitle" id="threadTitle" name="threadTitle"><br>
        <label for="lname">Content:</label><br>
        <input type="textarea" v-model="threadContent" id="threadContent"  name="threadContent"><br><br> 
        <label>File</label><br>
        <input type="file" id="uploadFile" @change="handleFileUpload( $event )"/><br>
        <input type="submit" value="Poster">
    </form> 
  </div>
</template>

<script>

import Axios from 'axios'
import { mapState, mapGetters } from "vuex"

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
      disable: true,
      file: ''
    };
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
            //ajouter user pour savoir si il est là ou pas, si oui, on affiche le connexion / s'inscrire, sinon "Mon profil"
        }),
        ...mapGetters([
          'getRequestConfig'
        ])
    },
  created(){
    if( this.datas ){
      this.threadTitle = this.datas.title,
      this.threadContent = this.datas.content
    }
  },
  methods: {
      createThread(e){
        e.preventDefault();
        console.log("createThread");

        let formData = new FormData();

        formData.append('title', this.threadTitle);
        formData.append('content', this.threadContent);
        formData.append('userId', this.userConnected.id);
        formData.append('image', this.file);
       
       
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
          Axios.post("/thread/create", formData, this.$store.getters.getRequestConfig )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res);
                this.$emit("myEvent"); //TODO change name
                this.resetValues();
              });
        } else { //modification
          console.log("/thread/modify/" + this.datas.id);
          // Axios.put("/thread/modify/" + this.datas.id, threadInfos, config )
          Axios.put("/thread/modify/" + this.datas.id, formData, this.$store.getters.getRequestConfig )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res);
                if(res.status == 200){
                  console.log("addThread emit myEvent");
                  this.$emit("myEvent");
                  this.resetValues();
                }
                // this.resetValues();
              });
        }
        // this.$emit("myEvent");
        

      },
      resetValues(){
        //two way bindings
        // let form = document.getElementsByTagName("form")[0];
        // form.reset(); 
        this.threadTitle = "";
        this.threadContent = "";
        this.file = "";
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
