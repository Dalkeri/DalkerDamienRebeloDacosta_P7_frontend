<template>
    <div class="createUser">
        <button type="button" v-on:click="$store.dispatch('stateHeader', 'createUser')">S'inscrire</button>
        <div v-if="navMenu == 'createUser'">
            <form>
                <label for="fname">Nom:</label><br>
                <input type="text" id="fname" name="fname" value="Nom"><br>
                <label for="lname">Prenom:</label><br>
                <input type="text" id="lname" name="lname" value="Prenom"><br>
                <label for="lname">Email:</label><br>
                <input type="text" id="lname" name="lname" value="Email"><br>
                <label for="lname">Mot de passe:</label><br>
                <input type="text" id="lname" name="lname" value="Mot de passe"><br><br>
                <input type="submit" value="Inscription">
            </form> 
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
// import store from '../store/index.js'


export default {
    name: 'createUser',
    data() {
        return {
            // createUserForm: false,
        }
    },
    computed: {
        ...mapState({
            navMenu: ({ navMenu }) => navMenu
        }),
    }

   
}
</script>

<style scoped lang="scss">
    // form{
    //     display: flex;
    //     justify-content: center;
    // }
</style>