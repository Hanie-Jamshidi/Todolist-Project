//selection
const todoInput=document.querySelector(".todo-input");
const todoForm=document.querySelector(".todo-form");
const todoList=document.querySelector(".todolist");
const selectFilter=document.querySelector(".filter-todos");
const modal=document.querySelector(".modal");
const backDrop=document.querySelector(".blur");
const closeModal=document.querySelector(".close__edited");
const newTitle=document.querySelector(".new-title");
const editForm=document.querySelector(".edit-form");


let filterValue="all";
let editingTodoId = null;
//addEvent
todoForm.addEventListener("submit",addNewTodo);
editForm.addEventListener("submit", editTodo);
backDrop.addEventListener("click", closeEditModal);

selectFilter.addEventListener("change",(e) =>{
    filterValue=e.target.value;
    filterTodos();
});

document.addEventListener("DOMContentLoaded",(e) =>{
   const todos= getAllTodos();
   creatTodos(todos);
});

//function
function addNewTodo(e){
    e.preventDefault();
    if (!todoInput) return null;
    const newTodo={
        id:Date.now(),
        createdAt:new Date().toISOString(),
        title:todoInput.value,
        isCompleted:false,
    };
   saveTodo(newTodo);
   filterTodos();
};



function creatTodos(todos){
    let result="";
   todos.forEach((todo)=>{
    result+=`
    <li class="todo">
    <p class="todo__title  ${todo.isCompleted && "completed"}">${todo.title}</p>
    <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
    <button  class="todo__check" data-todo-id=${todo.id}><i class="${todo.isCompleted && "checked"} far fa-check-square"></i><button>
    <button class="todo__remove"   data-todo-id=${todo.id}><i class=" far fa-trash-alt"></i><button>
    <button class="todo__edit"   data-todo-id=${todo.id}><i class="fa-solid fa-pencil"></i><button>
    </li>
    `;
});
 todoList.innerHTML=result;
 todoInput.value="";

 const removeBtns=[...document.querySelectorAll(".todo__remove")];
 removeBtns.forEach(btn => btn.addEventListener("click",removeTodo));

 const checkBtns=[...document.querySelectorAll(".todo__check")];
 checkBtns.forEach(btn => btn.addEventListener("click",checkTodo));

 const editBtns=[...document.querySelectorAll(".todo__edit")];
 editBtns.forEach(btn => btn.addEventListener("click",openEditModal));

 
};

function openEditModal(e) {


    const todoId = Number(e.currentTarget.dataset.todoId);

    const todos = getAllTodos();

    const todo = todos.find((todo) => todo.id === todoId);

    if (!todo) return;


    editingTodoId = todoId;

    newTitle.value = todo.title;

  
    modal.style.display='inline';
    modal.classList.add("show-modal");
    backDrop.classList.add("backdrop");
};
function editTodo(e) {
    e.preventDefault();

    const newValue = newTitle.value.trim();

    if (!newValue) return;

    let todos = getAllTodos();

    const todo = todos.find((todo) => todo.id === editingTodoId);

    if (!todo) return;


    todo.title = newValue;


    saveAllTodos(todos);

   
    filterTodos();

    
    closeEditModal();
};
function closeEditModal() {
    modal.style.display='none';
    modal.classList.remove("show-modal");
    backDrop.classList.remove("backdrop");

    newTitle.value = "";

    editingTodoId = null;
};




function checkTodo(e){
    let todos= getAllTodos();
    const todoId=Number(e.target.dataset.todoId);
    const todo=todos.find(t=> t.id===todoId);
    todo.isCompleted= !todo.isCompleted;
    saveAllTodos(todos);
     filterTodos();
    
};

function removeTodo(e){
    let todos= getAllTodos();
    const todoId=Number(e.target.dataset.todoId);
    todos=todos.filter((t)=>t.id!==todoId);
   saveAllTodos(todos);
   filterTodos();
};


function filterTodos(e){
    const todos=getAllTodos();
    switch(filterValue){
        case"all":{
            creatTodos(todos);
            break;

        }
        case"completed":{
            const filteredTodos=todos.filter((t)=>t.isCompleted);
            creatTodos(filteredTodos);
            break;
            
        }
        case"uncompleted":{
             const filteredTodos=todos.filter((t)=>!t.isCompleted);
            creatTodos(filteredTodos);
            break;
            
        }
        default: creatTodos(todos);
        
    }
};


//localStorage
function getAllTodos(){
   const savedTodos= JSON.parse(localStorage.getItem("todos")) || [];
   return savedTodos;
};
function saveTodo(todo){
    const savedTodos= getAllTodos();
    savedTodos.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedTodos));
    return savedTodos;

};
function saveAllTodos(todo){
    localStorage.setItem("todos",JSON.stringify(todo));
};
