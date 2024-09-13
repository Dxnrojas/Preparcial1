class TaskItem extends HTMLElement{

    constructor(){
        super()
        this.attachShadow({mode:'open'});

    };

    connectedCallback(){
        this.render();

    };

    static get observedAttributes(){
        return['title', 'description', 'state']

    };

    attributeChangedCallback(propName, oldVale, newValue){
        if(oldVale !== newValue){
            this[propName] = propName === 'state' ? newValue === 'true' : newValue;
            this.render();
        }

    };

    toggleTask(){
        this.state = !this.state
        this.render()
    };

    render(){
        this.shadowRoot.innerHTML=`
        <link rel="stylesheet" href="./src/components/task-item/task-item.css">
        <li class="${this.state ? 'Completada' : 'task'}">

            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${!this.state ? "Pendiente" : "Completada"}</p>
            <input type="checkbox" ${this.state ? "checked" : ""} class="task-checkbox">
        </li>
        `
        const chechbox = this.shadowRoot.querySelector('.task-checkbox')
        chechbox.addEventListener('change', ()=> this.toggleTask() )

    };
};
customElements.define('task-item', TaskItem);
export default TaskItem;