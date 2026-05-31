import { useParams } from 'react-router'
// 資料
import { movies } from '../../data/movies'
// CSS
import './MovieIntro.css'

export default function MovieIntro() {
  const { id } = useParams()
  const movie = movies.find(m => m.id === Number(id))

  return (
    <div className='intro'>
      <div className='poster'>
        <img src={movie.image} alt={movie.title} className='img-intro'/>
      </div>
      <div className='info'>
        <h2>劇情大綱</h2>
        <p>{movie.storyline}</p>
        <h2>其他資訊</h2>
        <p>類型：{movie.genre}</p>
        <hr />
        <p>上映日期：{movie.releaseDate}</p>
        <hr />
        <p>分級：{movie.ratingClassification}</p>
        <hr />
        <p>片長：{movie.duration}</p>
        <hr />
        <p>卡司：{movie.cast.join(', ')}</p>
      </div>
    </div>
  )
}