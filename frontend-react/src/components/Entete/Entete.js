import { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Entete.css";
import { AppContext } from "../App/App";

function Entete({ handleLogin, handleLogout }) {
    const contexte = useContext(AppContext); // Contient le value
    return (
        <header className="pt-medium pb-medium">
            <div className="wrapper">
                <div className="entete">
                    <NavLink to="/">
                        <h1>VideoClub</h1>
                    </NavLink>
                    <div className="entete__right">
                        {contexte.isLogged === false ? (
                            <nav>
                                <NavLink to="/admin" className={"underline"}>
                                    Page privée
                                </NavLink>
                            </nav>
                        ) : (
                            ""
                        )}
                        {contexte.isLogged === false ? (
                            <form onSubmit={handleLogin}>
                                <input type="text" name="courriel" placeholder="Usager"></input>
                                <input type="password" name="mdp" placeholder="Mot de passe"></input>
                                <button>Connexion</button>
                            </form>
                        ) : (
                            <button onClick={handleLogout}>Déconnexion</button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Entete;
