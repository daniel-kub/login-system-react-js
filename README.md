# React.js System Logowania

Projekt ma na celu stworzenie systemu logowania, który może stanowić bazę pod dowolną aplikację. Wykorzystano następujące technologie:

- **React.js + Vite**
- **TailwindCSS**
- **react-cookies**
- **Python 3**
- **FastAPI/Uvicorn**
- **PostgreSQL**

---

## Strony

### `/login`
- Umożliwia zalogowanie się za pomocą loginu i hasła.
- Formularz Reactowy z podstawową walidacją przed wysłaniem.
- Funkcja `onSubmit` wykorzystuje Axiosa do wysłania żądania i dalszej obsługi.

### `/rejestracja`
- Umożliwia rejestrację użytkownika w bazie PostgreSQL.
- Zawiera walidację przed wysłaniem oraz weryfikację Captcha w postaci prostego dodawania (możliwość rozbudowy np. o Google reCAPTCHA).
- Dane przekazywane są do funkcji `onSubmit`.

### `/panel`
- Wyświetla przywitanie użytkownika w formie: *Witaj {user}*.
- Umożliwia wylogowanie.

---

## Działanie komponentów

### `Pages/Logowanie.jsx`
- **onSubmit**:
  - Po kliknięciu przycisku i poprawnej walidacji, Axios wysyła żądanie POST `/logowanie-hasło`.
  - Weryfikacja użytkownika i hasła (bcrypt).
  - Poprawne dane: HTTP 200, zwraca JWT, zaszyfrowane ID i nazwę użytkownika.
  - Błędne dane: HTTP 401 (zły login/hasło).

### `App.jsx`
- **checkAuth**:
  - Sprawdza istnienie ciasteczka (cookie).
  - Wysyła żądanie do FastAPI `/logowanie-jwt` w celu weryfikacji JWT.
  - Poprawne dane: zwraca zaszyfrowane ID i nazwę użytkownika.
  - Błędy 400/401: niepoprawne ciasteczko lub zdezaktualizowane dane.

### `Pages/Register.jsx`
- **onSubmit**:
  - Wysyła żądanie POST do FastAPI z danymi rejestracji.
  - Poprawna odpowiedź: przekierowanie do logowania.
  - Błąd 400: alert o istniejącym użytkowniku.

### `Hooks/useSessionStorage.jsx`
- Zapisuje w `sessionStorage` parametry takie jak zaszyfrowane ID i nazwa użytkownika.

### `Hooks/sessionContext.jsx`
- Przechowuje dane w pamięci przeglądarki, symulując działanie `$_SESSION` znane z PHP.

---

## Instalacja

1. Sklonuj projekt.
2. Zaimportuj bazę danych z pliku `logowanie.sql` do swojej bazy PostgreSQL.
3. W folderze `backend` utwórz plik `.env` z zawartością:

```env
DB_NAME="nazwa_bazy"
DB_USER="uzytkownik"
DB_PASSWORD="hasło"
DB_HOST="localhost"
DB_PORT="5432"

```
4. Uruchom skrypt tworzenie_venv.bat (czas wykonania do 5 minut).

5. Uruchom backend poleceniem:
```bash
.venv/Scripts/fastapi run main.py
```

6. W nowym oknie terminala uruchom frontend:

```bash
npm install
npm run dev
```

Screenshoty z aplikacji

Błąd 404
![404](https://github.com/daniel-kub/login-system-react-js/blob/main/files/404.png)

![logowanie](https://github.com/daniel-kub/login-system-react-js/blob/main/files/logowanie.png)

![rejestracja](https://github.com/daniel-kub/login-system-react-js/blob/main/files/rejestracja.png)

![zalogowany użytkownik](https://github.com/daniel-kub/login-system-react-js/blob/main/files/zalogowany_uzytkownik.png)