
function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
  location.reload();;
}

export const userService = {
  logout,
};