import { NavLink, Outlet, useParams } from 'react-router'
// 資料
import { movies } from '../data/movies'
// CSS
import './MovieLayout.css'

export default function MovieLayout() {

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  const { id } = useParams()
  const movie = movies.find(m => m.id === Number(id))

  if (!movie) return <p>找不到這部電影</p>

  return (
    <div className='dashboard'>
      {/* 所有子頁面共用的標題 */}
      <h1>{movie.title}</h1>
      <div className='dn'>
        {/* 導覽列 */}
        <nav className='dashboard-navlink'>
          <NavLink to={`/movie/${id}`} end className={'d-btn'}>電影介紹</NavLink>
          <NavLink to={`/movie/${id}/booking`} className={'d-btn'}>前往訂票</NavLink>
          <NavLink to={`/movie/${id}/review`} className={'d-btn'}>撰寫評論</NavLink>
        </nav>
        <NavLink to={`/`} onClick={handleLogout} className={'d-btn-log'}>登出</NavLink>
      </div>

      {/* 子頁面渲染 */}
      <Outlet />
    </div>
  )
}