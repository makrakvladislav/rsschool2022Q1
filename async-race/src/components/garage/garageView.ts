/* eslint-disable import/no-cycle */
import Control from '../../common/control';
import { ICarsData } from '../carsDataModel';
import { CarView } from '../car/carView';
import { GarageControlView } from './garageControlView';
import style from './garage.css';

export class GarageView extends Control {
  data: Array<ICarsData>;

  itemsCount?: string;

  static node: HTMLElement;

  constructor(parentNode: HTMLElement, data: Array<ICarsData>, itemsCount?: string) {
    super(parentNode, 'div', style.garage);
    this.data = data;
    this.itemsCount = itemsCount;
  }

  public getCars(data: Array<ICarsData>) {
    this.render(data);
    return this;
  }

  private render(data: Array<ICarsData>) {
    console.log(data);
    const carList = new Control(this.node, 'div', style.cars__list);
    carList.node.innerHTML = '';
    const carView = new CarView(carList.node, data);
    const carsCounterWrapper = new Control(carList.node, 'div', style.cars__count);
    const currentPage = localStorage.getItem('currentPage');
    const carsCounterText = new Control(
      carsCounterWrapper.node,
      'div',
      style.counter__text,
      `Current page: ${currentPage},&nbsp;&nbsp;&nbsp;Cars in garage:&nbsp;`
    );
    const carsCounter = new Control(carsCounterWrapper.node, 'span', style.counter);

    carsCounter.node.textContent = this.itemsCount!.toString();
    GarageControlView.render(this.node, data, carView);
  }
}

export default GarageView;
