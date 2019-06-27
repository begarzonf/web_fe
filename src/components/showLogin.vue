<template>
    <div class="login">
        <div class="login_image">
            <img src="../assets/logoFinal.jpg"  alt="" srcset="">
        </div>
        <div >
            <h1>{{advise}}</h1>
            <div >
                <input v-model="email" type="email" placeholder="Email">
            </div>
            <div >
                <input v-model="password" type="password" placeholder="Password">
            </div>
            <button @click="postLogin" class="login_btn">Login</button>
        </div>
        <!--
            <h1>{{response}}</h1>
            <h1>{{name}}</h1>
            <h1>{{email}}</h1>
            <h1>{{token}}</h1>
            <h2>Advice: {{advise}}</h2>
        -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'showLogin',
    data(){
        return{
            name:"",
            email:"dsgantivac@unal.edu.co",
            password:"12345678",
            token:"",
            advise:"",
            response:"",
            is_signed: false,
            //hostname: "http://192.168.99.101:5000/graphql"
            hostname: "http://35.237.206.16:2870/graphql"
        }
    },
    mounted() {
        if (localStorage.session) {
            if (localStorage.session == "true") {
                this.is_signed = localStorage.session;
                this.$router.push({name: 'Data'})
            }else{
                console.log("no se cumple el if");
            }
        }
    },
    methods:{
        adviseError: function(msg){
            this.advise = msg
            setTimeout(() => this.advise="", 3000);
        },
        async postLogin() {
            const res = await axios.post(this.hostname, {
            query:`
            mutation{
                userSession(user:{
                    email: "`+this.email+`"
                    password: "`+this.password+`"
                    mobil: "false"
                    messaging: "pruebaaaaa"
                }){
                    advise
                    token
                    name
                    email
                }
            }`
        })
        this.response = res.data.data.userSession;
        this.email = res.data.data.userSession.email;
        this.name =res.data.data.userSession.name;
        this.token = res.data.data.userSession.token;
        this.advise = res.data.data.userSession.advise;
        if(this.advise == "token updated"){
            localStorage.session = true
            localStorage.email = res.data.data.userSession.email;
            localStorage.name = res.data.data.userSession.name;
            localStorage.token = res.data.data.userSession.token;
            this.is_signed = true
            this.$router.go(0)
        }else{
            localStorage.session = false
            this.is_signed = false
            this.adviseError(this.advise)
        }

      }
    }
}
</script>

<style scoped src='../styles/login.css'>

</style>



