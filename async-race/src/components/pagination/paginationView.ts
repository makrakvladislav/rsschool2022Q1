import Control from '../../common/control';
import { ICarsData, CarsDataModel } from '../carsDataModel';
import { GarageView } from '../garage/garageView';
import style from './pagination.css';

export class PaginationView {
  static paginationWrapper: Control<HTMLElement>;

  pagination: Control<HTMLElement>;

  constructor(count: string, parentNode: HTMLElement) {
    PaginationView.paginationWrapper = new Control(parentNode, 'div', style.pagination__wrapper);
    this.pagination = PaginationView.paginationWrapper;
    this.render(count, parentNode);
  }

  static update(count: string, parentNode: HTMLElement) {
    PaginationView.paginationWrapper.destroy();
    console.log(this.paginationWrapper);
    return new PaginationView(count, parentNode);
  }

  render(carsCount: string, parentNode: HTMLElement) {
    console.log('pagination create', parentNode);
    const pagesCount = Math.ceil(+carsCount / 7);
    console.log(pagesCount);
    for (let i = 0; i < pagesCount; i += 1) {
      const pageControl = new Control(this.pagination.node, 'button', style.page__item, `${i + 1}`);
      const pageId = i + 1;

      pageControl.node.onclick = () => {
        localStorage.setItem('currentPage', pageId.toString());
        this.changePage(pageId);
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

      console.log(result.data);
    });
  }
}

export default PaginationView;
