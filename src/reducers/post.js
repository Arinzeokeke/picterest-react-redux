import { Types } from '../actions/actions';
const { POST_PAGE_LOADED,
POST_PAGE_UNLOADED,
POST_LIKED,
POST_UNLIKED
} = Types;

export default (state = {}, action) => {
  switch (action.type) {
    case POST_PAGE_LOADED:
      return {
        ...state,
        post: action.payload.post
      }
    case POST_LIKED:
    case POST_UNLIKED:
      if (state.post && state.post.id === action.payload.post.id) {
        return {
          ...state,
          post: action.payload.post
        }
      }
    case POST_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
