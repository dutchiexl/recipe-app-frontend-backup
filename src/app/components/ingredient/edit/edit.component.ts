import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Ingredient } from '../../../interfaces/ingredient.interface';

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
  ingredientItemForm: FormGroup;

  onChange = (ingredient: Ingredient) => {};

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const name = this.ingredient.name ? this.ingredient.name : '';
    const amount = this.ingredient.amount ? this.ingredient.amount : 0;

    this.ingredientItemForm = this.formBuilder.group({
      name: [name, Validators.required],
      amount: [amount, [Validators.required]]
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
    this.onChange(obj);
  }

}
