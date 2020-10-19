import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(0, 'Chicken Wrap',
    'Chicken and other delights wrapped together',
    'https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Buffalo-Chicken-Wrap-3-500x500.jpg',
    [
      new Ingredient('Chicken' , 250),
      new Ingredient('Wrap', 1)
    ]),
    new Recipe(1, 'Pizza',
    'Savory italian dish',
    'https://static.toiimg.com/photo/53110049.cms',
    [
      new Ingredient('Pizza Base' , 1),
      new Ingredient('Cheese', 100),
      new Ingredient('Toppings', 3)
    ]),
  ];


  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }


}
