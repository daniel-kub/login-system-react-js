import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useSession } from "../hooks/SessionContext.jsx";
import { Link } from "react-router-dom";
import { use, useEffect } from "react";

const schema = yup.object().shape({
  login: yup.string().required("Login jest wymagany"),
  haslo: yup.string().required("Hasło jest wymagane"),
});

export const Logowanie = () => {
  const { setSession } = useSession();
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    document.title = "Logowanie";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/logowanie-haslo", {
        login: data.login,
        haslo: data.haslo,
      })
      .then((response) => {
        console.log("Zalogowano pomyślnie!");
        setSession({
          userId: response.data.zaszyfrowane_id,
          fullName: response.data.nazwa,
        });
        setCookie("user", response.data.cookies, {
          path: "/",
          expires: new Date("9999-12-31"),
        });
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert(error.response.data.detail);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Nagłówek */}
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Logowanie
        </h2>

        {/* Formularz */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Login */}
          <div>
            <input
              {...register("login")}
              type="text"
              placeholder="Login"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
            />
            {errors.login && (
              <p className="mt-1 text-xs text-red-600">{errors.login.message}</p>
            )}
          </div>

          {/* Hasło */}
          <div>
            <input
              {...register("haslo")}
              type="password"
              placeholder="Hasło"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 placeholder-gray-400"
            />
            {errors.haslo && (
              <p className="mt-1 text-xs text-red-600">{errors.haslo.message}</p>
            )}
          </div>

          {/* Przycisk */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
          >
            Zaloguj
          </button>
        </form>

        {/* Link do rejestracji */}
        <div className="text-center">
          <span className="text-sm text-gray-600">Nie masz konta? </span>
          <Link
            to="/register"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition"
          >
            Załóż konto
          </Link>
        </div>
      </div>
    </div>
  );
};