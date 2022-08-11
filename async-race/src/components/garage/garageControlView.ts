/* eslint-disable import/no-cycle */
import Control from '../../common/control';
import { CarControl } from '../car/carControl';
import { CarsDataModel, ICarsData } from '../carsDataModel';
import { Race } from '../raceControl';
import { GeneratorValues } from '../carGenerator/generatorControl';
import { GarageView } from './garageView';
import { PaginationView } from '../pagination/paginationView';
import style from './garage.css';

type PromiseType = {
  id?: number;
  name: string | HTMLInputElement;
  color: string | HTMLInputElement;
};
export class GarageControlView extends Control {
  static node: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style.garage__controls);
    this.destroy();
  }

  static render(parentNode: HTMLElement, data: Array<ICarsData>, carView: Control<HTMLElement>) {
    const controls = new Control(parentNode, 'div', style.garage__controls);
    const genegateWrapper = new Control(controls.node, 'div', style.garage__generate);
    const generateBttn = new Control(
      genegateWrapper.node,
      'button',
      `${style.bttn} ${style.bttn__generate}`,
      'Generate 100 cars'
    );
    generateBttn.node.onclick = async () => {
      console.log('click generate cars');
      const generateValue = new GeneratorValues();
      for (let i = 0; i < 100; i += 1) {
        const carName = generateValue.generateCarName();
        const carColor = generateValue.generateColor();
        const createWinner = async (body: PromiseType) =>
          (
            await fetch('http://localhost:3000/garage/', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-type': 'application/json',
              },
            })
          ).json();

        createWinner({ name: carName, color: carColor });
        console.log(carName, carColor);
      }
      const carsData = new CarsDataModel([], 'winners');
      carsData.build().then(async (result) => {
        const garageWrap: HTMLElement | null = document.querySelector('.garage');
        garageWrap!.innerHTML = '';
        const response = await result.items!.items;
        const itemsCount = await result.items!.itemsCount;
        const updateGarage = new GarageView(garageWrap!, response, itemsCount!);

        updateGarage.getCars(response);
        PaginationView.update(itemsCount!, 'garage', garageWrap!);
        console.log(result.data);
      });
    };
    const createCarWrapper = new Control(controls.node, 'div', style.create__car);
    const inputCarName = document.createElement('input');
    inputCarName.classList.add('create__input');
    inputCarName.setAttribute('placeholder', 'Input car name');
    createCarWrapper.node.append(inputCarName);
    const createCarColor = document.createElement('input');
    createCarColor.classList.add('create__color');
    createCarColor.setAttribute('type', 'color');
    createCarWrapper.node.append(createCarColor);
    const createCarSave = new Control(
      createCarWrapper.node,
      'button',
      `${style.bttn} ${style.bttn__save}`,
      'Generate car'
    );
    const createCarUpdate = new Control(
      createCarWrapper.node,
      'button',
      `${style.bttn} ${style.bttn__update}`,
      'Update'
    );
    const startRace = new Control(
      controls.node,
      'button',
      `${style.bttn} ${style.bttn__start}`,
      'Start race'
    );
    createCarSave.node.onclick = async () => {
      let inputValue: HTMLInputElement | null = null;
      let colorValue: HTMLInputElement | null = null;

      inputValue = inputCarName.value as unknown as HTMLInputElement;
      colorValue = createCarColor.value as unknown as HTMLInputElement;

      console.log(inputValue, colorValue);
      GarageControlView.createCar(inputValue, colorValue);

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
    };

    const resetRace = new Control(controls.node, 'button', `${style.bttn} ${style.bttn__reset}`, 'Reset');
    startRace.node.onclick = async () => {
      const carsData = new CarsDataModel([], 'winners');
      const currentPage = localStorage.getItem('currentPage');
      carsData.build(+currentPage!).then(async (result) => {
        const response = await result.items!.items;
        response.forEach((item, i) => {
          const node = carView.node.childNodes[i].childNodes[1].childNodes[0] as HTMLElement;
          const carSelect = carView.node.childNodes[i].childNodes[0].childNodes[1] as HTMLElement;
          const carRemove = carView.node.childNodes[i].childNodes[0].childNodes[2] as HTMLElement;
          const carStart = carView.node.childNodes[i].childNodes[0].childNodes[3] as HTMLElement;
          const carReset = carView.node.childNodes[i].childNodes[0].childNodes[4] as HTMLElement;
          const bttnsArray = [carSelect, carRemove, carStart];
          bttnsArray.forEach((it) => {
            it.setAttribute('disabled', 'disabled');
          });
          node.classList.remove('race', 'car-broken', 'check');
          // const reset = CarControl.carReset(item.id, node as HTMLElement);
          const race = Race.carStart(
            item.id,
            node,
            [generateBttn.node, startRace.node, createCarSave.node, resetRace.node, carReset],
            'raceStart'
          );
        });
        console.log(result.data);
      });
    };

    resetRace.node.onclick = () => {
      const currentPage = localStorage.getItem('currentPage');
      const carsData = new CarsDataModel([], 'winners');
      carsData.build(+currentPage!).then(async (result) => {
        const response = await result.items!.items;
        response.forEach((item, i) => {
          const node = carView.node.childNodes[i].childNodes[1].childNodes[0] as HTMLElement;
          const carSelect = carView.node.childNodes[i].childNodes[0].childNodes[1] as HTMLElement;
          const carRemove = carView.node.childNodes[i].childNodes[0].childNodes[2] as HTMLElement;
          const carStart = carView.node.childNodes[i].childNodes[0].childNodes[3] as HTMLElement;
          const carResetBtn = carView.node.childNodes[i].childNodes[0].childNodes[4] as HTMLElement;
          const bttnsArray = [carSelect, carRemove, carStart];
          bttnsArray.forEach((it) => {
            it.removeAttribute('disabled');
          });
          const carReset = CarControl.carReset(item.id, node);
          const raceReset = Race.raceReset();
        });
      });
    };
  }

  static createCar(name: HTMLInputElement, color: HTMLInputElement) {
    const generateValue = new GeneratorValues();
    let carName: HTMLInputElement | string = generateValue.generateCarName();
    let carColor: HTMLInputElement | string = generateValue.generateColor();

    console.log(name.toString().length);
    if (name.toString().length > 0) {
      carName = name;
      carColor = color;
    } else {
      carName = generateValue.generateCarName();
      carColor = generateValue.generateColor();
    }
    console.log(carName, carColor);

    const createCar = async (body: PromiseType) =>
      (
        await fetch('http://localhost:3000/garage/', {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-type': 'application/json',
          },
        })
      ).json();

    createCar({ name: carName, color: carColor });

    const carsData = new CarsDataModel([], 'winners');
    carsData.build().then(async (result) => {
      const garageWrap: HTMLElement | null = document.querySelector('.garage');
      garageWrap!.innerHTML = '';
      const response = await result.items!.items;
      const itemsCount = await result.items!.itemsCount;
      const updateGarage = new GarageView(garageWrap!, response, itemsCount!);

      updateGarage.getCars(response);
      PaginationView.update(itemsCount!, 'garage', garageWrap!);
      console.log(result.data);
    });
  }
}

export default GarageControlView;
