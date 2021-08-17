<template>
  <div class="Feed">
    <div class="threads" v-if="datasFetched">
      <section class="thread" v-for="thread in threads" :key="thread.id">
          <Thread :threadDatas="thread"/>
      </section>
      <!-- <Thread v-bind="threads"/> -->
    </div>
    <div class="loading" v-else>
      <h3>Loading ...</h3>
      <!-- composant loading -->
    </div>
  </div>
</template>

<script>
import Thread from './Thread.vue'
import Axios from 'axios';


export default {
  name: 'Feed',
  components: {
    Thread
  },
  data: function() {
    return { 
      threads: [],
      datasFetched: false
     };
  },
  methods: {
    getThreads(){
      //   const res = await fetch("http://localhost:3000/api/thread/");
      //   const results = await res.json();
      //   console.log("results", results);
      //   if(!res.ok){
      //     console.log("error while fetching");
      //   } else {
      //     this.datasFetched = true;
      //     return results;
      //   }
      // }

      console.log("getThreads");
      Axios.get("/thread/")
                 .then(res => {
                    console.log(".then", res.data);
                    this.datasFetched = true;
                    // return res.data;
                    this.threads = res.data;
                 })
                 .catch(error => console.log("trouble while fetching datas: ", error));      
      }
  },
  created(){
      this.getThreads();
      // this.threads = await this.getThreads();
      console.log("this.threads", this.threads);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
