import { dragElement, inputElement, numOfTasks, tasksList, tasksSectionsElement } from "./elements.js";
import { displayDragAndSections, saveToDatabase } from "./script.js";

export const addTask=()=>{
    const newTask=inputElement.value;
    if(newTask=="") alert("Enter valid task")
    else{
        const li=document.createElement("li")
        li.innerText=newTask
        tasksList.appendChild(li)
        li.setAttribute("tabindex","0")
        li.classList.add("active")
        li.setAttribute("draggable","true")
        const span=document.createElement("span")
        span.innerText="x"
        li.appendChild(span)
        numOfTasks.innerText= +numOfTasks.innerText + 1;
        inputElement.value=""
        saveToDatabase("tasks",tasksList.innerHTML)
        saveToDatabase("itemsNum",numOfTasks.innerText)
        displayDragAndSections()
    }
}

