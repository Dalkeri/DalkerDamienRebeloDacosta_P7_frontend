<template>
    <div class="headerNav">
        <span>
            <button type="button" v-on:click="signupForm">S'inscrire</button>
            |
            <button type="button" v-on:click="loginForm">Se connecter</button>
        </span>
        <div v-if="navMenu == 'connectUser'">
            <!-- <form onsubmit="signIn"> -->
            <form @submit.prevent="signIn">
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required><br>
                <label for="password">Mot de passe:</label><br>
                <input type="text" id="password" name="password" required><br><br>
                <input type="submit" value="Connexion">
            </form> 
        </div>
        <div v-if="navMenu == 'createUser'">
            <!-- <form onSubmit="SignUp"> -->
            <form @submit.prevent="signUp">
                <label for="lname">Nom:</label><br>
                <input type="text" id="lname" name="lname" required><br>
                <label for="fname">Prenom:</label><br>
                <input type="text" id="fname" name="fname" required><br>
                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required><br>
                <label for="password">Mot de passe:</label><br>
                <input type="text" id="password" name="password" required><br><br>
                <input type="submit" value="Inscription">
            </form> 
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"

export default {
    name: 'headerNav',
    computed: {
        ...mapState({
            navMenu: ({ navMenu }) => navMenu
        }),
    },
    methods: {
        loginForm() {
            // console.log("login");
            this.$store.dispatch('stateHeader', 'connectUser')
        },
        signupForm(){
            // console.log("signin");
            this.$store.dispatch('stateHeader', 'createUser')
        },
        signIn(e){
            e.preventDefault();
            
            console.log("signin");
        },
        signUp(e){
            e.preventDefault();

            console.log("signup");
        }
    },
}
</script>