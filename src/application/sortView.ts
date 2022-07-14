import Control from "../common/control";
import { productsDataModel, IProductData } from "./productsDataModel";

import style from "./sortView.css";

interface Sorting {
  default: Array<IProductData>[];
  nameAZ: Array<IProductData>[];
  nameZA: Array<IProductData>[];
  priceUp: Array<IProductData>[];
  priceDown: Array<IProductData>[];
}

export class sortView {
  public sorting: Sorting = {
    default: [],
    nameAZ: [],
    nameZA: [],
    priceUp: [],
    priceDown: [],
  };
  parentNode: HTMLElement;
  collectionNode!: Control<HTMLElement>;

  constructor(
    collectionNode: Control<HTMLElement>,
    parentNode: HTMLElement,
    productsData: Array<IProductData>,
    state: string
  ) {
    this.parentNode = parentNode;
    this.renderSort(productsData, collectionNode, state);
  }

  renderSort(data: Array<IProductData>, collectionNode: Control<HTMLElement>, state: string) {
    const sort = new Control(this.parentNode, "select", style["sort__select"]);

    sort.node.onchange = (event: Event) => {
      const { target } = event;
      if (target) {
        const sortType = (target as HTMLButtonElement).value;
        const orderSort = localStorage.setItem("orderSort", sortType);
        new productsDataModel(data, collectionNode, sortType);
        //this.priceDown(data, collectionNode);
      }
    };

    Object.keys(this.sorting).forEach((el) => {
      const option = document.createElement("option");
      option.value = el;
      option.classList.add("sort__option");
      if (option.value === "default") option.innerHTML = "по умолчанию";
      if (option.value === "nameAZ") option.innerHTML = "по названию (от A до Z)";
      if (option.value === "nameZA") option.innerHTML = "по названию (от Z до A)";
      if (option.value === "priceUp") option.innerHTML = "цена (сначала дешевые)";
      if (option.value === "priceDown") option.innerHTML = "цена (сначала дорогие)";
      sort.node.appendChild(option);
      (sort.node as HTMLOptionElement).value = state;
    });
  }
  /*
  sortArr(sortType: string, data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    if (sortType === "default") {
      collectionNode.node.textContent = "";
      new productCardView(collectionNode.node, data);
      console.log(data);
    }
    if (sortType === "nameAZ") {
      let sortedData = [...data];
      sortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
      this.sorting.nameAZ.push(sortedData);
      console.log(this.sorting.nameAZ);
      collectionNode.node.textContent = "";
      new productCardView(collectionNode.node, sortedData);
      console.log(sortedData, data);
    }
    if (sortType === "nameZA") {
      let sortedData = [...data];
      sortedData = sortedData.sort((a, b) => b.title.localeCompare(a.title));
      collectionNode.node.textContent = "";
      new productCardView(collectionNode.node, sortedData);
      console.log(sortedData, data);
    }
    if (sortType === "priceUp") {
      let sortedData = [...data];
      sortedData = sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      collectionNode.node.textContent = "";
      new productCardView(collectionNode.node, sortedData);
      console.log(sortedData, data);
    }
    if (sortType === "priceDown") {
      let sortedData = [...data];
      sortedData = sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      collectionNode.node.textContent = "";
      new productCardView(collectionNode.node, sortedData);
      console.log(sortedData, data);
    }
  }
  */
}
