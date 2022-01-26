<template>
    <div class="headerNav">
        <div v-if="homepage">
            <div>
                <img :src="this.userConnected.profilPic" alt="Profil picture">
                <!-- <router-link to="/account">Mon compte</router-link> -->
                <router-link to="/account">{{this.userConnected.firstName}} {{this.userConnected.lastName}}</router-link>
            </div>
        </div>
        <div v-else>
            <router-link to="/home">Retour à l'accueil</router-link>
        </div>
        <hr />
    </div>
</template>

<script>
import { mapState } from "vuex";
// import { useRoute } from 'vue-router';

// import Axios from 'axios';


export default {
    name: 'headerNav',
    data() {
        return {
            homepage: false,
        }
    },
    computed: {
        ...mapState({
            navMenu: ({ navMenu }) => navMenu,
            userConnected: ({userConnected}) => userConnected,
            // actualRoute: ({actualRoute}) => actualRoute
            
        }),
    },
    created(){
        // let route = useRoute();
        console.log("headernav created", this.$route.path);
        if(this.$route.path == "/home"){
            this.homepage = true;
        } else {
            this.homepage = false;
        }
    },
    mouted(){
        console.log("headernav mounted", this.$route.path);
        if(this.$route.path == "/home"){
            this.homepage = true;
        } else {
            this.homepage = false;
        }
    },
    updated(){
        console.log("headernav  updated", this.$route.path);
        if(this.$route.path == "/home"){
            this.homepage = true;
        } else {
            this.homepage = false;
        }
    },
    methods: {
        // disconnect(){
        //     this.$store.dispatch('userInfo', '');
        //     this.$store.dispatch('requestConfig', '');
        //     localStorage.removeItem("groupomaniaToken");
        //     this.$router.push('/');
        // },
        // routeChanged(newRoute){
        //     console.log("my account");
        //     this.$store.dispatch('actualRoute', newRoute);

        // },
        myAccount(){
            this.$router.push('/account');

        }
    },
}
</script>

<style lang="scss">
    .headerNav{
        margin-top: 20px;
    }

    button{
        margin-right: 10px;
        margin-left: 10px;
    }
    img{
        width:100px;
        // height:50px;
        margin-right: 10px;
        // border-radius: 50%;
        overflow: hidden;
    }

    hr{
        color: white;
    }
</style>