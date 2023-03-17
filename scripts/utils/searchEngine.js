import { recipes } from "../../data/recipes.js";
import { RecipeCardDOM } from "../templates/RecipeCardDOM.js";

//object state data search tranfert object
//searchTo = search Transfert Object

/**
 * 
 * @param {Object} searchTo search Transfert Object
 */
function search(searchTo) {

}


/**
 * permet de filter la liste de recettes à partir de la liste des id des recettes filtrées et affiche le message "Pas de résultats" dans le cas de la liste d'ids vide
 * @param {{recipe[]}} recipes 
 * @param {Array.<number>} filteredIds
 */
function render(recipes, filteredIds) {
	const resultsFound = [];
	const resultsContainer = document.querySelector(".recipes-section");
	//resultsContainer.innerHTML = "";
	
	if (filteredIds.length === 0) {
		resultsContainer.innerHTML = "";
		const	noMatchesMessage = document.createElement("div"); 
		noMatchesMessage.classList.add("noresults__container");
		noMatchesMessage.innerHTML = `<p>Aucune recette ne correspond à votre critère… Vous pouvez chercher « tarte aux pommes », « poisson », etc</p>`;
	resultsContainer.appendChild(noMatchesMessage);
	resultsContainer.style.display = "block";
	} else {
		//on remplit le tableau des recetees à afficher avec les recettes correspondantes aux critères de la recherche
		filteredIds.forEach(id => resultsFound.push(recipes.filter(recipe => recipe.id === id)));
		const results = resultsFound.flat();
		const ResultsTemplate = new RecipeCardDOM(results);
		ResultsTemplate.buildCardDOM();
		console.log(results);
		console.log(recipes);
	}
}

const filteredIds = [1, 2, 3];
render(recipes, filteredIds)