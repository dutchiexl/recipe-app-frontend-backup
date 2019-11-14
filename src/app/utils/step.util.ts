import { Step } from '../interfaces/step.interface';

export class StepUtil {

  public static createEmpty(): Step {
    return {
      name: null,
      text: null
    }
  }
}
