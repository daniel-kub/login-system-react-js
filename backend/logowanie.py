import psycopg2
import json
import bcrypt
import jwt
from fastapi import HTTPException
import os
from dotenv import load_dotenv, dotenv_values 
load_dotenv() 


klucz = "3ryhfefjfyx62v7t0kr0p23ivgdicnsf"


# Połączenie z bazą
conn = psycopg2.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT")
)

# Utworzenie kursora
cur = conn.cursor()


def logowanie_haslo(login, haslo):
    cur.execute("SELECT id,password,fullname FROM users where username = %s;",(login,))
    rows = cur.fetchall()
    #return rows
    if rows == []:
        zawartosc =  {"logowanie":False,"przyczyna":"Zły login"}
    for row in rows:
        zawartosc =  autoryzacja(row, haslo)
    if(zawartosc['logowanie'] == False):
        raise HTTPException(status_code=401, detail=zawartosc["przyczyna"])
    else:
        cookies = jwt.encode({"login":login,"haslo":haslo},klucz,algorithm="HS256")
    zawartosc["cookies"] = cookies
    return zawartosc    

import jwt
from fastapi import HTTPException

def logowanie_jwt(cookies):
    try:
        # Próba dekodowania JWT
        logowanie = jwt.decode(cookies, klucz , algorithms=["HS256"])
        login = logowanie.get("login")
        haslo = logowanie.get("haslo")

        if not login or not haslo:
            raise HTTPException(status_code=400, detail="Brak loginu lub hasła w tokenie")

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token JWT wygasł")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Nieprawidłowy token JWT")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Błąd dekodowania JWT: {str(e)}")

    # Sprawdzenie w bazie
    cur.execute("SELECT id, password, fullname FROM users WHERE username = %s;", (login,))
    rows = cur.fetchall()

    if not rows:
        raise HTTPException(status_code=401, detail="Nieprawidłowy login")

    # Autoryzacja użytkownika
    for row in rows:
        zawartosc = autoryzacja(row, haslo)

    if not zawartosc.get("logowanie"):
        raise HTTPException(status_code=401, detail=zawartosc.get("przyczyna", "Błąd logowania"))

    # Jeśli wszystko poprawne
    return zawartosc


def autoryzacja(row, haslo_uzytkownika):
    id = row[0]
    password = row[1]
    fullname = row[2]
    result =  bcrypt.checkpw(haslo_uzytkownika.encode('utf-8'), password.encode('utf-8'))
    if(result):
        zaszyfrowane_id = jwt.encode({"id":id},klucz, algorithm="HS256")
        return {"logowanie":True,"zaszyfrowane_id":zaszyfrowane_id,"nazwa":fullname}
    else:
        return {"logowanie":False,"przyczyna":"Złe hasło"}