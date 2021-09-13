<template>
  <div class="addThread">
    <form @submit.prevent="createThread">
        <label for="fname">Title:</label><br>
        <input type="text" v-model="threadTitle" id="threadTitle" name="threadTitle"><br>
        <label for="lname">Content:</label><br>
        <input type="textarea" v-model="threadContent" id="threadContent"  name="threadContent"><br><br> 
        <!-- textarea -->
        <input type="submit" value="Poster">
    </form> 
  </div>
</template>

<script>

import Axios from 'axios';

export default {
  name: 'addThread',
  props: {
    threadDatas: Object
  },
  data: function() {
    return { 
      datas: this.threadDatas,
      threadTitle:"",
      threadContent:"",
    };
  },
  methods: {
      createThread(e){
        e.preventDefault();

        console.log("createThread");

        let threadInfos = {
          title: this.threadTitle,
          content: this.threadContent
        }

        let config = {
          headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
        }

        // console.log("config", config);

        Axios.post("/thread/create", threadInfos, config )
                //  .then( response => response.json() )
              .then( res => {
                   
                console.log("res", res);
                this.$emit("myevent");
                console.log("res2", res);

                 
              });

        // const res = await fetch( "http://localhost:3000/api/thread/modify", {
        //                           method: 'POST',
        //                           headers: {
        //                           'Content-Type': 'application/json',
        //                           },
        //                           body: JSON.stringify(this.datas)
        //                       })
        // const results = await res.json();
        // console.log("results", results);
        // if(!res.ok){
        //   console.log("error while fetching");
        // } else {
        //   this.datasFetched = true;
        //   return results;
        // }
      }
  }
}

</script>
