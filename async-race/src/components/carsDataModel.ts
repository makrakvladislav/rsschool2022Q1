import Control from '../common/control';

export interface ICarsData {
  id: number;
  name: string;
  color: string;
}

export type ICars = {
  data: { items: ICarsData };
  itemsCount: number | null;
};

const baseUrl = 'http://localhost:3000';

export const enum Path {
  garage = '/garage',
  engine = '/engine',
  winners = '/winners',
}

export class CarsDataModel {
  // data!: Array<ICarsData>;
  data!: ICars;

  items: { items: Promise<Array<ICarsData>>; itemsCount: string | null } | undefined;

  constructor(data: Array<ICarsData>, path: string) {
    console.log(data);
  }

  public async build(page?: number) {
    let pageNumber = 1;
    if (page === undefined) {
      pageNumber = 1;
    } else {
      pageNumber = page;
    }
    this.items = await this.loadCars(`${baseUrl}/garage?_page=${pageNumber}&_limit=7`);
    return this;
  }

  //  Promise<Array<ICarsData>>
  // : Promise<{ items: Promise<ICarsData>; count: string | null }>
  private loadCars(url: string): Promise<{ items: Promise<Array<ICarsData>>; itemsCount: string | null }> {
    const response = fetch(url).then((res) => {
      const items = res.json();
      const itemsCount = res.headers.get('X-Total-Count');
      return {
        items,
        itemsCount,
      };
    });
    return response;

    /*
    const response = await fetch(url);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-count'),
    };

    return fetch(url).then((res) => {
      return res.json();
    });
    */
  }

  static async getData1(id: number) {
    const res = await fetch(`${baseUrl}/garage/${id}`);
    const data = await res.json();
    return data;
  }

  static async getData(url: string, method: string) {
    const response = await fetch(url, { method });

    if (response.status === 200) {
      const json = await response.json();
      return json;
    }
    if (response.status === 500) {
      return '500';
    }
    return response.status.toString();
  }
}

export default CarsDataModel;
