import './App.css';
import React from "react";
import {
  Route,
  Routes
} from 'react-router-dom';
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from './pages/Home';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import {ToasterProvider} from "./contexts/ToasterContext";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";


function App() {
  return (
    <ToasterProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route
          path="/register/"
          element={<Registration />}
        />
        <Route
          path="/login/"
          element={<Login />}
        />
        <Route
          path="/post/:postId/"
          element={
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:userId/edit/"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ToasterProvider>
  );
}

export default App;
