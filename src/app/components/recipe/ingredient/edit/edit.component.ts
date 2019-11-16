import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Ingredient } from '../../../../interfaces/recipe/ingredient.interface';

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
  @Output() addIngredient = new EventEmitter();
  ingredientItemForm: FormGroup;

  onChange = (ingredient: Ingredient) => {};

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const name = this.ingredient.name ? this.ingredient.name : null;
    const unit = this.ingredient.quantifier ? this.ingredient.quantifier : null;
    const amount = this.ingredient.amount ? this.ingredient.amount : null;

    this.ingredientItemForm = this.formBuilder.group({
      name: [name, Validators.required],
      unit: [unit, Validators.required],
      amount: [amount, [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.onChange(obj);
  }

  updateIngredient(event: Event) {
    this.ingredient.name = this.ingredientItemForm.get('name').value;
    this.ingredient.quantifier = this.ingredientItemForm.get('unit').value;
    this.ingredient.amount = this.ingredientItemForm.get('amount').value;
    this.onChange(this.ingredient);
  }
}
