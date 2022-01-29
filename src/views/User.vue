<template>
  <headerNav />
  <displayUser />
</template>

<script>
// import Axios from 'axios';
// import { useRoute } from 'vue-router';
import headerNav from '../components/headerNav.vue';
import displayUser from '../components/account-user/displayUser.vue';


export default {
  name: 'User',
  components: {
    displayUser,
    headerNav
  },

  data: function() {
    return { 
       
    };
  },
  created(){
    // this.route = useRoute();
    // console.log(this.route.params);
    
    // //IF route.params.id ==  connectedUser.userId go to account route
    // // console.log("userConnected created", this.userConnected);
    // // console.log(this.route.params.id == this.userConnected.userId);    

    //  let config = {
    //       headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
    //  }
    // console.log(config);
    // Axios.post("/user/getUserById", this.route.params, config)
    //      .then( res => {
    //         console.log(res);
    //         this.user = res.data.user; 
    //      });
  },
  updated(){
 
  },
  computed: {

  },
  methods: { 

  }
}
</script>

<style scoped lang="scss">


</style>