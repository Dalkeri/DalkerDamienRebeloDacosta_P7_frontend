<template>
  <div class="home">
    <h1>Welcome to this social website</h1>
    <h2>This is your feed, you'll see every post in there</h2>
    <hr/>
    <addThread />
    <hr/>
    <Feed  @myevent="updateThreads" />
  </div>
</template>

<script>
// @ is an alias to /src
import addThread from '../components/addThread.vue'
import Feed from '../components/Feed.vue'
// import store from '../store/index.js'

export default {
  name: 'Home',
  components: {
    Feed,
    addThread
  },
  data: function() {
    return { 
      token: ''
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
      console.log("cocou");
    },
    async connexion(){
        const res = await fetch( "http://localhost:3000/api/auth/login", {
                                  method: 'POST',
                                  headers: {
                                  'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify(
                                    {
                                        "email": "Damien1@Damien1.com",
                                        "password": "Damien1Pass"
                                    }
                                  )
                              })
        const results = await res.json();
        console.log("result connexion", results);
        console.log("res connexion", res);
        if(!res.ok){
          console.log("error while connecting");
        } else {
          // this.token = results.token;
          console.log("connexion success");
          this.$store.commit('saveToken', results.token);
          // return true;
        }
      }
  }
}
</script>
