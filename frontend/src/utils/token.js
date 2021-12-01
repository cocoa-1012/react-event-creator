const tokenName = 'token';

export const storeToken = (token) => {
  localStorage.setItem(tokenName, token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getTokenData = () => {
  const token = getToken();

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return {};
  }
};

export const removeToken = () => {
  localStorage.removeItem(tokenName);
};
