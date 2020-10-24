import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/_services/recipe.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;
  constructor(
    private shoppingService: ShoppingListService,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.recipe = this.recipeService.getRecipeById(+param.id);
      this.recipeId = +param.id;
    });
  }

  onAdd() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    // this.shoppingService.addIngredientsList(this.recipe.ingredients);
  }

  edit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}
