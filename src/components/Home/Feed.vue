<template>
  <div class="Feed">
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
import displayThread from './Thread.vue'
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
    handleComments(commentContent) {
      //We look for the thread in which the comment is supposedly in
      let thread = this.threads.find( thread => thread.id == commentContent.threadId);

      //We look in the array of comments to see if we can find this comment
      let comment = thread.Comments.find( comment =>  comment.id == commentContent.id);

      if(commentContent.action == "delete"){
        thread.Comments.splice(thread.Comments.indexOf(comment), 1);
      }

      //undefined means the comment we added does not currently exist in the array
      if(!comment){
        thread.Comments.push(commentContent);
      } else { //comment already exist so it's an update
        comment.content = commentContent.content;
      }
    },
    updateThreads(){
      this.getThreads();
    },
    getThreads(){
      axios.get("http://localhost:3000/api/thread/")
            .then(res => {
                this.datasFetched = true;
                this.threads = res.data;
              })
            .catch(error => {
              if(error.response.data.message){
                createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
              }
            });      
      }
  },
  created(){
    this.getThreads();
  }
}
</script>

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
