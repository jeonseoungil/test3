let txt = document.querySelector(" .wrap form");
let txt1 = document.querySelector(" .wrap form .text");
let button = document.querySelector(" .list li button");
let list = document.querySelector(".list");
let obj = [{}];

localStorage.clear();

//2-2. 값을 입력받은 json파일을 객체배열에 parse형식으로 변경
obj = JSON.parse(localStorage.getItem("obj")) || [];
console.log(obj);

// 4. li 안에 하위 버튼 클릭 시 해당 li 및 배열객체에 해당 인덱스 삭제 /체크가 되었을떄만 삭제가능
const delbtn = (real_length, icon) => {
  if (icon.classList.contains("on")) {
    obj = obj.filter((item, button_length) => button_length !== real_length);
    localStorage.setItem("obj", JSON.stringify(obj));
    create();
  } else {
    alert("해당 일정을 체크해 주세요");
  }
};

/*  6. li 하위 요소 버튼 클릭 시 p 태그를 input 태그로 바꾸고 값 입력시 
화면 및 객체 배열 내에 내용 변경  */
const modify_tet = (tet, real_length) => {
  obj.forEach((item, idx) => {
    if (idx === real_length) {
      tet.innerHTML = `<input type="text" class="text1" placeholder="재입력해주세요">`;
      tet.addEventListener("change", (e) => {
        let txt2 = document.querySelector(".list li p input").value;
        obj[idx].text = txt2;
        localStorage.setItem("obj", JSON.stringify(obj));
        create();
      });
    }
  });
};
// 3. 보낸 정보를 바탕으로 li 및 하위 요소 생성
const create = () => {
  list.innerHTML = "";
  obj.forEach((item, real_length) => {
    let li = document.createElement("li");
    let icon = document.createElement("i");
    let tet = document.createElement("p");
    let delbutton = document.createElement("button");
    let modify = document.createElement("button");
    let { text } = item;
    icon.innerHTML = "⋁";
    tet.innerHTML = `<p>${text}</p>`;
    modify.textContent = "수정";
    delbutton.textContent = "삭제";

    li.appendChild(icon);
    li.appendChild(tet);
    li.appendChild(modify);
    li.appendChild(delbutton);
    list.appendChild(li);

    //5. 생성한 li에 아이콘 요소에 이벤트 핸들러 생성
    icon.addEventListener("click", (e) => {
      icon.classList.toggle("on");
    });
    //5. 생성한 li에 버튼 요소에 이벤트 핸들러 생성 삭제 기능
    delbutton.addEventListener("click", (e) => {
      delbtn(real_length, icon);
    });
    modify.addEventListener("click", (e) => {
      modify_tet(tet, real_length);
    });
  });
  // 입력 후 입력값 삭제 및 포커스 두기
  txt1.value = "";
  txt1.focus();
};
/*2-1. 입력 정보를 obj 객체배열에 value값으로 가져오고 그 정보를
json파일에 문자 형식으로 변환  */
const save = () => {
  obj = [...obj, { text: txt1.value }];
  localStorage.setItem("obj", JSON.stringify(obj));
};

// 1. 텍스트 입력 후 enter로 입력값을 submit
txt.addEventListener("submit", (e) => {
  save();
  create();
});
