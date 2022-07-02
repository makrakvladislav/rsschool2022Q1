import './sources.css';
import { ISourcesData } from '../../../types/index';

class Sources {
    draw(data: ISourcesData) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = <HTMLTemplateElement>document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = <HTMLDivElement>sourceItemTemp.content.cloneNode(true);

            (<HTMLDivElement>sourceClone.querySelector('.source__item-name')).textContent = item.name;
            (<HTMLDivElement>sourceClone.querySelector('.source__item')).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (<HTMLDivElement>document.querySelector('.sources')).append(fragment);
    }
}

export default Sources;
