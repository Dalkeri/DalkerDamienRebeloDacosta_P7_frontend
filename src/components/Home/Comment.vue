<template>
  <div class="comment">
    <hr />
    <div>
      <router-link :to="{ name: 'User', params: { id: comment.User.id }}">{{ comment.User.firstName + " " + comment.User.lastName}}</router-link>
      <div v-if="!modifyComment">
        <p>{{ comment.content }}</p>
      </div>
      <div v-else>
        <addComment :comment="comment.content" :commentId="comment.id" @handle-comments-event="handleComments" />
      </div>
    </div>
    <div v-if="comment.userId == userConnected.id || userConnected.admin">
      <span>
        <button type="button" class="btn btn-primary" v-on:click="modifyComment = !modifyComment" v-if="!modifyComment">Modifier</button>
        <button type="button" class="btn btn-primary" v-on:click="modifyComment = !modifyComment" v-if="modifyComment">Annuler</button>
        <button type="button" class="btn btn-primary" v-on:click="deleteComment">Supprimer</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import addComment from './AddComment.vue';
import Axios from 'axios'


export default {
  name: 'Comment',
  props: {
    comment: Object,
    idThread: Object,
  },
  components: {
    addComment
  },
  data: function() {
    return { 
      modifyComment: false,
     };
  },
  computed: {
    ...mapState({
      userConnected: ({userConnected}) => userConnected
    })
  },
  methods: {
    handleComments(commentContent) {      
      this.modifyComment = false;
      this.$emit("handleCommentsEvent", commentContent ); 
    },
    deleteComment(){
      Axios.delete("/comment/" + this.comment.id)
            .then( res => {
              if(res.status == 200){
                this.$emit("handleCommentsEvent", {id: this.comment.id, threadId: this.comment.threadId, action: "delete" });
              }
            });
      }
  }
}
</script>