<template>
  <div class="Thread">
    <h4>==================================================</h4>
    <div v-if="modifyThread">
      <addThread :threadDatas="threadDatas" @my-event="updateThreads" />
    </div>
    <div v-else>
      <h3>{{ threadDatas.title }}</h3>
      <p>{{ threadDatas.content }}</p>
      <!-- <p>par: {{ threadDatas.User.firstName + " " + threadDatas.User.lastName}}</p> -->
    </div>
    <div v-if="threadDatas.userId == userConnected.id ">
    <span><button type="button" v-on:click="modifyThread = !modifyThread">Modifier</button><button type="button" v-on:click="deleteThread">Supprimer</button></span>
    </div>
  </div>
</template>

<script>
import addThread from '../components/addThread.vue'
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
    addThread
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