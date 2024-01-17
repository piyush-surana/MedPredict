import axios, {AxiosRequestConfig} from 'axios';
import CryptoJS from 'crypto-js';
const encrypt = (text: string, key: string = 'salt') =>
  CryptoJS.AES.encrypt(text, key).toString();
const decrypt = (cipherText: string, key: string = 'salt') =>
  CryptoJS.AES.decrypt(cipherText, key).toString();

export const makeApiRequest = async ({
  method,
  urlPath,
  body,
  encryptedKeys,
  convertToFormData,
  token,
}: {
  method: 'get' | 'post';
  urlPath: string;
  body?: {[key: string]: any};
  encryptedKeys?: Array<string>;
  convertToFormData?: boolean;
  token?: string;
  dispatchTypeOnRes?: string;
}) => {
  let config: AxiosRequestConfig = {};
  const baseApiUrl = 'http://192.168.1.13:3000/';
  config.method = method;
  config.url = `${baseApiUrl}${urlPath}`;
  if (token) {
    config.headers = {Authorization: `Bearer ${token}`};
  }
  if (convertToFormData && body) {
    Object.entries(body).map(([ids, val]) => {
      if (typeof val === 'string') {
        if (encryptedKeys && encryptedKeys?.includes(ids)) {
          body[ids] = encrypt(val);
        }
      } else if (!(val instanceof Blob)) {
        body[ids] = JSON.stringify(val);
      }
    });
  } else if (encryptedKeys && body) {
    encryptedKeys.map(val => {
      if (typeof body[val] === 'string') {
        body[val] = encrypt(body[val]);
      }
    });
  }
  if (method === 'get') {
    config.params = body;
  } else {
    config.data = body;
  }
  let data: any, error: any;
  try {
    data = await axios(config);
  } catch (err) {
    error = err;
  }
  return {error, data};
};
