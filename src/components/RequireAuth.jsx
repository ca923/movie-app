import { Navigate, useLocation } from "react-router";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("token") === "demo-token";

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // 可以讓登入頁知道使用者原本想去哪裡
      />
    );
  }

  return children;
}