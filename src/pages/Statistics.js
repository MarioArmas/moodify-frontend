import { useState, useEffect } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js'
import { getStatistics } from '../api/songs'

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

const EMOTIONS = ['HAPPY', 'SAD', 'ANGRY', 'CONFUSED', 'DISGUSTED', 'SURPRISED', 'CALM', 'UNKNOWN', 'FEAR']
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function Statistics() {
  const [emotions, setEmotions] = useState(Array(EMOTIONS.length).fill(0))
  const [weekAnalysis, setWeekAnalysis] = useState([0, 0, 0, 0, 0, 0, 0])
  const [positives, setPositives] = useState(0)
  const [negatives, setNegatives] = useState(0)
  const { reorderedData: weekDataOrdered, reorderedLabels: weekLabelsOrdered } = reorderWeekData(weekAnalysis, WEEKDAYS)
  
  useEffect(() => {
    getStatistics()
      .then((data) => {
        const emotionsCount = Array(EMOTIONS.length).fill(0)
        const weekCount = Array(7).fill(0)
        let pos = 0
        let neg = 0

        data.forEach(item => {
          const idx = EMOTIONS.indexOf(item.emotion)
          if (idx !== -1) emotionsCount[idx] += 1
          if (item.type) pos += 1
          else neg += 1
          const dayIdx = new Date(item.date).getDay()
          const weekIdx = (dayIdx + 6) % 7
          weekCount[weekIdx] += 1
        })

        setEmotions(emotionsCount)
        setPositives(pos)
        setNegatives(neg)
        setWeekAnalysis(weekCount)
      })
  }, [])

  function getYesterdayIndex() {
    const today = new Date()
    const jsDay = today.getDay()
    const weekIdx = (jsDay + 6) % 7
    return (weekIdx - 1 + 7) % 7
  }

  function reorderWeekData(dataArray, labelArray) {
    const yesterdayIdx = getYesterdayIndex()
    const reorderedData = []
    const reorderedLabels = []
    for (let i = 0; i < 7; i++) {
      const idx = (yesterdayIdx - i + 7) % 7
      reorderedData.push(dataArray[idx])
      reorderedLabels.push(labelArray[idx])
    }
    return { reorderedData, reorderedLabels }
  }

  const emotionsData = {
    labels: EMOTIONS,
    datasets: [
      {
        label: 'Emotions',
        data: emotions,
        backgroundColor: [
          '#FFD700', '#87CEEB', '#FF6347', '#DDA0DD', '#8FBC8F', '#FFA500', '#20B2AA', '#B0C4DE', '#A52A2A'
        ],
      },
    ],
  }

  const weekData = {
    labels: WEEKDAYS,
    datasets: [
      {
        label: 'Registers per day',
        data: weekDataOrdered,
        backgroundColor: '#6495ED',
      },
    ],
  }

  const posNegData = {
    labels: ['Positives', 'Negatives'],
    datasets: [
      {
        data: [positives, negatives],
        backgroundColor: ['#4CAF50', '#F44336'],
      },
    ],
  }

  return (
    <div className='container'>
      <h2>Dashboard</h2>
      <h3>Emotions Last Week</h3>
      <div style={{ maxWidth: 1000, width: 600, height: 300, margin: '0 auto' }}>
        <Bar data={emotionsData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <h3>Recommendatinos per day</h3>
      <div style={{ maxWidth: 1000, width: 600, height: 300, margin: '2em auto' }}>
        <Bar data={weekData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <h3>Positve vs Negative emotions last week</h3>
      <div style={{ maxWidth: 800, height: 300, margin: '2em auto' }}>
        <Pie data={posNegData} />
      </div>
    </div>
  )
}
