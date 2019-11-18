import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Ingredient } from '../../../../interfaces/recipe/ingredient.interface';
import { IngredientUtil } from '../../../../utils/ingredient.util';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditIngredientComponent),
      multi: true
    }
  ]
})
export class EditIngredientComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input() ingredient: Ingredient;
  formIngredient: Ingredient = IngredientUtil.createEmpty();
  @Output() addIngredient = new EventEmitter();
  ingredientItemForm: FormGroup;

  onChange = (ingredient: Ingredient) => {};

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formIngredient.name = this.ingredient.name ? this.ingredient.name.toString() : null;
    this.formIngredient.quantifier = this.ingredient.quantifier ? this.ingredient.quantifier.toString() : null;
    this.formIngredient.amount = this.ingredient.amount ? Number(this.ingredient.amount) : null;

    this.ingredientItemForm = this.formBuilder.group({
      name: [this.formIngredient.name, Validators.required],
      unit: [this.formIngredient.quantifier, Validators.required],
      amount: [this.formIngredient.amount, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    //this.onChange(obj);
  }

  updateIngredient(event: Event) {
    this.formIngredient.name = this.ingredientItemForm.get('name').value;
    this.formIngredient.quantifier = this.ingredientItemForm.get('unit').value;
    this.formIngredient.amount = this.ingredientItemForm.get('amount').value;
    this.onChange(this.formIngredient);
  }
}
