class Todo{
    constructor(id, task, completed=false){
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
}

class TodoList{
    constructor(){
        this.todos = [];
    }

    addTodo(text){
        const todo = new Todo(Date.now(), text);
        this.todos.push(todo);
        this.render();
    }

    removeTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id);
        this.render();
    }

    render(){
        const tasks = document.getElementById('tasks');
        tasks.innerHTML = '';
        this.todos.forEach(todo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>${todo.task}</td>
            <td>
                <button onclick=todolist.removeTodo(${todo.id})>Hapus</button>
            </td>
            `
            tasks.appendChild(tr);
        })
    }
}

//inisialisasi todolist
const todolist = new TodoList();

//event listener
const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskInput = document.getElementById('task');
    const text = taskInput.value.trim();
    if(text !== ''){
        todolist.addTodo(text);
        taskInput.value = '';
    }
})



