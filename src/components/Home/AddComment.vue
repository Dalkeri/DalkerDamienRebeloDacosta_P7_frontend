<template>
  <div class="addComment">
    <hr />
    <div>Ajouter un commentaire:</div>
    <input type="textarea" class="form-control"  v-model="commentContent" id="commentContent" name="commentContent">
    <button type="button" class="btn btn-primary" v-on:click="createComment">Commenter</button>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapState } from "vuex"
import { createToast } from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css';

export default {
  name: 'AddComment',
  props: {
    comment: String,
    commentId: Number,
    threadId: Number,
  },
  data: function() {
    return { 
      commentContent:"",
    };
  },
  computed: {
    ...mapState({
      userConnected: ({userConnected}) => userConnected
    })
  },
  created(){
      this.commentContent = this.comment
  },
  methods: {
    createComment(e){
      e.preventDefault();
      if( this.commentContent ){
          let commentInfos = {
              content: this.commentContent,
              visible: true,
              threadId: this.threadId,
              userId: this.userConnected.id
          };

          //if we didn't get props it's a new comment
          if( !this.comment ){
              Axios.post("/comment/create/",  commentInfos )
                 .then( res => {
                      if(res.status == 200){ //TODO
                        this.resetValues();
                        this.$emit("handleCommentsEvent", res.data );
                      }
                  }); 
          } else {
              Axios.put("/comment/" + this.commentId + "/modify/", commentInfos )
              .then( res => {
                  console.log("res", res);
                  if(res.status == 200){
                    this.resetValues();
                    this.$emit("handleCommentsEvent", res.data );
                  }
              });
          }
      } else {
        createToast("Contenu du commentaire vide.",{type: 'danger', timeout:2000, showIcon: true} );
      }
    },
    resetValues(){
        this.commentContent = "";
    },
  }
}
</script>

<style scoped lang="scss">
  .addComment{
    margin-top: 50px;
    margin-bottom: 20px;
  }
</style>