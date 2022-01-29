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