<template>
  <headerNav />
  <displayUser />
</template>

<script>
import headerNav from '../components/HeaderNav.vue';
import displayUser from '../components/account-user/DisplayUser.vue';

export default {
  name: 'User',
  components: {
    displayUser,
    headerNav
  },
}
</script>
