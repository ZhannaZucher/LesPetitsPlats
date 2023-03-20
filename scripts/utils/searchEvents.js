import { render, search } from "./searchEngine.js";
import { buildTagsDOM } from "../templates/tagsContainer.js";
/*
TODO:
listeners on
1 OK main input search => on input => keyword to state
2 tag input searches => on input => tags to state [] + filter tags lists
+ ! add search & filter search to tagEvents' functions
*/

//éléments DOM:
const mainSearchInput = document.querySelector(".searchbar__input");
const tagSearchInputs = document.querySelectorAll(".filter__input"); 

export const state = {
	filters: {
		ingredientsSelectedTags: [],
		appliancesSelectedTags: [],
		ustensilsSelectedTags: [],
		keywords: [],
	},
	getFilterTypeList: function (filterName) {
		if (this.filters.hasOwnProperty(filterName)) {
			return this.filters[filterName];
		}

		return [];
	},
	setFilter: function (filterName, keyword) {
		if (this.filters.hasOwnProperty(filterName)) {
			if (filterName === "keywords") {
				this.filters[filterName][0] = keyword;
			} else {
				this.filters[filterName].push(keyword.toLowerCase());
			}
		}
	},
	getFilters: function () {
		return this.filters;
	},
	isFilterSet: function () {
		let keyword = this.filters.keywords[0] ?? "" ;
		return this.filters.ingredientsSelectedTags.length !== 0
			|| this.filters.appliancesSelectedTags.length !== 0
			|| this.filters.ingredientsSelectedTags.length !== 0
			|| keyword.length >= 3;
	},
	unsetFilterByValue: function (filterName, filterValue) {
		if (this.filters.hasOwnProperty(filterName)) {
			let filterIndex = this.filters[filterName].indexOf(filterValue);
			if (filterIndex !== -1) {
				this.filters[filterName].splice(filterIndex, 1);
			}
		}
	}
}

// écoute de l'événement sur l'input de recherche principale
mainSearchInput.addEventListener("input", function (event) {
	//remplacement d'espaces par chaînes de charactères vides
	let searchTerm = event.target.value.toLowerCase().replace(/\s/g, ""); 
	state.setFilter("keyword", searchTerm);
	if (searchTerm.length >= 3) {
		let recipeIdList = search();
		render(recipeIdList);
	}
	if (searchTerm.length < 3) {
		render([]);
	}
})

// écoute de l'événement sur les inputs de recherche des tags
tagSearchInputs.forEach((input) => input.addEventListener("input", (event) => {
	let tagKeyword = event.target.value.toLowerCase().replace(/\s/g, "");
	if (tagKeyword.length >= 3) {
		//search tags and display matches
		console.log("coucou");
	} else {
		buildTagsDOM();
	}
}))