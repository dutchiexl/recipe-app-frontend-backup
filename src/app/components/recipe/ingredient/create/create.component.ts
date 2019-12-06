import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ingredient } from '../../../../interfaces/recipe/ingredient.interface';
import { RecipeState } from '../../../../store/recipe.state';
import { Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateIngredientAction } from '../../../../store/recipe.actions';
import { IngredientCategory } from '../../../../interfaces/recipe/ingredient-category';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateIngredientComponent implements OnInit {
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  @Input() ingredient: Ingredient;
  ingredientForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredient) {
    this.ingredient = data;
    this.store.select(RecipeState.getIngredients).subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
    this.store.select(RecipeState.getIngredientCategories).subscribe((categories) => {
      this.ingredientCategories = categories;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      name: [this.ingredient.name, Validators.required],
    });
  }

  onCreateClick() {
    if (this.ingredientForm.valid) {
      this.dialogRef.close(this.ingredient);
      this.store.dispatch(new CreateIngredientAction(this.ingredient));
    }
  }
}
