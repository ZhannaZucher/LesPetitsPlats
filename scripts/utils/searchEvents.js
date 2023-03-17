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


mainSearchInput.addEventListener("input", function (event) {
	state.keyword = event.target.value.toLowerCase().replace(/\s/g, ""); //remplacement d'espaces par chaînes de charactères vides
	console.log(state.keyword);
})

const state = {
	ingredientsSelectedTags: [],
	appliancesSelectedTags: [],
	ustensilsSelectedTags: [],
	keyword: "",
}

//console.log();