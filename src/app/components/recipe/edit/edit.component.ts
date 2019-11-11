import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../../interfaces/recipe.interface';
import { RecipeUtil } from '../../../utils/recipe.util';
import { IngredientUtil } from '../../../utils/ingredient-util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;
  ingredientFormGroup: FormArray = new FormArray([]);

  constructor(private formBuilder: FormBuilder) {
    this.recipe = RecipeUtil.createEmpty();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      nameAddition: ['', Validators.required],
      description: ['', Validators.required],
      ingredientFormGroup: this.ingredientFormGroup
    });
  }

  submitForm() {
    console.log('submit');
    console.log(this.form);
  }

  addIngredient() {
    const ingredient = IngredientUtil.createEmpty();
    this.recipe.ingredients.push(ingredient);
    this.ingredientFormGroup.push(new FormControl(ingredient, Validators.required));
  }

  deleteIngredient(index: number) {

  }
}
