const input = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-btn");
const list = document.querySelector("#todo-list");

// localStorage에서 데이터 불러오기
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 화면 렌더링 함수
function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    if (todo.completed) li.classList.add("completed");

    // 완료 버튼
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.classList.add("action", "complete");
    completeBtn.onclick = () => {
      todos[index].completed = !todos[index].completed;
      save();
    };

    // 수정 버튼
    const editBtn = document.createElement("button");
    editBtn.textContent = "수정";
    editBtn.classList.add("action", "edit");
    editBtn.onclick = () => {
      const newText = prompt("수정할 내용을 입력하세요", todo.text);
      if (newText) {
        todos[index].text = newText;
        save();
      }
    };

    // 삭제 버튼
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.classList.add("action", "delete");
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      save();
    };

    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// 저장 함수
function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

// 추가 버튼 이벤트
addBtn.onclick = () => {
  if (input.value.trim() !== "") {
    todos.push({ text: input.value, completed: false });
    input.value = "";
    save();
  }
};

// Enter 키 입력 시 추가
input.onkeydown = (e) => {
  if (e.key === "Enter") addBtn.click();
};

// 초기 렌더링
render();
