/* eslint-disable import/no-cycle */
import Control from '../../common/control';
import { ICarsData, CarsDataModel } from '../carsDataModel';
import { GarageView } from '../garage/garageView';
import { Race } from '../raceControl';
import { WinnersView } from '../winners/winnersView';
import style from './pagination.css';

export class PaginationView {
  static paginationWrapper: Control<HTMLElement>;

  // paginationWrapper: Control<HTMLElement>;

  // pagination: Control<HTMLElement>;

  constructor(count: string, paginationType: string, parentNode: HTMLElement) {
    PaginationView.paginationWrapper = new Control(parentNode, 'div', style.pagination__wrapper);
    this.render(count, paginationType, parentNode);
  }

  static update(count: string, paginationType: string, parentNode: HTMLElement) {
    const paginationWrapper = document.querySelector('.pagination__wrapper');
    paginationWrapper?.remove();
    return new PaginationView(count, paginationType, parentNode);
  }

  static winnersPaginationUpdate(count: string, paginationType: string, parentNode: HTMLElement) {
    const paginationWinnersWrapper: HTMLElement | null = document.querySelector('.winners');
    return new PaginationView(count, paginationType, paginationWinnersWrapper!);
  }

  render(carsCount: string, paginationType: string, parentNode: HTMLElement) {
    let pagesCount = 0;
    if (paginationType === 'garage') {
      pagesCount = Math.ceil(+carsCount / 7);
    } else {
      pagesCount = Math.ceil(+carsCount / 10);
    }
    for (let i = 0; i < pagesCount; i += 1) {
      const pageControl = new Control(
        PaginationView.paginationWrapper.node,
        'button',
        style.page__item,
        `${i + 1}`
      );
      const pageId = i + 1;

      pageControl.node.onclick = () => {
        if (paginationType !== 'winners') {
          localStorage.setItem('currentPage', pageId.toString());
          this.changePage(pageId);
        } else {
          localStorage.setItem('currentPageWinners', pageId.toString());
          this.changePageWinner(pageId);
        }
      };
    }
  }

  changePage(pageId: number) {
    const carsData = new CarsDataModel([], 'winners');
    carsData.build(pageId).then(async (result) => {
      const garageWrap: HTMLElement | null = document.querySelector('.garage');
      garageWrap!.innerHTML = '';
      const response = await result.items!.items;
      const itemsCount = await result.items!.itemsCount;
      const updateGarage = new GarageView(garageWrap!, response, itemsCount!);
      updateGarage.getCars(response);
      const raceReset = Race.raceReset();
    });
  }

  changePageWinner(pageId: number) {
    const winnerTable = new WinnersView('time', 'asc');
    // winnerTable.getWinnersData(pageId, 'time', 'asc');
  }
}

export default PaginationView;
