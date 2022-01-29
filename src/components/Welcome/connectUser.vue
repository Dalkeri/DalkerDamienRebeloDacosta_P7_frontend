<template>
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
import Axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'

export default {
    name: 'connectUser',
    data() {
        return {
            SIEmail:"",
            SIPassword:"",
        };
    },
    methods: {
        signIn(e){
            e.preventDefault();
            
            let signInInfo = {
                email: this.SIEmail,
                password: this.SIPassword
            }

            Axios.post("/user/login", signInInfo )
                .then( res => {
                    console.log("res", res);
                    if(res.status == 200){
                        this.connect(res.data);
                    } else if(res.status == 401 || res.status == 500){
                        createToast(res.message,{type: 'danger', timeout:2000, showIcon: true} );
                    }   
                 })
                .catch(error => {
                    // console.log({error});
                    createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
                })
        },
        connect(datas){
            this.$store.dispatch('userInfo', datas.user );
            localStorage.setItem("groupomaniaToken", JSON.stringify(datas.token));
            Axios.defaults.headers.common.Authorization = 'Bearer ' + datas.token;
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