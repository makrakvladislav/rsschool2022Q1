import AppLoader from './appLoader';
import { APIEndpoints } from '../../types/index';
class AppController extends AppLoader {
    getSources(callback: <T>(data: T) => void) {
        super.getResp(
            {
                endpoint: APIEndpoints.sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: <T>(data: T) => void) {
        let target = e.target as HTMLDivElement;
        const newsContainer = e.currentTarget as HTMLDivElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
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
            target = target.parentNode as HTMLDivElement;
        }
    }
}

export default AppController;
