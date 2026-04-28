import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const Home = lazy(() => import("../features/home/pages/Home"));
const Movies = lazy(() => import("../features/movies/pages/Movies"));
const MovieDetail = lazy(() => import("../features/movies/pages/MovieDetail"));
const Search = lazy(() => import("../features/movies/search/Search"));
const Bookmark = lazy(() => import("../features/bookmark/pages/Bookmark"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Register = lazy(() => import("../features/auth/pages/Register"));
const NotFound = lazy(() => import("../layout/components/NotFound"));
const AppRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "movies", element: <Movies /> },
        { path: "bookmarks", element: <Bookmark /> },
        { path: "movie/:id", element: <MovieDetail /> },
        { path: "search", element: <Search /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
};
export default React.memo(AppRoutes);
