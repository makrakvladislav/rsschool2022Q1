import Control from '../common/control';
import { CarControl } from './car/carControl';
import { CarsDataModel } from './carsDataModel';
import { Modal } from './modal/modalView';
import { WinnersController } from './winners/winnersController';
import { WinnersView } from './winners/winnersView';

export class Race {
  static id: number;

  static node: HTMLElement;

  static resetNode: Control<HTMLElement> | null;

  static velocity: number;

  static duration: number;

  static results: Array<[number, number]> = [];

  static winner: boolean;

  winner = false;

  static async carStart(id: number, node: HTMLElement, resetNode: HTMLElement, type: string) {
    await this.engineStart(id, resetNode);
    await this.animate(node);
    await this.drive(id, node, type);
  }

  static async engineStart(id: number, resetNode: HTMLElement) {
    const distance = 500000;
    const res = await CarControl.start(id);
    this.velocity = res.velocity;
    this.duration = distance / this.velocity;
    this.results.push([id, this.duration / 1000]);
    resetNode.removeAttribute('disabled');
    console.log('engine Start', id, (this.duration / 1000).toFixed(3));
  }

  static animate(parentNode: HTMLElement) {
    parentNode.classList.add('race');
    parentNode.setAttribute('style', `animation-duration: ${this.duration / 1000}s;`);
  }

  static async drive(id: number, parentNode: HTMLElement, type: string) {
    const result = await CarControl.run(id);

    if (result === '500') {
      CarControl.broken(parentNode);
    }

    if (result.success && !this.winner && type === 'raceStart') {
      this.winner = true;
      const winnerId = this.results.flat().indexOf(id);
      const winnerTime = this.results.flat()[winnerId + 1];
      Race.raceFinish(id, winnerTime);
    }
  }

  static raceReset() {
    this.winner = false;
    this.results = [];
  }

  static async raceFinish(id: number, winnerTime: number) {
    const data = await CarsDataModel.getData('http://localhost:3000/garage', 'GET');
    const obj = data.find((o: { id: number }) => o.id === id);
    // this.saveWinner(id, +winnerTime.toFixed(3));
    const modal = new Modal(obj.name, winnerTime.toFixed(3));
    const saveWinner = new WinnersController(id, +winnerTime.toFixed(3));
  }

  static async saveWinner(id: number, time: number) {
    const url = `http://localhost:3000/winners/`;
    const method = 'GET';
    const res = await fetch(url, { method });
    const data = await res.json();
    console.log(data);
    if (res.status === 404) {
      // console.log('404 error');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const createWinner = async (body: any) =>
        (
          await fetch('http://localhost:3000/winners/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
              'Content-type': 'application/json',
            },
          })
        ).json();
      createWinner({ id, wins: (data.wins += 100) });
    }
  }
}

export default Race;
