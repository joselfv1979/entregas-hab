// IMPORTACIÓN DE LIBRERÍAS EXTERNAS E INTERNAS 
import config from './config.js';
const axios = require('axios').default;

// DECLARACIÓN DE VARIABLES UTILIZADAS EN LAS FUNCIONES
const apiKey = config.apiKey;
const BASE_URL = `https://ws.audioscrobbler.com/`
const URL_GEO = `2.0/?method=geo.gettopartists&country=spain&api_key=${apiKey}&format=json`
const URL_TAGS = `2.0/?method=chart.gettoptags&api_key=${apiKey}&format=json`
const URL_TRACKS = `2.0/?method=geo.gettoptracks&country=spain&api_key=${apiKey}&format=json`

// FUNCIÓN PARA CONSEGUIR LOS ARTISTAS
const getArtist = async () => {
    try {
        const response = axios.get(`${BASE_URL}${URL_GEO}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// FUNCIÓN PARA CONSEGUIR LAS CANCIONES
const getTopTracks = async () => {
    try {
        const response = axios.get(`${BASE_URL}${URL_TRACKS}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// FUNCIÓN PARA CONSEGUIR LOS TAGS
const getTopTags =  async () => {
    try {
        const response = axios.get(`${BASE_URL}${URL_TAGS}`);
        return response;
    } catch (error) {
        console.log(error);
    }
}

// EXPORTANDO FUNCIONES
export default {
   getArtist,
   getTopTracks,
   getTopTags
}