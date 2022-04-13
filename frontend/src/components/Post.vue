<template>
    <div class="post">
        <p>{{post.content}}</p>
        <img :src="post.imageurl" v-if="post.imageurl">
        <p>Fait par {{author.username}} le {{post.date}}</p>
        <div v-if="user.id == post.userid || user.role === 'admin'" class="delete-post">
            <button @click="deletePost">Supprimer</button>
        </div>
        <form @submit.prevent="addComment">
            <input type="text" v-model="commentaire" placeholder="ajouter un commentaire">
            <button type="submit">Commenter</button>
        </form>
        <Comment v-for="comment in comments" :key="comment.id" 
        :comment="comment"
        @deleteComment="deleteComment(comment.id)"
        />
    </div>
</template>
<script>
import axios from "axios"
import Comment from "./Comment.vue"
import {DateTime} from "luxon";
export default {
    props: {
        // on définit nos props: et on les document sur leur type et si il
        // requis ou non
        post: {
            type: Object,
            required: true
        }
    },
    components: {
        Comment
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    data(){
        return {
            author: {
                username: null
            },
            commentaire: null,
            comments: []
        }
    },
    mounted(){
        axios.get(`/auth/${this.post.userid}`).then((res) => {
            this.author = res.data;
        });
        axios.get("/comment/"+this.post.id).then((res) => {
            res.data.forEach((comment) => {
                comment.date = DateTime.fromJSDate(new Date(comment.date)).toFormat("dd/MM/yyyy hh:mm")
                this.comments.push(comment)
            })
        })
    },
    methods: {
        deletePost(){
            axios.delete(`/post/${this.post.id}`).then(() => {
                this.$emit("deletePost");
            })
        },
        addComment(){
            axios.post("/comment", {
                userid: this.user.id,
                postid: this.post.id,
                content: this.commentaire
            }).then((res) => {
                let comment = res.data;
                comment.date = DateTime.fromJSDate(new Date()).toFormat("dd/MM/yyyy hh:mm")
                this.comments.push(comment);
                this.commentaire = null;
            })
        },
        deleteComment(commentid){
            this.comments = this.comments.filter((comment) => {
                return comment.id !== commentid;
            })
        }
    }
}
</script>
<style>
.post{
    border-top: 1px solid grey;
    margin: 20px 0;
}
.delete-post{
    margin-bottom: 20px;
}

img{
    max-width: 200px;
}

</style>