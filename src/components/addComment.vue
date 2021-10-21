<template>
  <div class="addComment">
    <input type="text" v-model="commentContent" id="commentContent" name="commentContent">
    <button type="button" v-on:click="createComment">Commenter</button>
  </div>
</template>

<script>

import Axios from 'axios'
import { mapState } from "vuex"

export default {
  name: 'addComment',
  props: {
    commentDatas: Object,
    commentId: Object,
    threadId: Object,
  },
  data: function() {
    return { 
    //   datas: this.commentDatas,
      commentContent:"",
    //   threadId: this.idThread,
    //   commentId: this.idComment,
    };
  },
  computed: {
        ...mapState({
            userConnected: ({userConnected}) => userConnected
        }),
    },
  created(){
    // if( this.commentDatas ){
      this.commentContent = this.commentDatas
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

            let config = {
                headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem('groupomaniaToken'))}
            };

            //if we didn't get props it's a new comment
            if( !this.commentDatas ){
                Axios.post("/comment/create/",  commentInfos, config )
                    .then( res => {
                        console.log("res", res);
                        if(res.status == 200){
                        // this.updateThreads();
                        }
                    }); 
            } else {                            //ternaire au lieu de if else ou if normal
                Axios.put("/comment/modify/" + this.commentId, commentInfos, config )
                //  .then( response => response.json() )
                .then( res => {
                    console.log("res", res);
                    if(res.status == 200){
                    console.log("comment modified successfully ");
                    }
                });
            }
        } else {
          console.log("content empty");
      }
    }
  }
}

</script>
