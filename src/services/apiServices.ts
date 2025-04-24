import axios from 'axios';
// import { store } from '@/store';
import { getToken } from '@/utils/auth';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  // withCredentials: true,
  xsrfHeaderName: 'X-XSRF-TOKEN',
  xsrfCookieName: 'XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',

    'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}`
  }
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config:any) => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const token = getToken();
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getData = async (endpoint: string, config?: any): Promise<any> => {
  return await apiClient.get(endpoint, config);
  
};

export const postData = async (endpoint: string, data: any, config?: any): Promise<any> => {
  return await apiClient.post(endpoint, data, config);
  
};

// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
// const apiService = axios.create({
//   baseURL,
//   headers: {
//     'Content-Type': 'application/json', // Set Content-Type header
   
//     // 'Access-Control-Allow-Origin':'http://localhost:3000'
//   },
//   withCredentials: true
// });

// // Function to set authorization token (optional)
// // export const setAuthToken = (token: string | null) => {
// //   if (token) {
// //     apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// //   } else {
// //     delete apiService.defaults.headers.common['Authorization'];
// //   }
// // };

// // Add a request interceptor
// apiService.interceptors.request.use(
//   (config) => {
//     // Get the token from local storage
//     // const token = getToken();

//     // If token exists, attach it to the request headers
//     // if (token) {
//     //   config.headers.Authorization = token;
//     // }

//     return config;
//   },
//   (error) => {
//     // If any error occurs with the request, return a rejected Promise
//     return Promise.reject(error);
//   }
// );


// // Function for GET requests
// export const getData = async (url: string) => {

//     return await apiService.get(url);
//   //  return await fetch(`${baseURL}${url}`, {
//   //     credentials: 'include'
//   //   })
   
   
// };

// // Function for POST requests
// export const apipost = async (url: string, data: any) => {
  
//     return await apiService.post(url, data);
   
 
// };

// export const postData = async (url: string, data: any) => {
  
//   return await apiService.post(url, data,{
//     headers: {
//         'Content-Type': 'multipart/form-data',
//     },
// });
 

// };