import { render, search } from "./searchEngine.js";
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
		keyword: "",
	},
	setFilter: function() {

	},
	getFilters: function () {
		return this.filters;
	},
	isFilterSet: function () {
		return this.ingredientsSelectedTags.length !== 0
			|| this.appliancesSelectedTags.length !== 0
			|| this.ingredientsSelectedTags.length !== 0
			|| this.keyword.length >= 3;
	}
}

mainSearchInput.addEventListener("input", function (event) {
	state.keyword = event.target.value.toLowerCase().replace(/\s/g, ""); //remplacement d'espaces par chaînes de charactères vides
	if (state.keyword.length >= 3) {
		let recipeIdList = search();
		render(recipeIdList);
	}
	if (state.keyword.length < 3) {
		render([]);
	}
})



