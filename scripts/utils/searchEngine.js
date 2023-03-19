import { recipes } from "../../data/recipes.js";
import { RecipeCardDOM } from "../templates/RecipeCardDOM.js";
import { state } from "./searchEvents.js";

//object state data search tranfert object
//searchTo = search Transfert Object

/**
 * 
 * @param {Object} searchTo search Transfert Object
 */
export function search(searchTo) {
	let recipeIdList = [];

	return recipeIdList;
}

/**
 * permet de filter la liste de recettes à partir de la liste des id des recettes filtrées et affiche le message "Pas de résultats" dans le cas de la liste d'ids vide
 * @param {{recipe[]}} recipes 
 * @param {Array.<number>} recipeIdList
 */
export function render(recipeIdList) {
	recipeIdList = Array.from(new Set(recipeIdList));
	const resultsFound = [];
	const resultsContainer = document.querySelector(".recipes-section");

	if (!state.isFilterApplied()) {
		resultsContainer.style.display = "grid";
		const noFiltersTemplate = new RecipeCardDOM(recipes);
		noFiltersTemplate.buildCardDOM();
		return;
	}

	if (recipeIdList.length === 0) {
		resultsContainer.innerHTML = "";
		const noMatchesMessage = document.createElement("div");
		noMatchesMessage.classList.add("noresults__container");
		noMatchesMessage.innerHTML = `<p>Aucune recette ne correspond à votre critère… Vous pouvez chercher « tarte aux pommes », « poisson », etc</p>`;
		resultsContainer.appendChild(noMatchesMessage);
		resultsContainer.style.display = "block";

		return;
	} 

	//on remplit le tableau des recetees à afficher avec les recettes correspondantes aux critères de la recherche
	console.log(11);
	recipeIdList.forEach(id => resultsFound.push(recipes.filter(recipe => recipe.id === id)));
	const results = resultsFound.flat();
	const ResultsTemplate = new RecipeCardDOM(results);
	ResultsTemplate.buildCardDOM();
	console.log(results);
	console.log(recipes);
}

//const recipeIdList = [0, 1, 2, 2, 5, 5];
//render(recipes, recipeIdList)