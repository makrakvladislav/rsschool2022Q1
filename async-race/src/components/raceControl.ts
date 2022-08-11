/* eslint-disable import/no-cycle */
import Control from '../common/control';
import { CarControl } from './car/carControl';
import { CarsDataModel } from './carsDataModel';
import { Modal } from './modal/modalView';
import { WinnersController } from './winners/winnersController';

export class Race {
  static id: number;

  static node: HTMLElement;

  static resetNode: Control<HTMLElement> | null;

  static velocity: number;

  static duration: number;

  static results: Array<[number, number]> = [];

  static winner: boolean;

  winner = false;

  static async carStart(id: number, node: HTMLElement, bttnsArray: Array<HTMLElement>, type: string) {
    await this.engineStart(id, bttnsArray);
    await this.animate(node);
    await this.drive(id, node, type, bttnsArray);
  }

  static async engineStart(id: number, bttnsArray: Array<HTMLElement>) {
    const distance = 500000;
    const res = await CarControl.start(id);
    this.velocity = res.velocity;
    this.duration = distance / this.velocity;
    this.results.push([id, this.duration / 1000]);
    bttnsArray.forEach((item) => {
      if (item.classList[1] === 'car__reset') {
        return item.removeAttribute('disabled');
      }
      return item.setAttribute('disabled', 'disabled');
    });
  }

  static animate(parentNode: HTMLElement) {
    parentNode.classList.add('race');
    parentNode.setAttribute('style', `animation-duration: ${this.duration / 1000}s;`);
  }

  static async drive(id: number, parentNode: HTMLElement, type: string, bttnsArray: Array<HTMLElement>) {
    const result = await CarControl.run(id);

    if (result === '500') {
      CarControl.broken(parentNode);
    }

    if (result.success && !this.winner && type === 'raceStart') {
      this.winner = true;
      const winnerId = this.results.flat().indexOf(id);
      const winnerTime = this.results.flat()[winnerId + 1];
      console.log(winnerTime);
      Race.raceFinish(id, winnerTime, bttnsArray);
    } else if (result !== '500') {
      bttnsArray.forEach((item) => {
        item.removeAttribute('disabled');
      });
    }
  }

  static raceReset() {
    this.winner = false;
    this.results = [];
  }

  static async raceFinish(id: number, winnerTime: number, bttnsArray: Array<HTMLElement>) {
    const data = await CarsDataModel.getData('http://localhost:3000/garage', 'GET');
    const obj = data.find((o: { id: number }) => o.id === id);
    // this.saveWinner(id, +winnerTime.toFixed(3));
    const time = winnerTime.toFixed(3);
    console.log(time);
    const modal = new Modal(obj.name, time);
    const saveWinner = new WinnersController(id, +time);
    bttnsArray.forEach((item) => {
      return item.removeAttribute('disabled');
    });
    this.raceReset();
  }
}

export default Race;
