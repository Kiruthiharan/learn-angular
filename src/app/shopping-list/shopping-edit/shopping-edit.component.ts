import { Component, OnInit, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/_services/shopping-list.service';

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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe( ingId => {
      this.editMode = true;
      this.editItemIndex = ingId;
      this.editItem = this.shoppingListService.getIngredient(ingId);
      this.ingForm.setValue({
        ingredient: this.editItem.name,
        amount: this.editItem.amount
      })
    })
  }

  onAddIng(name, amount){
    const ingredient = new Ingredient(name, amount);
    //this.ingredientAdded.emit(ingredient);
    this.shoppingListService.addIngredient(ingredient);
  }

  onSubmit(form: NgForm){
    const ingredient = new Ingredient(form.value.ingredient, form.value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(ingredient);
    } else {
      this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
    }
    this.resetForm()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.ingForm.reset();
  }

}
