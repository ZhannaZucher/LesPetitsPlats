
/*
TODO 
OK A. fonction pour récupérer les arrays de tags :
OK 1. parcourrir les recettes et récupérer les ingrédients / appliances /ustensils dans 3 tableaux
OK 2. supprimer les doublons dans tableaux avec Array.from(new Set(array avec doublons)) 
+ formatter : 1ière lettre en Majuscule, le reste to lowerCase

B. fonction qui crée la structure DOM  pour chaque tags' container
1. parcourrir les tableaux des tags récupérés et les enrober en <li></li>
2. append tous les <li></li> à leurs containers respectifs
*/

import { recipes } from "../../data/recipes.js";

/**
 * permet de récupérer les tableaux de tags pour chaque type de tags
 * @param {{recipe[]}} recipes 
 * @param {string} type ingredients, appliances, ustensils
 * @returns {Array}
 */
function getTagsArray(recipes, type) {
	let array = [];
	let arrayCleaned = [];

	switch (type) {
		case "ingredients": 
		recipes.forEach(recipe => {
			if (recipe.ingredients.length) {
				const ingredientsList = recipe.ingredients.map(ingredient => ingredient.ingredient);
				array.push(...ingredientsList);
			}			
		});
		// suppression de doublons
		arrayCleaned = Array.from(new Set(array));
		return arrayCleaned;
		
		case "appliance": 
		recipes.forEach(recipe => {
			if(recipe.appliance.length) {
				const appliancesList = recipe.appliance;
				array.push(appliancesList);
			}
		});
		// suppression de doublons
		arrayCleaned = Array.from(new Set(array));
		return arrayCleaned;

		case "ustensils":
		recipes.forEach(recipe => {
			if (recipe.ustensils.length) {
				const ustensilsList = recipe.ustensils.map(ustensil => ustensil);
				array.push(...ustensilsList);
			}
		});
		// suppression de doublons
		arrayCleaned = Array.from(new Set(array));
		return arrayCleaned;
	}
}

getTagsArray(recipes, "ustensils")