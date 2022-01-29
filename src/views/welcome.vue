<template>
    <div class="welcome">
        <img src="../assets/groupomania_logo_with_text.png" alt="groupomania logo">
        <div>
            <span>                 
                <button type="button" class="btn btn-secondary"  v-on:click="loginForm">Se connecter</button>
                <button type="button" class="btn btn-secondary" v-on:click="signupForm">S'inscrire</button>
            </span>
        </div>
        <div v-if="state == 'connectUser'">
            <connectUser />
        </div>
        <div v-else>
            <createUser />
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
import connectUser from '../components/Welcome/connectUser.vue';
import createUser from '../components/Welcome/createUser.vue';


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
    methods: {
        loginForm() {
            this.state = "connectUser";
        },
        signupForm(){
            this.state = "createUser";
        },
        connect(datas){
            this.$store.dispatch('userInfo', datas.user );
            localStorage.setItem("groupomaniaToken", JSON.stringify(datas.token));
            Axios.defaults.headers.common.Authorization = 'Bearer ' + datas.token;
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
    }

    img{
        margin-top: 50px;
        width: 75%;
    }
</style>