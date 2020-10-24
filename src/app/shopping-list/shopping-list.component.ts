import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../_services/shopping-list.service';
import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  ingredientSub: Subscription;
  constructor(private shoppingListService: ShoppingListService, private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    // this.ingredientSub.unsubscribe()
  }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.ingredientSub = this.shoppingListService.ingredientChanged.subscribe(
    //   (ingredients: Ingredient[]) => this.ingredients = ingredients
    // )
  }

  onEdit(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    // this.shoppingListService.startedEditing.next(index)
  }

}
