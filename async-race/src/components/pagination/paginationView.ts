/* eslint-disable import/no-cycle */
import Control from '../../common/control';
import { ICarsData, CarsDataModel } from '../carsDataModel';
import { GarageView } from '../garage/garageView';
import { Race } from '../raceControl';
import { WinnersView } from '../winners/winnersView';
import style from './pagination.css';

export class PaginationView {
  static paginationWrapper: Control<HTMLElement>;

  pagination: Control<HTMLElement>;

  constructor(count: string, paginationType: string, parentNode: HTMLElement) {
    PaginationView.paginationWrapper = new Control(parentNode, 'div', style.pagination__wrapper);
    this.pagination = PaginationView.paginationWrapper;
    this.render(count, paginationType, parentNode);
  }

  static update(count: string, paginationType: string, parentNode: HTMLElement) {
    PaginationView.paginationWrapper.destroy();
    console.log(this.paginationWrapper);
    return new PaginationView(count, paginationType, parentNode);
  }

  render(carsCount: string, paginationType: string, parentNode: HTMLElement) {
    console.log('pagination create', parentNode);
    let pagesCount = 0;
    if (paginationType === 'garage') {
      pagesCount = Math.ceil(+carsCount / 7);
    } else {
      pagesCount = Math.ceil(+carsCount / 10);
    }
    console.log(pagesCount);
    for (let i = 0; i < pagesCount; i += 1) {
      const pageControl = new Control(this.pagination.node, 'button', style.page__item, `${i + 1}`);
      const pageId = i + 1;

      pageControl.node.onclick = () => {
        if (paginationType !== 'winners') {
          localStorage.setItem('currentPage', pageId.toString());
          this.changePage(pageId);
        } else {
          console.log(pageId, 'click');
          this.changePageWinner(pageId);
          localStorage.setItem('currentPageWinners', pageId.toString());
        }
      };
    }
  }

  changePage(pageId: number) {
    console.log('click', pageId);
    const carsData = new CarsDataModel([], 'winners');
    carsData.build(pageId).then(async (result) => {
      const garageWrap: HTMLElement | null = document.querySelector('.garage');
      garageWrap!.innerHTML = '';
      const response = await result.items!.items;
      const itemsCount = await result.items!.itemsCount;
      const updateGarage = new GarageView(garageWrap!, response, itemsCount!);

      updateGarage.getCars(response);
      const raceReset = Race.raceReset();
      console.log(result.data);
    });
  }

  changePageWinner(pageId: number) {
    const winnerTable = new WinnersView('time', 'asc');
    // winnerTable.getWinnersData(pageId, 'time', 'asc');
  }
}

export default PaginationView;
