export default function (storage, record) {
  return storage.findIndex(function (element) {
    return element === record;
  });
}
