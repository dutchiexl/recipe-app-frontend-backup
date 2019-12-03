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
import { Store } from '@ngxs/store';
import { Unit } from '../../../../interfaces/unit/unit';
import { RecipeState } from '../../../../store/recipe.state';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  units: Unit[];
  filteredOptions: Observable<Unit[]>;

  onChange = (ingredient: Ingredient) => {};

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.store.select(RecipeState.getUnits).subscribe((units) => {
      this.units = units;
    });
  }

  ngOnInit() {
    this.formIngredient.name = this.ingredient.name ? this.ingredient.name.toString() : null;
    this.formIngredient.unit = this.ingredient.unit ? this.ingredient.unit : null;
    this.formIngredient.amount = this.ingredient.amount ? Number(this.ingredient.amount) : null;

    this.ingredientItemForm = this.formBuilder.group({
      name: [this.formIngredient.name, Validators.required],
      unit: [this.formIngredient.unit, Validators.required],
      amount: [this.formIngredient.amount, [Validators.required]]
    });

    this.filteredOptions = this.ingredientItemForm.get('unit').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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

  private _filter(value: string): Unit[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      return this.units.filter(option => option.name.toLowerCase().includes(filterValue));
    }
  }

  updateIngredient(event: Event) {
    this.formIngredient.name = this.ingredientItemForm.get('name').value;
    this.formIngredient.unit = this.ingredientItemForm.get('unit').value;
    this.formIngredient.amount = this.ingredientItemForm.get('amount').value;
    this.onChange(this.formIngredient);
  }

  displayUnit() {
    return (unit: Unit) => {
      if (unit) {
        return unit.name;
      }
      return '';
    };
  }

  updateUnit(unit: Unit) {
    this.ingredientItemForm.get('unit').setValue(unit);
    this.updateIngredient(null);
  }
}
