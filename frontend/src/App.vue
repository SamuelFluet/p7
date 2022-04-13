<template>
<div class="app">
    <header>
      <nav> 
        <template v-if="user === null">
          <a class ="navanchor" href="/login">Connexion</a>
          <a class ="navanchor" href="/signup">Inscription</a>
        </template>
        <template v-else>
          <a class ="navanchor" href="/">Home</a>
          <a class ="navanchor" href="/profil">Profil</a>
          <div class="hellobox">
            <span>Hello {{this.user.username}}</span>
            <button @click="logOut">Déconnexion</button>
          </div>
        </template>
      </nav>
    </header>
    <h1>
    <img class="logo" src="..\img\icon-above-font.png">
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

.logo{
  width: 400px;
  display: block;  
  margin-left: auto;  
  margin-right: auto; 
}
.app{
  max-width: 1000px;
  margin: auto;
  background-color: white;
}
body{
  background-color: grey;
}
.nav{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.navanchor{
  margin-left : 10px;
  margin-right : 10px;
}
.hellobox{
  display: flex;
  justify-content: flex-end;
}

.hellobox span{
  margin-right: 10px;
}
</style>


