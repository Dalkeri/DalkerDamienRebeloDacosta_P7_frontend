<template>
  <div class="messageHandler">
    <div v-if="display">
      <div class="alert alert-dismissible alert-success" v-if="type == 'success'">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        {{message}}
      </div>
      <div class="alert alert-dismissible alert-danger" v-if="type == 'failure'">
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        {{message}}
      </div>
    </div>
      
  </div>
</template>

<script>

export default {
  name: 'messageHandler',

  props: {
      type: String,
      message: String,
      display: Boolean,
  },
  data: function() {
    return { 
    };
  },
  computed: {
 
    },
  created(){
 
  },
  methods: {

  }
}
</script>

<style scoped>
    .messageHandler{
      /* position: absolute; */
        width: 50% !important;
        margin: auto;
    }
</style>