const TOKEN_KEY = "jwt";
const TEST_TOKEN = "active";

export const login = () => {
  localStorage.setItem(TOKEN_KEY, "TestLogin");
};

export const testActive = () => {
  localStorage.setItem(TEST_TOKEN, "TestActive");
};

export const logout = () => {
  localStorage.clear();
};

export const testFinished = () => {
  localStorage.removeItem(TEST_TOKEN);
};

export const isTestActive = () => {
  if (localStorage.getItem(TEST_TOKEN)) {
    return true;
  }
  return false;
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};
