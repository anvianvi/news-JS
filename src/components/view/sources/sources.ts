import { Source } from '../../../types';
import './sources.css';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            if (sourceItemTemp !== null) {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                const sourceItemName = sourceClone.querySelector('.source__item-name');
                const sourceItem = sourceClone.querySelector('.source__item');

                if (sourceItemName) {
                    sourceItemName.textContent = item.name;
                }
                if (sourceItem) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }
                fragment.append(sourceClone);
            }
        });
        const sources = document.querySelector('.sources');
        if (sources) {
            sources.append(fragment);
        }
    }
}

export default Sources;
