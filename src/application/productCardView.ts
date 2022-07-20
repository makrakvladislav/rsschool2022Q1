import Control from "../common/control";
import { IProductData } from "./productsDataModel";
import { Cart } from "./cart";
import style from "./productCardView.css";
const cart = new Cart();
export class productCardView {
  parentNode: HTMLElement;
  constructor(parentNode: HTMLElement, productsData: Array<IProductData>) {
    this.parentNode = parentNode;
    //super(parentNode, "div", style["collection"]);
    //const data = [...productsData];
    //const sortedArr = data.sort((a, b) => a.title.localeCompare(b.title));
    //const sortedArr1 = data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    //console.log("sorted array:", sortedArr);
    //console.log("sorted arr by price:", sortedArr1);
    //console.log(productsData);
    productsData.map((item, i) => {
      return new createCard(this.parentNode, item, i);
    });
    //console.log(parentNode);
    //this.createCard();
  }

  /*
  createCard() {
    this.productsData.map((item) => {
      const pictureUrl = `./public/img/${item.img}.jpeg`;
      const cardTemplate = `
        <img class="product__img" src="${pictureUrl}">
        <div class="product__title">${item.title}</div>
        <div class="product__description">${item.short_description}</div>
        <div class="product__buy-wrapper">
          <div class="product__price">${item.price}&nbsp;p.</div>
          <button class="bttn bttn-buy">В корзину</div>
        </div>
      `;
      const productCard = new Control(this.node, "div", style["product__card"], cardTemplate);

      const propertiesContainer = new Control(productCard.node, "div", style["product__properties-wrapper"]);
      const properties = new Control(propertiesContainer.node, "ul", style["product__properties"]);

      item.properties.forEach((item) => {
        const propKeys = Object.keys(item).toString();
        const propValues = Object.values(item).toString();
        if (propKeys === "color")
          new Control(properties.node, "li", style["list__item"], `Цвет: ${propValues}`);
        if (propKeys === "brand")
          new Control(properties.node, "li", style["list__item"], `Бренд: ${propValues}`);
        if (propKeys === "diagonal")
          new Control(properties.node, "li", style["list__item"], `Диагональ: ${propValues}`);
        if (propKeys === "memory")
          new Control(properties.node, "li", style["list__item"], `Память: ${propValues}`);
        if (propKeys === "cameras")
          new Control(properties.node, "li", style["list__item"], `Камеры: ${propValues}`);
        else if (
          propKeys !== "color" &&
          propKeys !== "brand" &&
          propKeys !== "diagonal" &&
          propKeys !== "memory" &&
          propKeys !== "cameras"
        )
          new Control(properties.node, "li", style["list__item"], `${propKeys}: ${propValues}`);
      });
    });
  }
  */
}

export class createCard extends Control {
  parentNode?: HTMLElement | undefined;
  productsData?: Array<IProductData>;

  constructor(parentNode: HTMLElement, productsData: IProductData, id: number) {
    super(parentNode, "div", style["product__card"]);
    const pictureUrl = `./public/img/${productsData.img}.jpeg`;

    /*
    const cardTemplate = `
      <img class="product__img" src="${pictureUrl}">
      <div class="product__title">${productsData.title}</div>
      <div class="product__description">${productsData.short_description}</div>
      <div class="product__buy-wrapper">
        <div class="product__price">${productsData.price}&nbsp;p.</div>
        <button class="bttn bttn-buy">В корзину</div>
      </div>
    `;
    */
    //const productCard = new Control(this.node, "div", style["product__card"], cardTemplate);
    /*
    const productImage = new Image();
    productImage.src = pictureUrl;
    productImage.classList.add("product__img");
    this.node.append(productImage);
    */
    new Control(this.node, "img", style["product__img"], "", pictureUrl);
    new Control(this.node, "div", style["product__title"], productsData.title);
    const propertiesContainer = new Control(this.node, "div", style["product__properties-wrapper"]);
    const properties = new Control(propertiesContainer.node, "ul", style["product__properties"]);
    new Control(this.node, "div", style["product__description"], productsData.short_description);
    const productBuyWrapper = new Control(this.node, "div", style["product__buy-wrapper"]);
    const cartItems = JSON.parse(localStorage.getItem("cartItem") || "{}");
    console.log(cartItems);

    //const bttnBuy = new Control(productBuyWrapper.node, "button", style["bttn-buy"], "В корзину");
    const bttnBuy: Control<HTMLElement> = new Control(
      productBuyWrapper.node,
      "button",
      style["bttn-buy"],
      "В корзину"
    );
    if (productsData.available === "false") {
      this.node.classList.add("not-available");
      bttnBuy.node.innerText = "Распродано";
      bttnBuy.node.setAttribute("disabled", "");
    } else {
      bttnBuy.node.innerText = "В корзину";
    }

    if (cartItems.length > 0) {
      const index = cartItems.indexOf(productsData.title);

      if (index > -1) {
        bttnBuy.node.innerText = "В корзине";
        this.node.classList.add("in-cart");
      } else {
        bttnBuy.node.innerText = "В корзинy";
        this.node.classList.remove("in-cart");
        if (productsData.available === "false") {
          bttnBuy.node.innerText = "Распродано";
        }
      }
    }
    //cart.showCart();
    bttnBuy.node.onclick = () => {
      cart.addItem(productsData.title, bttnBuy);
    };
    //this.node.classList.remove("in-cart");
    //bttnBuy.node.innerText = "В корзинy";

    /*
    bttnBuy.node.onclick = () => {
      cart.addItem(productsData.title);
      if (cartItems.indexOf(productsData.title) > -1) {
      
    };
    */

    new Control(productBuyWrapper.node, "span", style["product__price"], productsData.price + "&nbsp;₽");

    productsData.properties.forEach((item) => {
      const propKeys = Object.keys(item).toString();
      const propValues = Object.values(item).toString();

      if (propKeys === "color")
        new Control(properties.node, "li", style["list__item"], `Цвет: ${propValues}`);
      if (propKeys === "brand")
        new Control(properties.node, "li", style["list__item"], `Бренд: ${propValues}`);
      if (propKeys === "diagonal")
        new Control(properties.node, "li", style["list__item"], `Диагональ: ${propValues}`);
      if (propKeys === "memory")
        new Control(properties.node, "li", style["list__item"], `Память: ${propValues}`);
      if (propKeys === "cameras")
        new Control(properties.node, "li", style["list__item"], `Камеры: ${propValues}`);
      else if (
        propKeys !== "color" &&
        propKeys !== "brand" &&
        propKeys !== "diagonal" &&
        propKeys !== "memory" &&
        propKeys !== "cameras"
      )
        new Control(properties.node, "li", style["list__item"], `${propKeys}: ${propValues}`);
    });
  }
}
