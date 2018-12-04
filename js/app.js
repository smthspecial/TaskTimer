const taskInput = {
    title: document.querySelector("#name"),
    descr: document.querySelector("#descr"),
    timer: document.querySelector("#timer"),

};
const taskListRaw = document.querySelector(".raw-tasks .task-list");
const taskListDone = document.querySelector(".task-done .task-list"); 


document.querySelector(".add-task").addEventListener("submit", addTask(taskInput));
document.addEventListener("DOMContentLoaded", updateTaskList);
document.addEventListener("click", (e)=>{

    if(e.target.closest(".task__run-btn")){
        runTask(e);
    }

    if(e.target.closest(".task__pause-btn")){
        pauseTask(e);
    }

    if(e.target.closest(".task__remove-btn")){
        removeTask(e);
    }

    if(e.target.closest(".task__edit-btn")){
        editTask(e);
    }

});


/* Bussiness logic*/
function addTask(e, task){
    e.preventDefault();

    const li = document.createElement("li");
    li.className = "task waiting";

    const temp = `  <div class="task__btn-wrapper">
    <button class="task__run-btn"><i class="fas fa-play"></i></button>
    <button class="task__pause-btn hidden"><i class="fas fa-pause"></i></button>
</div>
<div class="task__wrapper">
    <div class="task__text">
        <h3 class="task__title">${task.title.value}</h3>
        <p class="task__description">${task.descr.value}</p>
        <div class="task__timer">It takes <span class="timerValue">${task.timer.value}</span></div>
    </div>
    <div class="task__btn-wrapper">
        <button class="task__edit-btn"><i class="far fa-pen"></i></button>
        <button class="task__remove-btn"><i class="far fa-trash"></i></button>
    </div>
</div>`;

    li.insertAdjacentHTML("afterbegin",temp);
    taskListRaw.insertAdjacentElement("afterbegin", li);

    const currentTask = {};
    for (key in task){
        currentTask[key] = task[key].value;
    }

    storeInLocalStorage(currentTask);

    for (key in task) {
        task[key].value = "";
    }


    
}



function runTask(e){
    const currentTask = e.target.closest(".task");
    const runBtn = currentTask.querySelector(".task__run-btn");
    const pauseBtn = currentTask.querySelector(".task__pause-btn");
    runBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    currentTask.className = "task running";

    const timer = new Date(currentTask.querySelector(".timerValue").innerHTML);

    console.log(timer);





 
}



function pauseTask(e){
    const currentTask = e.target.closest(".task");
    const runBtn = currentTask.querySelector(".task__run-btn");
    const pauseBtn = currentTask.querySelector(".task__pause-btn");
    runBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
}



function removeTask(e){

}



function editTask(e){

}



/* Helpers*/


function updateTaskList(e){
    


    
}


function storeInLocalStorage(task){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}



