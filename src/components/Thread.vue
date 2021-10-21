<template>
  <div class="Thread d-flex justify-content-center">
    <div class="card border-primary mb-4">
      <div class="card-header">{{ threadDatas.User.firstName + " " + threadDatas.User.lastName}}</div>
      <div  class="card-body">
        <div v-if="modifyThread">
          <addThread :threadDatas="threadDatas" @my-event="updateThreads" />
        </div>
        <div v-else>
          <h4 class="card-title">{{ threadDatas.title }}</h4>
          <p class="card-text">{{ threadDatas.content }}</p>
        </div>

        <!-- buttons if owner -->
        <div v-if="threadDatas.userId == userConnected.id ">
        <span><button type="button" v-on:click="modifyThread = !modifyThread">Modifier</button><button type="button" v-on:click="deleteThread">Supprimer</button></span>
        </div>

        <!-- comments -->
        <div v-if="threadDatas.Comments">
          <div class="comments" v-for="comment in threadDatas.Comments" :key="comment.id">
            <Comment :commentDatas="comment" :id="threadDatas.id" />
          </div>
        </div>

        <!-- add comment -->
        <addComment />
      
      </div>
    </div>
  </div>
</template>

<script>
import addThread from '../components/addThread.vue'
import Comment from './Comment.vue'
import addComment from './addComment.vue'
import { mapState } from "vuex"
import Axios from 'axios'
export default {
  name: 'Thread',
  props: { 
    threadDatas: Object
  },
  data: function() {
    return { 
      modifyThread: false,
     };
  },
  created(){
      // console.log("props", this.threadDatas);
  },
  components: {
    addThread,
    Comment,
    addComment
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
            //ajouter user pour savoir si il est là ou pas, si oui, on affiche le connexion / s'inscrire, sinon "Mon profil"
        }),
    },
  methods: {
      updateThreads(){
        console.log("Thread emit myEvent");
        this.modifyThread = false;
        this.$emit("myEvent");
      },
      deleteThread(){
        console.log("Delete thread ",this.threadDatas.id);
        let config = {
          headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
        }
        Axios.delete("/thread/" + this.threadDatas.id, config )
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
