import Control from '../../common/control';
import style from './garage.css';

export class GarageControlView extends Control {
  static node: HTMLElement | null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style.garage__controls);
  }

  static render(parentNode: HTMLElement, counter: number) {
    const controls = new Control(parentNode, 'div', style.garage__controls);
    const genegateWrapper = new Control(controls.node, 'div', style.garage__generate);
    const carsCounterWrapper = new Control(genegateWrapper.node, 'div', style.cars__count);
    const carsCounterText = new Control(
      carsCounterWrapper.node,
      'div',
      style.counter__text,
      'Cars in garage:'
    );
    const carsCounter = new Control(carsCounterWrapper.node, 'span', style.counter);
    carsCounter.node.textContent = counter.toString();
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
    startRace.node.onclick = () => {
      console.log('click start race');
    };
    const resetRace = new Control(controls.node, 'button', `${style.bttn} ${style.bttn__start}`, 'Reset');
    resetRace.node.onclick = () => {
      console.log('click reset race');
    };
  }
}

export default GarageControlView;
