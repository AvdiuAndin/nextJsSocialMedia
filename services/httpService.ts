const fetcher = (...args) => fetch(...args).then(res => res.json());

import config from '../config/contants.json'
import { getJwt, isUserAuthenticated } from './userService';


const SERVER_URL = config.SERVER_URL


export async function post(url: string, data: any, publicApiCall = false) {
  let headers = setUpHeaders(publicApiCall)

  let response = await fetch(`${SERVER_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
}

export async function get(url: string, publicApiCall = false) {
  let headers = setUpHeaders(publicApiCall)
  let res = await fetch(`${SERVER_URL}${url}`, {
    headers
  });
  return res.json();
}

export async function del(url: string, data: any, publicApiCall = false) {
  let headers = setUpHeaders(publicApiCall);

  let response = await fetch(`${SERVER_URL}${url}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(data),
    });
    return response.json();
}


// set up headers for calls that are open or need to have jwt in the header
function setUpHeaders(publicApiCall: boolean){
  let authorization = '';
  if(!publicApiCall && isUserAuthenticated()){
    let jwt = getJwt();
    authorization = `Bearer ${jwt}`
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': authorization
  };
}