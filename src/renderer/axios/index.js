import axios from 'axios'
import qs from 'qs'
let instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000,
})
instance.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})
instance.interceptors.response.use((res) => {
  if(res.data.code === 200){
    return res.data
  }
})
export default instance
