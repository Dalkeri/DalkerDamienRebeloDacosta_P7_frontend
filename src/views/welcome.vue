<template>
  <!-- <div v-if="userConnected == ''"> -->
    <span>
        <button type="button"  class="btn btn-secondary" v-bind:class="{active: SUBtn}" v-on:click="signupForm">S'inscrire</button>
                    |
        <button type="button"  class="btn btn-secondary" v-bind:class="{active: SIBtn}" v-on:click="loginForm">Se connecter</button>
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
    <!-- </div> -->
</template>

<script>
import Axios from 'axios';
import { mapState } from "vuex"


export default {
    name: 'Welcome',
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
           
            //ajouter user pour savoir si il est là ou pas, si oui, on affiche le connexion / s'inscrire, sinon "Mon profil"
        }),
    },
    methods: {
        loginForm() {
            // console.log("login");
            this.$store.dispatch('stateHeader', 'connectUser');
            this.SIBtn = !this.SIBtn;
            this.SUBtn = false;
        },
        signupForm(){
            // console.log("signin");
            this.$store.dispatch('stateHeader', 'createUser');
            this.SUBtn = !this.SUBtn;
            this.SIBtn = false;
        },
        connect(datas){
            this.$store.dispatch('userInfo', datas.user );
            localStorage.setItem("groupomaniaToken", JSON.stringify(datas.token));
            Axios.defaults.headers.common.Authorization = 'Bearer ' + datas.token;
            console.log("connect", datas.token);
            console.log(Axios.defaults.headers.common.Authorization);
            this.$router.push('home');
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
                        // this.$store.dispatch('userInfo', res.data.user );
                        // localStorage.setItem("groupomaniaToken", JSON.stringify(res.data.token));
                        // this.$router.push('home');
                        this.connect(res.data);
                        this.$store.dispatch('requestConfig', JSON.stringify(res.data.token));
                 })
                 .catch(error => console.log({error}));
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
            
            Axios.post("/user/signup", signUpInfo )
                //  .then( response => response.json() )
                 .then( res => {
                    console.log("res", res)
                    if(res.status == 201){
                        this.connect(res.data);
                        this.$store.dispatch('requestConfig', res.data.token);
                    }
                })
                .catch(error => console.log({error}));

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