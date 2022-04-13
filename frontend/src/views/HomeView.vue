<template>
  <main>
    <h1>Les posts</h1>
    <form @submit.prevent="addPost">
      <h2>Ajouter un post</h2>
      <input type="text" placeholder="post" v-model="content" required>
      <input type="file" @change="upload">
      <button type="submit">Poster</button>
    </form>
    <Post v-for="post in posts" :key="post.id" 
          :post="post"
          @deletePost="deletePost(post.id)"
    />
  </main>
</template>

<script>
import axios from "axios";
import Post from "../components/Post.vue"
import {DateTime} from "luxon";

export default {
  name: "Home",
  components: {
    Post
  },
  computed:{
    user(){
      return this.$store.getters.user
    }
  },
  data(){
    return {
      posts: [],
      content: null,
      file: null
    }
  },
  // quand le composant est entrain de monté
  mounted(){
    axios.get("/post").then((res) => {
      res.data.forEach((post) => {
        post.date = DateTime.fromJSDate(new Date(post.date)).toFormat("dd/MM/yyyy hh:mm")
        this.posts.push(post)
      })
      this.sortPosts();
    })
  },
  methods: {
    addPost(){
      let formData = new FormData();
      // on ajoute un fichier
      formData.append("image", this.file);
      // on ajoute un object json
      formData.append("post", JSON.stringify({
        content: this.content,
        userid: this.user.id,
      }));
      axios.post("/post", formData).then((res) => {
        let post = res.data;
        post.date = DateTime.fromJSDate(new Date()).toFormat("dd/MM/yyyy hh:mm")
        this.posts.push(post);
        this.content = null;
        location.reload();
      })
    },
    sortPosts(){
      this.posts.sort((postA, postB) => {
        console.log(postA.date.valueOf())
        //console.log(new Date(postB.date));
        return postA.date - postB.date
      });
      this.posts.reverse()
    },
    deletePost(postid){
      this.posts = this.posts.filter((post) => {
        return post.id !== postid;
      })
    },
    upload(event){
      this.file = event.target.files[0];
    }
  }
}
</script>

