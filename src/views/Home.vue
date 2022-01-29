<template>
  <headerNav />
  <div class="home">
    <addThread @update-thread-event="updateThreads" />
    <hr/>
    <feed  :reloadThreads="reloadThreads" @my-event="updateThreads" />
  </div>
</template>

<script>
import addThread from '../components/Home/AddThread.vue';
import feed from '../components/Home/Feed.vue';
import headerNav from '../components/HeaderNav.vue';

export default {
  name: 'Home',
  components: {
    headerNav,
    feed,
    addThread
  },
  data: function() {
    return { 
      reloadThreads: false
    };
  },
  methods: {
    updateThreads(){
      this.reloadThreads = !this.reloadThreads;
    }
  }
}
</script>
