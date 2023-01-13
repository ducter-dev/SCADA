import axios from 'axios'
const api_url = import.meta.env.VITE_APIURL

const scadaApi = axios.create({
  baseURL: api_url
})

scadaApi.interceptors.request.use((config) => {

  config.headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  return config
})

export default scadaApi