import Control from "../common/control";
import { productCardView } from "./productCardView";
import { IProductData } from "./productsDataModel";
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
    diagonalRange?: IDiagonalRange,
    searchQuery?: string
  ) {
    this.filteredData = JSON.parse(JSON.stringify(data));
    this.filterInit(
      this.filteredData,
      collectionNode,
      filterState,
      filter__valueLabel,
      priceRange,
      diagonalRange,
      searchQuery
    );
  }

  filterInit(
    data: Array<IProductData>,
    collectionNode: Control<HTMLElement>,
    filterState?: IFilter,
    filter__valueLabel?: Element,
    priceRange?: IPriceRange,
    diagonalRange?: IDiagonalRange,
    searchQuery?: string
  ) {
    const searchQueryLS = localStorage.getItem("searchQuery");

    if (searchQueryLS !== null) {
      this.filterTitle(this.filteredData, filterState!, priceRange, collectionNode, searchQueryLS!);
    }

    this.filterPrice(this.filteredData, filterState!, priceRange, collectionNode);
    this.filterDiagonal(this.filteredData, filterState!, collectionNode, diagonalRange);
    this.filterData(this.filteredData, filterState!, collectionNode);

    const sortType = localStorage.getItem("orderSort") || "{}";
    if (sortType === "default") this.sortDefault(this.filteredData, collectionNode);
    if (sortType === "nameAZ") this.sortNameAZ(this.filteredData, collectionNode);
    if (sortType === "priceDown") this.sortPriceDown(this.filteredData, collectionNode);
    if (sortType === "nameZA") this.sortNameZA(this.filteredData, collectionNode);
    if (sortType === "priceUp") this.sortPriceUp(this.filteredData, collectionNode);
  }

  private filterTitle(
    data: Array<IProductData>,
    filterState: IFilter,
    priceRange: IPriceRange | undefined,
    collectionNode: Control<HTMLElement>,
    searchQuery?: string
  ) {
    return (this.filteredData = this.filteredData.filter(
      (el) => el.title.toLowerCase().indexOf(searchQuery!.toLowerCase()) !== -1
    ));
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
      minPrice = +item[0];
      maxPrice = +item[1];
    });

    return (this.filteredData = this.filteredData.filter((item) => {
      return +item.price >= minPrice && +item.price <= maxPrice;
    }));
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
  }

  private filterData(data: Array<IProductData>, filterState: IFilter, collectionNode: Control<HTMLElement>) {
    const getValue = (value: string) => (typeof value === "string" ? value.toUpperCase() : value);
    const filterKeys = Object.keys(filterState);

    this.filteredData = data.filter((item) => {
      return filterKeys.every((key: string) => {
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
  }

  private sortNameAZ(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => a.title.localeCompare(b.title));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
  }

  private sortNameZA(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => b.title.localeCompare(a.title));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
  }

  private sortPriceUp(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
  }

  private sortPriceDown(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    let sortedData = [...data];
    sortedData = sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    collectionNode.node.textContent = "";
    new productCardView(collectionNode.node, sortedData);
    if (data.length === 0) {
      collectionNode.node.textContent = "Извините, совпадений не обнаружено";
    }
  }
}
