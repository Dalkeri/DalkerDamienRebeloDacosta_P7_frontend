<template>
  <div class="Thread d-flex justify-content-center">
    <div class="card border-primary mb-4">
      ====================================
      <div class="card-header">
        <!-- {{ thread.User.firstName + " " + thread.User.lastName}} -->
        <router-link :to="{ name: 'User', params: { id: thread.User.id }}">{{ thread.User.firstName + " " + thread.User.lastName}}</router-link>
        </div>
      <div  class="card-body">
        <div v-if="modifyThread">
          <addThread :thread="thread" @update-thread-event="updateThreads" />
        </div>
        <div v-else>
          <h4 class="card-title">{{ thread.title }}</h4>
          <p class="card-text">{{ thread.content }}</p>
          <div v-if="thread.image">
            <img :src="thread.image" alt="image of the thread">
          </div>
        </div>

        <!-- buttons if owner or admin -->
        <div v-if="thread.userId == userConnected.id || userConnected.admin">
        <span>
          <button type="button" v-on:click="modifyThread = !modifyThread" v-if="!modifyThread">Modifier</button>
          <button type="button" v-on:click="modifyThread = !modifyThread" v-if="modifyThread">Annuler</button>
          <button type="button" v-on:click="deleteThread">Supprimer</button>
        </span>
        </div>

        <!-- comments -->
        <div v-if="thread.Comments">
          <div class="comments" v-for="comment in thread.Comments" :key="comment.id">
            <Comment :comment="comment" :id="thread.id" @handle-comments-event="handleComments"/>
          </div>
        </div>

        <!-- add comment -->
        <AddComment :threadId="thread.id" @handle-comments-event="handleComments" />
      
      </div>
    </div>
  </div>
</template>

<script>
import addThread from './addThread.vue'
import Comment from './Comment.vue'
import AddComment from './AddComment.vue'
import { mapState, mapGetters } from "vuex"
import axios from 'axios'
// import { useRoute } from 'vue-router';


export default {
  name: 'displayThread',
  props: { 
    thread: Object,
    // threadId: Number,
  },
  data: function() {
    return { 
      modifyThread: false,
      threadUserId: '',
      modifyComments: false,
     };
  },
  // computed: {
  // storeProp() {
  //   return this.thread = thread;
  // },
  created(){
      // // console.log("props", this.thread);
      // console.log(this.$router);
      // this.route = useRoute();
      // console.log(this.route.params);
      // if(this.route.params){
      //   this.thread = axios.get("http://localhost:3000/api/thread/"+this.route.params.id)
      //                      .then(res => {
      //                         console.log(".then", res.data);
      //                         // this.datasFetched = true;
      //                         // return res.data;
      //                         return res.data;
      //                         // this.$emit("myEvent");
      //                       })
      //                      .catch(error => console.log("trouble while fetching datas: ", error));
      // }

  },
  components: {
    addThread,
    Comment,
    AddComment
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
      console.log("displayThread emit  handleCommentsEvent to Feed", commentContent);
      this.modifyComments = true;
      this.$emit("handleCommentsEvent", commentContent ); 
    },
    updateThreads(){
      console.log("1 displayThread emit updateThreadEvent to Feed");
      this.modifyThread = false;
      this.$emit("updateThreadEvent");
    },
    deleteThread(){
      console.log("Delete thread ",this.thread.id);
 
      axios.delete("/thread/" + this.thread.id, this.$store.getters.getRequestConfig )
              //  .then( response => response.json() )
            .then( res => {
              console.log("res", res);
              if(res.status == 200){
                console.log("2 displayThread emit updateThreadEvent to Feed");
                this.$emit("updateThreadEvent");
              }
              // this.resetValues();
            });
      }
  }
}
</script>

<style scoped>
  .card {
    /* box-shadow: 5px 5px 10px rgba(55, 94, 148, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.4); */
    box-shadow: 5px 5px 10px rgba(43, 58, 77, 0.51), -5px -5px 10px rgba(255, 255, 255, 0.4);
    /* box-shadow: 5px 5px 10px rgba(209, 81, 90, 1), -5px -5px 10px rgba(255, 255, 255, 0.4); */
    
    width: 80% !important;
    background-color: #e1e5e6 !important;
    color: #091f43 !important;
  }
</style>