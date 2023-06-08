export default function (target) {
  const get = document.querySelector(target);
  if (get) {
    return get;
  } else {
    throw new Error("오류발생");
  }
}
