import "./style.css";

interface Todo {
    title: String;
    isCompleted: boolean;
    readonly id: String;
}

const todos: Todo[] = [];

const todoContainer = document.getElementById("todoContainer") as HTMLDivElement | null;

if (!todoContainer) {
    console.error("Todo container not found. Make sure the element exists in the HTML with the correct class or ID.");
}

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const todoForm = document.getElementById("todoForm") as HTMLFormElement;

todoForm.onsubmit = (e: Event) => {
    e.preventDefault();

    const todo: Todo = {
        title: todoInput.value,
        isCompleted: false,
        id: String(Date.now()),
    };

    todos.push(todo);
    console.log(todos);
    todoInput.value = "";
    renderToDo(todos);
};

const generateToDoItem = (title: String, isCompleted: boolean, id: String) => {
    if (!todoContainer) return;

    // Create div element for todo item
    const todo: HTMLDivElement = document.createElement("div");
    todo.className = "toDo";
    todo.style.display = "flex";
    todo.style.flexDirection = "row"; 
    todo.style.justifyContent = "space-between";

    // Create checkbox element
    const checkbox: HTMLInputElement = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "isCompleted";
    checkbox.checked = isCompleted;
    checkbox.onchange = () => {
        todos.find((item)=> {if(item.id===id){
            item.isCompleted = checkbox.checked;
        }
        paragraph.className= checkbox.checked? "textCut":"";
    });
    checkbox.style.paddingLeft = "10px";
    checkbox.style.paddingRight = "10px";
    }
    

    // Create paragraph element
    const paragraph: HTMLParagraphElement = document.createElement("p");
    
    paragraph.innerText = title as string;
    paragraph.className= isCompleted? "textCut":"";
    paragraph.style.paddingLeft = "10px";
    paragraph.style.paddingRight = "10px";
    paragraph.style.color="white";
    paragraph.style.fontSize="20px";

    // Create delete button
    const btn: HTMLButtonElement = document.createElement("button");
    btn.innerText = "X";
    btn.className = "deleteBtn";
    btn.style.paddingLeft = "10px";
    btn.style.paddingRight = "10px";
    btn.style.color="white";
    btn.style.fontSize="20px";
    btn.style.fontWeight="bolder";
    btn.onclick=()=>{
        deleteTodo(id);
    }

    // Append elements to todo item
    todo.append(checkbox, paragraph, btn);

    // Append todo item to container
    todoContainer.append(todo);
};

const deleteTodo = (id: String) => {
    const idx = todos.findIndex((item)=>item.id===id);
    todos.splice(idx,1);
    renderToDo(todos);
}
const renderToDo = (todos: Todo[]) => {
    if(todoContainer===null) return;
    todoContainer.innerText= "";
    todos.forEach((item) => {
        generateToDoItem(item.title, item.isCompleted, item.id);
    });
};
