import { useNavigate } from 'react-router'
// 資料
import { movies } from "../data/movies";
// CSS
import './Home.css'

export default function Home() {
    const navigate = useNavigate();
    // React Router 提供的 hook，呼叫後會回傳一個 navigate 函式，讓程式碼主動跳轉頁面。

    return (
        <section className="home-card">
                <h1>熱門電影</h1>
                <div className="hot-movie">
                    {movies.slice(2, 6).map(movie => (
                        <div key={movie.id}>
                            <img
                                src={movie.image}
                                alt={movie.title}
                                onClick={() => navigate(`/movie/${movie.id}`)}  // 點擊圖片後導向電影介紹頁面
                            />
                            <p onClick={() => navigate(`/movie/${movie.id}`)}>{movie.title}</p>
                            <button onClick={() => navigate(`/movie/${movie.id}/booking`)}>前往訂票</button>
                            <button onClick={() => navigate(`/movie/${movie.id}/review`)}>撰寫評論</button>
                        </div>
                    ))}
                </div>
        </section>
    );
}