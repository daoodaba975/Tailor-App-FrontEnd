import { authHeader } from '../helpers';
import { handleRequest } from '../helpers/index';

export const commentServices = { makeComment, deleteComment, getAllPostComments };

async function makeComment(post) {
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'content-type': 'application/json' },
    body: JSON.stringify(post),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/comments/${post.postID}/comment`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}
async function deleteComment(payload) {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...authHeader(), 'content-type': 'application/json; charset=UTF-8' },
  };
  return fetch(
    `${process.env.VUE_APP_API_URI}api/v1/comments/${payload.postID}/delete/${payload.commentID}`,
    requestOptions
  )
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}

async function getAllPostComments(postID) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.VUE_APP_API_URI}api/v1/comments/${postID}/comment/all`, requestOptions)
    .then(handleRequest)
    .catch((error) => {
      throw error;
    });
}
