export default function (groups, path) {
  for (let group of groups) {
    if (group.path === path) {
      return false;
    }
  }
  return true;
}
