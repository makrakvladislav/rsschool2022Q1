import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (<HTMLDivElement>document.querySelector('.sources')).addEventListener('click', (e): void =>
            this.controller.getNews(e, (data): void => this.view.drawNews(data))
        );
        (<HTMLDivElement>document.querySelector('.header__language-switcher')).addEventListener('click', (e): void =>
            this.controller.switchSourcesLang(e, (data) => this.view.drawSources(data))
        );
        (<HTMLDivElement>document.querySelector('.search__form')).addEventListener('submit', (e) => {
            e.preventDefault();
            this.controller.getNewsSearch(e, (data): void => this.view.drawNews(data));
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
