import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FormPage from "./pages/FormPage";
import LoadingPage from "./pages/LoadingPage";
import ResultPage from "./pages/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/form"
        element={
          <ProtectedRoute>
            <FormPage />
           </ProtectedRoute>
        }
      />

      <Route
        path="/loading"
        element={
          <ProtectedRoute>
            <LoadingPage />
           </ProtectedRoute>
        }
      />

      <Route
        path="/result/:id"
        element={
          <ProtectedRoute>
            <ResultPage />
           </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
