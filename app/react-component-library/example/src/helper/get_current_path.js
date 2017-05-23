/**
 * 获取当前的相对路径
 */
module.exports = function() {
  const href = window.location.href
  let path = href.split("?").shift()
  path = path.split("/").pop()
  return "/" + path
}