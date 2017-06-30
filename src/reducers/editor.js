import { Types } from '../actions/actions';

const { 
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  FILE_UPLOADED,
  POST_SUBMITTED,
  ASYNC_START,
  ADD_TAG,
  REMOVE_TAG,
  UPDATE_FIELD_EDITOR,
  UPDATE_FILE_EDITOR
  } 
  = Types; 
const defaultState = {
  tags: []
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return{
        ...state,
        postSlug: action.payload ? action.payload.post.slug : '',
        title: action.payload ? action.payload.post.title : '',
        url: action.payload ? action.payload.post.url : '',
        tagInput: '',
        tags: action.payload ? action.payload.post.tags : [],
        postAuthor: action.payload ? action.payload.post.author : null
      }

    case POST_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      };

    case ASYNC_START:
      if (action.subtype === POST_SUBMITTED) {
        return{
          ...state,
          inProgress: true
        };
      }
    case ADD_TAG:
      return {
        ...state,
        tags: state.tags.concat([state.tagInput]),
        tagInput: ''
      };

    case REMOVE_TAG:
    return {
      ...state,
      tags: state.tags.filter(tag => tag !== action.tag)
    };

    case UPDATE_FIELD_EDITOR:
    return {
      ...state, [action.key]: action.value
    };

    case UPDATE_FILE_EDITOR: {
      const isImage = action.file.type.slice(0, 5) === 'image';

      return {
        ...state,
        errors: isImage ? null : 
          (state.errors || []).concat(["Upload must be an image"]),
        file: action.file,
        inProgress: isImage ? false : true
      };
    }

    case FILE_UPLOADED:
      if (action.subtype === 'editor') {
        return {
          ...state,
          url: action.link,
          file: null,
          uploaded: true
        };
      }

    case EDITOR_PAGE_UNLOADED:
      return {};

    default:
      return state;
  }

};