/* eslint-disable import/no-cycle */
import Control from '../../common/control';
import { CarsDataModel } from '../carsDataModel';
import { WinnersView } from '../winners/winnersView';
import { GarageView } from '../garage/garageView';
import { PaginationView } from '../pagination/paginationView';
import { Race } from '../raceControl';
import style from './car.css';

type PromiseType = {
  id?: number;
  name: string | HTMLInputElement;
  color: string | HTMLInputElement;
};

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
      PaginationView.update(itemsCount!, 'garage', mainContainer!);
      const raceReset = Race.raceReset();
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

  static carSelect(id: number, name: string, color: string, parentNode: Control<HTMLElement>) {
    console.log('select car', id, name, color);
    const inputCarName: HTMLInputElement | null = document.querySelector('.create__input');
    const colorValue: HTMLInputElement | null = document.querySelector('.create__color');
    inputCarName!.value = name;
    colorValue!.value = color;
    const createCarUpdate: HTMLElement | null = document.querySelector('.bttn__update');
    createCarUpdate!.onclick = () => {
      console.log('click', name);
      CarControl.carUpdate(id, inputCarName!.value, colorValue!.value);
    };
  }

  static async carUpdate(id: number, carName?: string, carColor?: string) {
    console.log('select car', id);
    const updateCar = async (body: PromiseType) =>
      (
        await fetch(`http://localhost:3000/garage/${id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-type': 'application/json',
          },
        })
      ).json();

    updateCar({ id, name: carName!, color: carColor! });

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
      PaginationView.update(itemsCount!, 'garage', mainContainer!);
      console.log(result.data);
    });
  }

  static broken(parentNode: HTMLElement) {
    console.log('car broken');
    parentNode.classList.add('car-broken');
  }
}

export default CarControl;
