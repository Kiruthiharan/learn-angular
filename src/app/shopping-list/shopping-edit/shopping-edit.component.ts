import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('ingredientForm', { static: false}) ingForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnInit() {
    // this.subscription = this.shoppingListService.startedEditing.subscribe( ingId => {
    //   this.editMode = true;
    //   this.editItemIndex = ingId;
    //   this.editItem = this.shoppingListService.getIngredient(ingId);
    //   this.ingForm.setValue({
    //     ingredient: this.editItem.name,
    //     amount: this.editItem.amount
    //   })
    // })
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editItemIndex = stateData.editedIngredientIndex;
        this.editItem = stateData.editedIngredient;
        this.ingForm.setValue({
          ingredient: this.editItem.name,
          amount: this.editItem.amount
        })
      } else {
        this.editMode = false;
      }
    })
  }

  onAddIng(name, amount){
    const ingredient = new Ingredient(name, amount);
    // this.ingredientAdded.emit(ingredient);
    this.shoppingListService.addIngredient(ingredient);
  }

  onSubmit(form: NgForm){
    const ingredient = new Ingredient(form.value.ingredient, form.value.amount);
    if (!this.editMode) {
      // this.shoppingListService.addIngredient(ingredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index: this.editItemIndex, ingredient}))
      // this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
    }
    this.resetForm()
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editItemIndex))
    // this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.resetForm();
  }

  resetForm() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editMode = false;
    this.ingForm.reset();
  }

}
