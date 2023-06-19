export default function (groupObject, groupName) {
  for (let group of groupObject) {
    if (group.path.slice(1) === groupName) {
      return group.id;
    }
  }
}
