<template>
  <!-- <div v-if="userConnected == ''"> -->
    <span>                 
        <button type="button" class="btn btn-secondary"  v-on:click="loginForm">Se connecter</button>
         <button type="button" class="btn btn-secondary" v-on:click="signupForm">S'inscrire</button>
        </span>
        <!-- component connect -->
        <div v-if="state == 'connectUser'">
            <connectUser />
        </div>
        <!-- component create -->
        <div v-if="state == 'createUser'">
            <createUser />
        </div>
    <!-- </div> -->
</template>

<script>
import Axios from 'axios'
import connectUser from '../components/connectUser.vue';
import createUser from '../components/createUser.vue';
// import { mapState } from "vuex"


export default {
    name: 'Welcome',
    components: {
        connectUser,
        createUser
    },
    data() {
        return {
            state: "connectUser",

    
        }
    },
    // computed: {

    // },
    methods: {
        loginForm() {
            // console.log("login");
            // this.$store.dispatch('stateHeader', 'connectUser');
            this.state = "connectUser";
            // this.SIBtn = !this.SIBtn;
            // this.SUBtn = false;
        },
        signupForm(){
            // console.log("signin");
            // this.$store.dispatch('stateHeader', 'createUser');
            this.state = "createUser";
            // this.SUBtn = !this.SUBtn;
            // this.SIBtn = false;
        },
        connect(datas){
            this.$store.dispatch('userInfo', datas.user );
            localStorage.setItem("groupomaniaToken", JSON.stringify(datas.token));
            Axios.defaults.headers.common.Authorization = 'Bearer ' + datas.token;
            console.log("connect", datas.token);
            console.log(Axios.defaults.headers.common.Authorization);
            this.$router.push('home');
        },
        
    },
}
</script>

<style scoped>
    .btn{
        margin-top: 20px;
        margin-bottom: 20px;
        margin-right: 10px;
        margin-left: 10px;

        /* box-shadow: 5px 5px 10px rgb(17 18 18 / 35%), -5px -5px 10px rgb(240 141 141 / 40%); */
        /* box-shadow: 5px 5px 10px rgb(209 81 90 / 100%), -5px -5px 10px rgb(240 141 141 / 40%); */
        /* background-color: #e1e5e6 !important; */
        /* color: #091f43 !important; */
    }
    .btn.active{
        /* box-shadow: inset 0 3px 5px rgb(17 18 18 /35%); */
        /* box-shadow: inset 0 3px 5px rgb(17 18 18 /65%); */
    }

    .true{
        /* background-color: #d1515a !important; */
        /* outline: 0; a */
        /* box-shadow: 0 0 0 0.25rem rgba(43, 58, 77, 0.51); */
        /* box-shadow: 0 0 0 0.25rem rgba(55, 141, 252, 0.25); */
        
        /* box-shadow: 0 0 0 0.25rem rgba(17, 18, 18, 0.35); a*/
        /* border-color: #d1515a !important; a*/
    }
</style>