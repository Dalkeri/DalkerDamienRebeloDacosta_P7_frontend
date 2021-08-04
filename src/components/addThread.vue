<template>
  <div class="addThread">
    <form>
        <label for="fname">Title:</label><br>
        <input type="text" id="fname" :value="this.datas ? this.datas.title  : ''"><br>
        <label for="lname">Content:</label><br>
        <input type="text" id="lname" :value="this.datas ? this.datas.content  : ''"><br><br> 
        <!-- textarea -->
        <input type="button" v-on:click="createThread" value="Poster">
    </form> 
  </div>
</template>

<script>

export default {
  name: 'addThread',
  props: {
    threadDatas: Object
  },
  data: function() {
    return { 
      datas: this.threadDatas
    };
  },
  methods: {
      async createThread(){
        const res = await fetch( "http://localhost:3000/api/thread/modify", {
                                  method: 'POST',
                                  headers: {
                                  'Content-Type': 'application/json',
                                  },
                                  body: JSON.stringify(this.datas)
                              })
        const results = await res.json();
        console.log("results", results);
        if(!res.ok){
          console.log("error while fetching");
        } else {
          this.datasFetched = true;
          return results;
        }
      }
  }
}

</script>


