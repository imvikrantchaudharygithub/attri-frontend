// tokenService.js

let localStorageAvailable = false;

if (typeof window !== 'undefined' && window.localStorage) {
  localStorageAvailable = true;
}

export const setToken = (token:string) => {
  if (localStorageAvailable) {
    localStorage.setItem('accessToken', token);
  }
};

 const getToken = () => {
  if (localStorageAvailable) {
    return localStorage.getItem('accessToken');
  }
  return null;
};
export const clearTokenlocal = () => {
  if (localStorageAvailable) {
    localStorage.removeItem('accessToken');
  }
};
export default getToken;