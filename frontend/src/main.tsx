import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./pages/Auth/Login.tsx";
import Register from "./pages/Auth/Register.tsx";
import PrivateRoute from "./pages/Auth/PrivateRoute.tsx";
import Profile from "./pages/User/Profile.tsx";
import AdminRoute from "./pages/Admin/AdminRoute.tsx";
import GenreList from "./pages/Admin/GenreList.tsx";
import CreateMovie from "./pages/Admin/CreateMovie.tsx";
import AdminMoviesList from "./pages/Admin/AdminMoviesList.tsx";
import UpdateMovie from "./pages/Admin/UpdateMovie.tsx";
import AllMovies from "./pages/Movies/AllMovies.tsx";
import MovieDetails from "./pages/Movies/MovieDetails.tsx";
import AllComments from "./pages/Admin/AllComments.tsx";
import AdminDashboard from "./pages/Admin/dashboard/AdminDashboard.tsx";

// Auth

// Restricted

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/movies" element={<AllMovies />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies/:id" element={<MovieDetails />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />}></Route>
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/movies/genre" element={<GenreList />} />
        <Route path="/admin/movies/create" element={<CreateMovie />} />
        <Route path="/admin/movies-list" element={<AdminMoviesList />} />
        <Route path="/admin/movies/update/:id" element={<UpdateMovie />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
