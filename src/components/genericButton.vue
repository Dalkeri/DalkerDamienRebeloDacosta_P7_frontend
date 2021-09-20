<template>
  <div>
    <button type="button" :disabled="disableButton">Click Me!</button>
  </div>
</template>

<script>
export default {
  name: 'genericButton',
  props: {
    disableButton: Boolean,
    action: String
  },
  data: function() {
    return { 
      buttonAction: this.action
    };
  },
   watch: {
    disableButton: function(newVal, oldVal) {
      console.log(" disableButton changed from ", oldVal, " to ", newVal);
      // this.disable = this.disableButton;
    }
    
  },
  created(){
    if(this.buttonAction == "create"){
      console.log("ce boutton créera un poste");
    } else if( this.buttonAction == "update"){
      console.log("ce boutton fera un update");
    }
  }
}

</script>
