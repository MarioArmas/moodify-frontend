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

export const getRecommendationSongs = async (emotion) => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('user')

  const response = await api.post('/song/recommendation', {
    username: username,
    emotion_name: emotion,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  return response.data
}

export const getLastRecommendations = async () => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('user')
  
  const response = await api.get(`/song/last-recommendations?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  
  return response.data
}