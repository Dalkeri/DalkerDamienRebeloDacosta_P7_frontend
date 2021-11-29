<template>
    <div class="headerNav">
        <div v-if=" actualRoute == 'home'">
            <div v-if="userConnected != ''">
                <div>img</div>
                <router-link to="/account" v-on:click="routeChanged('account')">Mon compte</router-link>
                <button type="button" v-on:click="disconnect">se déconnecter</button>
            </div>
        </div>
        <div v-else>
            <router-link to="/home" v-on:click="routeChanged('home')">Retour à l'accueil</router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
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
            SIPassword:""
        }
    },
    computed: {
        ...mapState({
            navMenu: ({ navMenu }) => navMenu,
            userConnected: ({userConnected}) => userConnected,
            actualRoute: ({actualRoute}) => actualRoute
            //ajouter user pour savoir si il est là ou pas, si oui, on affiche le connexion / s'inscrire, sinon "Mon profil"
        }),
    },
    methods: {
        disconnect(){
            this.$store.dispatch('userInfo', '');
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