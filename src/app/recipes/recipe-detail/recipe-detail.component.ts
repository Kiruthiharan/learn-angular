import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/_services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(private shoppingService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.recipe = this.recipeService.getRecipeById(+param.id);
    })
  }

  onAdd() {
    this.shoppingService.addIngredientsList(this.recipe.ingredients);
  }

}
