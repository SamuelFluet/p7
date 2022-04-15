<template>
        <div class="co">
            <form @submit.prevent="handleSubmit">
            <h1>Connection</h1>
            <input  v-model="email" type="email" required label="Enter Email"/>
            <input v-model="password" type="password" required label="Password"/>        
            <button class="button">Log in</button>
            </form>
        </div>

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
<style >
.co{
    display: flex;
    justify-content: space-around;
    padding-bottom: 50px;
}
h1{
    display: flex;
    justify-content: space-around;
}
.co input{
    margin : 10px;
    width: 130%;
    height: 30px;
}
.co button{
    margin: auto;
    width : 135%;
    font-size: 15px;
}

@media screen and (max-width: 600px)
{
    body{
        background-color: white;
        width: 100%;
        margin: 0px;
    }
    .co input{
        width : 350px;
    }
    .co button{
        width : 370px;
    }
}

</style>
