import axios, {type Method} from 'axios'

const baseUrl = 'http://localhost:5001/api/tasks'

export const axiosInstance = (method: Method) => {
  return axios.create({baseURL: baseUrl, method: method})
}
