// IMPORTACIÓN DE LIBRERÍAS EXTERNAS
import axios from "axios";
import jwt from 'jwt-decode';
import validator from 'email-validator'
import Swal from "sweetalert2";

// VARIABLE QUE GUARDA LA DIRECCIÓN DEL SERVIDOR
const HOST = 'http://localhost:8000'

// FUNCIÓN PARA GUARDAR EL TOKEN EN EL LOCALSTORAGE
export function setAuthToken(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("AUTH_TOKEN_KEY", token);
}

// FUNCIÓN PARA RECUPERAR EL TOKEN DESDE EL LOCALSTORAGE
export function getAuthToken() {
  return localStorage.getItem('AUTH_TOKEN_KEY')
}

// FUNCIÓN PARA CONSEGUIR LA FECHA DE CADUCIDAD DEL TOKEN
export function tokenExpiration(encodedToken){
  let token = jwt(encodedToken)
  if(!token.exp){
      return null
  }
  let date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}

// FUNCIÓN QUE COMPRUEBA SI CADUCÓ EL TOKEN
export function isExpired(token){
  let expirationDate = tokenExpiration(token)
  return expirationDate < new Date()
}

// FUNCIÓN QUE COMPRUEBA SI LA PERSONA ESTÁ LOGUEADA Y SU TOKEN ES VÁLIDO
export function isLoggedIn(){
  let authToken = getAuthToken()
  return !!authToken && !isExpired(authToken)
}

// FUNCIÓN PARA GUARDAR EL ID DE USUARIO EN EL LOCALSTORAGE
export function setId(id) {
  localStorage.setItem("ID", id);
}

// FUNCIÓN PARA RECUPERAR EL ID DE USUARIO DEL LOCALSTORAGE
export function getId() {
  return localStorage.getItem("ID");
}

// FUNCIÓN PARA GUARDAR EL ROL DE USUARIO EN EL LOCALSTORAGE
export function setRole(role) {
  localStorage.setItem("ROLE", role);
}

// FUNCIÓN PARA RECUPERAR EL ROL DE USUARIO DEL LOCALSTORAGE
export function getRole() {
  return localStorage.getItem("ROLE");
}

// FUNCIÓN DE GUARDAR EL NOMBRE DE USER EN LOCALSTORAGE
export function setUserName(name) {
  localStorage.setItem('NAME', name)
}

// FUNCIÓN DE RECUPERAR EL NOMBRE DE USER EN LOCALSTORAGE
export function getUserName() {
  return localStorage.getItem('NAME')
}

// FUNCIÓN QUE REALIZA LA PETICIÓN DE LOGIN AL SERVIDOR
export async function userLogin(email, password) {
  try {
    const response = await axios.post(`${HOST}/users/login`, {
      email,
      password
    })
    // GUARDAMOS DATOS EN EL LOCALSTORAGE
    setAuthToken(response.data.token);
    setId(response.data.id)
    setUserName(response.data.name)
    setRole(response.data.role)
    return response.data
  } catch (error) {
    console.log(error);
  }
}

// FUNCIÓN QUE REALIZA LA PETICIÓN DE REGISTRO AL SERVIDOR
export async function validateUser(user) {

  const {name, surname, email, password, role} = user

  if ( !name || !surname || !email || !password || !role) {
    Swal.fire("No puedes dejar campos vacíos");
    return
  } else if(!validator.validate(email)){
    Swal.fire("La cuenta de correo no es válida");
    return
  }
  try {
    const result = await axios.post(`${HOST}/users/register`, {
      user
    })
    if(result.data.emailError){
      Swal.fire(result.data.emailError)
      return
    }

    return true

  } catch (error) {
    console.log(error);
  }
}

// FUNCIÓN QUE REALIZA LA PETICIÓN DE LA CUENTA DE USUARIO AL SERVIDOR
export async function getUser(userId, token) {
  try {
    const response = await axios.get(`${HOST}/profiles/${userId}`, {
      headers: {'Authorization': `${token}` }
    })
    return response.data
  } catch (error) {
    console.log(error);
  }
}

// FUNCIÓN QUE REALIZA LA PETICIÓN DE ACTUALIZAR LA CUENTA DE USUARIO 
export async function updateUser(userId, name, surname, email, token) {
  try {
    await axios.put(`${HOST}/profiles/${userId}`, {
      name, surname, email
    },
    {
      headers: {'Authorization': `${token}` }
    })
  } catch (error) {
    console.log(error);
  }
}

// FUNCIÓN QUE REALIZA LA PETICIÓN DE ELIMINAR LA CUENTA DE USUARIO 
export async function dropUser(){

  let userId = getId()
  let token = getAuthToken()
  
  try {
    await axios.delete(`${HOST}/profiles/${userId}`, 
    {
        headers: {'Authorization': `${token}` }
    })
  } catch (error) {
    console.log(error);
  }

}

// FUNCIÓN DE LOGOUT
export function logout() {
  axios.defaults.headers.common['Authorization'] = ''
  localStorage.removeItem('AUTH_TOKEN_KEY')
  localStorage.removeItem('ID')
  localStorage.removeItem('NAME')
  localStorage.removeItem('ROLE')
}


