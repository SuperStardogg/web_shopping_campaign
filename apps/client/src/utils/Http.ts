import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})
http.interceptors.response.use(
  (response) => {
    if (response.data.success) {
      return response.data.data
    } else {
      return Promise.reject({
        message: response.data.message || 'Unknown API error',
        error: response.data.error || 'Error',
      })
    }
  },
  (error) => {
    const res = error.response
    if (res?.data?.message) {
      return Promise.reject({
        message: res.data.message,
        error: res.data.error,
      })
    }
    return Promise.reject({
      message: error.message || 'Network error',
      error: 'UnknownError',
    })
  }
)

export default http
