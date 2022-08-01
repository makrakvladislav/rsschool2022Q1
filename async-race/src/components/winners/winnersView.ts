import Control from '../../common/control';
import style from './winners.css';

export class WinnersView extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style.winners);
    this.node.innerText += 'Winners';
  }
}

export default WinnersView;
