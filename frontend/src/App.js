import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
import { useSelector } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <GuestRoute finalDestination="/rooms">
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute finalDestination="/rooms">
              <Authenticate />
            </GuestRoute>
          }
        />

        <Route
          path="/activate"
          element={
            <SemiProtectedRoute finalDestination="/rooms">
              <Activate />
            </SemiProtectedRoute>
          }
        />

        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function GuestRoute({ children, finalDestination }) {
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth ? <Navigate to={finalDestination} /> : children;
}

function SemiProtectedRoute({ children, finalDestination }) {
  const { user, isAuth } = useSelector((state) => state.auth);
  let isActivated = user.activated;
  return !isAuth ? (
    <Navigate to="/" />
  ) : !isActivated ? (
    children
  ) : (
    <Navigate to={finalDestination} />
  );
}

function ProtectedRoute({ children }) {
  const { user, isAuth } = useSelector((state) => state.auth);
  let isActivated = user.activated;
  return !isAuth ? (
    <Navigate to="/" />
  ) : !isActivated ? (
    <Navigate to="/activate" />
  ) : (
    children
  );
}

export default App;
