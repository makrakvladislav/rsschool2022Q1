import Control from '../../common/control';
import style from '../../assets/styles/style.css';

export class Header extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', style.header);
    const container = new Control(this.node, 'div', style.container);
    const logo = new Control(container.node, 'h1', style.header__logo, 'Async-race');
  }
}

export default Header;
