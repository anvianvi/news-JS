import { ArticlesResponse, SourcesResponse } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: SourcesResponse) => void) {
        super.getResp<SourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: ArticlesResponse) => void) {
        let target: Element = e.target as HTMLElement;
        const newsContainer: Element = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<ArticlesResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            if (target.parentElement) {
                target = target.parentElement;
            }
        }
    }
}

export default AppController;
