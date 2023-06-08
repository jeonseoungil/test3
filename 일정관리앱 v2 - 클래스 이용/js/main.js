let txt = document.querySelector(".wrap form");


class Chars {
  constructor() {
    this.txt1 = document.querySelector(".wrap form .text");
    this.button = document.querySelector(".list li button");
    this.list = document.querySelector(".list");
    this.obj = [{}];
    localStorage.clear();
    this.obj = JSON.parse(localStorage.getItem("obj")) || [];
    this.text = this.obj.text;
  }

  create() {
    this.list.innerHTML = "";
    this.obj.forEach((item, real_length) => {
      let li = document.createElement("li");
      let icon = document.createElement("i");
      let tet = document.createElement("p");
      let delbutton = document.createElement("button");
      let modify = document.createElement("button");
      icon.innerHTML = "⋁";
      tet.innerHTML = `<p>${item.text}</p>`;
      modify.textContent = "수정";
      delbutton.textContent = "삭제";

      li.appendChild(icon);
      li.appendChild(tet);
      li.appendChild(modify);
      li.appendChild(delbutton);
      this.list.appendChild(li);

      icon.addEventListener("click", (e) => {
        icon.classList.toggle("on");
      });
      delbutton.addEventListener("click", (e) => {
        this.delbtn(real_length, icon);
      });
      modify.addEventListener("click", (e) => {
        this.modify_tet(tet, real_length);
      });
    });
    this.txt1.value = "";
    this.txt1.focus();
  }

  save() {
    this.obj = [...this.obj, { text: this.txt1.value }];
    localStorage.setItem("obj", JSON.stringify(this.obj));
  }

  modify_tet = (tet, real_length) => {
    this.obj.forEach((item, idx) => {
      if (idx === real_length) {
        tet.innerHTML = `<input type="text" class="text1" placeholder="재입력해주세요">`;
        tet.addEventListener("change", (e) => {
          let txt2 = document.querySelector(".list li p input").value;
          this.obj[idx].text = txt2;
          localStorage.setItem("obj", JSON.stringify(this.obj));
          this.create();
        });
      }
    });
  };

  delbtn = (real_length, icon) => {
    if (icon.classList.contains("on")) {
      this.obj = this.obj.filter((item, button_length) => button_length !== real_length);
      localStorage.setItem("obj", JSON.stringify(this.obj));
      this.create();
    } else {
      alert("해당 일정을 체크해 주세요");
    }
  };
}

const charss = new Chars();
txt.addEventListener("submit", (e) => {
  charss.save();
  charss.create();
});