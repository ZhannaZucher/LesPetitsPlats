import { render, search, renderTags } from "./searchEngine.js";
//import { buildTagsDOM } from "../templates/tagsContainer.js";
import { recipes } from "../../data/recipes.js";

//éléments DOM:
const mainSearchInput = document.querySelector(".searchbar__input");
const tagSearchInputs = document.querySelectorAll(".filter__input"); 

/**
 * permet de stocker les fitres sélectionnés et la valeur de l'input search dans le but de les passer à la fonction "search" qui filtrera les recettes sur ces critères
 */
export const state = {
	//stockage de critères de la recherche
	filters: {
		ingredientsSelectedTags: [],
		appliancesSelectedTags: [],
		ustensilsSelectedTags: [],
		keywords: [],
	},
	//permet de déterminer l'endroit(type de array) où stocker tel ou tel type de filtre(tag ou keyword)
	getFilterTypeList: function (filterName) {
		if (this.filters[filterName]) {
			return this.filters[filterName];
		}
		return [];
	},
	//permet d'ajouter un nouveau filtre à la liste de critères de recherche correspondante
	setFilter: function (filterName, keyword) {
		if (this.filters[filterName]) {
			if (filterName === "keywords") {
				//array keywords aura tjrs un seul élément
				this.filters[filterName][0] = keyword;
			} else {
				this.filters[filterName].push(keyword.toLowerCase());
			}
		}
	},
	//permet d'accéder à la liste des filtres
	getFilters: function () {
		return this.filters;
	},
	//vérification de l'existence des filtres à appliquer
	isFilterSet: function () {
		let keyword = this.filters.keywords[0] ? this.filters.keywords[0] : "" ;
		return this.filters.ingredientsSelectedTags.length !== 0
			|| this.filters.appliancesSelectedTags.length !== 0
			|| this.filters.ustensilsSelectedTags.length !== 0
			|| keyword.length >= 3;
	},
	//permet d'enlever de la liste correspondante un tag déselectionné
	unsetFilterByValue: function (filterName, filterValue) {
		if (this.filters[filterName]) {
			let filterIndex = this.filters[filterName].indexOf(filterValue);
			//si l'élément cherché se trouve bien dans la liste, on l'enlève
			if (filterIndex !== -1) {
				this.filters[filterName].splice(filterIndex, 1);
			}
		}
	}
}

// écoute de l'événement sur l'input de recherche principale
mainSearchInput.addEventListener("input", function (event) {
	//remplacement d'espaces par chaîne de charactères vides
	let searchTerm = event.target.value.toLowerCase().replace(/\s/g, ""); 
	if (searchTerm.length >= 3) {
		state.setFilter("keywords", searchTerm);
		let recipeIdList = search();
		render(recipeIdList);
		renderTags(recipeIdList);
	}
	if (searchTerm.length < 3) {
		state.filters.keywords.splice(0,1);
		if (searchTerm.length < 3 && !state.isFilterSet()) {
			let recipeIdList = [];
			recipes.forEach(recipe => recipeIdList.push(recipe.id));
			render(recipeIdList); //affichage de toutes les recettes de la BDD
			renderTags(recipeIdList);
		} 
	}
})

// écoute de l'événement sur les inputs de recherche des tags
tagSearchInputs.forEach((input) => input.addEventListener("input", (event) => {
	const ingredientsList = document.querySelectorAll("#list-ingredients > li");
	const appliancesList = document.querySelectorAll("#list-appliances > li");
	const ustensilsList = document.querySelectorAll("#list-ustensils > li");

	let tagKeyword = event.target.value.toLowerCase().replace(/\s/g, "");

	if (tagKeyword.length >= 3) {
		switch (input.id) {
			case "input-ingredients":
				hideUnmatchingTags(ingredientsList, tagKeyword);
				break;
			case "input-appliances":
				hideUnmatchingTags(appliancesList, tagKeyword);
				break;
			case "input-ustensils":
				hideUnmatchingTags(ustensilsList, tagKeyword);
				break;
		}
	} else if (tagKeyword.length < 3) {
		switch (input.id) {
			case "input-ingredients":
				showHiddenTags(ingredientsList);
				break;
			case "input-appliances":
				showHiddenTags(appliancesList);
				break;
			case "input-ustensils":
				showHiddenTags(ustensilsList);
				break;
		}
	}
}))

/**
 * permet de cacher les tags de la liste qui ne correspondant pas au critère de recherche
 * @param {string} tagList 
 * @param {string} keyword 
 */
function hideUnmatchingTags(tagList, keyword) {
	tagList.forEach((li) => {
		if (!li.textContent.toLowerCase().includes(keyword)) {
			li.classList.add("hidden");
		} else if (keyword.length < 3) {
			li.classList.remove("hidden");
		}
	})
}

/**
 * permet d'afficher tous les tags disponibles 
 * @param {string} tagList 
 */
function showHiddenTags(tagList) {
		tagList.forEach((li) => li.classList.remove("hidden"));
}