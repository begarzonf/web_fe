<template>
  <div id="fondo">
  <div id="app_vue" >
    <div id="nav" class="navBar">
      <router-link v-if="showLogin"   tag='button'    class="navButn"  to="/login" >Login</router-link>
      <router-link v-if="showLogin"   tag='button'    class="navButn"  to="/signUp">Sign Up</router-link>
      <router-link v-if="showData"    tag='button'    class="navButn"  to="/Data"  >Archivos</router-link>
      <button      v-if="showData"    @click="logOut" class="navButn"              >logOut</button>
      <!--
      <router-link    tag='button'                    class="navButn"  to="/"      >Home</router-link>
        <button @click="getStatus">status</button>|
      -->
    </div>
    <router-view/>
  </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        status: "",
        showLogin: true,
        showData: false
      }
    },mounted(){
      this.checkSession()
    },
    methods:{
      async logOut  () {
        localStorage.session = false;
        this.$router.push({name: 'login'})
        console.log(localStorage.session);
        console.log("se eejcuta");
        this.checkSession()
      },
      async getStatus  () {
        console.log("la sessio esta en");
        console.log(localStorage.session);
        this.status = localStorage.session;
      },
      async checkSession() {
        if (localStorage.session) {
          if (localStorage.session == "true") {
              this.showLogin = false;
              this.showData = true;
          }else{
            this.showLogin = true
            this.showData = false
          }
      }
      }

    }
  }


</script>


<style>

.navBar{
  background: #8E2DE2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4A00E0, #8E2DE2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4A00E0, #8E2DE2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 2%;
}

.navButn{
  border: none;
  background-color: rgba(0, 0, 0, 0);

  /*background: #694ed6;
  border-radius: 15px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  */

  border-radius: 20px;
  font-size: 25px;
  font-weight: bold;
  margin: 0px 7.5% 0px 7.5%;
  padding: 16px;
  width: 200px;
  cursor: pointer;
  color: white;
  transition: 0.5s;
}
.navButn:hover{
  background-color: white;
  color: #4A00E0;
  border-radius: 20px;
  transition: 0.5s;
}


#fondo{
  background: #d6c7dd;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #d6c7dd,#d6c7dd);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #d6c7dd, #d6c7dd); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin:0%;
  width: 100%;
  height: 100%;
  position: absolute;
}
#app_vue {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}


#nav a.router-link-exact-active {
  color: #694ed6;
}
</style>
