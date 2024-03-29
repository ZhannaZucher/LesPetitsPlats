import { recipes } from "../../data/recipes.js";
import { RecipeCardDOM } from "../templates/recipeCardDOM.js";
import { state } from "./searchEvents.js";
import { getTagsArray } from "../templates/tagsContainer.js";

/**
 * permet de filtrer les recettes sur les critères de recherche récupérés depuis l'objet "state"
 * @return array des ids des recettes correspondantes au critères de recherche
 */
export function search() {
	let recipeIdList = [];
	
	for (let i = 0; i < recipes.length; i++) {
		let ingredientsMatched = false;
		let appliancesMatched = false;
		let ustensilsMatched = false;
		let keywordMatched = false; 

		for (let filterName in state.getFilters()) {
			if (filterName === "ingredientsSelectedTags") {
				let numberOfMatchedIngredients = 0;
				//on récupère les critères de recherche
				let selectedTags = state.getFilterTypeList(filterName);
				for (let j = 0; j < selectedTags.length; j++) {
					for (let k = 0; k < recipes[i].ingredients.length; k++) {
						if (recipes[i].ingredients[k].ingredient.toLowerCase() === selectedTags[j]) {
							numberOfMatchedIngredients++;
						}
					}
				}
				//on vérifie si la recette parcourue correspond à tous les filtres actifs
				if (numberOfMatchedIngredients === selectedTags.length) {
					ingredientsMatched = true;
				}
			}
			if (filterName === "appliancesSelectedTags") {
				let numberOfMatchedAppliances = 0;
				let selectedTags = state.getFilterTypeList(filterName);
				for (let j = 0; j < selectedTags.length; j++) {
					if (selectedTags[j] === recipes[i].appliance.toLowerCase()) {
						numberOfMatchedAppliances++;
					}
				}
				if (numberOfMatchedAppliances === selectedTags.length) {
					appliancesMatched = true;
				}
			}
			if (filterName === "ustensilsSelectedTags") {
				let numberOfMatchedUstensils = 0;
				let selectedTags = state.getFilterTypeList(filterName);
				for (let j = 0; j < selectedTags.length; j++) {
					for (let k = 0; k < recipes[i].ustensils.length; k++) {
						if (recipes[i].ustensils[k].toLowerCase() === selectedTags[j]) {
							numberOfMatchedUstensils++;
						}
					}
				}
				if (numberOfMatchedUstensils === selectedTags.length) {				
					ustensilsMatched = true;
				}
			}
			if (filterName === "keywords") {
				let selectedKeywordList = state.getFilterTypeList(filterName);
				if (!selectedKeywordList.length) {
					keywordMatched = true;
				} if (selectedKeywordList.length) {
					let keyword = selectedKeywordList[0];
					if (recipes[i].name.toLowerCase().includes(keyword) ||
						recipes[i].description.toLowerCase().includes(keyword) ||
						hasIngredientMatched(recipes[i], keyword)
						) {
						keywordMatched = true;
					}
				}
			}
		}
		// dans le cas où la recette parcourue correspond à tous les critères de recherche, on ajoute son id dans la liste des recettes correspondantes aux critères de recherche
		if (ingredientsMatched && appliancesMatched && ustensilsMatched && keywordMatched) {
			recipeIdList.push(recipes[i].id);			
		}
	}
	return recipeIdList;
}

/**
 * permet de savoir si la recette donnée contient le keyword parmi ses ingrédients
 * @param {Object} recipe 
 * @param {string} keyword 
 * @returns boolean
 */
function hasIngredientMatched(recipe, keyword) {
	for (let i = 0; i < recipe.ingredients.length; i++) {
		if (recipe.ingredients[i].ingredient.toLowerCase() === keyword) {
			return true;
		}
		return false;
	}
}

/**
 * permet de filter la liste de recettes à partir de la liste des id des recettes filtrées et affiche le message "Pas de résultats" dans le cas de la liste d'ids vide 
 * @param {Array.<number>} recipeIdList 
 */
export function render(recipeIdList) {
	//suppression des doublons dans la liste des Ids
	recipeIdList = Array.from(new Set(recipeIdList));
	const resultsFound = [];
	const resultsContainer = document.querySelector(".recipes-section");

//affichage des recettes si aucun filtre n'est appliqué (les 4 listes de filtres sont vides)
	if (!state.isFilterSet()) {
		resultsContainer.style.display = "grid";
		const noFiltersTemplate = new RecipeCardDOM(recipes);
		noFiltersTemplate.buildCardDOM();
		return;
	}
//aucun résultat ne correspond aux critères de la recherche
	if (recipeIdList.length === 0) {
		resultsContainer.innerHTML = "";
		const noMatchesMessage = document.createElement("div");
		noMatchesMessage.classList.add("noresults__container");
		noMatchesMessage.innerHTML = `<p>Aucune recette ne correspond à votre critère… Vous pouvez chercher « tarte aux pommes », « poisson », etc</p>`;
		resultsContainer.appendChild(noMatchesMessage);
		resultsContainer.style.display = "block";
		return;
	} 
	resultsContainer.style.display = "grid";
	//on remplit le tableau des recettes à afficher avec les recettes correspondantes aux critères de la recherche
	recipeIdList.forEach(id => resultsFound.push(recipes.filter(recipe => recipe.id === id)));
	const results = resultsFound.flat();
	const ResultsTemplate = new RecipeCardDOM(results);
	ResultsTemplate.buildCardDOM();
}

/**
 * Permet de filtrer les tags affichés en fonction des résultats de recherche
 * @param {Array.<number>} recipeIdList
 */
export function renderTags(recipeIdList) {
	recipeIdList = Array.from(new Set(recipeIdList));
	const resultsFound = [];
	recipeIdList.forEach(id => resultsFound.push(recipes.filter(recipe => recipe.id === id)));
	const results = resultsFound.flat();

// récupération des arrays de tags correspondant à la liste de recettes qui matchent avec les résultats de la recherche
	const ingredientsList = document.querySelectorAll("#list-ingredients > li");
	const appliancesList = document.querySelectorAll("#list-appliances > li");
	const ustensilsList = document.querySelectorAll("#list-ustensils > li");
	const filteredIngredientsArray = getTagsArray(results, "ingredients");
	const filteredAppliancesArray = getTagsArray(results, "appliance");
	const filteredUstensilssArray = getTagsArray(results, "ustensils");

	displayMatchingTags(ingredientsList, filteredIngredientsArray);
	displayMatchingTags(appliancesList, filteredAppliancesArray);
	displayMatchingTags(ustensilsList, filteredUstensilssArray);
}

/**
 * Permet de comparer la liste de tags avec la liste des tags concernés par les résultats de recherche et afficher uniqement les tags correspondant aux résultats
 * @param {Array} tagsList 
 * @param {Array} matchingTags 
 */
function displayMatchingTags(tagsList, matchingTags) {
	//reinitialisation de l'affichage
	tagsList.forEach(li => li.classList.remove("hidden"));
	//affichage des tags correspondants
	tagsList.forEach(li => {
		if (!matchingTags.includes(li.innerText.toLowerCase())) {
			li.classList.add("hidden");
		}
	});
}