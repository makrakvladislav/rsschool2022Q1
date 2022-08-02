import Control from '../../common/control';
import { ICarsData } from '../carsDataModel';
import { CarView } from '../car/carView';
import { GarageControlView } from './garageControlView';
import style from './garage.css';

export class GarageView extends Control {
  data: ICarsData[];

  constructor(parentNode: HTMLElement, data: Array<ICarsData>) {
    super(parentNode, 'div', style.garage);
    this.data = data;
  }

  public getCars(data: Array<ICarsData>) {
    this.render(data);
    return this;
  }

  private render(data: Array<ICarsData>) {
    const carList = new Control(this.node, 'div', style.cars__list);
    const carView = new CarView(carList.node, data);
    GarageControlView.render(this.node, data, carView);
  }
}

export default GarageView;
