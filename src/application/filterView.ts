import Control from "../common/control";
import { productsDataModel, IProductData } from "./productsDataModel";
import { productCardView } from "./productCardView";
import * as noUiSlider from "nouislider";
import { filterState } from "./filterState";
import { sortView } from "./sortView";

import "nouislider/dist/nouislider.css";
import style from "./filterView.css";

interface IFilter {
  price: string[];
  brand: string[];
  color: string[];
  memory: string[];
  diagonal: string[];
  cameras: string[];
  available: string[];
}

interface IPriceRange {
  price: string[];
}

interface IDiagonalRange {
  diagonal: string[];
}
export class filterView {
  public filter: IFilter = {
    price: [],
    brand: [],
    color: [],
    memory: [],
    diagonal: [],
    cameras: [],
    available: [],
  };

  public filterDefault: IFilter = {
    price: [],
    brand: [],
    color: [],
    memory: [],
    diagonal: [],
    cameras: [],
    available: [],
  };

  public filterProps: IFilter = {
    price: [],
    brand: [],
    color: [],
    memory: [],
    diagonal: [],
    cameras: [],
    available: [],
  };

  public priceRange: IPriceRange = {
    price: [],
  };

  public diagonalRange: IDiagonalRange = {
    diagonal: [],
  };

  parentNode: HTMLElement;
  collectionNode!: Control<HTMLElement>;
  filterKeysLS: IFilter;
  priceRangeLS: IPriceRange;
  diagonalRangeLS: IDiagonalRange;
  sortNode!: HTMLElement | undefined;

  constructor(
    collectionNode: Control<HTMLElement>,
    parentNode: HTMLElement,
    productsData: Array<IProductData>,
    sortNode: HTMLElement
  ) {
    this.filterKeysLS = JSON.parse(localStorage.getItem("checkboxes") || "{}");
    this.priceRangeLS = JSON.parse(localStorage.getItem("priceRange") || "{}");
    this.diagonalRangeLS = JSON.parse(localStorage.getItem("diagonalRange") || "{}");
    this.parentNode = parentNode;
    this.sortNode = sortNode;
    this.getFilterProps(productsData);
    this.renderFilter(productsData, collectionNode);
    this.renderResetBtn(productsData, collectionNode);

    if (Object.keys(this.filterKeysLS).length > 0) {
      this.filter = this.filterKeysLS;
      new filterState(productsData, collectionNode, this.filterKeysLS, undefined);
      //this.priceRange = this.priceRangeLS;
    }

    if (Object.keys(this.priceRangeLS).length > 0) {
      this.priceRange = this.priceRangeLS;
      new filterState(productsData, collectionNode, this.filterKeysLS, undefined, this.priceRangeLS);

      console.log(this.priceRange, this.priceRangeLS);
    }

    if (Object.keys(this.diagonalRangeLS).length > 0) {
      console.log(this.filter);
      this.diagonalRange = this.diagonalRangeLS;
      new filterState(
        productsData,
        collectionNode,
        this.filterKeysLS,
        undefined,
        undefined,
        this.diagonalRangeLS
      );
      console.log(this.diagonalRange, this.diagonalRangeLS);
    }

    new filterState(
      productsData,
      collectionNode,
      this.filter,
      undefined,
      this.priceRange,
      this.diagonalRange
    );
  }

  getFilterProps(data: Array<IProductData>) {
    /*
    const propBrand = new Set();
    const propColor = new Set();
    const propMemory = new Set();
    const propDiagonal = new Set();
    const propCameras = new Set();
    const filterProp = properties.map((el) => {
      if (el.brand) propBrand.add(el.brand);
      if (el.color) propColor.add(el.color);
      if (el.memory) propMemory.add(el.memory);
      if (el.diagonal) propDiagonal.add(el.diagonal);
      if (el.cameras) propCameras.add(el.cameras);
    });
    */
    data.forEach((item) => {
      item.properties.map((prop) => {
        if (item.price) {
          if (this.filterProps.price.indexOf(item.price) == -1) {
            this.filterProps.price.push(item.price);
          }
        }
        if (prop.brand) {
          if (this.filterProps.brand.indexOf(prop.brand) == -1) {
            this.filterProps.brand.push(prop.brand);
          }
        }
        if (prop.color) {
          if (this.filterProps.color.indexOf(prop.color) == -1) {
            this.filterProps.color.push(prop.color);
          }
        }
        if (prop.memory) {
          if (this.filterProps.memory.indexOf(prop.memory) == -1) {
            this.filterProps.memory.push(prop.memory);
          }
        }
        if (prop.diagonal) {
          if (this.filterProps.diagonal.indexOf(prop.diagonal) == -1) {
            this.filterProps.diagonal.push(prop.diagonal);
          }
        }
        if (prop.cameras) {
          if (this.filterProps.cameras.indexOf(prop.cameras) == -1) {
            this.filterProps.cameras.push(prop.cameras);
          }
        }
        if (item.available) {
          if (this.filterProps.available.indexOf(item.available.toString()) == -1) {
            this.filterProps.available.push(item.available.toString());
          }
        }
        /*
        const filterProp = item.properties.map((el) => {
          if (el.brand) propBrand.push(el.brand);
          if (el.color) propColor.add(el.color);
          if (el.memory) propMemory.add(el.memory);
          if (el.diagonal) propDiagonal.add(el.diagonal);
          if (el.cameras) propCameras.add(el.cameras);
        });
        */
      });
    });
    //console.log(this.filter);
  }

  renderFilter(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    const filterStateArr: Array<boolean> = [];
    let filterCounter = 0;
    Object.keys(this.filterProps).forEach((el) => {
      const filterWrapper = new Control(this.parentNode, "div", style["filter__item"]);
      const filterType = el;

      if (filterType === "price") {
        filterWrapper.node.classList.add("price");
        new Control(filterWrapper.node, "h3", `${style["filter__title"]} ${style["price"]}`, "Цена");
        const filter = new Control(filterWrapper.node, "div", style["filter__values"]);
        const sliderPrice = new Control(filter.node, "div", style["range__filter"]);
        sliderPrice.node as noUiSlider.target;

        const priceArr = this.filterProps.price.map((number) => {
          return parseInt(number, 10);
        });

        let minPrice = Math.min(...priceArr);
        let maxPrice = Math.max(...priceArr);
        let startMinPrice = Math.min(...priceArr);
        let startMaxPrice = Math.max(...priceArr);

        if (Object.keys(this.priceRangeLS).length > 0) {
          Object.values(this.priceRangeLS).forEach((item) => {
            console.log(...item);
            item.forEach((it: Array<number>) => {
              startMinPrice = +it[0];
              startMaxPrice = +it[1];
            });
          });
        } else {
          minPrice = Math.min(...priceArr);
          maxPrice = Math.max(...priceArr);
          startMinPrice = Math.min(...priceArr);
          startMaxPrice = Math.max(...priceArr);
        }
        noUiSlider.create(sliderPrice.node, {
          start: [startMinPrice, startMaxPrice],
          connect: true,
          tooltips: true,
          range: {
            min: minPrice,
            max: maxPrice,
          },
        });
        (sliderPrice.node as noUiSlider.target).noUiSlider?.on("change", () => {
          const prices = (sliderPrice.node as noUiSlider.target).noUiSlider?.get();
          this.priceRange.price.pop();
          this.priceRange.price.push(prices as string);
          localStorage.setItem("priceRange", JSON.stringify(this.priceRange));
          new filterState(data, collectionNode, this.filter, undefined, this.priceRange, this.diagonalRange);
        });
      }

      if (filterType === "diagonal") {
        new Control(filterWrapper.node, "h3", `${style["filter__title"]} ${style["diagonal"]}`, "Диагональ");
        const filter = new Control(filterWrapper.node, "div", style["filter__values"]);
        const sliderDiagonal = new Control(filter.node, "div", style["diagonal__filter"]);
        sliderDiagonal.node as noUiSlider.target;
        const diagonalArr = this.filterProps.diagonal.map((number) => {
          return parseFloat(number);
        });

        let minDiagonal = Math.min(...diagonalArr);
        let maxDiagonal = Math.max(...diagonalArr);
        let startMinDiagonal = Math.min(...diagonalArr);
        let startMaxDiagonal = Math.max(...diagonalArr);

        if (Object.keys(this.diagonalRangeLS).length > 0) {
          Object.values(this.diagonalRangeLS).forEach((item) => {
            console.log(...item);
            item.forEach((it: Array<number>) => {
              startMinDiagonal = +it[0];
              startMaxDiagonal = +it[1];
            });
          });
        } else {
          minDiagonal = Math.min(...diagonalArr);
          maxDiagonal = Math.max(...diagonalArr);
          startMinDiagonal = Math.min(...diagonalArr);
          startMaxDiagonal = Math.max(...diagonalArr);
        }

        noUiSlider.create(sliderDiagonal.node, {
          start: [startMinDiagonal, startMaxDiagonal],
          connect: true,
          tooltips: true,
          range: {
            min: minDiagonal,
            max: maxDiagonal,
          },
        });

        (sliderDiagonal.node as noUiSlider.target).noUiSlider?.on("change", () => {
          const diagonals = (sliderDiagonal.node as noUiSlider.target).noUiSlider?.get();
          this.diagonalRange.diagonal.pop();
          this.diagonalRange.diagonal.push(diagonals as string);
          localStorage.setItem("diagonalRange", JSON.stringify(this.diagonalRange));
          new filterState(data, collectionNode, this.filter, undefined, this.priceRange, this.diagonalRange);
        });
      }

      if (filterType === "brand") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Производитель");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filterProps.brand.forEach((item) => {
          const filter__value = new Control(filter.node, "li", style["filter__value"]);
          const filter__valueCheckbox = new Control(
            filter__value.node,
            "input",
            style["filter-value-checkbox"]
          );
          const filter__valueLabel = new Control(
            filter__value.node,
            "label",
            style["filter-value-label"],
            item
          );

          filterStateArr.push(false);
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__valueLabel.node.setAttribute("prop-id", filterCounter.toString());

          const attr: string | null = filter__valueLabel.node.getAttribute("for");
          if (Object.keys(this.filterKeysLS).length > 0) {
            this.filterKeysLS.brand.forEach((item) => {
              console.log(item);
              if (item === attr) {
                if (filter__valueCheckbox.node !== null) {
                  filter__valueCheckbox.node.setAttribute("checked", "checked");
                }
              }
            });
          }
          //console.log(filter__valueLabel.node.getAttribute("for") === (this.filterKeysLS.brand as this.filterKeysLS));
          filter__valueCheckbox.node.onclick = (e) => {
            //console.log(`filter clicked: ${item}`);
            const checkbox = e.target as HTMLInputElement;
            const filterId = Number(filter__valueLabel.node.getAttribute("prop-id"));
            const brandValue = filterType + item;
            if (checkbox.checked) {
              filterStateArr[filterId] = checkbox.checked;
              //console.log(filter__valueLabel);
              //new filterState(data, collectionNode, filterType, item, filter__valueLabel.node);
              //this.filter.brand.push(item);
              //this.state.brand[item] = true;
              //this.filteredCollected(this.state);
              this.filter.brand.push(item);
              //this.filterData(data, this.filter, collectionNode);
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
            } else {
              //this.state.brand[item] = false
              const index = this.filter.brand.indexOf(item);
              if (index > -1) {
                this.filter.brand.splice(index, 1);
              }
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
              //this.filterData(data, this.filter, collectionNode);
            }
            //console.log(filterType);
            //console.log(filterStateArr);
            //localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
          };
          filterCounter++;
        });
      }

      if (filterType === "color") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Цвет");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filterProps.color.forEach((item) => {
          const filter__value = new Control(filter.node, "li", style["filter__value"]);
          const filter__valueCheckbox = new Control(
            filter__value.node,
            "input",
            style["filter-value-checkbox"]
          );
          const filter__valueLabel = new Control(
            filter__value.node,
            "label",
            style["filter-value-label"],
            item
          );
          if (item === "Белый") {
            filter__valueLabel.node.classList.add("color--white");
          }
          if (item === "Черный") {
            filter__valueLabel.node.classList.add("color--black");
          }
          if (item === "Зеленый") {
            filter__valueLabel.node.classList.add("color--green");
          }
          if (item === "Розовый") {
            filter__valueLabel.node.classList.add("color--pink");
          }
          filterStateArr.push(false);
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__valueLabel.node.setAttribute("prop-id", filterCounter.toString());
          const attr: string | null = filter__valueLabel.node.getAttribute("for");
          if (Object.keys(this.filterKeysLS).length > 0) {
            this.filterKeysLS.color.forEach((item) => {
              console.log(item);
              if (item === attr) {
                if (filter__valueCheckbox.node !== null) {
                  filter__valueCheckbox.node.setAttribute("checked", "checked");
                }
              }
            });
          }
          filter__valueCheckbox.node.onclick = (e) => {
            //console.log(`filter clicked: ${item}`);
            const checkbox = e.target as HTMLInputElement;
            //const filterId = Number(filter__valueLabel.node.getAttribute("prop-id"));
            if (checkbox.checked) {
              //filterStateArr[filterId] = checkbox.checked;
              //localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
              //new filterState(data, collectionNode, filterType, item, filter__valueLabel.node);
              this.filter.color.push(item);
              console.log(this.filter);
              //this.filterData(data, this.filter, collectionNode);
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
            } else {
              const index = this.filter.color.indexOf(item);
              if (index > -1) {
                this.filter.color.splice(index, 1);
              }
              //this.filterData(data, this.filter, collectionNode);
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
            }
            //console.log(filterStateArr);
            //localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
          };
          filterCounter++;
        });
      }

      if (filterType === "memory") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Память");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filterProps.memory.forEach((item) => {
          const filter__value = new Control(filter.node, "li", style["filter__value"]);
          const filter__valueCheckbox = new Control(
            filter__value.node,
            "input",
            style["filter-value-checkbox"]
          );
          const filter__valueLabel = new Control(
            filter__value.node,
            "label",
            style["filter-value-label"],
            item
          );
          filterStateArr.push(false);
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__valueLabel.node.setAttribute("prop-id", filterCounter.toString());
          const attr: string | null = filter__valueLabel.node.getAttribute("for");
          if (Object.keys(this.filterKeysLS).length > 0) {
            this.filterKeysLS.memory.forEach((item) => {
              console.log(item);
              if (item === attr) {
                if (filter__valueCheckbox.node !== null) {
                  filter__valueCheckbox.node.setAttribute("checked", "checked");
                }
              }
            });
          }
          filter__valueCheckbox.node.onclick = (e) => {
            //console.log(`filter clicked: ${item}`);
            const checkbox = e.target as HTMLInputElement;
            const filterId = Number(filter__valueLabel.node.getAttribute("prop-id"));
            const brandValue = filterType + item;
            if (checkbox.checked) {
              filterStateArr[filterId] = checkbox.checked;
              localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
              //console.log(filter__valueLabel);
              //new filterState(data, collectionNode, filterType, item, filter__valueLabel.node);
              //this.filter.brand.push(item);
              //this.state.brand[item] = true;
              //this.filteredCollected(this.state);
              this.filter.memory.push(item);
              console.log(this.filter);
              //this.filterData(data, this.filter, collectionNode);
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
            } else {
              //this.state.brand[item] = false
              const index = this.filter.memory.indexOf(item);
              if (index > -1) {
                this.filter.memory.splice(index, 1);
              }
              //this.filterData(data, this.filter, collectionNode);
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
            }
            //console.log(filterType);
            //console.log(filterStateArr);
            //localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
          };
          filterCounter++;
        });
      }

      if (filterType === "cameras") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Количество камер");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filterProps.cameras.forEach((item) => {
          const filter__value = new Control(filter.node, "li", style["filter__value"]);
          const filter__valueCheckbox = new Control(
            filter__value.node,
            "input",
            style["filter-value-checkbox"]
          );
          const filter__valueLabel = new Control(
            filter__value.node,
            "label",
            style["filter-value-label"],
            item
          );
          filterStateArr.push(false);
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__valueLabel.node.setAttribute("prop-id", filterCounter.toString());
          const attr: string | null = filter__valueLabel.node.getAttribute("for");
          if (Object.keys(this.filterKeysLS).length > 0) {
            this.filterKeysLS.cameras.forEach((item) => {
              console.log(item);
              if (item === attr) {
                if (filter__valueCheckbox.node !== null) {
                  filter__valueCheckbox.node.setAttribute("checked", "checked");
                }
              }
            });
          }
          filter__valueCheckbox.node.onclick = (e) => {
            //console.log(`filter clicked: ${item}`);
            const checkbox = e.target as HTMLInputElement;
            const filterId = Number(filter__valueLabel.node.getAttribute("prop-id"));
            const brandValue = filterType + item;
            if (checkbox.checked) {
              filterStateArr[filterId] = checkbox.checked;
              localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
              //console.log(filter__valueLabel);
              //new filterState(data, collectionNode, filterType, item, filter__valueLabel.node);
              //this.filter.brand.push(item);
              //this.state.brand[item] = true;
              //this.filteredCollected(this.state);
              this.filter.cameras.push(item);
              console.log(this.filter);
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
              //this.filterData(data, this.filter, collectionNode);
            } else {
              //this.state.brand[item] = false
              const index = this.filter.cameras.indexOf(item);
              if (index > -1) {
                this.filter.cameras.splice(index, 1);
              }
              //this.filterData(data, this.filter, collectionNode);
              localStorage.setItem("checkboxes", JSON.stringify(this.filter));
              new filterState(
                data,
                collectionNode,
                this.filter,
                filter__valueLabel.node,
                this.priceRange,
                this.diagonalRange
              );
            }
            //console.log(filterType);
            //console.log(filterStateArr);
            //localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
          };
          filterCounter++;
        });
      }

      if (filterType === "available") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Наличие");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filterProps.available.forEach((item) => {
          if (item === "true") {
            const filter__value = new Control(filter.node, "li", style["filter__value"]);
            const filter__valueCheckbox = new Control(
              filter__value.node,
              "input",
              style["filter-value-checkbox"]
            );
            const filter__valueLabel = new Control(
              filter__value.node,
              "label",
              style["filter-value-label"],
              item
            );
            filterStateArr.push(false);
            filter__valueCheckbox.node.setAttribute("type", "checkbox");
            filter__valueCheckbox.node.setAttribute("id", item);
            filter__valueLabel.node.setAttribute("for", item);
            filter__valueLabel.node.setAttribute("prop-id", filterCounter.toString());

            filter__valueLabel.node.textContent = "В наличии";
            const attr: string | null = filter__valueLabel.node.getAttribute("for");
            if (Object.keys(this.filterKeysLS).length > 0) {
              this.filterKeysLS.available.forEach((item) => {
                console.log(item);
                if (item === attr) {
                  if (filter__valueCheckbox.node !== null) {
                    filter__valueCheckbox.node.setAttribute("checked", "checked");
                  }
                }
              });
            }
            filter__valueCheckbox.node.onclick = (e) => {
              //console.log(`filter clicked: ${item}`);
              const checkbox = e.target as HTMLInputElement;
              const filterId = Number(filter__valueLabel.node.getAttribute("prop-id"));
              const brandValue = filterType + item;
              if (checkbox.checked) {
                filterStateArr[filterId] = checkbox.checked;
                localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
                //console.log(filter__valueLabel);
                //new filterState(data, collectionNode, filterType, item, filter__valueLabel.node);
                //this.filter.brand.push(item);
                //this.state.brand[item] = true;
                //this.filteredCollected(this.state);
                this.filter.available.push(item);
                console.log(this.filter);
                //this.filterData(data, this.filter, collectionNode);
                localStorage.setItem("checkboxes", JSON.stringify(this.filter));
                new filterState(
                  data,
                  collectionNode,
                  this.filter,
                  filter__valueLabel.node,
                  this.priceRange,
                  this.diagonalRange
                );
              } else {
                //this.state.brand[item] = false
                const index = this.filter.available.indexOf(item);
                if (index > -1) {
                  this.filter.available.splice(index, 1);
                }
                //this.filterData(data, this.filter, collectionNode);
                localStorage.setItem("checkboxes", JSON.stringify(this.filter));
                new filterState(
                  data,
                  collectionNode,
                  this.filter,
                  filter__valueLabel.node,
                  this.priceRange,
                  this.diagonalRange
                );
              }
              //console.log(filterType);
              //console.log(filterStateArr);
              //localStorage.setItem("checkboxes", JSON.stringify(filterStateArr));
            };
            filterCounter++;
          }
        });
      }
    });
  }

  renderResetBtn(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    const resetBtnWrapper = new Control(this.parentNode, "div", style["filter__reset-wrapper"], "");
    const filterReset = new Control(
      resetBtnWrapper.node,
      "button",
      `${style["filter__btn"]} ${style["reset-filters"]}`,
      "Сброс фильтров"
    );

    const settingsReset = new Control(
      resetBtnWrapper.node,
      "button",
      `${style["filter__btn"]} ${style["reset-settings"]}`,
      "Сброс настроек"
    );

    filterReset.node.onclick = () => {
      this.resetFilters(collectionNode, data);
    };

    settingsReset.node.onclick = () => {
      this.resetSettings(collectionNode, data);
    };
  }

  resetFilters(collectionNode: Control<HTMLElement>, data: Array<IProductData>) {
    localStorage.removeItem("checkboxes");
    localStorage.removeItem("priceRange");
    localStorage.removeItem("diagonalRange");

    console.log("Reset click");

    collectionNode.node.textContent = "";
    this.parentNode.textContent = "";
    this.filter = this.filterDefault;

    console.log(this.filter, this.filterDefault);

    new productCardView(collectionNode.node, data);
    new filterView(collectionNode, this.parentNode, data, this.sortNode!);
    //this.renderResetBtn(data, collectionNode);
    //new filterState(data, collectionNode, this.filter, undefined, this.priceRange, this.diagonalRange);
  }

  resetSettings(collectionNode: Control<HTMLElement>, data: Array<IProductData>) {
    localStorage.clear();
    collectionNode.node.textContent = "";
    this.parentNode.textContent = "";
    this.filter = this.filterDefault;

    console.log(this.filter, this.filterDefault);

    new productCardView(collectionNode.node, data);
    new filterView(collectionNode, this.parentNode, data, this.sortNode!);
    //const sortNode: HTMLElement = document.querySelector(".sort-wrapper")!;
    console.log(this.parentNode);
    this.sortNode!.textContent = "";
    new sortView(collectionNode, this.sortNode!, data, "default");
    //this.resetFilters(collectionNode, data);
  }
}
