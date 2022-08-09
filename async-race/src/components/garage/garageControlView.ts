import Control from '../../common/control';
import { CarControl } from '../car/carControl';
import { CarsDataModel, ICarsData } from '../carsDataModel';
import { Race } from '../raceControl';
import style from './garage.css';

export class GarageControlView extends Control {
  static node: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style.garage__controls);
  }

  static render(parentNode: HTMLElement, data: Array<ICarsData>, carView: Control<HTMLElement>) {
    const controls = new Control(parentNode, 'div', style.garage__controls);
    const genegateWrapper = new Control(controls.node, 'div', style.garage__generate);
    const generateBttn = new Control(
      genegateWrapper.node,
      'button',
      `${style.bttn} ${style.bttn__generate}`,
      'Generate cars'
    );
    generateBttn.node.onclick = () => {
      console.log('click generate cars');
    };
    const createCarWrapper = new Control(controls.node, 'div', style.create__car);
    const createCarName = new Control(createCarWrapper.node, 'input', style.create__input);
    createCarName.node.setAttribute('placeholder', 'Input car name');
    const createCarSave = new Control(
      createCarWrapper.node,
      'button',
      `${style.bttn} ${style.bttn__save}`,
      'Save'
    );
    const createCarColor = new Control(createCarWrapper.node, 'input', style.create__input_color);
    createCarColor.node.setAttribute('type', 'color');
    const startRace = new Control(
      controls.node,
      'button',
      `${style.bttn} ${style.bttn__start}`,
      'Start race'
    );
    const resetRace = new Control(controls.node, 'button', `${style.bttn} ${style.bttn__reset}`, 'Reset');
    startRace.node.onclick = async () => {
      const carsData = new CarsDataModel([], 'winners');
      carsData.build().then((result) => {
        result.data.forEach((item, i) => {
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
      const carsData = new CarsDataModel([], 'winners');
      carsData.build().then((result) => {
        result.data.forEach((item, i) => {
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
}

export default GarageControlView;
