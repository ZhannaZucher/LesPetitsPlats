import { recipes } from "../../data/recipes.js";
import { RecipeCardDOM } from "../templates/recipeCardDOM.js";
import { state } from "./searchEvents.js";

//object state data search tranfert object
//searchTo = search Transfert Object
window.recipes = recipes;
/**
 * 
 * @return array
 */
export function search() {
	let recipeIdList = [];
	recipes.forEach(function (recipe) {
		let ingredientsMatched = false;
		let appliancesMatched = false;
		let ustensilsMatched = false;
		for (let filterName in state.getFilters()) {
			if (filterName === "ingredientsSelectedTags") {
				let numberOfMatchedIngredients = 0;
				let selectedTags = state.getFilterTypeList(filterName);
				selectedTags.forEach(function(selectedTag){
					if (recipe.ingredients.filter(ingredient => selectedTag === ingredient.ingredient.toLowerCase()).length > 0) {
						numberOfMatchedIngredients++;
					}
				});
				if (numberOfMatchedIngredients === selectedTags.length) {
					ingredientsMatched = true;
				}
			}

			if (filterName === "appliancesSelectedTags") {
				let numberOfMatchedAppliances = 0;
				let selectedTags = state.getFilterTypeList(filterName);
				selectedTags.forEach(function (selectedTag) {
					if (selectedTag === recipe.appliance.toLowerCase()) {
						numberOfMatchedAppliances++;
					}
				});
				if (numberOfMatchedAppliances === selectedTags.length) {
					appliancesMatched = true;
				}
			}

			if (filterName === "ustensilsSelectedTags") {
				let numberOfMatchedUstensils = 0;
				let selectedTags = state.getFilterTypeList(filterName);
				selectedTags.forEach(function (selectedTag) {
					if (recipe.ustensils.filter(ustensil => selectedTag === ustensil.toLowerCase()).length > 0) {
						numberOfMatchedUstensils++;
					}
				});
				if (numberOfMatchedUstensils === selectedTags.length) {
					ustensilsMatched = true;
				}
			}
		}
		if (ingredientsMatched && appliancesMatched && ustensilsMatched) {
			recipeIdList.push(recipe.id);
		}
	});	

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

	if (!state.isFilterSet()) {
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

	//on remplit le tableau des recetees à afficher avec les recettes correspondantes aux critères de la recherche*
	recipeIdList.forEach(id => resultsFound.push(recipes.filter(recipe => recipe.id === id)));
	const results = resultsFound.flat();
	const ResultsTemplate = new RecipeCardDOM(results);
	ResultsTemplate.buildCardDOM();
}

//const recipeIdList = [0, 1, 2, 2, 5, 5];
//render(recipes, recipeIdList)