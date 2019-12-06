import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Unit } from '../../../../interfaces/unit/unit';
import { RecipeState } from '../../../../store/recipe.state';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemUtil } from '../../../../utils/item.util';
import { Item } from '../../../../interfaces/recipe/item.interface';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditItemComponent),
      multi: true
    }
  ]
})
export class EditItemComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input() item: Item;
  formItem: Item = ItemUtil.createEmpty();
  @Output() addItem = new EventEmitter();
  itemForm: FormGroup;

  units: Unit[];
  filteredOptions: Observable<Unit[]>;

  onChange = (item: Item) => {};

  constructor(
    private store: Store,
    private formBuilder: FormBuilder
  ) {
    this.store.select(RecipeState.getUnits).subscribe((units) => {
      this.units = units;
    });
  }

  ngOnInit() {
    this.formItem.ingredient = this.item.ingredient ? this.item.ingredient : null;
    this.formItem.unit = this.item.unit ? this.item.unit : null;
    this.formItem.amount = this.item.amount ? Number(this.item.amount) : null;

    this.itemForm = this.formBuilder.group({
      ingredient: [this.item.ingredient, Validators.required],
      unit: [this.item.unit, Validators.required],
      amount: [this.item.amount, [Validators.required]]
    });

    this.filteredOptions = this.itemForm.get('unit').valueChanges.pipe(
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
    this.formItem.ingredient = this.itemForm.get('ingredient').value;
    this.formItem.unit = this.itemForm.get('unit').value;
    this.formItem.amount = this.itemForm.get('amount').value;
    this.onChange(this.formItem);
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
    this.itemForm.get('unit').setValue(unit);
    this.updateIngredient(null);
  }
}
