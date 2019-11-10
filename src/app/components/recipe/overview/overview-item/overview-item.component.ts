import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../../interfaces/recipe.interface';

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.scss']
})
export class OverviewItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
