import Control from '../../common/control';
import { CarsDataModel } from '../carsDataModel';
import { WinnersView } from '../winners/winnersView';
import { GarageView } from '../garage/garageView';
import { PaginationView } from '../pagination/paginationView';
import style from './car.css';

export class CarControl {
  static async start(id: number) {
    const url = `http://localhost:3000/engine?id=${id}&status=started`;
    const method = 'PATCH';
    const res = await CarsDataModel.getData(url, method);
    return res;
  }

  static async run(id: number) {
    const url = `http://localhost:3000/engine?id=${id}&status=drive`;
    const method = 'PATCH';
    const res = await CarsDataModel.getData(url, method);
    // const res = await fetch(url, { method });
    return res;
  }

  static async carReset(id: number, parentNode: HTMLElement) {
    const url = `http://localhost:3000/engine?id=${id}&status=stopped`;
    const method = 'PATCH';
    const res = await fetch(url, { method });
    parentNode.classList.remove('race', 'car-broken', 'check');
    return res;
  }

  static async carRemove(id: number, parentNode: Control<HTMLElement>) {
    const url = `http://localhost:3000/garage/${id}`;
    const method = 'DELETE';
    const res = await CarsDataModel.getData(url, method);
    const carRemoveFromWinners = CarControl.carRemoveFromWinners(id, parentNode.node);
    const carsData = new CarsDataModel([], 'winners');
    const currentPage = localStorage.getItem('currentPage');
    carsData.build(+currentPage!).then(async (result) => {
      const garageWrap: HTMLElement | null = document.querySelector('.garage');
      garageWrap!.innerHTML = '';
      const response = await result.items!.items;
      const itemsCount = await result.items!.itemsCount;
      const updateGarage = new GarageView(garageWrap!, response, itemsCount!);
      updateGarage.getCars(response);
      const mainContainer: HTMLElement | null = document.querySelector('.main');
      // const updatePagination = new PaginationView(itemsCount!, mainContainer!);
      PaginationView.update(itemsCount!, mainContainer!);
      console.log(result.data);
    });
    // parentNode.destroy();
  }

  static async carRemoveFromWinners(id: number, parentNode: HTMLElement) {
    const url = `http://localhost:3000/winners/${id}`;
    const method = 'DELETE';
    const res = await CarsDataModel.getData(url, method);
    const winnersView = new WinnersView('time', 'ASC');
  }

  static broken(parentNode: HTMLElement) {
    console.log('car broken');
    parentNode.classList.add('car-broken');
  }
}

export default CarControl;
