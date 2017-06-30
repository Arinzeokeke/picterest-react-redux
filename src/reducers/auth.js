import { Types } from '../actions/actions';
const {
	LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH,
  UPDATE_FILE_AUTH,
  FILE_UPLOADED
} = Types;

const defaultState = {
  email: '',
  password: '',
  name: ''
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case LOGIN:
		case REGISTER:
			return {
				...state,
				inProgress: false,
				errors: action.error ? action.payload.errors : null
			};
		case LOGIN_PAGE_UNLOADED:
		case REGISTER_PAGE_UNLOADED:
			return {};
		case ASYNC_START: {
			if (action.subtype === LOGIN || action.subtype === REGISTER) {
				return {
					...state,
					inProgress: true
				};
			}
      else{
        return state;
      }
    }
		case UPDATE_FIELD_AUTH:
			return {
			...state, [action.key]: action.value
			};

    case UPDATE_FILE_AUTH: {
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
      if (action.subtype === 'auth') {
        return {
          ...state,
          url: action.link,
          file: null,
          uploaded: true
        };
      }
		default:
			return state;


	}
}