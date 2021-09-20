<template>
  <img src="" alt="Profile picture">
  <br>
  <button type="button">Changer de photo</button>
  <h3>{{ userConnected.firstName }} {{ userConnected.lastName }}</h3>
  <button type="button">Changer de mot de passe</button>
  <div>
    historique des postes / commentaires
  </div> 
</template>

<script>
import { mapState } from "vuex"


export default {
  name: 'Account',

  data: function() {
    return { 
    };
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
        }),
    },
  methods: {

  }
}
</script>
