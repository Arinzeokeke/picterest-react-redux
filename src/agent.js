import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

//const API_ROOT = 'https://picterest-api.herokuapp.com/api/v1';
const API_ROOT = 'http://localhost:4000/api/v1';

const encode = encodeURIComponent;
const responseBody = res => {
  return res.body;//parse(res.text);
}//.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    console.log('in agent  ' + token);
    req.set('Authorization', `${token}`);
  }
  else{
    console.log('no token');
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/user'),
  token: (email, password) => 
    requests.post('/token', { "auth": { "email": email, "password": password } }),
  register: (name, email, password) =>
    requests.post('/user', { user: { name, email, password } }),
  update: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = post => Object.assign({}, post, { slug: undefined })


const Posts = {
  all: (page) =>
    requests.get(`/posts`),//?${limit(10, page)},
  byAuthor: (author, page) =>
    requests.get(`/posts?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/posts?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/posts/${slug}`),
  like: slug =>
    requests.post(`/posts/${slug}/vote`),
  likedBy: (author, page) =>
    requests.get(`/posts?liked=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/posts/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/posts/${slug}`),
  unlike: slug =>
    requests.del(`/posts/${slug}/vote`),
  update: post =>
    requests.put(`/posts/${post.slug}`, { post: omitSlug(post) }),
  create: post =>
    requests.post('/posts', { post }),
  liked: () =>
    requests.get('/posts/liked?limit=10&offset=0')
};



const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`), 
  following: (username) =>
    requests.get(`/profiles/${username}/following`),
  followers: (username) =>
    requests.get(`/profiles/${username}/followers`)
};  

export default {
  Posts,
  Auth,
  Profile,
  Tags,
  setToken: _token => { token = _token; }
};
