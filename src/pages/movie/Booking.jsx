import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { movies } from '../../data/movies'
import './Booking.css'

const TICKET_PRICE = 250

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export default function Booking() {
    const { id } = useParams()
    const navigate = useNavigate()
    const movie = movies.find(m => m.id === Number(id))

    // 記錄使用者的選擇，一開始沒有選擇，因此為null或空陣列
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedTime, setSelectedTime] = useState(null)
    const [selectedSeats, setSelectedSeats] = useState([])
    const [error, setError] = useState('')

    const soldSeatskey = `${selectedDate}-${selectedTime}`
    const soldSeats = movie.soldSeats[soldSeatskey] || []

    function handleSeatClick(seat) {
        if (!selectedDate || !selectedTime) {
            setError('請先選擇日期與場次')
            return
        }
        // 已售座位不能點
        if (soldSeats.includes(seat)) return

        setError('')
        setSelectedSeats(prev =>
            prev.includes(seat)
                ? prev.filter(s => s !== seat) // 如果選取的座位已經選過了->取消選取
                : [...prev, seat] // 如果選取的座位沒有選過->加入選取
        )
    }

    // 按下確認訂票
    function handleConfirm() {
        if (!selectedDate || !selectedTime || selectedSeats.length === 0) {
            setError('請完成日期、場次與座位的選擇')
            return
        }
        navigate('/booking-success', {
            state: {
                movie: movie.title,
                date: selectedDate,
                time: selectedTime,
                seats: selectedSeats,
                total: selectedSeats.length * TICKET_PRICE
            }
        })
    }

    return (
        <div className="booking-container">
            <div className='booking-container-up'>
                <div className='poster'>
                    <img src={movie.image} alt={movie.title} className='img-intro' />
                </div>
                <div className='select'>
                    {/* 先選日期 */}
                    <section>
                        <h3>選擇日期</h3>
                        <div className='date'>
                            {movie.dates.map(date => (
                                <button
                                    key={date}
                                    onClick={() => {
                                        setSelectedDate(date)
                                        setSelectedTime(null)   // 換日期時重置場次
                                        setSelectedSeats([])    // 換日期時重置座位
                                    }}
                                    // 按鈕變化
                                    style={{
                                        backgroundColor: selectedDate === date ? '#5B6AEB' : 'whitesmoke',
                                        color: selectedDate === date ? 'whitesmoke' : '#5B6AEB',
                                        border: '2px solid #5B6AEB',
                                        padding: '5px 10px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {date}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* 再選場次 */}
                    {selectedDate && (
                        <section>
                            <h3>選擇場次</h3>
                            <div className='time'>
                                {movie.times.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => {
                                            setSelectedTime(time)
                                            setSelectedSeats([])  // 換場次時重置座位
                                        }}
                                        style={{
                                            backgroundColor: selectedTime === time ? '#5B6AEB' : 'whitesmoke',
                                            color: selectedTime === time ? 'whitesmoke' : '#5B6AEB',
                                            border: '2px solid #5B6AEB',
                                            padding: '5px 10px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 最後選座位 */}
                    {selectedTime && (
                        <section className="seat-selection-section">
                            <h3>選擇座位</h3>
                            <hr />
                            <p className="screen">銀幕</p>

                            {ROWS.map(row => (
                                <div key={row} className="seat-row">
                                    <span className="row-label">{row}</span>
                                    {COLS.map(col => {
                                        const seat = `${row}${col}`
                                        const isSold = soldSeats.includes(seat)
                                        const isSelected = selectedSeats.includes(seat)

                                        return (
                                            <button
                                                key={seat}
                                                onClick={() => handleSeatClick(seat)}
                                                disabled={isSold}
                                                /* 已選中，就補上 'is-selected' */
                                                className={`seat-btn ${isSelected ? 'is-selected' : ''}`}
                                            >
                                                {col}
                                            </button>
                                        )
                                    })}
                                </div>
                            ))}
                        </section>
                    )}
                    {/* 錯誤提示，有點像if...else */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            </div>
            <div className='booking-summary'>
                {/* ── 訂單摘要 有選座位才顯示 ── */}
                {selectedSeats.length > 0 && (
                    <section className='booking-summary2'>

                        <div className='movie-name'>
                            <p>電影</p>
                            <h4>{movie.title}</h4>
                        </div>
                        <div className='movie-time'>
                            <p>日期場次</p>
                            <h4>{selectedDate} {selectedTime}</h4>
                        </div>
                        <div className='movie-seats'>
                            <p>座位</p>
                            <h4>{selectedSeats.join(', ')}</h4>
                        </div>
                        <div className='movie-total'>
                            <p>總票價</p>
                            <h4>NT$ {selectedSeats.length * TICKET_PRICE}</h4>
                        </div>
                        <button onClick={handleConfirm} className='checkout'>確認訂票</button>
                    </section>
                )}
            </div>
        </div>
    )
}