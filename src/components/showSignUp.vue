<template>
        <div class="login">
        <div class="login_image">
            <img src="../assets/logoFinal.jpg"  alt="" srcset="">
        </div>
        <div class="login_content">
            <div class="login_content_form">
                <input v-model="name"  placeholder="Username">
            </div>
            <div class="login_content_form">
                <input v-model="email" type="email" placeholder="Email">
            </div>
            <div class="login_content_form">
                <input v-model="password" type="password" placeholder="Password">
            </div>
            <button @click="postSignUP" class="login_btn">Login</button>
            <!--
                <h1>{{response}}</h1>
                <h2>Advice {{advise}}</h2>

            -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "showSignUp",
    data(){
        return{
            name:"david",
            email:"dsgantivac@unal.edu.co",
            password:"12345678",
            token:"",
            advise:"",
            response:"",
            is_signed: false,
//                hostname: "http://192.168.99.101:5000/graphql"
            hostname: "http://34.73.216.116:5000/graphql"
        }
    },mounted() {
        if (localStorage.session) {
            if (localStorage.session == "true") {
                console.log("esta en la sesion");
                this.is_signed = localStorage.session;
                console.log(localStorage.session);
                this.$router.push({name: 'Data'})
            }else{
                console.log("no se cumple el if");
            }
        }
    },methods:{
        async postSignUP() {
            const res = await axios.post(this.hostname, {
            query:`
            mutation{
                createUser(user:{
                    name:"`+this.name+`"
                    email: "`+this.email+`"
                    password: "`+this.password+`"
                }){
                    advise
                    id
                    token
                    error
                }
            }`
        })
            this.response = res.data.data.createUser.token;
            this.advise = res.data.data.createUser.advise;
            if(this.advise == "operation successfull"){
                localStorage.session = true
                this.is_signed = true
                localStorage.email = this.email;
                localStorage.name = this.name;
                localStorage.token = res.data.data.createUser.token;
                this.$router.go(0)

            }else{
                localStorage.session = false
                this.is_signed = false
            }
        }
      },

}
</script>

<style scoped src='../styles/login.css'>

</style>

