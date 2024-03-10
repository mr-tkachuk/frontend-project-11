import i18n from './i18n';
// eslint-disable-next-line import/no-cycle
import watchedState from './state';

const message = document.querySelector('.feedback');
const input = document.querySelector('input');
const errorsRender = (key) => {
  message.textContent = i18n.t(key);
  input.classList.add('is-invalid');
  message.classList.remove('text-success');
  message.classList.add('text-danger');
};
const successRender = () => {
  message.textContent = i18n.t('success');
  message.classList.remove('text-danger');
  message.classList.add('text-success');
  input.classList.remove('is-invalid');
  input.value = '';
};
const feedsRender = (value) => {
  const feeds = document.querySelector('.feeds');
  feeds.textContent = '';
  const feedsCard = document.createElement('div');
  feedsCard.classList.add('card', 'border-0');
  const feedsCardBody = document.createElement('div');
  feedsCardBody.classList.add('card-body');
  const feedsTitle = document.createElement('h2');
  feedsTitle.classList.add('card-title', 'h4');
  feedsTitle.textContent = 'Фиды';
  feedsCardBody.appendChild(feedsTitle);
  feedsCard.appendChild(feedsCardBody);
  feeds.appendChild(feedsCard);
  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'border-0', 'rounded-0');
  value.forEach((feed) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0', 'border-end-0');
    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feed.feedTitle;
    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.feedDescription;
    item.appendChild(title);
    item.appendChild(description);
    feedsList.appendChild(item);
  });
  feedsCard.appendChild(feedsList);
};
const postsRender = () => {
  const flatValue = watchedState.posts.flat();
  const posts = document.querySelector('.posts');
  posts.textContent = '';
  const postsCard = document.createElement('div');
  postsCard.classList.add('card', 'border-0');
  const postsCardBody = document.createElement('div');
  postsCardBody.classList.add('card-body');
  const postsTitle = document.createElement('h2');
  postsTitle.classList.add('card-title', 'h4');
  postsTitle.textContent = 'Посты';
  postsCardBody.appendChild(postsTitle);
  postsCard.appendChild(postsCardBody);
  posts.appendChild(postsCard);
  const postsList = document.createElement('ul');
  postsList.classList.add('list-group', 'border-0', 'rounded-0');
  flatValue.forEach((post) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const link = document.createElement('a');
    link.href = post.postLink;
    link.classList.add(...watchedState.viewedPostIds.includes(post.id) ? ['fw-normal', 'link-secondary'] : ['fw-bold']);
    link.setAttribute('data-id', post.id);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.textContent = post.postTitle;
    item.appendChild(link);
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = 'Просмотр';
    item.appendChild(button);
    postsList.appendChild(item);
  });
  postsCard.appendChild(postsList);
};

const title = document.querySelector('.modal-title');
const description = document.querySelector('.modal-body');
const footer = document.querySelector('.modal-footer');
const link = footer.querySelector('a');
const modalRender = (postId) => {
  const { postTitle, postDescription, postLink } = watchedState.posts
    .find(({ id }) => id === postId);
  title.textContent = postTitle;
  description.textContent = postDescription;
  link.href = postLink;
};

export default (path, value) => {
  switch (path) {
    case 'error':
      errorsRender(value);
      break;
    case 'items':
      successRender();
      break;
    case 'feeds':
      feedsRender(value);
      break;
    case 'posts':
      postsRender();
      break;
    case 'currentPostId':
      modalRender(value);
      break;
    case 'viewedPostIds':
      postsRender();
      break;
    default:
      break;
  }
};
