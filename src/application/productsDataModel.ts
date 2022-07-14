import productsDataUrl from "../assets/json/data.json";
import Control from "../common/control";
import { productCardView } from "./productCardView";

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
  constructor(data: Array<IProductData>, collectionNode: Control<HTMLElement>, sortType: string) {
    console.log(sortType);
    if (sortType === "default") this.sortDefault(data, collectionNode);
    if (sortType === "nameAZ") this.sortNameAZ(data, collectionNode);
    if (sortType === "priceDown") this.sortPriceDown(data, collectionNode);
    if (sortType === "nameZA") this.sortNameZA(data, collectionNode);
    if (sortType === "priceUp") this.sortPriceUp(data, collectionNode);
  }

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

  private sortDefault(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, data);
    console.log("defatult");
  }

  private sortNameAZ(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    console.log("sortNameAZ");
  }

  private sortNameZA(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => b.title.localeCompare(a.title));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    console.log("sortNameZA");
  }

  private sortPriceUp(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    console.log("sortPriceUp");
  }

  sortPriceDown(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    console.log("sortPriceDown", sortedData);
  }
}
