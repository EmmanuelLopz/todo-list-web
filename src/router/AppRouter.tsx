import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { About, Home, Login, ListDetail, SearchResults } from "../pages";
import Header from "../components/Header/Header";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { getToken } from "../services/authService";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={getToken() ? <Navigate to="/home" replace /> : <Login />}
        />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Header />
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/about"
          element={
            <PrivateRoute>
              <Header />
              <About />
            </PrivateRoute>
          }
        />

        <Route
          path="/lists/:id"
          element={
            <PrivateRoute>
              <Header />
              <ListDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Header />
              <SearchResults />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
