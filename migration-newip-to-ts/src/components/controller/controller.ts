import AppLoader from './appLoader';
import { APIEndpoints } from '../../types/index';
import { IEverything, ISourcesData, Callback } from '../../types/index';
class AppController extends AppLoader {
    getSources(callback: Callback<ISourcesData>) {
        super.getResp(
            {
                endpoint: APIEndpoints.sources,
            },
            callback
        );
    }

    switchSourcesLang(e: MouseEvent, callback: Callback<ISourcesData>) {
        const target = <HTMLDivElement>e.target;
        const language: string = target.getAttribute('data-language') as string;
        super.getResp(
            {
                endpoint: APIEndpoints.sources,
                options: {
                    language: language,
                },
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: Callback<IEverything>): void {
        let target = <HTMLDivElement>e.target;
        const newsContainer = <HTMLDivElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id') as string;
                target.classList.add('active');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    const buttonsList = newsContainer.querySelectorAll('.source__item');
                    buttonsList.forEach((btn) => {
                        btn.addEventListener('click', (e) => {
                            const target = e.currentTarget as Element;
                            buttonsList.forEach((f) => f.classList.remove('active'));
                            target.classList.toggle('active');
                        });
                    });
                    super.getResp(
                        {
                            endpoint: APIEndpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLDivElement>target.parentNode;
        }
    }

    getNewsSearch(e: SubmitEvent, callback: Callback<IEverything>): void {
        const target = <HTMLDivElement>e.target;
        const targetInput = <HTMLInputElement>target.querySelector('.search__input');
        if (targetInput.value.length > 0) {
            super.getResp(
                {
                    endpoint: APIEndpoints.everything,
                    options: {
                        q: targetInput.value,
                    },
                },
                callback
            );
        }
    }
}

export default AppController;
