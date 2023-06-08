import { create } from "./data/dataObj.js";
import { save } from "./data/dataObj.js";
import get from "./data/get.js";

export let txt = get(" .wrap form");
export let txt1 = get(" .wrap form .text");
export let list = get(".list");

// 1. 텍스트 입력 후 enter로 입력값을 submit
txt.addEventListener("submit", (e) => {
  save();
  create();
});
