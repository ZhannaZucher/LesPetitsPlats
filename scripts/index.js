import { recipes } from "../data/recipes.js";
import { RecipeCardDOM } from "./factories/RecipeCardDOM.js";

console.log(recipes);

function init() {
	const RecipesTemplate = new RecipeCardDOM(recipes);
	RecipesTemplate.buildCardDOM();
}

init()