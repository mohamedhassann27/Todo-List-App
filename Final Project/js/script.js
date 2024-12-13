import { addTask } from "./addTask.js"
import { darkTheme } from "./darkTheme.js"
import { activeElement, allElement, clearCompletedElement, completedElement, containerElement, dragElement, inputElement, lisElements, modeToggleElement, numOfTasks, SectionsElements, tasksList, tasksSectionsElement } from "./elements.js"
export {saveToDatabase,displayDragAndSections}

//[x] darkMode
modeToggleElement.addEventListener("click",()=>{
    darkTheme()
    saveToDatabase("darkMode",containerElement.classList.contains("darkTheme"))
}
)
modeToggleElement.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") darkTheme()
    saveToDatabase("darkMode",containerElement.classList.contains("darkTheme"))
})

//[x] add task
inputElement.addEventListener("keydown",(e)=>{
    if(e.key==="Enter") addTask()
})

//[x] completed and delete task
tasksList.addEventListener("click",(e)=>{
    if(e.target.tagName=="LI"){ 
        e.target.classList.toggle("completed")
        if(e.target.classList.contains("completed")) e.target.classList.remove("active")
        else e.target.classList.add("active")
        saveToDatabase("tasks",tasksList.innerHTML)
    }
    else if(e.target.tagName=="SPAN"){
        const answer=confirm("Are you sure you want to delete the task?")
        if(answer==false) return 
        e.target.parentElement.remove()
        numOfTasks.innerText= +numOfTasks.innerText - 1;
        saveToDatabase("tasks",tasksList.innerHTML)
        saveToDatabase("itemsNum",numOfTasks.innerText)
    }
})

//[x] section of elements is active 
const pIsActive=(element)=>{
    SectionsElements.forEach((p)=>{
        p.classList.remove("listActive")
    })
    element.classList.add("listActive")
}

allElement.addEventListener("click",()=>{
    pIsActive(allElement)
    const lis=document.querySelectorAll("li")
    lis.forEach((li)=>{
        li.style.display="block"
    })
    numOfTasks.innerText=document.querySelectorAll("li").length
    saveToDatabase("itemsNum",document.querySelectorAll("li").length)
    saveToDatabase("tasks",tasksList.innerHTML)
    saveToDatabase("pIsActive",allElement.id)
})

activeElement.addEventListener("click",()=>{
    pIsActive(activeElement)
    const lis=document.querySelectorAll("li")
    lis.forEach((li)=>{
        if(li.classList=="active") li.style.display="block"
        else{ 
            li.style.display="none"
        }
    })
    numOfTasks.innerText=document.querySelectorAll("li.active").length
    saveToDatabase("itemsNum",document.querySelectorAll("li.active").length)
    saveToDatabase("tasks",tasksList.innerHTML)
    saveToDatabase("pIsActive",activeElement.id)
})

completedElement.addEventListener("click",()=>{
    pIsActive(completedElement)
    const lis=document.querySelectorAll("li")
    lis.forEach((li)=>{
        if(li.classList=="completed"){
            li.style.display="block"
        } 
        else{
            li.style.display="none"
        } 
    })
    numOfTasks.innerText=document.querySelectorAll("li.completed").length
    saveToDatabase("itemsNum",document.querySelectorAll("li.completed").length)
    saveToDatabase("tasks",tasksList.innerHTML)
    saveToDatabase("pIsActive",completedElement.id)
})

clearCompletedElement.addEventListener("click",()=>{
    pIsActive(clearCompletedElement)
    const lis=document.querySelectorAll("li")
    lis.forEach((li)=>{
        if(li.classList=="completed"){ 
            li.remove()
        }
    })
    numOfTasks.innerText = document.querySelectorAll("li").length;
    saveToDatabase("itemsNum",document.querySelectorAll("li").length)
    saveToDatabase("tasks",tasksList.innerHTML)
    saveToDatabase("pIsActive",clearCompletedElement.id)
})

//[x] save To Localstorage 
const saveToDatabase=(key,value)=>{
    localStorage.setItem(key,value)
}

//[x] fetch of localstorage
const fetchData=(key)=>{
    const data=localStorage.getItem(key);
    return data;
}

//[x] display drag and sections
let displayDragAndSections= ()=>{
    // const nums=fetchData("itemsNum")
    const nums=document.querySelectorAll("li").length
    if(nums!=0){
        tasksSectionsElement.style.display="flex";
        dragElement.style.display="block";
    }else if(nums==0){
        tasksSectionsElement.style.display="none";
        dragElement.style.display="none";
    }
}

//[x] drag and drop
    tasksList.addEventListener("dragstart",(e)=>{
        // adding dragging class to item
        // setTimeout(()=>e.target.classList.add("dragging"),0) 
        e.target.classList.add("dragging")
    })
    tasksList.addEventListener("dragend",(e)=>{
        // removing dragging class from item on dragend event
        e.target.classList.remove("dragging")
    })

    tasksList.addEventListener("dragover", (e) => {
        e.preventDefault();
        const draggingItem = tasksList.querySelector(".dragging");
        if (!draggingItem) return;
    
         // getting all items except currently dragging and making array of them
        const siblings = [...tasksList.querySelectorAll("li:not(.dragging)")];
        // finding the sibling after which the dragging item should be placed
        const nextSibling = siblings.find((sibling) => {
            const rect = sibling.getBoundingClientRect();
            return e.clientY <= rect.top + rect.height / 2;
        });
    
        tasksList.insertBefore(draggingItem, nextSibling);
        saveToDatabase("tasks",tasksList.innerHTML)
    });


//[x] startup
const initOnStartup=()=>{
    tasksList.innerHTML=fetchData("tasks")
    fetchData("darkMode")==="true" ? darkTheme() : false
    numOfTasks.innerText=fetchData("itemsNum")
    displayDragAndSections()    
    // pIsActive(allElement)
    const p= document.getElementById(fetchData("pIsActive"))
    if(p) pIsActive(p)
}
initOnStartup()


