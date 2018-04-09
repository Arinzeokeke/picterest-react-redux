import { call, put, select, takeEvery } from 'redux-saga/effects'
import firebase from 'firebase'
import randomString from 'randomstring'
import { Types, Creators } from './actions/actions'
import agent from './agent.js'

function* requestLogin(action) {
  yield put(Creators.asyncStart(Types.LOGIN))
  const { email, password, history } = action.payload

  try {
    const { jwt } = yield call(agent.Auth.token, email, password)
    yield call(agent.setToken, jwt)
    yield put(Creators.setToken(jwt))
    const userResponse = yield call(agent.Auth.current)
    console.log('USER', userResponse)
    const res = { ...userResponse, token: jwt }
    yield put(Creators.login(res, false))
    history.push('/')
  } catch (e) {
    console.log('ERROR', e)
    if (e.status === 404) {
      yield put(
        Creators.login({ errors: ['Invalid Username or Password'] }, true)
      )
    } else {
      yield put(Creators.login({ errors: 'Something went wrong' }, true))
    }
  }
}

function* requestRegister(action) {
  const { name, email, password, history } = action.payload
  const { file, url } = yield select(state => ({
    ...state.auth
  }))

  console.log('here')
  try {
    let url = url
    if (file) {
      const randString = randomString.generate()
      console.log(randString)
      const metadata = {
        contentType: file.type
      }
      // const storageRef = firebase
      //   .storage()
      //   .ref()
      //   .child(`profiles/${randString}`)
      // const snapshot = yield call(storageRef.put, file, metadata)
      // url = snapshot.downloadURL
      yield put(Creators.fileUploaded, url, 'auth')
    }
    const res = yield call(agent.Auth.register, name, email, password, url)
    const token = yield call(agent.Auth.token, email, password)
    const output = { ...res.user, token: token.jwt }
    yield put(Creators.register(output, false))
    history.push('/')
  } catch (e) {
    console.log('ERROR', e)
    let errors = null
    if (e.code) {
      errors = { errors: ['Image Upload went wrong'] }
    }
    yield put(Creators.register(errors || e.response.body, true))
  }
}

// function* updateCurrentUser(action) {
//   const { user } = yield select(state => ({
//     user: state.auth.newUser
//   }));

//   try {
//     const res = yield call(agent.Auth.update, user);
//     yield put(Creators.setUser(res.body.user));
//     yield put(Creators.updateUserSuccess());

//   } catch (e) {
//     yield put(Creators.updateUserError(res.status, res.body));
//   }
// }

function* mySaga() {
  yield takeEvery(Types.REQUEST_LOGIN, requestLogin)
  yield takeEvery(Types.REQUEST_REGISTER, requestRegister)
}

export default mySaga
