import onChange from 'on-change'
import render from './render'

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
