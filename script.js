class Todo{
    constructor(id, task, completed=false){
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
}

class TodoList{
    constructor() {
        this.todos = [];
        try {
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                this.todos = JSON.parse(savedTodos).map(todo => 
                    new Todo(todo.id, todo.task, todo.completed)
                );
            }
        } catch (error) {
            console.error('Error loading todos:', error);
            this.todos = [];
        }
        this.render();
    }

    addTodo(text){
        const todo = new Todo(Date.now(), text);
        this.todos.push(todo);
        this.saveTodos();
        this.render();
    }

    toggleCompleted(id){
        this.todos = this.todos.map(todo => {
            if(todo.id === id){
                todo.completed = !todo.completed;
                return todo;
            }
            return todo;
        });
        this.saveTodos();
        this.render();
    }

    saveTodos(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    removeTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveTodos();
        this.render();
    }

    editTask(id, task){
        this.todos = this.todos.map(todo => {
            if(todo.id === id){
                todo.task = task;
                return todo;
            }
            return todo;
        });
        this.saveTodos();
    }

    render(){
        const tasks = document.getElementById('tasks');
        tasks.innerHTML = '';
        this.todos.forEach(todo => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <td>
                <input class="${todo.completed ? 'checked' : ''}" type="text" value="${todo.task}" onkeyup="todolist.editTask(${todo.id}, this.value)" ${todo.completed ? 'disabled' : ''}>
            </td>
            <td>
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onclick="todolist.toggleCompleted(${todo.id})">
            </td>
            <td>
                <button class="remove">
                    Hapus
                </button>
            </td>
            `
            const removeButton = tr.querySelector('.remove');
            if(removeButton){
                removeButton.addEventListener('click', () => {
                    if(confirm('Apakah Anda yakin ingin menghapus task ini?')){
                        this.removeTodo(todo.id);
                    }
                });
            }
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



