import onChange from 'on-change';
// eslint-disable-next-line import/no-cycle
import render from './render';

const state = {
  error: '',
  items: [],
  feeds: [],
  posts: [],
  currentPostId: null,
  viewedPostIds: [],
};

const watchedState = onChange(state, render);
export default watchedState;
