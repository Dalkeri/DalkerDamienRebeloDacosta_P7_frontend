<template>
    <div class="headerNav">
        <div v-if="homepage">
            <div>
                <div>img</div>
                <router-link to="/account">Mon compte</router-link>
                <button type="button" v-on:click="disconnect">se déconnecter</button>
            </div>
        </div>
        <div v-else>
            <router-link to="/home">Retour à l'accueil</router-link>
        </div>
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
            SULName:"",
            SUFName:"",
            SUEmail:"",
            SUPassword:"",
            SUPassword2:"",

            errorMessage:"",

            SIEmail:"",
            SIPassword:"",

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
        disconnect(){
            this.$store.dispatch('userInfo', '');
            this.$store.dispatch('requestConfig', '');
            localStorage.removeItem("groupomaniaToken");
            this.$router.push('/');
        },
        routeChanged(newRoute){
            console.log("my account");
            this.$store.dispatch('actualRoute', newRoute);

        }
    },
}
</script>

<style scoped>
    .btn{
        box-shadow: 5px 5px 10px rgb(17 18 18 / 35%), -5px -5px 10px rgb(240 141 141 / 40%);
        /* box-shadow: 5px 5px 10px rgb(209 81 90 / 100%), -5px -5px 10px rgb(240 141 141 / 40%); */
        background-color: #e1e5e6 !important;
        color: #091f43 !important;
    }
    .btn.active{
        /* box-shadow: inset 0 3px 5px rgb(17 18 18 /35%); */
        box-shadow: inset 0 3px 5px rgb(17 18 18 /65%);
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