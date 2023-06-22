export default function (groups, name) {
  for (let group of groups) {
    if (group.name === name) {
      return false;
    }
  }
  return true;
}
