import api from './index'

export const getHistory = async () => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('user')
  
  const response = await api.get(`/song/history?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  
  return response.data
}

export const recommendationSongs = async (credentials) => {
  const response = await api.get('/song/recommendation', credentials)
  return response.data
}