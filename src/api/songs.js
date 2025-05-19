import api from './index'

export const getHistory = async () => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('user')
  
  const response = await api.get(`/api/song/history?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  
  return response.data
}

export const getRecommendationSongs = async (emotion) => {
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('user')

  const response = await api.post('/api/song/recommendation', {
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
  
  const response = await api.get(`/api/song/last-recommendations?username=${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  
  return response.data
}

export const getEmotionAWS = async (image) => {
  const token = localStorage.getItem('token')
  const imageBase64 = await convertToBase64(image)
  
  const response = await api.post('/aws/rekognition/analysis', {
    content: imageBase64,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  
  return response.data
}

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}