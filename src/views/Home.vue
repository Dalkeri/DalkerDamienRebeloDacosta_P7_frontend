<template>
  <headerNav />
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
import addThread from '../components/addThread.vue';
import Feed from '../components/Feed.vue';
import headerNav from '../components/headerNav.vue';

// import store from '../store/index.js'

// import { mapState } from "vuex"

export default {
  name: 'Home',
  components: {
    headerNav,
    Feed,
    addThread
  },
  data: function() {
    return { 
      reloadThreads: false
    };
  },
  created(){
    console.log("CREATED HOME");
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
  }
}
</script>
