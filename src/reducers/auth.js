import { Types } from '../actions/actions';
const {
	LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} = Types;

const defaultState = {
  email: '',
  password: ''
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case LOGIN:
		case REGISTER:
			return {
				...state,
				inProgress: false,
				errors: action.error ? action.payload.error : null
			};
		case LOGIN_PAGE_UNLOADED:
		case REGISTER_PAGE_UNLOADED:
			return {};
		case ASYNC_START:
			if (action.subtype === LOGIN || action.subtype === REGISTER) {
				return {
					...state,
					inProgress: true
				};
			}
		case UPDATE_FIELD_AUTH:
			return {
			...state, [action.key]: action.value
			};
		default:
			return state;


	}
}