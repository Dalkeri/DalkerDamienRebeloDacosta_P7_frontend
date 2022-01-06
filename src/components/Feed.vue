<template>
  <div class="Feed">
    <messageHandler type="success" message="coucou" display="true" />
    <div class="threads" v-if="datasFetched">
      <section class="thread" v-for="thread in threads" :key="thread.id">
          <displayThread :thread="thread"  @my-event="getThreads"/>
      </section>
      <!-- <displayThread v-bind="threads"/> -->
    </div>
    <div class="loading" v-else>
      <h3>Loading ...</h3>
      <!-- composant loading -->
    </div>
  </div>
</template>

<script>
import displayThread from './displayThread.vue'
import messageHandler from './messageHandler.vue'
import axios from 'axios';


export default {
  name: 'Feed',
  components: {
    displayThread,
    messageHandler,
  },
  props: {
    reloadThreads: Boolean
  },
  data: function() {
    return { 
      threads: [],
      datasFetched: false
    };
  },
  watch: {
    reloadThreads: function(newVal, oldVal) {
      console.log("Feed reloadThread changed from ", oldVal, " to ", newVal);
      this.getThreads();
    }
  },
  methods: {
    updateThreads(){
      console.log("update");
      this.getThreads();
    },
    getThreads(){
      console.log("getThreads");
      axios.get("http://localhost:3000/api/thread/")
            .then(res => {
                // console.log(".then", res.data);
                this.datasFetched = true;
                // return res.data;
                this.threads = res.data;
                // this.$emit("myEvent");
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
