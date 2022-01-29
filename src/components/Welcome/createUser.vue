<template>
    <form @submit.prevent="signUp">
        <label for="lname" class="col-sm-2 col-form-label">Nom:</label>
        <input type="text" id="signUpLName" name="signUpLName" v-model="SULName" class="form-control" placeholder="Nom" required>

        <label for="fname" class="col-sm-2 col-form-label">Prenom:</label>
        <input type="text" id="signUpFName" name="signUpFName" v-model="SUFName" class="form-control" placeholder="Prenom" required>

        <label for="email" class="col-sm-2 col-form-label">Email:</label>
        <input type="email" id="signUpEmail" name="signUpEmail" v-model="SUEmail" class="form-control" placeholder="email@example.com" required>

        <label for="password" class="col-sm-2 col-form-label">Mot de passe (minimum 8 caractères):</label>
        <input type="password" id="signUpPassword" name="signUpPassword" v-model="SUPassword" minlength="8" class="form-control" placeholder="Password" required>

        <label for="password" class="col-sm-2 col-form-label">Répétez le mot de passe:</label>
        <input type="password" id="signUpPassword2" name="signUpPassword2" v-model="SUPassword2" minlength="8" class="form-control" placeholder="Password" required>
        <input type="submit" value="Inscription"  class="btn btn-primary">
    </form> 
</template>

<script>
import Axios from 'axios'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'


export default {
    name: 'createUser',
    data() {
        return {
            // createUserForm: false,
            SULName:"",
            SUFName:"",
            SUEmail:"",
            SUPassword:"",
            SUPassword2:"",

        }
    },
    methods: {
        signUp(e){ //ajouter connexion auto ou message pour indiquer la création
            e.preventDefault();

            if(this.SUPassword !== this.SUPassword2){
                createToast("Les deux mots de passes doivent être identiques.",{type: 'danger', timeout:2000, showIcon: true} );
                return;
            }
            
            let mailFormat = `^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`;
            if( !this.SUEmail.match(mailFormat)){
                createToast("Le format de l'email est incorrect.",{type: 'danger', timeout:2000, showIcon: true} );
                return;
            }

            let signUpInfo = {
                firstName: this.SUFName,
                lastName: this.SULName,
                email: this.SUEmail,
                password: this.SUPassword
            }
            
            Axios.post("/user/signup", signUpInfo )
                 .then( res => {
                    if(res.status == 201){
                        this.connect(res.data);
                    //TODO
                    } else if(res.status == 401 || res.status == 500){
                         createToast(res.message,{type: 'danger', timeout:2000, showIcon: true} );
                    }
                })
                .catch(error => {
                    // console.log(error);
                    if(error.response.data.message){
                        createToast(error.response.data.message,{type: 'danger', timeout:2000, showIcon: true} );
                    }
                });

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

    label{
        width: 50%;
    }

    i{
        margin-bottom: 2Opx;
    }
</style>