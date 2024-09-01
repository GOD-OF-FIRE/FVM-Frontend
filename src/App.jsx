import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import CreateAccount from "./Pages/CreateAccount";
import VotingPage from "./Pages/VotingPage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={() => {}} />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
