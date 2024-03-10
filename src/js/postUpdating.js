import axios from 'axios';
import { getItems } from './parser';
import i18n from './i18n';

const pars = new DOMParser();

export default function postsUpdating(state) {
  const oldLinks = state.posts.flat().map((post) => post.postLink);
  state.feeds.forEach((feed) => {
    axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(feed.url)}`)
      .then((response) => {
        if (response.status === 200) {
          const content = pars.parseFromString(response.data.contents, 'application/xml');
          const newItems = getItems(content).filter((item) => !oldLinks.includes(item.postLink));
          state.posts.unshift(newItems);
        }
      })
      .catch(() => {
        // eslint-disable-next-line no-param-reassign
        state.error = i18n.t('networkError');
      });
  });

  setTimeout(() => {
    postsUpdating(state);
  }, 5000);
}
