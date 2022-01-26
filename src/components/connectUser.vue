<template>
    <!-- <form onsubmit="signIn"> -->
    <div class="form-group">
        <form @submit.prevent="signIn">
            <label for="email" class="col-sm-2 col-form-label">Email:</label>
            <input type="email" id="signInEmail" name="signInEmail" v-model="SIEmail" class="form-control" placeholder="email@example.com" required>
            <label for="password" class="col-sm-2 col-form-label">Mot de passe:</label>
            <input type="password" id="signInPassword" name="signInPassword" class="form-control" v-model="SIPassword" required autocomplete="on" placeholder="Password">
            <input type="submit" value="Connexion" class="btn btn-primary">
        </form>
    </div>
     
</template>

<script>
import { mapState } from "vuex"
import Axios from 'axios';

export default {
    name: 'connectUser',
    data() {
        return {
            // connectUserForm: false,
            SIEmail:"",
            SIPassword:"",
        };
    },
     computed: {
        ...mapState({
            navMenu: ({ navMenu }) => navMenu
        }),
    },
    methods: {
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
        connect(datas){
            this.$store.dispatch('userInfo', datas.user );
            localStorage.setItem("groupomaniaToken", JSON.stringify(datas.token));
            Axios.defaults.headers.common.Authorization = 'Bearer ' + datas.token;
            console.log("connect", datas.token);
            console.log(Axios.defaults.headers.common.Authorization);
            this.$router.push('home');
        }
    }
}
</script>

<style scoped lang="scss">
    form{
        display: flex;
        align-items: center;
        margin-right: auto;
        margin-left: auto;
        flex-direction: column;
        width: 88% !important;

        color: white;
    }

    input{
        margin-bottom: 20px;
    }
</style>