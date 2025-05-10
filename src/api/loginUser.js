import api from './index'

export const registerUser = async (credentials) => {
  const response = await api.post('/auth/signup', credentials)
  return response.data
}

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}