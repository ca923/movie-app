import { Link, NavLink, useNavigate } from "react-router";
import { useState, useEffect } from "react";
// CSS
import "./SiteHeader.css";

export default function SiteHeader() {

  return (
    <header className="header">
      <Link className="brand" to="/">
        電影訂票x評論系統
      </Link>

      <nav className="nav">
        {/* <h4>搜尋欄</h4> */}
        <NavLink to="/" end className="nav-btn">
          首頁
        </NavLink>
        <NavLink to="/movie" end className="nav-btn">
          電影
        </NavLink>
        <NavLink to="/login" end className="nav-btn">
          登入
        </NavLink>
      </nav>
    </header>
  );
}
// to="/" 建議加上 end，這樣在 /about 或 /contact 時，首頁連結才不會也被當成 active。
// Navlink多了屬性、記憶的功能，會自動幫你加上 active 的 class，讓你可以用 CSS 來標示目前所在的頁面。
// 類似選單的按鈕，也會顯示你現在在哪個選單上，讓使用者知道目前所在的位置。