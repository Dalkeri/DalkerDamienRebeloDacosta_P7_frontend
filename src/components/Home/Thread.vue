<template>
  <div class="Thread d-flex justify-content-center">
    <div class="card border-secondary mb-4">
      <div class="card-header">
        <h3 class="card-title">{{ thread.title }}</h3>
        par <router-link :to="{ name: 'User', params: { id: thread.User.id }}">{{ thread.User.firstName + " " + thread.User.lastName}}</router-link>
        </div>
      <div  class="card-body">
        <div v-if="modifyThread">
          <addThread :thread="thread" @update-thread-event="updateThreads" />
        </div>
        <div v-else>
          <p class="card-text">{{ thread.content }}</p>
          <div v-if="thread.image">
            <img :src="thread.image" alt="image of the thread">
          </div>
        </div>

        <!-- buttons if owner or admin -->
        <div v-if="thread.userId == userConnected.id || userConnected.admin">
        <span>
          <button type="button" class="btn btn-primary" v-on:click="modifyThread = !modifyThread" v-if="!modifyThread">Modifier</button>
          <button type="button" class="btn btn-primary" v-on:click="modifyThread = !modifyThread" v-if="modifyThread">Annuler</button>
          <button type="button" class="btn btn-primary" v-on:click="deleteThread">Supprimer</button>
        </span>
        </div>

        <!-- comments -->
        <div v-if="thread.Comments">
          <div class="comments" v-for="comment in thread.Comments" :key="comment.id">
            <comment :comment="comment" :id="thread.id" @handle-comments-event="handleComments"/>
          </div>
        </div>

        <!-- add comment -->
        <addComment :threadId="thread.id" @handle-comments-event="handleComments" />
      
      </div>
    </div>
  </div>
</template>

<script>
import addThread from './AddThread.vue'
import comment from './Comment.vue'
import addComment from './AddComment.vue'
import { mapState } from "vuex"
import axios from 'axios'


export default {
  name: 'displayThread',
  props: { 
    thread: Object,
  },
  data: function() {
    return { 
      modifyThread: false,
      threadUserId: '',
      modifyComments: false,
     };
  },
  components: {
    addThread,
    comment,
    addComment
  },
  computed: {
    ...mapState({
      userConnected: ({userConnected}) => userConnected
    })
  },
  methods: {
    handleComments(commentContent) {
      this.modifyComments = true;
      this.$emit("handleCommentsEvent", commentContent ); 
    },
    updateThreads(){
      this.modifyThread = false;
      this.$emit("updateThreadEvent");
    },
    deleteThread(){
 
      axios.delete("/thread/" + this.thread.id )
            .then( res => {
              console.log("res", res);
              if(res.status == 200){
                this.$emit("updateThreadEvent");
              }
            });
      }
  }
}
</script>

<style scoped>
  .card {
    width: 88% !important;

  }

  .card-text{
    margin-bottom: 20px;
  }

  img {
    width: 75%;
    margin-bottom: 50px;
  }
</style>