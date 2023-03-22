import { recipes } from "../../data/recipes.js";

/**
 * permet de récupérer les tableaux de tags pour chaque type de tags
 * @param {{recipe[]}} recipes 
 * @param {string} type ingredients, appliances, ustensils
 * @returns {Array}
 */
export function getTagsArray(recipes, type) {
	let array = [];
	let arrayCleaned = [];

	switch (type) {
		case "ingredients": 
		recipes.forEach(recipe => {
			if (recipe.ingredients.length) {
				const ingredientsList = recipe.ingredients.map((ingredient) => ingredient.ingredient.toLowerCase());
				array.push(...ingredientsList);
			}			
		});
		arrayCleaned = Array.from(new Set(array));
		return arrayCleaned;
		
		case "appliance": 
		recipes.forEach(recipe => {
			if(recipe.appliance.length) {
				const appliancesList = recipe.appliance.toLowerCase();
				array.push(appliancesList);
			}
		});
		arrayCleaned = Array.from(new Set(array));
		return arrayCleaned;

		case "ustensils":
		recipes.forEach(recipe => {
			if (recipe.ustensils.length) {
				const ustensilsList = recipe.ustensils.map(ustensil => ustensil.toLowerCase());
				array.push(...ustensilsList);
			}
		});
		arrayCleaned = Array.from(new Set(array));
		return arrayCleaned;
	}
}

/**
 * permet de construire la structure DOM de la liste des tags 
 */
export function buildTagsDOM() {
	getTagsArray(recipes, "ingredients").forEach((element) => {
		const tagIngredients = document.createElement('li');
		tagIngredients.setAttribute("value", `${element}`);
		tagIngredients.innerText = element;
		document
			.querySelector(".filter__list--ingredients")
			.appendChild(tagIngredients);
	});
	getTagsArray(recipes, "appliance").forEach((element) => {
		const tagAppliances = document.createElement('li');
		tagAppliances.setAttribute("name", `search-${element}`);
		tagAppliances.innerText = element;
		document
			.querySelector(".filter__list--appliances")
			.appendChild(tagAppliances);
	});
	getTagsArray(recipes, "ustensils").forEach((element) => {
		const tagUstensils = document.createElement('li');
		tagUstensils.setAttribute("name", `search-${element}`);
		tagUstensils.innerText = element;
		document
			.querySelector(".filter__list--ustensils")
			.appendChild(tagUstensils);
	});
}

/**
 * Gestion des collapsibles
 * Récupération des éléments DOM pour la gestion des événenements
 */
const filterIngredientsBtn = document.querySelector(".filter__btn--ingredients");
const filterAppliancesBtn = document.querySelector(".filter__btn--appliances");
const filterUstensilsBtn = document.querySelector(".filter__btn--ustensils");
const closeBtn = document.querySelectorAll(".filter__arrow");
const inputIgredients = document.querySelector(".filter__input--ingredients");
const inputAppliances = document.querySelector(".filter__input--appliances");
const inputUstensils = document.querySelector(".filter__input--ustensils");
const tagInputs = [inputIgredients, inputAppliances, inputUstensils];

/**
 * permet d'ouvrir la liste de tags filtrants
 * @param {string} element collapsibles "ingrédients", "appliances", "ustensils"
 */
function openFilter(element) {
	element.nextElementSibling.style.display = "block";
	element.style.width = "400px";
	element.lastElementChild.style.transform = "rotate(0deg)";
	element.classList.add("active");
}

window.addEventListener("click", function (event) {
	if (event.target === filterIngredientsBtn) {
		openFilter(filterIngredientsBtn);
		closeFilter(filterAppliancesBtn);
		closeFilter(filterUstensilsBtn);
	}
	else if (event.target === filterAppliancesBtn) {
		openFilter(filterAppliancesBtn);
		closeFilter(filterIngredientsBtn);
		closeFilter(filterUstensilsBtn);
	}
	else if (event.target === filterUstensilsBtn) {
		openFilter(filterUstensilsBtn);
		closeFilter(filterIngredientsBtn);
		closeFilter(filterAppliancesBtn);
	}
})

tagInputs.forEach(input => {
	input.addEventListener("focus", function (event) {
		if (event.target === inputIgredients) {
			openFilter(filterIngredientsBtn);
			closeFilter(filterAppliancesBtn);
			closeFilter(filterUstensilsBtn);
		} else if (event.target === inputAppliances) {
			openFilter(filterAppliancesBtn);
			closeFilter(filterIngredientsBtn);
			closeFilter(filterUstensilsBtn);
		} else if (event.target === inputUstensils) {
			openFilter(filterUstensilsBtn);
			closeFilter(filterIngredientsBtn);
			closeFilter(filterAppliancesBtn);
		}
	})
})

/**
 * permet d'ouvrir la liste de tags filtrants
 * @param {string} element collapsibles "ingrédients", "appliances", "ustensils"
 */
function closeFilter(element) {
	element.nextElementSibling.style.display = "none";
	element.style.width = "170px";
	element.lastElementChild.style.transform = "rotate(180deg)";
	element.classList.remove("active");
}

closeBtn.forEach(btn => {
	btn.addEventListener("click", function (event) {
		if (event.target.parentElement === filterIngredientsBtn && filterIngredientsBtn.classList.contains("active")) {
			closeFilter(filterIngredientsBtn);
		} else if (event.target.parentElement === filterAppliancesBtn && filterAppliancesBtn.classList.contains("active")) {
			closeFilter(filterAppliancesBtn);
		} else if (event.target.parentElement === filterUstensilsBtn && filterUstensilsBtn.classList.contains("active")) {
			closeFilter(filterUstensilsBtn);
		}
	})
})
