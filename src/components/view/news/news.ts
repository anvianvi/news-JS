import { Article } from '../../../types';
import './news.css';

class News {
    draw(data: Article[]) {
        const newsArticles = data.slice(0, 10);
        const news = document.querySelector('.news');
        if (!news) return;
        const fragment = this.createFragment(newsArticles);
        news.innerHTML = '';
        news.appendChild(fragment);
    }

    private createFragment(newsArticles: Article[]) {
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        newsArticles.forEach((item, idx) => {
            const newsClone = this.createNewsItem(item, idx, newsItemTemp);
            fragment.append(newsClone);
        });
        return fragment;
    }

    private createNewsItem(item: Article, idx: number, newsItemTemp: HTMLTemplateElement) {
        const newsClone = newsItemTemp.content.cloneNode(true) as HTMLDivElement;
        this.updateNewsMeta(newsClone, item);
        this.updateNewsDescription(newsClone, item);
        this.updateNewsReadMore(newsClone, item);
        this.updateNewsAltClass(newsClone, idx);
        return newsClone;
    }

    private updateNewsAltClass(newsClone: HTMLDivElement, idx: number) {
        const newsItem = newsClone.querySelector('.news__item');
        if (newsItem && idx % 2) {
            newsItem.classList.add('alt');
        }
    }

    private updateNewsMeta(newsClone: HTMLDivElement, item: Article) {
        const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
        newsMetaPhoto.style.backgroundImage = `url({item.urlToImage || 'img/news_placeholder.jpg'})`;
        this.updateNewsMetaAuthor(newsClone, item);
        this.updateNewsMetaDate(newsClone, item);
    }

    private updateNewsMetaAuthor(newsClone: HTMLDivElement, item: Article) {
        const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
        if (newsMetaAuthor) {
            newsMetaAuthor.textContent = item.author || item.source.name;
        }
    }

    private updateNewsMetaDate(newsClone: HTMLDivElement, item: Article) {
        const newsMetaDate = newsClone.querySelector('.news__meta-date');
        if (newsMetaDate) {
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
        }
    }
    private updateNewsDescription(newsClone: HTMLDivElement, item: Article) {
        const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
        if (newsDescriptionTitle) {
            newsDescriptionTitle.textContent = item.title;
        }
        const newsDescriptionSource = newsClone.querySelector('.news__description-source');
        if (newsDescriptionSource) {
            newsDescriptionSource.textContent = item.source.name;
        }
        const newsDescription = newsClone.querySelector('.news__description-content');
        if (newsDescription) {
            newsDescription.textContent = item.description;
        }
    }

    private updateNewsReadMore(newsClone: HTMLDivElement, item: Article) {
        const newsReadMore = newsClone.querySelector('.news__read-more a');
        if (newsReadMore) {
            newsReadMore.setAttribute('href', item.url);
        }
    }
}
export default News;
