<template>
    <div class="headerNav">
        <div v-if="homepage">
            <img id="groupomaniaLogo" src="../assets/groupomania_logo_with_text.png" alt="Groupomania logo">
            <div>
                <img id="profilPic" :src="this.userConnected.profilPic" alt="Profil picture">
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

export default {
    name: 'HeaderNav',
    data() {
        return {
            homepage: false,
        }
    },
    computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected,            
        }),
    },
    created(){
        if(this.$route.path == "/home"){
            this.homepage = true;
        } else {
            this.homepage = false;
        }
    },
    mouted(){
        if(this.$route.path == "/home"){
            this.homepage = true;
        } else {
            this.homepage = false;
        }
    },
    updated(){
        if(this.$route.path == "/home"){
            this.homepage = true;
        } else {
            this.homepage = false;
        }
    },
    methods: {
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

    #profilPic{
        max-height:100px;
        // padding-top: 100%;
        margin-right: 10px;
        // border-radius: 50%;
        overflow: hidden;
    }

    #groupomaniaLogo{
        height: 50px;
        margin-bottom: 20px;
    }

</style>