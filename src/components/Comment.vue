<template>
  <div class="Comment">
    <h4>----------</h4>
    <div>
      <p>{{ commentDatas.User.firstName + " " + commentDatas.User.lastName}}</p>
      <div v-if="!modifyComment">
        <p>{{ commentDatas.content }}</p>
      </div>
      <div v-else>
        <addComment :commentDatas="commentDatas.content" :commentId="commentDatas.id"/>
      </div>
    </div>
    <div v-if="commentDatas.userId == userConnected.id || userConnected.admin">
      <span><button type="button" v-on:click="modifyComment = !modifyComment">Modifier</button><button type="button" v-on:click="deleteComment">Supprimer</button></span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import addComment from './addComment.vue';
import Axios from 'axios'


export default {
  name: 'Comment',
  props: {
    commentDatas: Object,
    idThread: Object,
  },
  components: {
    addComment
  },
  data: function() {
    return { 
      // datas: this.commentDatas,
      modifyComment: false,
      // threadId: this.,
     };
  },
  created(){
      // console.log("props", this.CommentDatas);
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
            //ajouter user pour savoir si il est là ou pas, si oui, on affiche le connexion / s'inscrire, sinon "Mon profil"
        }),
    },
  methods: {
      deleteComment(){
        console.log("Delete comment ",this.commentDatas.id);
        let config = {
          headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
        }

        Axios.delete("/comment/" + this.commentDatas.id, config )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res);
                if(res.status == 200){
                  console.log("comment deleted ");
                }
              });
      }
  }
}
</script>