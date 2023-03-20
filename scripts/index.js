import { recipes } from "../data/recipes.js";
import { RecipeCardDOM } from "./templates/recipeCardDOM.js";
import { buildTagsDOM } from "./templates/tagsContainer.js";
import { displayTag, unselectTags } from "./utils/tagsEvents.js";

function init() {
	const RecipesTemplate = new RecipeCardDOM(recipes);
	RecipesTemplate.buildCardDOM();
	buildTagsDOM();
	displayTag();
	unselectTags();
}

init()