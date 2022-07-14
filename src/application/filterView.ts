import Control from "../common/control";
import { productsDataModel, IProductData } from "./productsDataModel";
import * as noUiSlider from "nouislider";
import { filterState } from "./filterState";

import "nouislider/dist/nouislider.css";
import style from "./filterView.css";

interface Filter {
  price: string[];
  brand: string[];
  color: string[];
  memory: string[];
  diagonal: string[];
  cameras: string[];
  available: boolean[];
}

export class filterView {
  public filter: Filter = {
    price: [],
    brand: [],
    color: [],
    memory: [],
    diagonal: [],
    cameras: [],
    available: [],
  };
  parentNode: HTMLElement;
  collectionNode!: Control<HTMLElement>;

  constructor(
    collectionNode: Control<HTMLElement>,
    parentNode: HTMLElement,
    productsData: Array<IProductData>
  ) {
    this.parentNode = parentNode;
    this.getFilterProps(productsData);
    this.renderFilter(productsData, collectionNode);
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
    const productData = [...data];
    productData.forEach((item) => {
      item.properties.map((prop) => {
        if (item.price) {
          if (this.filter.price.indexOf(item.price) == -1) {
            this.filter.price.push(item.price);
          }
        }
        if (prop.brand) {
          if (this.filter.brand.indexOf(prop.brand) == -1) {
            this.filter.brand.push(prop.brand);
          }
        }
        if (prop.color) {
          if (this.filter.color.indexOf(prop.color) == -1) {
            this.filter.color.push(prop.color);
          }
        }
        if (prop.memory) {
          if (this.filter.memory.indexOf(prop.memory) == -1) {
            this.filter.memory.push(prop.memory);
          }
        }
        if (prop.diagonal) {
          if (this.filter.diagonal.indexOf(prop.diagonal) == -1) {
            this.filter.diagonal.push(prop.diagonal);
          }
        }
        if (prop.cameras) {
          if (this.filter.cameras.indexOf(prop.cameras) == -1) {
            this.filter.cameras.push(prop.cameras);
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
    console.log(this.filter);
  }

  renderFilter(data: Array<IProductData>, collectionNode: Control<HTMLElement>) {
    console.log("Filter rendered");
    console.log(this.parentNode);

    Object.keys(this.filter).forEach((el) => {
      const filterWrapper = new Control(this.parentNode, "div", style["filter__item"]);
      const filterType = el;

      if (filterType === "price") {
        filterWrapper.node.classList.add("price");
        new Control(filterWrapper.node, "h3", `${style["filter__title"]} ${style["price"]}`, "Цена");
        const filter = new Control(filterWrapper.node, "div", style["filter__values"]);
        const sliderPrice = new Control(filter.node, "div", style["range__filter"]);
        sliderPrice.node as noUiSlider.target;

        const priceArr = this.filter.price.map((number) => {
          return parseInt(number, 10);
        });

        const minPrice = Math.min(...priceArr);
        const maxPrice = Math.max(...priceArr);
        console.log(minPrice, maxPrice);
        noUiSlider.create(sliderPrice.node, {
          start: [minPrice, maxPrice],
          connect: true,
          tooltips: true,
          range: {
            min: minPrice,
            max: maxPrice,
          },
          format: {
            to: function (value) {
              return value.toFixed(0) + ".0 ₽";
            },
            from: function (value) {
              return Number(value);
            },
          },
        });
        (sliderPrice.node as noUiSlider.target).noUiSlider?.on("update", (value, handle) => {
          //console.log(value[handle]);
          console.log(value);
        });
      }
      if (filterType === "diagonal") {
        new Control(filterWrapper.node, "h3", `${style["filter__title"]} ${style["diagonal"]}`, "Диагональ");
        const filter = new Control(filterWrapper.node, "div", style["filter__values"]);
        const sliderDiagonal = new Control(filter.node, "div", style["diagonal__filter"]);
        sliderDiagonal.node as noUiSlider.target;

        const diagonalArr = this.filter.diagonal.map((number) => {
          return parseFloat(number);
        });

        const minDiagonal = Math.min(...diagonalArr);
        const maxDiagonal = Math.max(...diagonalArr);
        console.log(minDiagonal, maxDiagonal);
        noUiSlider.create(sliderDiagonal.node, {
          start: [minDiagonal, maxDiagonal],
          connect: true,
          tooltips: true,
          range: {
            min: minDiagonal,
            max: maxDiagonal,
          },
        });
        (sliderDiagonal.node as noUiSlider.target).noUiSlider?.on("update", (value, handle) => {
          //console.log(value[handle]);
          console.log(value);
        });
      }
      if (filterType === "brand") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Производитель");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filter.brand.forEach((item) => {
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
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__value.node.onclick = () => {
            console.log(`filter clicked: ${item}`);
            filterState.filterClickListener(item);
            new productsDataModel(data, collectionNode, item);
          };
        });
      }
      if (filterType === "color") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Цвет");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filter.color.forEach((item) => {
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
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__value.node.onclick = () => {
            console.log(`filter clicked: ${item}`);
            new productsDataModel(data, collectionNode, item);
          };
        });
      }
      if (filterType === "memory") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Память");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filter.memory.forEach((item) => {
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
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__value.node.onclick = () => {
            console.log(`filter clicked: ${item}`);
            new productsDataModel(data, collectionNode, item);
          };
        });
      }
      if (filterType === "cameras") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Количество камер");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
        this.filter.cameras.forEach((item) => {
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
          filter__valueCheckbox.node.setAttribute("type", "checkbox");
          filter__valueCheckbox.node.setAttribute("id", item);
          filter__valueLabel.node.setAttribute("for", item);
          filter__value.node.onclick = () => {
            console.log(`filter clicked: ${item}`);
            new productsDataModel(data, collectionNode, item);
          };
        });
      }
      if (filterType === "available") {
        new Control(filterWrapper.node, "h3", style["filter__title"], "Только в наличии");
        const filter = new Control(filterWrapper.node, "ul", style["filter__values"]);
      }
    });
  }
}
