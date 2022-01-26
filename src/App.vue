<template>
  <div id="nav">
    <!-- <createUser />
    <div> | </div> 
    <connectUser /> -->

    <!-- <headerNav /> -->

    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->
  </div>
  <router-view/>
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view> -->
</template>

<script>
// import createUser from './components/createUser.vue'
// import connectUser from './components/connectUser.vue'
// import headerNav from './components/headerNav.vue'
import Axios from 'axios'

export default {
  components: {
    // headerNav
    // createUser,
    // connectUser
  },
  created(){
    console.log("created app");
    if( localStorage.getItem('groupomaniaToken') ){
      Axios.defaults.headers.common.Authorization = "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'));
      // let config = {
      //     headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
      //   }
        Axios.post("/user/autoLogin", {auto: true} )
                //  .then( response => response.json() )
              .then( res => {
                console.log("res", res.data);
                this.$store.dispatch('userInfo', res.data.user );
                localStorage.setItem("groupomaniaToken", JSON.stringify(res.data.token));
                this.$store.dispatch('requestConfig',localStorage.getItem('groupomaniaToken'));
                if( this.$route.fullPath == '/'){
                  this.$router.push('/home');
                }
              })
              .catch(err => {
                console.log(err.response);
                localStorage.removeItem("groupomaniaToken");
                this.$router.push({ name: 'Welcome' });
              });

    }
  }
  
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  // padding: 30px;
  // display: flex;
  // justify-content: center;

  // a {
  //   font-weight: bold;
  //   color: #2c3e50;

  //   &.router-link-exact-active {
  //     color: #42b983;
  //   }
  // }
}
</style>
