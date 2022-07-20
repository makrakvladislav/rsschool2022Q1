import Control from "../common/control";
import { Modal } from "./modal";
import style from "./cart.css";

export class Cart {
  cartItems: string[];
  parentNode?: HTMLElement;

  constructor(parentNode?: HTMLElement) {
    this.cartItems = [];
    this.addItem.bind(this);
    this.removeItem.bind(this);
    this.showCart.bind(this);
    this.renderCart(parentNode!);
    const cartItemsLS = JSON.parse(localStorage.getItem("cartItem") || "{}");
    if (cartItemsLS.length > 0) {
      this.cartItems = cartItemsLS;
    }
  }

  renderCart(parentNode: HTMLElement) {
    const cart = new Control(parentNode, "div", style["cart"]);
    const cartCounter = new Control(cart.node, "span", style["cart__counter"], "0");
    cartCounter.node.innerHTML = this.cartItems.length.toString();
  }

  addItem(cartItem: string, btntNode: Control<HTMLElement>) {
    localStorage.setItem("cartItem", JSON.stringify(this.cartItems));

    if (this.cartItems.indexOf(cartItem) == -1) {
      if (this.cartItems.length >= 20) {
        this.showCart(this.parentNode);
        const app: HTMLElement | null = document.querySelector(".app");
        new Modal(app!);
        return;
      }
      const result = this.cartItems.push(cartItem);
      localStorage.setItem("cartItem", JSON.stringify(this.cartItems));
      btntNode.node.textContent = "В корзине";
      btntNode.node.parentElement?.parentElement?.classList.add("in-cart");
      this.showCart(this.parentNode);
      return result;
    } else {
      btntNode.node.textContent = "В корзину";
      btntNode.node.parentElement?.parentElement?.classList.remove("in-cart");
      this.removeItem(cartItem);
      this.showCart(this.parentNode);
    }
  }

  removeItem(cartItem: string) {
    const index = this.cartItems.indexOf(cartItem);
    const result = this.cartItems.splice(index, 1);
    localStorage.setItem("cartItem", JSON.stringify(this.cartItems));
  }

  showCart(parentNode?: HTMLElement) {
    const itemsCount = this.cartItems.length.toString();
    const counter: HTMLElement | null = document.querySelector(".cart__counter");
    counter!.innerHTML = itemsCount;

    return this.cartItems.length.toString();
  }
}
