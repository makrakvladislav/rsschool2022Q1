import Control from "../common/control";
import { productsDataModel, IProductData } from "./productsDataModel";
import { productCardView } from "./productCardView";
import { filterView } from "./filterView";
import { sortView } from "./sortView";

import style from "./application.css";

export class Application extends Control {
  header: Control<HTMLElement>;
  main: Control<HTMLElement>;
  sorting: Control<HTMLElement>;
  collectionWrapper: Control<HTMLElement>;
  collection: Control<HTMLElement>;
  sidebar: Control<HTMLElement>;
  footer: Control<HTMLElement>;
  model: productsDataModel;
  //static collection: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, "div", style["app"]);
    // HEADER
    this.header = new Control(this.node, "header", style["header"]);
    const headerContainer = new Control(this.header.node, "div", style["container"]);
    const logo = new Image(150);
    logo.src = "./public/img/logo.png";
    // LOGO
    const headerLogo = new Control(this.node, "div", style["header__logo"]);
    headerLogo.node.append(logo);
    headerContainer.node.appendChild(headerLogo.node);
    // SEARCH
    const headerSearch = new Control(this.node, "div", style["header__search"]);
    headerContainer.node.appendChild(headerSearch.node);
    const searchForm = document.createElement("form");
    const searchInput = document.createElement("input");
    const searchBtn = document.createElement("button");
    searchForm.classList.add("search__form");
    searchInput.classList.add("search__input");
    searchInput.placeholder = "Поиск...";
    searchBtn.classList.add("search__bttn");
    headerSearch.node.appendChild(searchForm);
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchBtn);
    // CART
    const headerCart = new Control(this.node, "div", style["header__cart"]);
    const cart = document.createElement("div");
    const cartCounter = document.createElement("span");
    cartCounter.classList.add("cart__counter");
    cartCounter.append("0");
    cart.appendChild(cartCounter);
    cart.classList.add("cart");
    headerCart.node.appendChild(cart);
    headerContainer.node.appendChild(headerCart.node);
    // MAIN
    const container = document.createElement("div");
    container.classList.add("container");
    this.node.appendChild(container);
    this.main = new Control(container, "main", style["main"]);
    this.sidebar = new Control(this.main.node, "sidebar", style["sidebar"]);
    //COLLECTION Wrapper
    this.collectionWrapper = new Control(this.main.node, "div", style["collection-wrapper"]);
    //SORTING
    this.sorting = new Control(this.collectionWrapper.node, "div", style["sort-wrapper"]);
    //COLLECTION
    this.collection = new Control(this.collectionWrapper.node, "div", style["collection"]);
    //FOOTER
    this.footer = new Control(this.node, "footer", style["footer"]);
    const footerContainer = new Control(this.footer.node, "div", style["container"]);
    const footerWrapper = new Control(footerContainer.node, "div", style["footer-wrapper"]);
    const footerItemGit = new Control(footerWrapper.node, "div", style["footer__item"]);
    const footerItemLogo = new Control(footerWrapper.node, "div", style["footer__item"]);
    //Create ginthub link
    const gitLink = document.createElement("a");
    gitLink.href = "https://github.com/makrakvladislav";
    gitLink.target = "_blank";
    gitLink.innerHTML = "©&nbsp;2022&nbsp;github";
    gitLink.classList.add("github-link");
    footerItemGit.node.append(gitLink);
    //Create RSschool logo
    const footerLogo = new Image();
    const footerLogoUrl = "./public/img/rs_school_js.svg";
    footerLogo.src = footerLogoUrl;
    const footerLogoLink = document.createElement("a");
    footerLogoLink.href = "https://rs.school/js/";
    footerLogoLink.target = "_blank";
    footerLogoLink.append(footerLogo);
    footerLogoLink.classList.add("footer__logo");
    footerItemLogo.node.append(footerLogoLink);

    const orderSort = localStorage.getItem("orderSort");
    const filterStateArr = JSON.parse(localStorage.getItem("checkboxes") || "{}");
    this.model = new productsDataModel([], this.collection, "");

    this.model.build().then((result) => {
      const productData: Array<IProductData> = result.data;
      //this.renderProductCard(productData);
      this.renderSort(this.collection, productData, orderSort || "default");
      /*
      if (orderSort === "priceDown") {
        this.model.sortPriceDown(productData, this.collection);
      }
      */

      this.renderFilters(this.collection, this.sidebar, productData);
      new productsDataModel(productData, this.collection, orderSort || "default");
    });
  }

  renderProductCard(data: Array<IProductData>) {
    new productCardView(this.collection.node, data);
    console.log("render");
  }

  renderFilters(
    collectionNode: Control<HTMLElement>,
    sidebarNode: Control<HTMLElement>,
    data: Array<IProductData>
  ) {
    new filterView(collectionNode, this.sidebar.node, data, this.sorting.node);
  }

  renderSort(collectionNode: Control<HTMLElement>, data: Array<IProductData>, state: string) {
    new sortView(collectionNode, this.sorting.node, data, state);
  }
}

/*

 const sortValue: string | null = localStorage.getItem("orderSort");
    console.log(sortValue);
    new sortView(collectionNode, this.sorting.node, data);

*/
