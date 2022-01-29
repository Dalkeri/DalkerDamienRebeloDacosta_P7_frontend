<template>
  <div class="addThread">
    <form id="addThreadForm" @submit.prevent="handleThread">
        <label for="fname" class="col-sm-2 col-form-label">Titre:</label>
        <input type="text" v-model="threadTitle" id="threadTitle" name="threadTitle" class="form-control" required>
        <label for="lname" class="col-sm-2 col-form-label">Contenu:</label>
        <textarea rows="3" v-model="threadContent" id="threadContent" name="threadContent" class="form-control"></textarea>
        <label class="col-sm-2 col-form-label">Image:</label>
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
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

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
  })
},
  created(){
    if( this.datas ){
      this.threadTitle = this.datas.title,
      this.threadContent = this.datas.content,
      this.threadImage = this.datas.image
    }
  },
  methods: {
    handleThread(e){
      e.preventDefault();

      let formData = new FormData();

      formData.append('title', this.threadTitle);
      formData.append('content', this.threadContent);
      formData.append('userId', this.userConnected.id);
      formData.append('image', this.file);
      formData.append('deletePic', this.deletePic);

      //new creation
      if( !this.datas ) {
        Axios.post("/thread/create", formData )
            .then( () => {
              this.$emit("updateThreadEvent");
              this.resetValues();
            })
            .catch( error => {
              createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
            });
      } else { //modification
        Axios.put("/thread/" + this.datas.id +"/modify/", formData )
            .then( res => {
              if(res.status == 200){ //TODO
                this.$emit("updateThreadEvent");
                this.resetValues();
              }
            })
            .catch( error => {
              createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
            });
      }
    },
      resetValues(){
        this.threadTitle = "";
        this.threadContent = "";
        this.file = "";
      },
      handleFileUpload( event ){
        this.file = event.target.files[0];
      }
  }
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