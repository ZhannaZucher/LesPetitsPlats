import { state } from "./searchEvents.js";
import { render, search } from "./searchEngine.js";

/**
 * permet de construire le DOM pour le tag selectionné
 * @param {string} tagtype type de liste de tags : ingrédients, appliances, ustensils
 * @param {string} tag 
 *  @param {string} filterList liste de propriétés à filtrer, séparées par virgule 
 */
const buildTagTemplate = (tagtype, tag) => {
	const closeIcon = document.createElement("img");
	closeIcon.setAttribute("src", "/assets/close.svg");
	closeIcon.setAttribute("alt", "icon");
	closeIcon.classList.add("closeBtn");

	tag.setAttribute("filter-tag-list", tagtype);
	tag.classList.add(tagtype);
	tag.classList.add("selectedTag");
	tag.appendChild(closeIcon);
	document.querySelector(".tag-container").appendChild(tag);
}

/**
 * permet d'injecter le tag selectionné dans la barre des tags sélectionnés
 */
export function displayTag() {
	const tagList = document.querySelectorAll(".filter__list li");

	tagList.forEach((item) => item.addEventListener("click", (event) => {
	const tag = event.target.cloneNode(true);

	switch (item.closest("ul").id) {
		case "list-ingredients": 
			buildTagTemplate("tag-ingredients", tag);
			state.setFilter("ingredientsSelectedTags", event.target.innerText);
			break;
		case "list-appliances":
			buildTagTemplate("tag-appliances", tag);
			state.setFilter("appliancesSelectedTags", event.target.innerText);
			break;
		case "list-ustensils":
			buildTagTemplate("tag-ustensils", tag);
			state.setFilter("ustensilsSelectedTags", event.target.innerText);
			break;
		}	
		
		let recipeIdList = search();
		render(recipeIdList);
	}));
}

/**
 * permet de l'enlever les tags selectionnés de la barre des tags selectionnés  
 */
function unselectTags() {
	const selectedTagsBar = document.querySelector(".tag-container");
	selectedTagsBar.addEventListener("click", function(event) {
		if ( event.target.closest(".closeBtn")) {
			const unselectTag = event.target.parentNode;
			selectedTagsBar.removeChild(unselectTag);
			unselectTag.classList.remove("selectedTag");

			switch (unselectTag.getAttribute("filter-tag-list")) {
				case "tag-ingredients":
					state.unsetFilterByValue("ingredientsSelectedTags", unselectTag.innerText);
					break;
				case "tag-appliances":
					state.unsetFilterByValue("appliancesSelectedTags", unselectTag.innerText);
					break;
				case "tag-ustensils":
					state.unsetFilterByValue("ustensilsSelectedTags", unselectTag.innerText);
					break;
			}

			let recipeIdList = search();
			render(recipeIdList);
		}
	})
}

unselectTags()
