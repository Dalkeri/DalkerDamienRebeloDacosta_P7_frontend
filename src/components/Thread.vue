<template>
  <div class="Thread d-flex justify-content-center">
    <div class="card border-primary mb-4">
      ====================================
      <div class="card-header">{{ thread.User.firstName + " " + thread.User.lastName}}</div>
      <div  class="card-body">
        <div v-if="modifyThread">
          <addThread :thread="thread" @my-event="updateThreads" />
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
        <span><button type="button" v-on:click="modifyThread = !modifyThread">Modifier</button><button type="button" v-on:click="deleteThread">Supprimer</button></span>
        </div>

        <!-- comments -->
        <div v-if="thread.Comments">
          <div class="comments" v-for="comment in thread.Comments" :key="comment.id">
            <Comment :comment="comment" :id="thread.id" />
          </div>
        </div>

        <!-- add comment -->
        <AddComment :threadId="thread.id" />
      
      </div>
    </div>
  </div>
</template>

<script>
import addThread from '../components/addThread.vue'
import Comment from './Comment.vue'
import AddComment from './AddComment.vue'
import { mapState, mapGetters } from "vuex"
import Axios from 'axios'

export default {
  name: 'Thread',
  props: { 
    thread: Object
  },
  data: function() {
    return { 
      modifyThread: false,
     };
  },
  created(){
      // console.log("props", this.thread);
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
      updateThreads(){
        console.log("Thread emit myEvent");
        this.modifyThread = false;
        this.$emit("myEvent");
      },
      deleteThread(){
        console.log("Delete thread ",this.thread.id);
 
        Axios.delete("/thread/" + this.thread.id, this.$store.getters.getRequestConfig )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res);
                if(res.status == 200){
                  console.log("addThread emit myEvent");
                  this.$emit("myEvent");
                }
                // this.resetValues();
              });
      }
  }
}
</script>
