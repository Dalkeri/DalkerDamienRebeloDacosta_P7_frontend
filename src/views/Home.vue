<template>
  <div class="home">
    <h1>Welcome to this social website</h1>
    <h2>This is your feed, you'll see every post in there</h2>
    <hr/>
    <addThread @my-event="updateThreads" />
    <hr/>
    <Feed  :reloadThreads="reloadThreads" @my-event="updateThreads" />
  </div>
</template>

<script>
// @ is an alias to /src
import addThread from '../components/addThread.vue'
import Feed from '../components/Feed.vue'
// import store from '../store/index.js'

// import { mapState } from "vuex"
import Axios from 'axios';

export default {
  name: 'Home',
  components: {
    Feed,
    addThread
  },
  data: function() {
    return { 
      reloadThreads: false
    };
  },
  methods: {
    // login: function () {
    //     // store.commit('increment');
    //     this.$store.commit('increment');
    //     console.log(this.$store.state.count);
    //     // console.log()
    // }
    updateThreads(){
      console.log("coucou Home");
      this.reloadThreads = !this.reloadThreads;
    }
  },
  created(){
    console.log("created home");
    if( localStorage.getItem('groupomaniaToken') ){
      let config = {
          headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
        }

        Axios.post("/user/autoLogin", {auto: true}, config )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res);
                this.$store.dispatch('userInfo', res.data.user );
                localStorage.setItem("groupomaniaToken", JSON.stringify(res.data.token));
              });

    }
  }
}
</script>
