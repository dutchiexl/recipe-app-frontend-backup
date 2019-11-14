import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators
} from '@angular/forms';
import { Step } from '../../../interfaces/step.interface';

@Component({
  selector: 'app-edit-step',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditStepComponent),
      multi: true
    }
  ]
})
export class EditStepComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input() step: Step;
  stepItemFormgroup: FormGroup;

  onChange = (step: Step) => {};

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    const name = this.step.name ? this.step.name : '';
    const text = this.step.text ? this.step.text : '';
    const imagePath = this.step.imagePath ? this.step.imagePath : '';

    this.stepItemFormgroup = this.formBuilder.group({
      name: [name, Validators.required],
      text: [text, Validators.required],
      imagePath: [imagePath, [Validators.required]]
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

  updateStep(event: Event) {
    this.step.name = this.stepItemFormgroup.get('name').value;
    this.step.text = this.stepItemFormgroup.get('text').value;
    this.step.imagePath = this.stepItemFormgroup.get('imagePath').value;
    this.onChange(this.step);
  }
}
