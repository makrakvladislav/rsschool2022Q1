import productsDataUrl from "../assets/json/data.json";

interface IProductProp {
  brand: string;
  color: string;
  memory: string;
  diagonal: string;
  cameras: string;
}

export interface IProductData {
  title: string;
  price: string;
  short_description: string;
  available: boolean;
  img: string;
  properties: Array<IProductProp>;
}

type IProductsDto = Record<string, IProductData>;

export class productsDataModel {
  data!: Array<IProductData>;

  public async build() {
    this.data = await this.loadProducts(productsDataUrl);
    return this;
  }

  private loadProducts(url: string): Promise<Array<IProductData>> {
    return fetch(url).then((res) =>
      res.json().then((productsData: IProductsDto) => {
        const modelData: Array<IProductData> = Object.keys(productsData).map((product) => {
          const item = productsData[product];
          const record: IProductData = {
            title: item.title,
            price: item.price,
            short_description: item.short_description,
            available: item.available,
            img: item.img,
            properties: item.properties,
          };

          return record;
        });
        return modelData;
      })
    );
  }
}
