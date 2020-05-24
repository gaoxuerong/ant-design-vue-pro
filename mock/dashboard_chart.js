function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [10, 40, 45, 32, 99, 55];
      break;
    default:
      res = null;
  }
  return res;
}
module.exports = chart;
