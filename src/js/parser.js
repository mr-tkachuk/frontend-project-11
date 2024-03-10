import i18n from './i18n';
import { uniqueId } from 'lodash';

export const getItems = (content) => {
  const items = content.querySelectorAll('item');
  const rssLink = [];
  items.forEach((item) => {
    const postTitle = item.querySelector('title').textContent;
    const postDescription = item.querySelector('description').textContent;
    const postLink = item.querySelector('link').textContent;
    const id = uniqueId();
    rssLink.push({
      postTitle, postDescription, postLink, id,
    });
  });
  return rssLink;
};

const parser = new DOMParser();

export default (url, response, watchedState) => {
  if (response.data?.status?.http_code === 525) {
    watchedState.error = i18n.t('invalidRss');
    return;
  }
  if (response.data?.status?.http_code === 200) {
    const content = parser.parseFromString(response.data.contents, 'application/xml');
    watchedState.items.push(url);
    const feedTitle = content.querySelector('title').textContent;
    const feedDescription = content.querySelector('description').textContent;
    watchedState.feeds.unshift({ feedTitle, feedDescription, url });
    watchedState.posts.unshift(...getItems(content));
  }
};
