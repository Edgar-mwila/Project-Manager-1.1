import * as React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import ProjectList from './pages/ProjectList.tsx';
import Teams from './pages/Teams.tsx';
import ManageProject from './pages/ManageProjects.tsx';
import ManageTeamProject from './pages/ManageTeamProjects.tsx';

const App = () => {
  // TODO: Implement an authentication check
  const isAuthenticated = () => {
    // Replace this with your actual authentication check
    return localStorage.getItem('authToken') !== null;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/projects"
          element={
            isAuthenticated() ? (
              <ProjectList />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/teams"
          element={
            isAuthenticated() ? (
              <Teams />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/manage-project/:id"
          element={
            isAuthenticated() ? (
              <ManageProject />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/manage-team-project/:id"
          element={
            isAuthenticated() ? (
              <ManageTeamProject />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;