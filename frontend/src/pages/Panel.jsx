import { use, useEffect } from "react";
import { useSession } from "../hooks/SessionContext.jsx";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

export const Panel = () => {
  const { session, setSession } = useSession();
  const [, , removeCookie] = useCookies(["user"]);

  useEffect(() => {
    document.title = "Panel użytkownika - " + session.fullName;
  }, [session.fullName]);
  const handleLogout = () => {
    removeCookie("user", { path: "/" });
    setSession({ userId: null, fullName: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8 text-center">
        {/* Powitanie */}
        <div className="space-y-3">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Witaj, <span className="text-emerald-600">{session.fullName}</span>!
          </h1>
          <p className="text-sm text-gray-600">
            Jesteś zalogowany do panelu użytkownika.
          </p>
        </div>

        {/* Akcje */}
        <div className="space-y-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
          >
            Wyloguj się
          </button>

          <div className="text-center">
            <Link
              to="/logowanie"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-800 hover:underline transition"
            >
              ← Powrót do logowania
            </Link>
          </div>
        </div>

      
      </div>
    </div>
  );
};