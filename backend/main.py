from fastapi import *
import logowanie
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import rejestracja
app = FastAPI()

# 🔧 Dozwolone źródła (adresy twojego frontendu)
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    "http://192.168.1.47:5173"  # Przykładowy lokalny adres IP
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Które domeny mogą się łączyć
    allow_credentials=True,
    allow_methods=["*"],            # Pozwól na wszystkie metody (POST, GET, OPTIONS itd.)
    allow_headers=["*"],            # Pozwól na wszystkie nagłówki
)

class LogowanieRequest(BaseModel):
    login: str
    haslo: str
class DaneRejestracji(BaseModel):
    login: str
    haslo: str
    fullname: str


@app.get("/")
async def testowe_polecenie():
    return {"Hello":"World"}
@app.post("/logowanie-haslo")
async def logowanie_haslo(dane: LogowanieRequest):
    return logowanie.logowanie_haslo(dane.login, dane.haslo)
@app.get("/logowanie-jwt")
def logowanie_jwt(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Brak tokena")
    token = authorization.replace("Bearer ", "")
    return logowanie.logowanie_jwt(token)
@app.post("/rejestracja")

@app.post("/rejestracja")
def rejestracja_uzytkownika(dane: DaneRejestracji):
    return rejestracja.rejestracja_uzytkownika(dane.login, dane.haslo, dane.fullname)