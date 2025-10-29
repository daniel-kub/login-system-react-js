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

def rejestracja_uzytkownika(login, haslo, fullname):
    # Sprawdzenie czy użytkownik już istnieje
    cur.execute("SELECT id FROM users WHERE username = %s;", (login,))
    if cur.fetchone() is not None:
        raise HTTPException(status_code=400, detail="Użytkownik już istnieje")
    
    # Hashowanie hasła
    hashed_password = bcrypt.hashpw(haslo.encode('utf-8'), bcrypt.gensalt())
    
    # Dodanie nowego użytkownika do bazy danych
    cur.execute("INSERT INTO users (username, password, fullname) VALUES (%s, %s, %s);", 
                (login, hashed_password.decode('utf-8'), fullname))
    conn.commit()
    return {"status": "ok", "message": "Użytkownik zarejestrowany pomyślnie"}