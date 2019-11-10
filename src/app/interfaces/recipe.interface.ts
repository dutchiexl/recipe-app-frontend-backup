export interface Recipe {
  name: string
  nameAddition: string;
  description: string;
  imagePath?: string;
  ingredients: [];
  equipment: [];
  steps: [];
  nutrients: [];
  creationDate: Date;
}
