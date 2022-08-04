import Control from '../../common/control';
import { CarsDataModel } from '../carsDataModel';

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
    return res;
  }

  static async carReset(id: number, parentNode: HTMLElement) {
    const url = `http://localhost:3000/engine?id=${id}&status=stopped`;
    const method = 'PATCH';
    const res = await CarsDataModel.getData(url, method);
    parentNode.classList.remove('race', 'car-broken', 'check');
    return res;
  }

  static async carRemove(id: number, parentNode: Control<HTMLElement>) {
    const url = `http://localhost:3000/garage/${id}`;
    const method = 'DELETE';
    const res = await CarsDataModel.getData(url, method);
    parentNode.destroy();
  }

  static broken(parentNode: HTMLElement) {
    console.log('car broken');
    parentNode.classList.add('car-broken');
    parentNode.classList.add('check');
  }
}

export default CarControl;
