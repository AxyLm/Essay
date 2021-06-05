import  axios from  'axios'
// Add a request interceptor

//axios.defaults.headers['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
  // Do something before request is sent

  let token = JSON.parse( localStorage.getItem('token') ) || ''
  config.headers['AuthToken'] = token   //设置axios header 鉴权token
  // config.data.token=localStorage.getItem('token')||''
  // config.data=qs.stringify(data)
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
    if(response.data.code === -998){
      // token 失效处理  return reject  axios 调用的地方 catch处理
      return Promise.reject(response.data);
    }else{
      return Promise.resolve(response.data)
    }
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default axios