/* eslint-disable import/no-cycle */
import Control from '../../common/control';
import { ICarsData } from '../carsDataModel';
import { Race } from '../raceControl';
import { CarControl } from './carControl';
import style from './car.css';

export class CarView extends Control {
  constructor(parentNode: HTMLElement, data: Array<ICarsData>) {
    super(parentNode, 'div', style.cars__wrapper);
    this.renderCar(data);
  }

  renderCar(data: Array<ICarsData>) {
    data.map((item) => {
      const car = new Control(this.node, 'div', style.car);
      const carControl = new Control(car.node, 'div', style.car__control);
      const carName = new Control(carControl.node, 'h3', style.car__name, item.name);
      const carSelect = new Control(
        carControl.node,
        'button',
        `${style.bttn} ${style.car__select}`,
        'Select'
      );
      const carRemove = new Control(
        carControl.node,
        'button',
        `${style.bttn} ${style.car__remove}`,
        'Remove'
      );
      const carStart = new Control(carControl.node, 'button', `${style.bttn} ${style.car__start}`, 'Start');
      const carReset = new Control(carControl.node, 'button', `${style.bttn} ${style.car__reset}`, 'Reset');
      carReset.node.setAttribute('disabled', 'disabled');
      const carLine = new Control(car.node, 'div', style.car__line);
      const carImg = new Control(carLine.node, 'div', style.car__img);
      const finishLine = new Control(carLine.node, 'div', style.finish);
      carImg.node.innerHTML = `<?xml version="1.0" encoding="iso-8859-1"?>
      <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg fill='${item.color}' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="150px" height="150px" viewBox="0 0 98.751 98.75" style="enable-background:new 0 0 98.751 98.75;transform: scale(-1,1)"
         xml:space="preserve">
      <g>
        <g>
          <path d="M22.106,46.936c-3.79,0-6.866,3.071-6.866,6.866c0,0.293,0.024,0.58,0.062,0.862c0.426,3.386,3.307,6.003,6.805,6.003
            c3.598,0,6.54-2.761,6.839-6.279c0.017-0.194,0.03-0.389,0.03-0.586C28.976,50.008,25.9,46.936,22.106,46.936z M18.667,51.213
            l1.402,1.4c-0.109,0.188-0.196,0.391-0.249,0.605h-1.975C17.947,52.469,18.234,51.789,18.667,51.213z M17.839,54.407h1.988
            c0.057,0.212,0.139,0.412,0.25,0.598l-1.404,1.402C18.239,55.836,17.944,55.152,17.839,54.407z M21.512,58.067
            c-0.742-0.102-1.419-0.395-1.99-0.824l1.396-1.398c0.182,0.107,0.385,0.186,0.594,0.24V58.067z M21.512,51.516
            c-0.214,0.057-0.417,0.144-0.606,0.254l-1.396-1.398c0.573-0.438,1.256-0.726,2.003-0.83L21.512,51.516L21.512,51.516z
             M22.701,49.542c0.751,0.104,1.433,0.393,2.007,0.831l-1.397,1.397c-0.188-0.11-0.393-0.197-0.609-0.254L22.701,49.542
            L22.701,49.542z M22.701,58.067v-1.98c0.212-0.057,0.412-0.135,0.598-0.244l1.395,1.4C24.123,57.674,23.446,57.965,22.701,58.067z
             M25.547,56.411l-1.407-1.408c0.107-0.185,0.198-0.382,0.255-0.596h1.972C26.263,55.152,25.982,55.84,25.547,56.411z
             M24.395,53.219c-0.053-0.215-0.139-0.418-0.247-0.605l1.4-1.4c0.435,0.575,0.721,1.256,0.823,2.006H24.395L24.395,53.219z"/>
          <path d="M78.029,53.801c0-3.049,1.638-5.717,4.072-7.19l-16.177-7.166H55.775c-0.604,0-1.094,0.49-1.094,1.095v1.438
            c0,0.604,0.489,1.095,1.094,1.095h0.72v0.997h-1.841c-0.579,0-1.096,0.371-1.277,0.921L53.23,45.43
            c-3.351-0.271-4.945,2.294-6.62,2.294l-1.131-1.361c-0.674-0.813-1.706-1.241-2.758-1.144c-0.32,0.03-0.661,0.094-1.008,0.211
            l-0.635,2.294c0,0-5.759-0.335-13.245-0.066c1.648,1.537,2.687,3.72,2.687,6.146c0,0.24,0.039,5.32,0.039,5.32h49.383
            c-0.976-1.188-1.637-2.648-1.84-4.266C78.055,54.485,78.029,54.135,78.029,53.801z"/>
          <path d="M13.695,53.801c0-1.928,0.659-3.699,1.753-5.12C9.664,49.487,4.044,50.83,0,53.047c0,1.176,5.168,0.019,5.168,2.448H1.181
            c-0.402,0-0.728,0.325-0.728,0.728v2.172c0,0.402,0.325,0.729,0.728,0.729h9.969c0.403,0,0.729-0.326,0.729-0.729v-3.354h1.922
            c-0.009-0.062-0.024-0.121-0.032-0.185C13.72,54.485,13.695,54.135,13.695,53.801z"/>
          <path d="M96.938,38.084H86.284c-1.003,0-1.815,0.812-1.815,1.814v2.376c0,0.48,0.191,0.942,0.531,1.282l1.855,1.854
            c4.446,0.218,8,3.893,8,8.391c0,0.111-0.012,0.224-0.017,0.334h3.912V39.899C98.752,38.896,97.939,38.084,96.938,38.084z"/>
          <path d="M86.74,46.936c-3.79,0-6.866,3.071-6.866,6.866c0,0.293,0.024,0.58,0.062,0.862c0.426,3.386,3.308,6.003,6.806,6.003
            c3.598,0,6.54-2.761,6.84-6.279c0.017-0.194,0.028-0.389,0.028-0.586C93.609,50.008,90.535,46.936,86.74,46.936z M83.302,51.213
            l1.401,1.4c-0.109,0.188-0.195,0.391-0.249,0.605h-1.976C82.581,52.469,82.868,51.789,83.302,51.213z M82.473,54.407h1.988
            c0.057,0.212,0.139,0.412,0.25,0.598l-1.404,1.402C82.873,55.836,82.578,55.152,82.473,54.407z M86.146,58.067
            c-0.742-0.102-1.42-0.395-1.99-0.824l1.396-1.396c0.183,0.106,0.386,0.185,0.595,0.24V58.067z M86.146,51.516
            c-0.215,0.057-0.418,0.144-0.606,0.254l-1.396-1.398c0.572-0.438,1.256-0.726,2.004-0.83v1.975H86.146z M87.335,49.542
            c0.751,0.104,1.433,0.393,2.007,0.831l-1.396,1.397c-0.188-0.11-0.393-0.197-0.609-0.254L87.335,49.542L87.335,49.542z
             M87.335,58.067v-1.98c0.212-0.057,0.412-0.135,0.599-0.244l1.396,1.4C88.758,57.674,88.08,57.965,87.335,58.067z M90.182,56.411
            l-1.408-1.408c0.107-0.185,0.199-0.382,0.256-0.596h1.972C90.896,55.152,90.616,55.84,90.182,56.411z M89.029,53.219
            c-0.055-0.215-0.139-0.418-0.248-0.605l1.4-1.4c0.435,0.575,0.721,1.256,0.822,2.006H89.029L89.029,53.219z"/>
        </g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      <g>
      </g>
      </svg>
      `;
      carStart.node.onclick = async () => {
        carSelect.node.setAttribute('disabled', 'disabled');
        carRemove.node.setAttribute('disabled', 'disabled');
        carStart.node.setAttribute('disabled', 'disabled');
        carImg.node.classList.remove('race', 'car-broken', 'check');
        console.log(item);
        const start = Race.carStart(
          item.id,
          carImg.node,
          [carSelect.node, carRemove.node, carStart.node, carReset.node],
          'carStart'
        );
      };

      carReset.node.onclick = async () => {
        const reset = CarControl.carReset(item.id, carImg.node);
        const raceReset = Race.raceReset();
        carSelect.node.removeAttribute('disabled');
        carRemove.node.removeAttribute('disabled');
        carStart.node.removeAttribute('disabled');
      };

      carRemove.node.onclick = async () => {
        const remove = CarControl.carRemove(item.id, car);
      };

      carSelect.node.onclick = async () => {
        const select = CarControl.carSelect(item.id, item.name, item.color, car);
      };

      return car;
      // return this.renderCar(item);
    });
  }
}

export default CarView;
