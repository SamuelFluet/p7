<template>
    <div class="comment">
        <div class = "dateButton2">
            <p>{{comment.content}}</p> <p class="faitPar">fait par <span class="author">{{author.username}}</span> le  {{comment.date}}</p>
            <button  class="button3" v-if="user.id == comment.userid || user.role === 'admin'" @click="deleteComment">supprimer</button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    props: {
        comment: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            author: {
                username: null
            }
        }
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    mounted(){

        axios.get(`/auth/${this.comment.userid}`).then((res) => {
            this.author = res.data;
        })
    },
    methods: {
        deleteComment(){
            axios.delete(`/comment/${this.comment.id}`).then(() => {
                this.$emit("deleteComment");
            })
        },
    }
}
</script>
<style>
.comment{
    padding: 10px 0;
    margin: 10px;
    background-color: #e0e0e0fa;
    border-radius: 15px;
}

.commentPost {
    margin : 5px;
    
}
.dateButton p{
    width: 80%;
}
form input{
        width : 97%;
}
.button3{
    padding-left: 10px;
    border: none;
    background: none;
    margin-left: 5px;
}
.button3:hover{
    color: blue;
}
@media screen and (max-width: 600px){
    form input{
        width : 93%;
    }
}
</style>