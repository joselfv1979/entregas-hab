<template>
  <div id="app"> <!-- DECLARACIÓN DE COMPONENTES -->
    <menucustom v-on:logout="logoutUser" :username="username" :logged="logged"/>    
    <router-view/>
    <footercustom />    
  </div>
</template>

<script>
// IMPORTACIÓN EL COMPONENTE
import menucustom from '@/components/MenuCustom.vue';
import footercustom from '@/components/FooterCustom.vue'
 import { logout, getUserName, isLoggedIn } from './../../backend/utils/user'

export default {
  name: 'App',
  // REGISTRO DE COMPONENTES
  components: {
    menucustom, footercustom
  },
  data(){
    return {
      username: '',
      logged: false
    }
  },
  methods: {
    logoutUser(){
      logout()
      this.$router.push('/')
      location.reload()
    },
    setUserName(){
      this.username = getUserName()
      this.$router.push('/').catch(()=>{})
    },
    getLogin(){
      this.logged = isLoggedIn()
    }
  },
  created(){
    this.setUserName()
    this.getLogin()
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;  
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: .9rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
  min-height: 100vh;
  flex-direction: column;
  align-items: stretch;
}

#main {
  height: 70vh;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

#menu { 
  width: 100%;
  align-self: flex-start;
  background-color: #3b83bd;
  flex-shrink: 0;
} 

#foot{
  background-color: #3b83bd;
  width:100%;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #2c3e50;
  align-self: flex-end;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #3b83bd;
}

h1 {
  margin-top: 20px;
}

button {
  border-radius: 15px;
  background: #3b83bd;
  color: wheat;
  padding: 0.5rem;
  margin: 1.2rem;
  border: none;
  display: inline-block;
  transition: all .4s;
}

button:hover {
  cursor: pointer;
  transform: translateY(-6px);
}

img {
  margin-top: 20px;
  width: 150px;
  height: 100px;
}

ul {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-around;
}

ul li {
  border: 2px solid #3b83bd;
  border-radius: 15px;
  margin: 0.667rem;
  list-style: none;
}

ul li p {
  display: inline-block;
  padding: 0.667rem;
}

input {
  border-radius: 3px;
  padding: 0.3rem;
  margin: 0.3rem;
  border: none;
  border-bottom: 2px solid #3b83bd;
  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  border-left: 2px solid transparent;
  transition: all .4s;
}

input:hover {
  border: 2px solid #3b83bd;
  cursor: pointer;
}

.box {
  display: flex;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.modalBox {
  background-color: whitesmoke;
  margin: 2% auto;
  padding: 3rem;
  width: 400px;
  border: 4px solid black;
  border-radius: 3px;
}
</style>