import { getToken } from './token';

export const tokenHeader = {
  headers: {
    authorization: 'Bearer ' + getToken(),
  },
};
