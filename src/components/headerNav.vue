<template>
    <div class="headerNav">
        <div v-if=" actualRoute == 'home'">
            <div>img</div>
            <div v-if="userConnected == ''">
                <span>
                    <button type="button" class="btn btn-secondary" v-bind:class="{active: SUBtn}" v-on:click="signupForm">S'inscrire</button>
                    |
                    <button type="button" class="btn btn-secondary" v-bind:class="{active: SIBtn}" v-on:click="loginForm">Se connecter</button>
                </span>
                <!-- component connect -->
                <div v-if="navMenu == 'connectUser'">
                    <!-- <form onsubmit="signIn"> -->
                    <form @submit.prevent="signIn">
                        <label for="email">Email:</label><br>
                        <input type="email" id="signInEmail" name="signInEmail" v-model="SIEmail" required><br>
                        <label for="password">Mot de passe:</label><br>
                        <input type="password" id="signInPassword" name="signInPassword" v-model="SIPassword" required><br><br>
                        <input type="submit" value="Connexion">
                    </form> 
                </div>
                <!-- component create -->
                <div v-if="navMenu == 'createUser'">
                    <!-- <form onSubmit="SignUp"> -->
                    <form @submit.prevent="signUp">
                        <label for="lname">Nom:</label><br>
                        <input type="text" id="signUpLName" name="signUpLName" v-model="SULName" required><br>
                        <label for="fname">Prenom:</label><br>
                        <input type="text" id="signUpFName" name="signUpFName" v-model="SUFName" required><br>
                        <label for="email">Email:</label><br>

                        <!-- regex (+ back) -->
                        <input type="email" id="signUpEmail" name="signUpEmail" v-model="SUEmail" pattern="[a-z0-9\._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}" required><br>
                        <label for="password">Mot de passe:</label><br>

                        <!-- check mdp sécurisé -->
                        <input type="text" id="signUpPassword" name="signUpPassword" v-model="SUPassword" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required><br>
                        <input type="text" id="signUpPassword2" name="signUpPassword2" v-model="SUPassword2" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required><br>
                        <i>passwords must be 8 characters long, with at least one uppercase letter, at least one lowercase letter, at least one digit or special character !</i><br>
                        <input type="submit" value="Inscription">
                        <div id="errorMessage">{{ errorMessage }}</div>
                    </form> 
                </div>
            </div>
            <!-- component connected -->
            <div v-if="userConnected != ''">
                <router-link to="/account" v-on:click="routeChanged('account')">Mon compte</router-link>
                <button type="button" v-on:click="disconnect">se déconnecter</button>
            </div>
        </div>
        <div v-else>
            <router-link to="/" v-on:click="routeChanged('home')">Retour à l'accueil</router-link>
        </div>
        
    </div>
</template>

<script>
import { mapState } from "vuex"
import Axios from 'axios';


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


            SUBtn: false,
            SIBtn: false
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
        loginForm() {
            // console.log("login");
            this.SIBtn = !this.SIBtn;
            this.SUBtn = false;
            this.$store.dispatch('stateHeader', 'connectUser')
        },
        signupForm(){
            // console.log("signin");
            this.SUBtn = !this.SUBtn;
            this.SIBtn = false;
            this.$store.dispatch('stateHeader', 'createUser')
        },
        signIn(e){
            e.preventDefault();
            
            console.log("signin");

            let signInInfo = {
                email: this.SIEmail,
                password: this.SIPassword
            }

            console.log("signInInfo", signInInfo);

             Axios.post("/user/login", signInInfo )
                //  .then( response => response.json() )
                 .then( res => {
                        console.log("res", res);
                        this.$store.dispatch('userInfo', res.data.user );
                        localStorage.setItem("groupomaniaToken", JSON.stringify(res.data.token));

                 });
        },
        disconnect(){
            this.$store.dispatch('userInfo', '');
            localStorage.removeItem("groupomaniaToken");

        },
        signUp(e){ //ajouter connexion auto ou message pour indiquer la création
            e.preventDefault();
        
            if(this.SUPassword !== this.SUPassword2){
                this.errorMessage = "Les deux mots de passes doivent être différents";
                return;
            }
            this.errorMessage = '';
            let signUpInfo = {
                firstName: this.SUFName,
                lastName: this.SULName,
                email: this.SUEmail,
                password: this.SUPassword
            }

            console.log("signup", signUpInfo);
            // fetch( "http://localhost:3000/api/user/signup", {   
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(signUpInfo)
            // })
            // .then( response => response.json() )
            // .then( res => console.log(res));            
            
            Axios.post("/user/signup", signUpInfo )
                //  .then( response => response.json() )
                 .then( res => {
                     console.log("res", res)
                     
                });
        

            // let res = await Axios.post('http://localhost:3000/signup/', signUpInfo);
            // console.log(res.data);

            // Axios.post({
            //     method: 'post',
            //     url: '/user/signup/',
            //     data: signUpInfo
            // })
            // .then( response => response.json() );
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