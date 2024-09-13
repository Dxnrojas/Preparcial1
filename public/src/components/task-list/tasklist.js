import '../task-item/taskitem.js';

class TaskList extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.task = []; // Array de tareas
    }

    connectedCallback() {
        this.render();

        const form = this.shadowRoot.querySelector('.task-form');
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = this.shadowRoot.querySelector('.input-title').value;
            const description = this.shadowRoot.querySelector('.input-description').value;

            // Agrega una nueva tarea al array de tareas
            this.task.push({ title, description, state: false });

            console.log(this.task);

            // Añade la nueva tarea al DOM
            this.addTask({ title, description, state: false });

            // Resetea el formulario
            form.reset();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <h2>Task List</h2>
        <form class="task-form">
            <input type="text" placeholder="Titulo" class="input-title" required>
            <input type="text" placeholder="Descripcion" class="input-description" required>
            <button>Agregar Tarea</button>
        </form>

        <ul class="container">
        </ul>
        `;

        // Renderiza las tareas existentes (si las hay)
        this.task.forEach(task => this.addTask(task));
    }

    addTask({title, description, state}) {
        const tasksContainer = this.shadowRoot.querySelector('.container');
        tasksContainer.innerHTML += `
        <task-item title="${title}" description="${description}" state="${state}"></task-item>
        `;
    }
}

customElements.define('task-list', TaskList);
export default TaskList;
