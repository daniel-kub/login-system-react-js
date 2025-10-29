import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Rejestracja = () => {
  const navigate = useNavigate();
  const [liczby, setLiczby] = useState({ liczba1: 0, liczba2: 0, suma: 0 });

  useEffect(() => {
    const liczba1 = getRandomInt(1, 10);
    const liczba2 = getRandomInt(1, 10);
    const suma = liczba1 + liczba2;
    setLiczby({ liczba1, liczba2, suma });
    document.title = "Rejestracja nowego użytkownika";
  }, []);

  const schema = yup.object().shape({
    login: yup.string().required("Login jest wymagany"),
    haslo: yup
      .string()
      .required("Hasło jest wymagane")
      .min(6, "Hasło musi mieć co najmniej 6 znaków"),
    haslo2: yup
      .string()
      .required("Powtórz hasło")
      .oneOf([yup.ref("haslo")], "Hasła muszą być takie same"),
    fullname: yup.string().required("Pełna nazwa jest wymagana"),
    captcha: yup
      .string()
      .required("Musisz podać wynik")
      .test("is-correct", "Niepoprawny wynik", (value) => {
        return Number(value) === liczby.suma;
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:8000/rejestracja", {
        login: data.login,
        haslo: data.haslo,
        fullname: data.fullname,
      })
      .then(() => {
        alert("Konto zostało stworzone!");
        alert("✅ Konto zostało stworzone!");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          alert("Taki użytkownik już istnieje!");
        } else {
          console.error("Błąd rejestracji:", error);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Nagłówek */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Rejestracja</h2>
          <p className="text-sm text-gray-500 mt-1">Utwórz nowe konto</p>
        </div>

        {/* Formularz */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Login */}
          <div>
            <input
              {...register("login")}
              type="text"
              placeholder="Login"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 placeholder-gray-400"
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
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 placeholder-gray-400"
            />
            {errors.haslo && (
              <p className="mt-1 text-xs text-red-600">{errors.haslo.message}</p>
            )}
          </div>

          {/* Powtórz hasło */}
          <div>
            <input
              {...register("haslo2")}
              type="password"
              placeholder="Powtórz hasło"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 placeholder-gray-400"
            />
            {errors.haslo2 && (
              <p className="mt-1 text-xs text-red-600">{errors.haslo2.message}</p>
            )}
          </div>

          {/* Pełna nazwa */}
          <div>
            <input
              {...register("fullname")}
              type="text"
              placeholder="Pełna nazwa"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 placeholder-gray-400"
            />
            {errors.fullname && (
              <p className="mt-1 text-xs text-red-600">
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* CAPTCHA */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Podaj wynik: <strong>{liczby.liczba1} + {liczby.liczba2}</strong> = ?
            </label>
            <input
              {...register("captcha")}
              type="number"
              placeholder="Wpisz wynik"
              className="w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {errors.captcha && (
              <p className="mt-1 text-xs text-red-600">
                {errors.captcha.message}
              </p>
            )}
          </div>

          {/* Przycisk */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
          >
            Zarejestruj
          </button>
        </form>

        {/* Link do logowania */}
        <div className="text-center">
          <span className="text-sm text-gray-600">Masz już konto? </span>
          <Link
            to="/login"
            className="text-sm font-medium text-purple-600 hover:text-purple-800 hover:underline transition"
          >
            Zaloguj się
          </Link>
        </div>
      </div>
    </div>
  );
};