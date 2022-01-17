import axios from 'axios'

const scadaApi = axios.create({
  baseURL: 'http://10.122.50.91/api/v1'
})

export default scadaApi