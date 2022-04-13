<template>
    <div class="comment">
        {{comment.content}} - fait par {{author.username}} le  {{comment.date}}
        <button v-if="user.id == comment.userid || user.role === 'admin'" @click="deleteComment">supprimer</button>
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
}
</style>