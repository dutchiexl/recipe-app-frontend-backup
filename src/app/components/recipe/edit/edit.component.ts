import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { RecipeUtil } from '../../../utils/recipe.util';
import { Store } from '@ngxs/store';
import { UpdateOrCreateRecipeAction } from '../../../store/recipe.actions';
import { StepUtil } from '../../../utils/step.util';
import { IngredientUtil } from '../../../utils/ingredient.util';
import { HttpClient } from '@angular/common/http';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;
  ingredientFormGroup: FormArray = new FormArray([]);
  stepFormGroup: FormArray = new FormArray([]);
  preview = '/images/placeholder.png';
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  constructor(
    private store: Store,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.recipe = RecipeUtil.createEmpty();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      nameAddition: ['', Validators.required],
      description: ['', Validators.required],
      imagePath: [null, Validators.required],
      ingredients: this.ingredientFormGroup,
      steps: this.stepFormGroup
    });
  }

  submitForm() {
    if (this.form.valid) {
      this.recipe.name = this.form.get('name').value;
      this.recipe.nameAddition = this.form.get('nameAddition').value;
      this.recipe.description = this.form.get('description').value;
      this.recipe.ingredients = this.form.get('ingredients').value;
      this.recipe.steps = this.form.get('steps').value;
      this.recipe.imagePath = this.form.get('imagePath').value;
      this.store.dispatch(new UpdateOrCreateRecipeAction(this.recipe));
      this.store.dispatch(new Navigate(['/']))
    }
  }

  addIngredient() {
    const ingredient = IngredientUtil.createEmpty();
    this.recipe.ingredients.push(ingredient);
    this.ingredientFormGroup.push(new FormControl(ingredient, Validators.required));
  }

  addStep() {
    const step = StepUtil.createEmpty();
    this.recipe.steps.push(StepUtil.createEmpty());
    this.stepFormGroup.push(new FormControl(step, Validators.required));
  }

  deleteIngredient(i: number) {

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);

    let formData = new FormData();
    formData.append('image', file);

    this.http.post('/api/upload', formData)
      .subscribe((response) => {
        let filename = response['fileName'].split('/');
        this.form.patchValue({
          imagePath: '/images/' + filename[filename.length - 1]
        });
        this.form.get('imagePath').updateValueAndValidity();
        console.log(this.form.get('imagePath').value);
      })
  }
}
