import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { useState } from "react";
function Admin() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);

    async function onSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const data = {
            titre: form.titre.value,
            genres,
            description: form.description.value,
            realisation: form.description.value,
            annee: form.description.value,
            titreVignette: form.titreVignette.value,
        };

        const token = `Bearer ${localStorage.getItem("api-film-token")}`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: token,
            },
            body: JSON.stringify(data),
        };

        const reponse = await fetch("http://localhost:3301/api/films", options);
        const json = await reponse.json();
        if (reponse.status == 200) {
            navigate("/");
        } else {
        }
        //Si tout est beau on affiche un message de succès
        //Si tout va mal, on affiche une erreur
    }

    function onChange(e) {
        //on récupère la boite cochée
        const boite = e.currentTarget;
        const value = boite.value;
        if (boite.checked && !genres.includes(value)) {
            //Si elle est cochée on l'ajoute au
            setGenres([...genres, value]);
        } else {
            //Si elle est décochée on l'enlève du array
            let nouveauArray = genres.filter((element) => {
                return element !== value;
            });
            setGenres(nouveauArray);
        }
    }

    return (
        <main>
            <div className="wrapper">
                <h1>Admin</h1>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="titre">Titre</label>
                        <input type="text" name="titre" />
                    </div>
                    <div>
                        <label htmlFor="realisation">Réalisation</label>
                        <input type="text" name="realisation" />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea type="text" name="description"></textarea>
                    </div>
                    <div>
                        <label htmlFor="titreVignette">TitreVignette</label>
                        <input type="text" name="titreVignette" />
                    </div>
                    <div>
                        <label htmlFor="annee">Année</label>
                        <input type="text" name="annee" />
                    </div>
                    <div>
                        <input type="checkbox" value="action" name="genres-action" onChange={onChange} />
                        <label>Action</label>
                    </div>
                    <div>
                        <input type="checkbox" value="comedie" name="genres-comedie" onChange={onChange} />
                        <label>Comédie</label>
                    </div>
                    <div>
                        <input type="submit" value="Enregistrer" />
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Admin;
