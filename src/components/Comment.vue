<template>
  <div class="Comment">
    <h4>----------</h4>
    <div>
      <p>{{ comment.User.firstName + " " + comment.User.lastName}}</p>
      <div v-if="!modifyComment">
        <p>{{ comment.content }}</p>
      </div>
      <div v-else>
        <AddComment :comment="comment.content" :commentId="comment.id" @handle-comments-event="handleComments" />
      </div>
    </div>
    <div v-if="comment.userId == userConnected.id || userConnected.admin">
      <span>
        <button type="button" v-on:click="modifyComment = !modifyComment" v-if="!modifyComment">Modifier</button>
        <button type="button" v-on:click="modifyComment = !modifyComment" v-if="modifyComment">Annuler</button>
        <button type="button" v-on:click="deleteComment">Supprimer</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import AddComment from './AddComment.vue';
import Axios from 'axios'


export default {
  name: 'Comment',
  props: {
    comment: Object,
    idThread: Object,
  },
  components: {
    AddComment
  },
  data: function() {
    return { 
      // datas: this.comment,
      modifyComment: false,
      // threadId: this.,
     };
  },
  created(){
      // console.log("props", this.comment);
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
  methods: {
    handleComments(commentContent) {
      console.log("comment emit  handleCommentsEvent to comment or displayThread", commentContent);
      
      this.modifyComment = false;
      this.$emit("handleCommentsEvent", commentContent ); 

    },
    deleteComment(){
      console.log("Delete comment ",this.comment.id);

      Axios.delete("/comment/" + this.comment.id, this.$store.getters.getRequestConfig )
              //  .then( response => response.json() )
            .then( res => {
              console.log("res", res);
              if(res.status == 200){
                console.log("comment deleted ");
                this.$emit("handleCommentsEvent", {id: this.comment.id, threadId: this.comment.threadId, action: "delete" });
              }
            });
      }
  }
}
</script>