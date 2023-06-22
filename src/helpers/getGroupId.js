export default function (groupObject, groupName) {
  for (let group of groupObject) {
    if (group.path === groupName) {
      return group.id;
    }
  }
}
