import Control from "../common/control";
import style from "./modal.css";

export class Modal {
  // parentNode: Node;
  constructor(parentNode?: HTMLElement) {
    console.log(parentNode);
    this.show(parentNode!);
  }

  show(parentNode: HTMLElement) {
    const modalOverlay = new Control(parentNode, "div", style["modal-overlay"]);
    const modalWindow = new Control(modalOverlay.node, "div", style["modal"]);
    const modalClose = new Control(modalWindow.node, "button", style["modal-close"]);
    modalClose.node.innerHTML = `<svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg>`;
    const modalText = new Control(
      modalWindow.node,
      "p",
      style["modal-text"],
      "Извините, в корзину можно добавить не более 20 товаров."
    );

    console.log("show modal");
    modalClose.node.onclick = () => {
      this.close(modalOverlay);
    };
  }

  close(modalOverlay: Control<HTMLElement>) {
    modalOverlay.destroy();
    console.log("modal close");
  }
}
