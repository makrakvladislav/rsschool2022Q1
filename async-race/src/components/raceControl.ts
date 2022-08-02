import Control from '../common/control';
import { CarControl } from './car/carControl';

export class Race {
  static id: number;

  static node: HTMLElement;

  static resetNode: Control<HTMLElement>;

  static async carStart(id: number, node: HTMLElement, resetNode: HTMLElement) {
    await CarControl.engineStart(id, resetNode);
    await CarControl.animate(node);
    // await CarControl.start(this.id);

    await CarControl.drive(id, node);
  }
}

export default Race;
