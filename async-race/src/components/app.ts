import Control from '../common/control';
import { Header } from './layout/header';
import { Main } from './layout/main';
import { GarageView } from './garage/garageView';
import { WinnersView } from './winners/winnersView';
import { Footer } from './layout/footer';
import { CarsDataModel, ICarsData, ICars } from './carsDataModel';
import { PaginationView } from './pagination/paginationView';

import style from '../assets/styles/style.css';

export class App extends Control {
  model: CarsDataModel;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', style.app);
    const header = new Header(this.node);
    const container = new Control(this.node, 'div', style.container);
    const main = new Main(container.node);
    const navigation = new Control(main.node, 'nav', style.main__menu);
    const garageBtn = new Control(navigation.node, 'button', style.bttn, 'Garage');
    garageBtn.node.classList.add('is-active');
    const winnersBtn = new Control(navigation.node, 'button', style.bttn, 'Winners');
    const winnersView = new WinnersView('time', 'ASC', main.node);
    winnersView.node.classList.add('hide');
    const footer = new Footer(this.node);
    this.model = new CarsDataModel([], 'winners');
    this.model.build(1).then(async (result) => {
      // const carsData: Array<ICarsData> = result.data;
      const data: Array<ICarsData> = await result.items!.items;
      const itemsCount: string | null = await result.items!.itemsCount;
      console.log(data);
      const currentPage = localStorage.setItem('currentPage', '1');
      const garageView = new GarageView(main.node, data, itemsCount!);
      const paginationView = new PaginationView(itemsCount!, main.node);
      garageView.getCars(data);
      garageBtn.node.onclick = () => {
        garageBtn.node.classList.add('is-active');
        winnersBtn.node.classList.remove('is-active');
        garageView.node.classList.remove('hide');
        winnersView.node.classList.add('hide');
      };
      winnersBtn.node.onclick = () => {
        garageBtn.node.classList.remove('is-active');
        winnersBtn.node.classList.add('is-active');
        garageView.node.classList.add('hide');
        winnersView.node.classList.remove('hide');
      };
    });
  }
}

export default App;
/*
const garageBtn = new Control(navigation.node, 'button', style.bttn, 'Garage');
const winnersBtn = new Control(navigation.node, 'button', style.bttn, 'Winners');

garageBtn.node.onclick = () => {
  if (!garageBtn.node.classList.contains('is-active')) {
    garageBtn.node.classList.add('is-active');
    console.log('open');
  } else {
    garageBtn.node.classList.remove('is-active');
    console.log('close');
  }

  console.log('click garage');
};
winnersBtn.node.onclick = () => {
  console.log('click winners');
};
*/
