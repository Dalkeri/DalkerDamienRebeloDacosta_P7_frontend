<template>
  <headerNav />

  <displayUser />
</template>

<script>
import displayUser from '../components/account-user/DisplayUser.vue';
import headerNav from '../components/HeaderNav.vue';

export default {
  components: { 
    displayUser,
    headerNav
    },
  name: 'Account',
}
</script>

<style scoped lang="scss">
  img{
    width: 20%;
    margin: auto;
  }

  .container {
    width: 900px !important;
  }

  button {
    width: 150px;
    margin: auto;
  }
</style>