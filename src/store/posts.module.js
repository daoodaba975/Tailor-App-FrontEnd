import { postServices } from '../services';
// import router from '../router/index';
const state = { post: null, status: null, timeline: [], error: null, message: null };
const getters = {};
const actions = {
  async createpost({ dispatch, commit }, post) {
    commit('createPostRequest', post);
    try {
      const newPost = await postServices.createPost(post);
      if (newPost.success) {
        commit('createPostSuccess', newPost);
        dispatch('alert/success', 'Post created successfully.', { root: true });
      } else {
        commit('createPostFailure', 'Error: Image size too big!');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('createPostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async likePost({ dispatch, commit }, postID) {
    commit('likePostRequest');
    try {
      const data = await postServices.likePost(postID);
      if (data.success) {
        commit('likePostSuccess');
        dispatch('alert/success', 'Post liked successfully.', { root: true });
      } else {
        commit('likePostFailure', 'Error: Error Like Post');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('likePostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async disLikePost({ dispatch, commit }, postID) {
    commit('disLikePostRequest');
    try {
      const data = await postServices.disLikePost(postID);
      if (data.success) {
        commit('disLikePostSuccess');
        dispatch('alert/success', 'Post disLiked successfully.', { root: true });
      } else {
        commit('disLikePostFailure', 'Error: Error Like Post');
        dispatch('alert/error', 'error', { root: true });
      }
    } catch (error) {
      commit('disLikePostFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },

  async getPostFeed({ dispatch, commit }, paylaod) {
    commit('postFeedRequest');
    try {
      let postFeed = {};
      if (paylaod.userName && paylaod.limit) {
        postFeed = await postServices.getPostFeed(paylaod.timeline, paylaod.userName, paylaod.limit);
      } else if (paylaod.userName) {
        postFeed = await postServices.getPostFeed(paylaod.timeline, paylaod.userName);
      } else {
        postFeed = await postServices.getPostFeed(paylaod.timeline);
      }

      if (!postFeed) {
        const message = 'Your Timeline is empty.';
        commit('postFeedEmpty', message);
        return;
      }
      if (postFeed.success) {
        commit('postFeedSuccess', postFeed.timeline);
      } else {
        const message = 'Your Home Timeline is empty.';
        commit('postFeedEmpty', message);
      }
    } catch (error) {
      commit('postFeedFailure', error);
      dispatch('alert/error', error, { root: true });
    }
  },
};

const mutations = {
  createPostRequest(state, post) {
    state.status = { postCreating: true };
    state.post = post;
  },
  createPostSuccess(state, post) {
    state.status = { postCreated: true };
    state.post = post;
    state.timeline.push(post.post);
    state.error = null;
  },
  createPostFailure(state, error) {
    state.error = error;
    state.post = null;
    state.status = null;
  },
  likePostRequest(state) {
    state.status = { likingPost: true };
  },
  likePostSuccess(state) {
    state.status = { postLiked: true };
  },
  likePostFailure(state, error) {
    state.error = error;
  },
  disLikePostRequest(state) {
    state.status = { disLikingPost: true };
  },
  disLikePostSuccess(state) {
    state.status = { postDisLiked: true };
  },
  disLikePostFailure(state, error) {
    state.error = error;
  },
  postFeedRequest(state) {
    state.status = { loading: true };
  },
  postFeedSuccess(state, timeline) {
    state.timeline = timeline;
    state.status = { isLoaded: true };
  },
  postFeedEmpty(state, message) {
    state.message = message;
    state.post = null;
    state.status = { empty: true };
    state.error = null;
  },
  postFeedFailure(state, error) {
    state.timeline = null;
    state.error = error;
    state.status = { error: true };
  },
  UserHomeTimelineRequest(state) {
    state.status = { loading: true };
  },
  UserHomeTimelineSuccess(state, userTimeline) {
    state.hometimeline = userTimeline;
    state.status = { isLoaded: true };
    state.post = null;
    state.error = null;
  },
  UserHomeTimelineEmpty(state, message) {
    state.message = message;
    state.post = null;
    state.status = { empty: true };
    state.error = null;
    state.hometimeline = null;
  },
  UserHomeTimelineFailure(state, error) {
    state.hometimeline = null;
    state.error = error;
    state.status = { error: true };
  },
};

export const posts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
