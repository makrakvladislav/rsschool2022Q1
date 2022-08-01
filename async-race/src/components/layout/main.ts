import Control from '../../common/control';
import style from '../../assets/styles/style.css';

export class Main extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'Main', style.main);
  }
}

export default Main;
