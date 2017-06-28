import { Types} from '../actions/actions';
const {
  POST_LIKED,
  POST_UNLIKED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} = Types;


export default (state = {}, action) => {
  switch (action.type) {
    case POST_LIKED:
    case POST_UNLIKED:
      return {
        ...state,
        posts: action.error ? state.posts : state.posts.map(post => {

          if (post.slug === action.payload.post.slug) {
            return {
              ...post,
              likes: action.payload.post.likes,
              liked: action.payload.post.liked
            };
          }
          return post;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        posts: action.payload.posts,
        postsCount: action.payload.count,
        currentPage: action.page
      };

    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload.posts,
        postsCount: action.payload.count,
        currentPage: 0,
        tag: action.tag,
        tab: null
      };

    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].tags,
        posts: action.payload[1].posts,
        postsCount: action.payload[1].count,
        currentPage: 0,
        tab: action.tab
      }
    case CHANGE_TAB:
     return {
          ...state,
          pager: action.pager,
          posts: action.payload.posts,
          postsCount: action.payload.count,
          tab: action.tab,
          currentPage: 0,
          tag: null
        }

    case PROFILE_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        posts: action.payload[1].posts,
        postsCount: action.payload[1].count,
        currentPage: 0
      }
    case HOME_PAGE_UNLOADED:
    case PROFILE_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
}