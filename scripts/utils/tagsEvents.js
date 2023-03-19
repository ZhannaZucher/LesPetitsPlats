/**
 * permet de construire le DOM pour le tag selectionné
 * @param {string} tagtype type de liste de tags : ingrédients, appliances, ustensils
 * @param {string} tag 
 *  @param {string} filterList liste de propriétés à filtrer, séparées par virgule 
 */
const buildTagTemplate = (tagtype, tag, filterList) => {
	const closeIcon = document.createElement("img");
	closeIcon.setAttribute("src", "/assets/close.svg");
	closeIcon.setAttribute("alt", "icon");
	closeIcon.classList.add("closeBtn");

	tag.classList.add(tagtype);
	tag.classList.add("selectedTag");
	tag.appendChild(closeIcon);
	tag.setAttribute("search-filter", filterList)
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
			buildTagTemplate("tag-ingredients", tag, "recipes.ingredients.ingredient");
			break;
		case "list-appliances":
			buildTagTemplate("tag-appliances", tag, "recipes.appliance");
			break;
		case "list-ustensils":
			buildTagTemplate("tag-ustensils", tag, "recipes.ustensils");
			break;
		}				
	}));
}

/**
 * permet de l'enlever les tags selectionnés de la barre des tags selectionnés  
 */
function unselectTags() {
	const selectedTagsBar = document.querySelector(".tag-container");
	selectedTagsBar.addEventListener("click", function(event) {
		if ( event.target.closest(".closeBtn")) {
			console.log(event.target.closest);
			const unselectTag = event.target.parentNode;
			selectedTagsBar.removeChild(unselectTag);
			unselectTag.classList.remove("selectedTag");
		}
	})
}

unselectTags()
