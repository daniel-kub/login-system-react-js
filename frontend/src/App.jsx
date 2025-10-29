import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSession } from "./hooks/SessionContext.jsx";
import { Logowanie } from "./pages/Logowanie.jsx";
import { Panel } from "./pages/Panel.jsx";
import { Rejestracja} from "./pages/Rejestracja.jsx";
import { NotFound } from "./pages/NotFound.jsx";

function App() {
  const { session, setSession } = useSession();
  const [cookies, , removeCookie] = useCookies(["user"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "System logowanie - sprawdzanie JWT";
    if (cookies.user) {
      if (!session.userId) {
        console.log("🔍 Sprawdzanie autoryzacji JWT...");
        checkAuth();
      } else {
        setLoading(false);
      }
    } else {
      console.log("Brak ciasteczka — użytkownik niezalogowany");
      setLoading(false);
    }
  }, []);

  function checkAuth() {
    axios
      .get("http://localhost:8000/logowanie-jwt", {
        headers: { Authorization: `Bearer ${cookies.user}` },
      })
      .then((response) => {
        setSession({
          userId: response.data.zaszyfrowane_id,
          fullName: response.data.nazwa,
        });
        console.log("✅ Autoryzacja poprawna:", response.data);
      })
      .catch(() => {
        console.log("❌ JWT niepoprawny — wylogowano");
        removeCookie("user");
      })
      .finally(() => setLoading(false));
  }
  if (loading) {
  return (
    <div className="flex items-center justify-center space-x-1">
      <span className="text-3xl font-semibold text-gray-700">Ładowanie</span>
      <span className="flex space-x-1">
        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full animate-bounce"></span>
      </span>
    </div>
  );
}
  return (
    
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            session.userId ? <Navigate to="/panel" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            session.userId ? <Navigate to="/panel" /> : <Logowanie />
          }
        />
        <Route
          path="/panel"
          element={
            session.userId ? <Panel /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/register"
          element={
            session.userId ? <Navigate to="/panel" /> : <Rejestracja />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;