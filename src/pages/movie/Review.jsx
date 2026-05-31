import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { movies } from '../../data/movies'
import './Review.css'

export default function Review() {
  const { id } = useParams()
  const movie = movies.find(m => m.id === Number(id))
  const [watchDate, setWatchDate] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [reviews, setReviews] = useState([])           // 儲存評論紀錄

  function handleSave() {
    if (!watchDate || !rating) {
      alert('請選擇觀看日期與評分')
      return
    }

    setIsLoading(true)   // 顯示載入中

    setTimeout(() => {
      setReviews(prev => [...prev, {
        // 用時間當id
        id: Date.now(),
        watchDate,
        rating,
        note
      }])

      setIsLoading(false)
      setSaved(true)
      setWatchDate('')
      setRating(0)
      setHoverRating(0)
      setNote('')
    }, 3000)
  }

  function handleClear() {
    setWatchDate('')
    setRating(0)
    setHoverRating(0)
    setNote('')
    setSaved(false)
    setIsLoading(false)
  }

  return (
    <div className="review-container">
      <div className='poster'>
        <img src={movie.image} alt={movie.title} className='img-intro' />
      </div>

      <div className="review-form">

        {/* 觀看日期 */}
        <div className="review-field">
          <label>觀看日期　</label>
          <input
            type="date"
            value={watchDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={e => {
              setWatchDate(e.target.value)
              setSaved(false)
            }}
          />
        </div>

        {/* 評分 */}
        <div className="review-field">
          <label>評分　</label>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`review-star ${star <= (hoverRating || rating) ? 'active' : 'inactive'}`}
            >
              ★
            </span>
          ))}
        </div>

        <div className="review-field">
          <label>筆記</label>
          <br />
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={8}
            className="review-textarea"
            placeholder="寫下你對這部電影的想法..."
          />
        </div>

        <div className="review-actions">
          <button onClick={handleClear}>清除</button>
          <button onClick={handleSave} className="review-btn-save">
            儲存
          </button>
        </div>
        {/* 載入中 */}
        {isLoading && (
          <p className="review-saved-msg-loading">載入中...</p>
        )}
        {/* 儲存成功 */}
        {saved && (
          <p className="review-saved-msg">儲存成功！</p>
        )}

        {/* 評論紀錄 */}
        {reviews.length > 0 && (
          <div className="review-history">
            <h3>評論紀錄</h3>
            <div className='rh'>
              {reviews.map(review => (
                <div key={review.id} className="review-history-item">
                  <p>觀看日期：{review.watchDate}</p>
                  <p>評分：{review.rating} / 5 </p>
                  {review.note && <p>筆記：{review.note}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}