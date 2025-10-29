import React from 'react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 px-4">
      <div className="text-center space-y-8 max-w-md animate-fadeIn">
        {/* Duży numer 404 */}
        <h1 className="text-9xl font-extrabold text-white tracking-widest opacity-90">
          404
        </h1>

        {/* Tytuł */}
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Strona nie istnieje
        </h2>

        {/* Opis */}
        <p className="text-lg text-gray-300">
          Przepraszamy, ale strona, której szukasz, nie została odnaleziona.
        </p>

        {/* Przycisk powrotu */}
        <a
          href="/"
          className="inline-block mt-6 px-8 py-3 bg-white text-purple-700 font-semibold rounded-full shadow-lg hover:bg-purple-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Wróć na stronę główną
        </a>
      </div>
    </div>
  );
};