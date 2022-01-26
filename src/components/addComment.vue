<template>
  <div class="AddComment">
    <input type="text" v-model="commentContent" id="commentContent" name="commentContent">
    <button type="button" v-on:click="createComment">Commenter</button>
  </div>
</template>

<script>
import Axios from 'axios'
import { mapState, mapGetters } from "vuex"

export default {
  name: 'AddComment',
  props: {
    // comment: Object,
    comment: String,
    commentId: Number,
    threadId: Number,
  },
  data: function() {
    return { 
    //   datas: this.comment,
      commentContent:"",
    //   threadId: this.idThread,
    //   commentId: this.idComment,
    };
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
        }),
        ...mapGetters([
          'getRequestConfig'
        ])
  },
  created(){
    // if( this.comment ){
      this.commentContent = this.comment
    // }
  },
  methods: {
    createComment(e){
        e.preventDefault();
        console.log("ajout de commentaire", this.commentContent);
        if( this.commentContent ){
            let commentInfos = {
                content: this.commentContent,
                visible: true,
                threadId: this.threadId,
                userId: this.userConnected.id
            };
            console.log({commentInfos});

            console.log("request", this.$store.getters.getRequestConfig);

            //if we didn't get props it's a new comment
            if( !this.comment ){
                Axios.post("/comment/create/",  commentInfos )
                    .then( res => {
                        console.log("res", res);
                        if(res.status == 200){
                          console.log("addComment create emit updateCommentsEvent to comment or displayThread", this.commentContent);
                          this.resetValues();
                          this.$emit("handleCommentsEvent", res.data );
                        }
                    }); 
            } else {    //ternaire au lieu de if else ou if normal
                Axios.put("/comment/modify/" + this.commentId, commentInfos )
                //  .then( response => response.json() )
                .then( res => {
                    console.log("res", res);
                    if(res.status == 200){
                      console.log("comment modified successfully ", commentInfos);
                      console.log("addComment modify emit updateCommentsEvent to comment or displayThread", this.commentContent);
                      this.resetValues();
                      this.$emit("handleCommentsEvent", res.data );
                    }
                });
            }
        } else {
          console.log("content empty");
      }
    },
    resetValues(){
        console.log("reset values");
        this.commentContent = "";

      },
  }
}
</script>