import { recipes } from "../data/recipes.js";
import { RecipeCardDOM } from "./templates/RecipeCardDOM.js";
import { buildTagsDOM } from "./templates/tagsContainer.js";
import { displayTag } from "./utils/tagsEvents.js";

function init() {
	const RecipesTemplate = new RecipeCardDOM(recipes);
	RecipesTemplate.buildCardDOM();
	buildTagsDOM();
	displayTag();
}

init()