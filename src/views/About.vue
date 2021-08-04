<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Feed />

  </div>
</template>


<script>
// @ is an alias to /src
import Feed from '../components/Feed.vue'
// import store from '../store/index.js'

export default {
  name: 'About',
  components: {
    Feed
  }
}
</script>
