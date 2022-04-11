import axios from 'axios'

const scadaApi = axios.create({
  baseURL: import.meta.env.VITE_APIURL
})

scadaApi.interceptors.request.use((config) => {

  config.headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  return config
})

export default scadaApi