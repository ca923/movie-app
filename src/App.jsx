import { Route, Routes } from "react-router";
import { useState } from "react";
import SiteHeader from "./components/SiteHeader";
import RequireAuth from "./components/RequireAuth.jsx";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import MovieIntro from "./pages/movie/MovieIntro";
import MovieLayout from "./pages/MovieLayout";
import Booking from "./pages/movie/Booking";
import Review from "./pages/movie/Review";
import BookingSuccess from "./pages/BookingSuccess";
import "./App.css";

export default function App() {

  return (
    <div className="app">
      <SiteHeader />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          {/* 父路由和子路由 */}
          <Route path="/movie/:id"
            element={
              <RequireAuth>
                <MovieLayout />
              </RequireAuth>
            }>
            <Route index element={<MovieIntro />} />
            <Route path="booking" element={<Booking />} />
            <Route path="review" element={<Review />} />
          </Route>
          <Route path="booking-success" element={<BookingSuccess />} />
        </Routes>
      </main>
    </div>
  );
} 