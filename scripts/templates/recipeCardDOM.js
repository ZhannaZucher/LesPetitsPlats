export class RecipeCardDOM {
	constructor(recipes) {
		this.recipes = recipes;
		this.recipesContainer = document.querySelector(".recipes-section");
		this.displayCard();
	}

	displayCard() {
		this.recipesContainer.innerHTML = this.buildCardDOM();
	}
/**
 * permet de construire la structure DOM de la carte recette
 * @returns {string}
 */
	buildCardDOM() {
		let recipeCard = "";
		for (let i = 0; i < this.recipes.length; i++) {
			recipeCard += `
						<article class="card" id="${this.recipes[i].id}">
				<div class="card__view"></div>
				<div class="card__recipe">
					<div class="card__recipe-header">
						<h2 class="card__recipe-title">${this.recipes[i].name}</h2>
						<div class="card__recipe-time">
							<img src="assets/timer.svg" alt="" class="card__recipe-icon">
							<p>${this.recipes[i].time} min</p>
						</div>
					</div>
					<div class="card__recipe-description">
						<ul class="card__recipe-ingredients">${this.getIngredientsList(i)}</ul>
						<p class="card__recipe-guide">${this.recipes[i].description}</p>
					</div>
				</div>
			</article>`;
		}
		return recipeCard;
	}

	/**
	 * permet de constuire la structure DOM pour la liste d'ingrédients de la recette
	 * @param {{ingredient: string, quantity: number, unit: string}[]} i liste d'ingrédients pour la recette
	 * @returns {string}
	 */
	getIngredientsList(i) {
		let list = "";
		let quantity;
		let unit; 
		for (let j = 0; j < this.recipes[i].ingredients.length; j++) {
			//dans le cas où la quantité / unité pour l'ingrédient[j] ne sont pas renseignées, on laisse vide:
			quantity = this.recipes[i].ingredients[j].quantity !== undefined ? this.recipes[i].ingredients[j].quantity : "";

			unit = this.recipes[i].ingredients[j].unit !== undefined ? this.recipes[i].ingredients[j].unit : "";

			list += `<li><b>${this.recipes[i].ingredients[j].ingredient}</b>`;
			
			quantity ? list += `: ${quantity} ${unit}</li>` : `</li>`;
		}
		return list;
	}
}