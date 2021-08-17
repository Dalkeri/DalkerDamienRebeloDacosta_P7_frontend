<template>
    <div class="connectUser">
        <button type="button" v-on:click="$store.dispatch('stateHeader', 'connectUser')">Se connecter</button>
        <div v-if="navMenu == 'connectUser'">
            <form>
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

export default {
    name: 'connectUser',
    data() {
        return {
            // connectUserForm: false,
        };
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