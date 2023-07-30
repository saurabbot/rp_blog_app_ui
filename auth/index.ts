function isLoggedIn() {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("access_token") !== null;
  }
}
function logoutUser() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("access_token", null);
  }
}

export { isLoggedIn };
