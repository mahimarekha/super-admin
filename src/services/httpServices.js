import axios from 'axios';

console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
const instance = axios.create({
  baseURL: `http://foodorder.srshta.com/api`,
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token;
  if ( localStorage.getItem("id_token")) {
    token =   localStorage.getItem("id_token");
  }

  return {
    ...config,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

// console.log(process.env.API_BASE_URL);
const responseBody = (response) => response.data;

const requests = {
  get: (url, body) => instance.get(url, body).then(responseBody),

  post: (url, body, headers) =>
    instance.post(url, body, headers).then(responseBody),

  put: (url, body) => instance.put(url, body).then(responseBody),
  delete: (url, body) => instance.delete(url).then(responseBody),
};

export default requests;
