import { Types } from '../actions/actions';
const {
  HOME_PAGE_LOADED, HOME_PAGE_UNLOADED
} = Types;

export default (state = {}, action) => {
  switch(action.type) {
    case HOME_PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case HOME_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};