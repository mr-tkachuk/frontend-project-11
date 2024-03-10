import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import watchedState from './state'
import * as yup from 'yup'
import axios, { AxiosError } from 'axios'
import parser from './parser'


const form = document.querySelector('form');
const posts = document.querySelector('.posts');


// postsUpdating(watchedState);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const url = event.target.url.value.trim()
  const allOriginsUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`
  const schema = yup.string().url('invalidUrl').notOneOf(watchedState.items, 'alreadyExistRss');
  schema.validate(url)
    .then(() => axios.get(allOriginsUrl))
    .then((response) => parser(url, response, watchedState))
    .catch((e) => {
      if (e instanceof AxiosError) {
        watchedState.error = 'networkError';
        return;
      }
      watchedState.error = e.toString().slice(17);
    });
});
posts.addEventListener('click', (event) => {
  const eventID = event.target.dataset.id;
  if (event.target.dataset.bsToggle === 'modal') {
    watchedState.currentPostId = eventID
    watchedState.viewedPostIds.push(eventID);
  }

  if (event.target.tagName === 'A') {
    if (!watchedState.viewedPostIds.includes(eventID)) watchedState.viewedPostIds.push(eventID);
  }
});

