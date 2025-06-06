import axios from 'axios'

const baseUrl = 'http://localhost:5001/api/tasks'

export const customApiCall = axios.create({baseURL: baseUrl})
