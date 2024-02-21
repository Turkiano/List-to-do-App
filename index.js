
// localStorage.setItem("todos" , [1,2,3,4])
// console.log(JSON.parse(localStorage.getItem('todos')))

const todos = [];

// 2
const form = document.getElementById("add-todo");
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// 3
const addTodoBtn = document.querySelector("#submit-btn");
addTodoBtn.addEventListener("click", function () {
  const value = document.querySelector(".todo-input").value;// 3
  todos.push(value);
  updateDom();
});


// 4
function updateDom() {

  // 5
  const container = document.querySelector(".container");
  container.innerHTML = "";
  
  // 6
  const ul = document.createElement("ul");
  container.appendChild(ul);

  // 7
  todos.forEach((element) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const removebtn = document.createElement("button");
 
    //////////////////////////
    // const editbtn = document.createElement("button");
    //////////////////////////

    // 8
    li.classList.add("todo");
    checkbox.type = "checkbox";
    span.textContent = element;
    removebtn.textContent = "delete";

    //////////////////////////
    // editbtn.textContent = "edit";
    // editbtn.addEventListener('click', () =>{
    //   const editValue = prompt("Enter New for Todo Description")

    //   const oldTodoIdex = todos.findIndex((todo) => {
    //     return todo === element
    //   })

    //   todos[oldTodoIdex] = editValue;
    //   updateDom()
    // })
    ////////////////////////


    
    // 9
    removebtn.addEventListener("click", () => {
      li.remove();
    });

    // 10
    li.appendChild(checkbox);
    li.appendChild(span);
    // li.appendChild(editbtn);
    li.appendChild(removebtn);
    ul.appendChild(li);
  });
}
