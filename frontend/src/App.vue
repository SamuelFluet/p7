<template>
<div class="app">
    <header>
      <nav>
        <template v-if="user === null">
          <a href="/login">Connexion</a>
          <a href="/signup">Inscription</a>
        </template>
        <template v-else>
          <a href="/">Home</a>
          <a href="/profil">Profil</a>
          <span>Hello {{this.user.username}}</span>
          <button @click="logOut">Déconnexion</button>
        </template>
      </nav>
    </header>
    <h1>
    Groupomania
    </h1>
  <router-view></router-view>
</div>
</template>
<script>
export default {
  methods: {
    logOut(){
      this.$store.dispatch("logOut");
    }
  },
  computed: {
    user(){
      return this.$store.getters["user"];
    }
  }
}
</script>
<style>
.app{
  max-width: 1000px;
  margin: auto;
}
</style>
