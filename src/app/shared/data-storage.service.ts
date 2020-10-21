import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../_services/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipies() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put('https://recipe-book-fb04f.firebaseio.com/recipes.json', recipes)
      .subscribe((data) => {
        console.log(data);
      });
  }

  fetchData() {
    return this.http
      .get<Recipe[]>('https://recipe-book-fb04f.firebaseio.com/recipes.json')
      .pipe(map( recipes => {
        return recipes.map(recipe => {
          return {... recipe, ingredients: recipe.ingredients? recipe.ingredients: []}
        });
      }), tap (data => {
        this.recipeService.setRecipes(data);
      }));
  }
}
