import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";

import "./App.css";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Admin from "../Admin/Admin";
export const AppContext = React.createContext();

function App() {
    let appState = "DEV";
    let apiBaseURL = "https://render.com/"; //Mettre ici votre lien de render

    if (appState == "DEV") {
        apiBaseURL = "http://localhost:3301/"; //Mettre ici votre port en local
    }

    const [user, setUser] = useState({ isLogged: false, usager: {} });

    useEffect(() => {
        const estValide = jetonValide();

        const userData = {
            isLogged: estValide,
            usager: {},
        };

        setUser(userData);
    }, []);

    async function login(e) {
        e.preventDefault();
        const form = e.target;

        const body = {
            courriel: form.courriel.value,
            mdp: form.mdp.value,
        };
        console.log(body);

        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };

        const reponse = await fetch(`${apiBaseURL}api/utilisateurs/connexion`, data);
        const token = await reponse.json();

        //Si la reponse est ok, on enregistre le token
        if (reponse.status === 200) {
            const userData = {
                isLogged: true,
                usager: {},
            };

            setUser(userData);
            localStorage.setItem("api-film-token", token);
        } else {
            //Si la reponse n'est pas bonne on détruit le token enregistré si connecté
            localStorage.removeItem("api-film-token");
        }
    }

    function logout() {
        const userData = {
            isLogged: false,
            usager: {},
        };

        setUser(userData);
        localStorage.removeItem("api-film-token");
    }
    function jetonValide() {
        try {
            const token = localStorage.getItem("api-film-token");
            const decode = jwtDecode(token);

            if (token && Date.now() < decode.exp * 1000) {
                return true;
            } else {
                //On enlève la connexion si on est connecté
                localStorage.removeItem("api-film-token");
                return false; //Le jeton n'est pas valide
            }
        } catch (erreur) {
            localStorage.removeItem("api-film-token");
            return false;
        }
    }

    return (
        <AppContext.Provider value={user}>
            <Router>
                <Entete handleLogin={login} handleLogout={logout} />
                <Routes>
                    {/* <Route element={<PrivateRoute />}> */}
                        <Route path="/admin" element={<Admin></Admin>} />
                    {/* </Route> */}
                    <Route path="/" element={<Accueil />} />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
