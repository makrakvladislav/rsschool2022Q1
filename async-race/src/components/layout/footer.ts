import Control from '../../common/control';
import style from '../../assets/styles/style.css';

export class Footer extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'Footer', style.footer);
  }
}

export default Footer;
