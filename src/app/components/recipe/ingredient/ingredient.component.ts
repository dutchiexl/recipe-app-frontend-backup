import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from '../../../interfaces/recipe/ingredient.interface';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {
  @Input() ingredient: Ingredient;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
