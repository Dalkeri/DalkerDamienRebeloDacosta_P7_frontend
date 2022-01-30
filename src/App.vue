<template>
  <router-view/>
</template>

<script>
import Axios from 'axios'

export default {
  created(){
    if( localStorage.getItem('groupomaniaToken') ){
      Axios.defaults.headers.common.Authorization = "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'));

        Axios.post("/user/autoLogin", {auto: true} )
              .then( res => {
                this.$store.dispatch('userInfo', res.data.user );
                localStorage.setItem("groupomaniaToken", JSON.stringify(res.data.token));

                if( this.$route.fullPath == '/'){
                  this.$router.push('/home');
                }
              })
              .catch( () => {
                // console.log({err});
                localStorage.removeItem("groupomaniaToken");
                this.$router.push({ name: 'Welcome' });
              });
    }
  }
}
</script>

<style lang="scss">
  body{
      max-width: 1024px;
      margin: auto;
      background-image: linear-gradient(90deg, #d1515a, #091f43);
  }

  hr{
      color: white;
      width: 100%;
  }

  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      // color: #2c3e50;
  }
</style>