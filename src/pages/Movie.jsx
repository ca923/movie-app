import { useNavigate } from 'react-router'
// 資料
import { movies } from "../data/movies";
// 元件
import MovieCard from "../components/MovieCard";
// CSS
import './Movie.css'

// 根據月份篩選電影的輔助函式
function getMoviesByMonth(month) {
    return movies.filter(movie =>
        new Date(movie.releaseDate).getMonth() + 1 === month
        // month 是 0-based，所以要加一
    )
}

const aprilMovies  = getMoviesByMonth(4)
const mayMovies  = getMoviesByMonth(5)

export default function Movies() {
    return (
        <div className="movies-page">

            {/* 五月 */}
            <section className="movies-section">
                <h2>五月上映</h2>
                <div className="movies-grid">
                    {mayMovies.length > 0
                        ? mayMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                image={movie.image}
                            />
                        ))
                        : <p>暫無電影</p>
                    }
                </div>
            </section>
            
            {/* 四月 */}
            <section className="movies-section">
                <h2>四月上映</h2>
                <div className="movies-grid">
                    {aprilMovies.length > 0
                        ? aprilMovies.map(movie => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                image={movie.image}
                            />
                        ))
                        : <p>暫無電影</p>
                    }
                </div>
            </section>
        </div>
    )
}