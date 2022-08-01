import Control from '../common/control';

export interface ICarsData {
  id: number;
  name: string;
  color: string;
}

const baseUrl = 'http://localhost:3000';

export const enum Path {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

export class CarsDataModel {
  data!: Array<ICarsData>;

  constructor(data: Array<ICarsData>, path: string) {
    console.log(data);
  }

  public async build() {
    // const response = await fetch(`${baseUrl}/garage/5`);
    // const data = await response.json();
    this.data = await this.loadCars(`${baseUrl}/garage`);
    return this;
  }

  private loadCars(url: string): Promise<Array<ICarsData>> {
    return fetch(url).then((res) => {
      return res.json();
    });
  }
}

export default CarsDataModel;
