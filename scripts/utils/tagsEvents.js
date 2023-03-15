/*TODO ici :
gestion des événements relatifs aux tags:
1. onclick sul le tag dans la liste on injecte le tag dans la barre réservée aux tags selectionnés
+ on ajoute la croix
+ attr "selected"?
2. onclick sur le tag selectionné on le vire de la barre de tags sélectionnés
3. input on tape char et la liste des tags est actualisée
on supprime =>idem
*/

const buildTagTemplate = (tagtype, tag) => {
	const closeIcon = document.createElement("img");
	closeIcon.setAttribute("src", "/assets/close.svg");
	closeIcon.setAttribute("alt", "icon");
	closeIcon.classList.add("closeBtn");

	tag.classList.add(tagtype);
	tag.classList.add("selectedTag");
	tag.appendChild(closeIcon);

	document.querySelector(".tag-container").appendChild(tag);
}

export function displayTag() {
	const tagList = document.querySelectorAll(".filter__list li");
	tagList.forEach((item) => item.addEventListener("click", (event) => {
	const tag = event.target.cloneNode(true);

	switch (item.closest("ul").id) {
		case "list-ingredients": 
			buildTagTemplate("tag-ingredients", tag);
			break;
		case "list-appliances":
			buildTagTemplate("tag-appliances", tag);
			break;
		case "list-ustensils":
			buildTagTemplate("tag-ustensils", tag);
			break;
		}				
	}));
}

