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

	tag.innerText = tag.innerText.charAt(0).toUpperCase() + tag.innerText.slice(1);

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

	//on réalise le clonage profond sur l'élément DOM cliqué
	tagList.forEach((item) => item.addEventListener("click", (event) => {
		if (!event.target.classList.contains("activeTag")) {
			const tag = event.target.cloneNode(true);
			event.target.classList.add("activeTag");

			switch (item.closest("ul").id) {
				case "list-ingredients":
					buildTagTemplate("tag-ingredients", tag);
					//on remplit la liste des tags sélectionnés parmi les ingrédients de l'objet "state"
					state.setFilter("ingredientsSelectedTags", event.target.innerText);
					break;
				case "list-appliances":
					buildTagTemplate("tag-appliances", tag);
					//on remplit la liste des tags sélectionnés parmi les appliances de l'objet "state"
					state.setFilter("appliancesSelectedTags", event.target.innerText);
					break;
				case "list-ustensils":
					buildTagTemplate("tag-ustensils", tag);
					//on remplit la liste des tags sélectionnés parmi les ustensils de l'objet "state"
					state.setFilter("ustensilsSelectedTags", event.target.innerText);
					break;
			}
		}	
		//appel de la fonction search à chaque selection d'un tag onclick et actualisation des recettes affichées
		let recipeIdList = search();
		render(recipeIdList);
	}));
}

/**
 * permet de l'enlever les tags selectionnés de la barre des tags selectionnés  
 */
export function unselectTags() {
	const selectedTagsBar = document.querySelector(".tag-container");
	selectedTagsBar.addEventListener("click", function(event) {
		if ( event.target.closest(".closeBtn")) {
			const unselectTag = event.target.parentNode;
			selectedTagsBar.removeChild(unselectTag);
			unselectTag.classList.remove("selectedTag");

//on enlève le tag de la liste correspondante des tags de l'objet "state"
			switch (unselectTag.getAttribute("filter-tag-list")) {
				case "tag-ingredients":
					state.unsetFilterByValue("ingredientsSelectedTags", unselectTag.innerText.toLowerCase());
					const ingredientsList = document.querySelectorAll("#list-ingredients > li");
					ingredientsList.forEach((li) => {
						if (li.getAttribute("value") === unselectTag.getAttribute("value") && li.classList.contains("activeTag")) {
							li.classList.remove("activeTag");
						}
					})
					break;
				case "tag-appliances":
					state.unsetFilterByValue("appliancesSelectedTags", unselectTag.innerText.toLowerCase());
					const appliancesList = document.querySelectorAll("#list-appliances > li");
						appliancesList.forEach((li) => {
						if (li.getAttribute("value") === unselectTag.getAttribute("value") && li.classList.contains("activeTag")) {
							li.classList.remove("activeTag");
						}
					})
					break;
				case "tag-ustensils":
					state.unsetFilterByValue("ustensilsSelectedTags", unselectTag.innerText.toLowerCase());
					const ustensilsList = document.querySelectorAll("#list-ustensils > li");
					ustensilsList.forEach((li) => {
						if (li.getAttribute("value") === unselectTag.getAttribute("value") && li.classList.contains("activeTag")) {
							li.classList.remove("activeTag");
						}
					})
					break;
			}
			//appel de la fonction search à chaque fois que l'on désélectionne un tag onclick et actualisation des recettes affichées
			let recipeIdList = search();
			render(recipeIdList);
		}
	})
}
