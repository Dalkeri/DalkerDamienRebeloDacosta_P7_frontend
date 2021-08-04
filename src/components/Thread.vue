<template>
  <div class="Thread">
    <h4>==================================================</h4>
    <div v-if="modifyThread">
      <addThread :threadDatas="threadDatas" />
    </div>
    <div v-else>
      <h3>{{ threadDatas.title }}</h3>
      <p>{{ threadDatas.content }}</p>
      <p>par: {{ threadDatas.User.firstName + " " + threadDatas.User.lastName}}</p>
    </div>
    <span><button type="button" v-on:click="modifyThread = !modifyThread">Modifier</button><button type="button">Supprimer</button></span>
  </div>
</template>

<script>
import addThread from '../components/addThread.vue'

export default {
  name: 'Thread',
  props: {
    threadDatas: Object
  },
  data: function() {
    return { 
      modifyThread: false,
     };
  },
  created(){
      console.log("props", this.threadDatas);
  },
  components: {
    addThread
  }
  // methods: {
  //     async modifyThread(){
  //       alert('modify');
  //     }
  // },
}
</script>