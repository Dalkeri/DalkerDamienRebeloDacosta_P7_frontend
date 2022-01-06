<template>
  <headerNav />
  <!-- <displayThread /> -->

  <div class="Thread d-flex justify-content-center">
    <div class="card border-primary mb-4">
      ====================================
      <div class="card-header">
        <router-link :to="{ name: 'User', params: { id: thread.User.id ? thread.User.id : 0 }}">{{ thread.User.firstName + " " + thread.User.lastName}}</router-link>
        </div>
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
import Comment from '../components/Comment.vue'
import AddComment from '../components/AddComment.vue'
import { mapState, mapGetters } from "vuex"
// import displayThread from '../components/displayThread.vue';
import axios from 'axios'
import { useRoute } from 'vue-router'

export default {
  name: 'Thread',
  components: {
    addThread,
    Comment,
    AddComment
  },
  data: function() {
    return { 
       thread: '',
    };
  },
  async beforeCreate(){
    this.route = useRoute();
    console.log(this.route.params);
    if(this.route.params){
        await axios.get("http://localhost:3000/api/thread/"+this.route.params.id)
                           .then(res => {
                              console.log(".then", res.data);
                              // this.datasFetched = true;
                              // return res.data;
                              this.thread = res.data;
                              // this.$emit("myEvent");
                            })
                           .catch(error => console.log("trouble while fetching datas: ", error));
      }


    // //IF route.params.id ==  connectedUser.userId go to account route
    // // console.log("userConnected created", this.userConnected);
    // // console.log(this.route.params.id == this.userConnected.userId);    

    //  let config = {
    //       headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
    //  }
    // console.log(config);
    // Axios.post("/user/getUserById", this.route.params, config)
    //      .then( res => {
    //         console.log(res);
    //         this.user = res.data.user; 
    //      });
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
 
        axios.delete("/thread/" + this.thread.id, this.$store.getters.getRequestConfig )
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