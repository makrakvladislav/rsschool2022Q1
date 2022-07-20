import Control from "../common/control";
import { IProductData } from "./productsDataModel";
import { filterState } from "./filterState";

import style from "./search.css";

export class Search {
  data: Array<IProductData>;
  parentNode: Control<HTMLElement>;
  collectionNode: Control<HTMLElement>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static renderSearch: any;
  //headerContainer: Control<HTMLElement>;

  constructor(
    data: Array<IProductData>,
    parentNode: Control<HTMLElement>,
    collectionNode: Control<HTMLElement>
  ) {
    this.parentNode = parentNode;
    this.data = data;
    this.collectionNode = collectionNode;
    this.renderSearch();
  }

  renderSearch() {
    //this.parentNode.node.appendChild(this.parentNode.node);
    const searchForm = document.createElement("div");
    const searchInput = document.createElement("input");
    const searchBtn = document.createElement("button");
    const clearBtn = new Control(searchForm, "button", style["search-clear"]);
    clearBtn.node.innerHTML = `<svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg>`;

    searchForm.classList.add("search__form");
    searchInput.classList.add("search__input");
    searchInput.placeholder = "Поиск...";
    searchInput.setAttribute("autocomplete", "off");
    searchInput.autofocus = true;
    searchBtn.classList.add("search__bttn");
    this.parentNode.node.appendChild(searchForm);
    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchBtn);
    const searchQueryLS = localStorage.getItem("searchQuery");

    if (searchQueryLS !== null) {
      const filterKeysLS = JSON.parse(localStorage.getItem("checkboxes") || "{}");
      const priceRangeLS = JSON.parse(localStorage.getItem("priceRange") || "{}");
      const diagonalRangeLS = JSON.parse(localStorage.getItem("diagonalRange") || "{}");
      searchInput.value = searchQueryLS;
      searchForm.classList.add("clear");
      new filterState(
        this.data,
        this.collectionNode,
        filterKeysLS,
        undefined,
        priceRangeLS,
        diagonalRangeLS,
        searchQueryLS!
      );
    }

    searchInput.addEventListener("input", () => {
      const searchQuery = searchInput.value;
      const filterKeysLS = JSON.parse(localStorage.getItem("checkboxes") || "{}");
      const priceRangeLS = JSON.parse(localStorage.getItem("priceRange") || "{}");
      const diagonalRangeLS = JSON.parse(localStorage.getItem("diagonalRange") || "{}");
      localStorage.setItem("searchQuery", searchQuery);
      new filterState(
        this.data,
        this.collectionNode,
        filterKeysLS,
        undefined,
        priceRangeLS,
        diagonalRangeLS,
        searchQuery
      );
      searchInput.value ? searchForm.classList.add("clear") : searchForm.classList.remove("clear");
    });

    clearBtn.node.onclick = (e) => {
      this.searchClear(e, searchInput, searchForm);
    };
  }

  searchClear(e: MouseEvent, input: HTMLInputElement, form: HTMLElement) {
    const searchQueryLS = localStorage.getItem("searchQuery");
    e.preventDefault;
    input.value = "";
    form.classList.remove("clear");
    localStorage.removeItem("searchQuery");
    const filterKeysLS = JSON.parse(localStorage.getItem("checkboxes") || "{}");
    const priceRangeLS = JSON.parse(localStorage.getItem("priceRange") || "{}");
    const diagonalRangeLS = JSON.parse(localStorage.getItem("diagonalRange") || "{}");

    new filterState(
      this.data,
      this.collectionNode,
      filterKeysLS,
      undefined,
      priceRangeLS,
      diagonalRangeLS,
      searchQueryLS!
    );
  }
}
