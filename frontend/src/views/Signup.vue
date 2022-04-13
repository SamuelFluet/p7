<template>
    <form @submit.prevent="handleSubmit">
        <h1>Inscription</h1>
        <input  v-model="email" type="email" required label="Enter Email"/>
        <input v-model="password" type="password" required label="Password"/>
        <input v-model="username" type="text" required  />       
        <button type="submit" class="button">Log in</button>
    </form>
</template>
<script>
export default {
    name: "Signup",
    data(){
        return{
            email:null,
            password:null,
            username:null,
        }
    },
    methods: {
        handleSubmit(){
            //on accède au store, et dispatch appelle une action du store
            this.$store.dispatch("signUp", {
                email:this.email,
                password:this.password,
                username:this.username
            }).then(()=>{
                location.href = "/signup"
            })
        }
    },
}
</script>
