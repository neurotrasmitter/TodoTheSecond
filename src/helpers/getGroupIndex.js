export default function (storage, groupPath) {
  return storage.findIndex(function (element) {
    return element.path === groupPath;
  });
}
