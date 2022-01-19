import axios from 'axios'

const scadaApi = axios.create({
  baseURL: 'http://10.122.50.91/api/v1'
})

scadaApi.interceptors.request.use((config) => {

  config.headers = {
    'Content-Type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  }

  return config
})

export default scadaApi