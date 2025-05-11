import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
      <h1>Moodify</h1>
      <p className="subtitle">Discover the perfect melody for every emotion and let the music speak for you</p>
      <Link to='/signup' className='btn'>Get started</Link>
    </main>
  );
}