import Control from "../common/control";
import { productsDataModel, IProductData } from "./productsDataModel";
import { filterState } from "./filterState";

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
    //this.parentNode.textContent = "";
    this.renderSort(productsData, collectionNode, state);
  }

  renderSort(data: Array<IProductData>, collectionNode: Control<HTMLElement>, state: string) {
    const sortingTitle = new Control(this.parentNode, "label", style["sort-title"], "Сортировка:");
    const sort = new Control(this.parentNode, "select", style["sort__select"]);
    sort.node.onchange = (event: Event) => {
      const { target } = event;
      if (target) {
        const sortType = (target as HTMLButtonElement).value;
        const filterKeysLS = JSON.parse(localStorage.getItem("checkboxes") || "{}");
        const priceRangeLS = JSON.parse(localStorage.getItem("priceRange") || "{}");
        const diagonalRangeLS = JSON.parse(localStorage.getItem("diagonalRange") || "{}");
        const orderSort = localStorage.setItem("orderSort", sortType);
        new filterState(data, collectionNode, filterKeysLS, undefined, priceRangeLS, diagonalRangeLS);
        //new productsDataModel(data, collectionNode, sortType);
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
}
