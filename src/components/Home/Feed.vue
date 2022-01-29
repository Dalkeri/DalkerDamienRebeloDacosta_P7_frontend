<template>
  <div class="Feed">
    <button type="button" v-on:click="test('coucou')">Click Me!</button>


    <div class="threads" v-if="datasFetched">
      <section class="thread" v-for="thread in threads" :key="thread.id">
          <displayThread :thread="thread"  @update-thread-event="getThreads" @handle-comments-event="handleComments"/>
      </section>
    </div>
    <div class="loading" v-else>
      <h3>Loading ...</h3>
    </div>
  </div>
</template>

<script>
import displayThread from './displayThread.vue'
import axios from 'axios';
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'



export default {
  name: 'Feed',
  components: {
    displayThread,
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
    test(text){
      console.log("function test");
      createToast(text,{type: 'success', timeout:2000, showIcon: true} );
    },
    handleComments(commentContent) {
      console.log("Feed received event updateCommentsEvent", commentContent);
      // console.log("this.threads", this.threads);

      //We look for the thread in which the comment is supposedly in
      let thread = this.threads.find( thread => thread.id == commentContent.threadId);
      console.log("thread", thread);

      //We look in the array of comments to see if we can find this comment
      let comment = thread.Comments.find( comment =>  comment.id == commentContent.id);
      console.log("comment", comment);
      console.log("index", thread.Comments.indexOf(comment));
      if(commentContent.action == "delete"){
        thread.Comments.splice(thread.Comments.indexOf(comment), 1);
        // console.log('delete');
      }

      //undefined means the comment we added does not currently exist in the array
      if(!comment){
        thread.Comments.push(commentContent);
      } else { //comment already exist so it's an update
        console.log("we are in the else");
        comment.content = commentContent.content;
        console.log(comment);
      }

      // this.$emit("updateCommentsEvent", commentContent ); //TODO
    },
    updateThreads(){
      console.log("Feed received event updateThreadEvent");
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
            .catch(error => {
              console.log(error);
              if(error.response.data.message){
                createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
            });      
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
