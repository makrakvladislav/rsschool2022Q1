import Control from "../common/control";
import { productsDataModel, IProductData } from "./productsDataModel";
import { productCardView } from "./productCardView";
import { filterView } from "./filterView";
import { sortView } from "./sortView";
import { Search } from "./search";
import { Cart } from "./cart";

import style from "./application.css";

export class Application extends Control {
  header: Control<HTMLElement>;
  headerContainer: Control<HTMLElement>;
  headerSearch: Control<HTMLElement>;
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
    this.headerContainer = new Control(this.header.node, "div", style["container"]);
    const logo = new Image(150);
    logo.src = "./public/img/logo.png";
    // LOGO
    const headerLogo = new Control(this.node, "div", style["header__logo"]);
    headerLogo.node.append(logo);
    this.headerContainer.node.appendChild(headerLogo.node);
    // SEARCH
    this.headerSearch = new Control(this.headerContainer.node, "div", style["header__search"]);
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
    // CART
    const headerCart = new Control(this.node, "div", style["header__cart"]);
    const headerContainer = this.headerContainer.node.appendChild(headerCart.node);
    this.model.build().then((result) => {
      const productData: Array<IProductData> = result.data;
      //this.renderProductCard(productData);
      this.renderSort(this.collection, productData, orderSort || "default");
      new Search(productData, this.headerSearch, this.collection);

      new Cart(headerContainer);
      const cart = new Cart();
      cart.showCart();
      //headerCart.node.appendChild(cart);

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
  }

  renderFilters(
    collectionNode: Control<HTMLElement>,
    sidebarNode: Control<HTMLElement>,
    data: Array<IProductData>
  ) {
    new filterView(collectionNode, this.sidebar.node, data, this.sorting.node, this.headerSearch);
  }

  renderSort(collectionNode: Control<HTMLElement>, data: Array<IProductData>, state: string) {
    new sortView(collectionNode, this.sorting.node, data, state);
  }
}
