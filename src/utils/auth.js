export function getCurrentAuthority() {
  return ["admin"];
}
// 权限判断
export function check(auth) {
  const current = getCurrentAuthority();
  return current.some(item => auth.includes(item));
}
// 是否登录
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
