import Control from "../common/control";
import { productCardView } from "./productCardView";
import { IProductData } from "./productsDataModel";
import { sortState } from "./sortState";

interface IFilter {
  price: string[] | undefined;
  brand: string[] | undefined;
  color: string[] | undefined;
  memory: string[] | undefined;
  diagonal: string[] | undefined;
  cameras: string[] | undefined;
  available: string[] | undefined;
}

interface IPriceRange {
  price: string[] | undefined;
}

interface IDiagonalRange {
  diagonal: string[] | undefined;
}

export class filterState {
  public filter: IFilter = {
    price: [],
    brand: [],
    color: [],
    memory: [],
    diagonal: [],
    cameras: [],
    available: [],
  };

  data!: Array<IProductData>;
  filteredData!: IProductData[];

  constructor(
    data: Array<IProductData>,
    collectionNode: Control<HTMLElement>,
    filterState?: IFilter,
    filter__valueLabel?: Element,
    priceRange?: IPriceRange,
    diagonalRange?: IDiagonalRange
  ) {
    //if (filterType === "color") this.filterColor(data, collectionNode, filterKey);
    this.filteredData = JSON.parse(JSON.stringify(data));
    //console.log(this.filteredData);

    console.log(filterState);

    this.filterInit(
      this.filteredData,
      collectionNode,
      filterState,
      filter__valueLabel,
      priceRange,
      diagonalRange
    );
  }

  filterInit(
    data: Array<IProductData>,
    collectionNode: Control<HTMLElement>,
    filterState?: IFilter,
    filter__valueLabel?: Element,
    priceRange?: IPriceRange,
    diagonalRange?: IDiagonalRange
  ) {
    /*
    if (filterState["price"].length > 0) {
      console.log("price check");
      this.filterPrice(this.filteredData, filterState, priceRange, collectionNode);
    }
    */

    this.filterPrice(this.filteredData, filterState!, priceRange, collectionNode);
    this.filterDiagonal(this.filteredData, filterState!, collectionNode, diagonalRange);
    this.filterData(this.filteredData, filterState!, collectionNode);

    const sortType = localStorage.getItem("orderSort") || "{}";
    console.log(sortType);
    if (sortType === "default") this.sortDefault(this.filteredData, collectionNode);
    if (sortType === "nameAZ") this.sortNameAZ(this.filteredData, collectionNode);
    if (sortType === "priceDown") this.sortPriceDown(this.filteredData, collectionNode);
    if (sortType === "nameZA") this.sortNameZA(this.filteredData, collectionNode);
    if (sortType === "priceUp") this.sortPriceUp(this.filteredData, collectionNode);

    //new sortState(this.filteredData, sortType, collectionNode);
    /*
    console.log(sortType);
    if (sortType === "default") this.sortDefault(data, collectionNode);
    if (sortType === "nameAZ") this.sortNameAZ(data, collectionNode);
    if (sortType === "priceDown") this.sortPriceDown(data, collectionNode);
    if (sortType === "nameZA") this.sortNameZA(data, collectionNode);
    if (sortType === "priceUp") this.sortPriceUp(data, collectionNode);
    //if (sortType === "color") this.filterColor(data, collectionNode);
    */
    /*
    const filteredData = data;
    const checkboxesChecked = JSON.parse(localStorage.getItem("checkboxes") || "{}");
    console.log(checkboxesChecked);
    console.log(filter__valueLabel.getAttribute("prop-id"));
    console.log(filter__valueLabel);
    console.log(filterKey);
    */
    //filteredData = this.filterColor(filteredData, collectionNode, filterKey);
    //filteredData = this.filterColor(filteredData, collectionNode, filterKey);
  }

  private filterPrice(
    data: Array<IProductData>,
    filterState: IFilter,
    priceRange: IPriceRange | undefined,
    collectionNode: Control<HTMLElement>
  ) {
    let minPrice = 0;
    let maxPrice = 999999;
    priceRange?.price?.forEach((item) => {
      console.log(item[0]);
      minPrice = +item[0];
      maxPrice = +item[1];
    });

    return (this.filteredData = this.filteredData.filter((item) => {
      return +item.price >= minPrice && +item.price <= maxPrice;
    }));

    //collectionNode.node.textContent = "";
    //new productCardView(collectionNode.node, this.filteredData);
    //this.filterData(this.filteredData, filterState, collectionNode);
  }

  private filterDiagonal(
    data: Array<IProductData>,
    filterState: IFilter,
    collectionNode: Control<HTMLElement>,
    diagonalRange: IDiagonalRange | undefined
  ) {
    let minDiagonal = 0;
    let maxDiagonal = 999999;
    diagonalRange?.diagonal?.forEach((item) => {
      minDiagonal = +item[0];
      maxDiagonal = +item[1];
    });
    return (this.filteredData = this.filteredData.filter((item) => {
      return +item.diagonal >= minDiagonal && +item.diagonal <= maxDiagonal;
    }));

    //collectionNode.node.textContent = "";
    //new productCardView(collectionNode.node, this.filteredData);
    //this.filterData(this.filteredData, filterState, collectionNode);
  }

  private filterData(data: Array<IProductData>, filterState: IFilter, collectionNode: Control<HTMLElement>) {
    const getValue = (value: string) => (typeof value === "string" ? value.toUpperCase() : value);
    console.log(filterState);
    const filterKeys = Object.keys(filterState);

    this.filteredData = data.filter((item) => {
      // validates all filter criteria
      return filterKeys.every((key: string) => {
        // ignores an empty filter
        if (!filterState[key as keyof typeof filterState]!.length) return true;
        return filterState[key as keyof typeof filterState]!.find(
          (filter: string) => getValue(filter) === getValue(item[key as keyof typeof getValue])
        );
      });
    });
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, this.filteredData);

    if (this.filteredData.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }

    return this.filteredData;
  }

  private sortDefault(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, data);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
    console.log("defatult");
  }

  private sortNameAZ(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
    console.log("sortNameAZ");
  }

  private sortNameZA(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => b.title.localeCompare(a.title));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
    console.log("sortNameZA");
  }

  private sortPriceUp(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
    console.log("sortPriceUp");
  }

  private sortPriceDown(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    console.log("SOORT");
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
    console.log("sortPriceDown", sortedData);
  }

  /*
  filterColor(data: Array<IProductData>, collectionNode: Control<HTMLElement>, filterKey: string) {
    const res = data.filter((x) => x.properties.some((y) => y.color === filterKey));
    //filteredData = sortedData.filter((item) => item.available === false);
    //console.log(filteredData);

    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, res);
    return res;
  }
  */
}
