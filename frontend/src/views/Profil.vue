<template>
    <div class="profil">
        <p>{{user.username}}</p>
        <p>{{user.email}}</p>
        <button @click="deleteUser">Supprimer mon compte</button>
    </div>
</template>
<script>
export default {
    name: "Profil",
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    methods: {
        deleteUser(){
            this.$store.dispatch("deleteUser", this.user.id);
        }
    }

}
</script>
<style >
.profil{
    display: flex;
    justify-content: space-around;
    padding: 50px;;
}

</style>