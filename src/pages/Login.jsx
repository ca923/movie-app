import { useLocation, useNavigate } from "react-router";
// 資料
import { movies } from "../data/movies";
// CSS
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/movie/';

  function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem("token", "demo-token");
    navigate(from, { replace: true });
  }

  return (
    <section className="card">
      <h2>請先登入</h2>
      {/* <p>按下登入後會回到原本想進入的頁面。</p> */}
      <button onClick={handleLogin} className="card-btn">
        登入
      </button>
    </section>
  );
}