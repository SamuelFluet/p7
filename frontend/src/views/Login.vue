<template>
    <form @submit.prevent="handleSubmit">
        <h1>Connection</h1>
        <input  v-model="email" type="email" required label="Enter Email"/>
        <input v-model="password" type="password" required label="Password"/>        
        <button class="button">Log in</button>
    </form>
</template>
<script>
export default {
    name: "Login",
    date(){
        return{
            email:null,
            password:null,
        }
    },
    methods: {
        handleSubmit(){
            this.$store.dispatch("logIn", {
                email:this.email,
                password:this.password
            }).then(()=>{
                location.href = "/";
            })
        }
    },
}
</script>
