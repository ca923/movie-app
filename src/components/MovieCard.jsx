import { useNavigate } from 'react-router'
import { movies } from "../data/movies";
import "./MovieCard.css";

export default function MovieCard({ id, title, image }) {
    const navigate = useNavigate()

    return (
        <div className="movie-card">
            <img src={image} alt={title} className="movie-card-img" onClick={() => navigate(`/movie/${id}`)} />
            <p className="movie-card-title" onClick={() => navigate(`/movie/${id}`)}>{title}</p>
            <button onClick={() => navigate(`/movie/${id}/booking`)}>前往訂票</button>
            <button onClick={() => navigate(`/movie/${id}/review`)}>撰寫評論</button>
        </div>
    )
}