import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe( 'Chicken Wrap',
    'Chicken and other delights wrapped together',
    'https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Buffalo-Chicken-Wrap-3-500x500.jpg',
    [
      new Ingredient('Chicken' , 250),
      new Ingredient('Wrap', 1)
    ]),
    new Recipe( 'Pizza',
    'Savory italian dish',
    'https://static.toiimg.com/photo/53110049.cms',
    [
      new Ingredient('Pizza Base' , 1),
      new Ingredient('Cheese', 100),
      new Ingredient('Toppings', 3)
    ]),
  ];

  constructor (private shoppingListService: ShoppingListService) {}


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
