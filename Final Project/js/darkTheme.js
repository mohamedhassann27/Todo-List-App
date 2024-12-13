import { containerElement, modeToggleElement } from "./elements.js"

export const darkTheme=()=>{
    containerElement.classList.toggle("darkTheme")
    modeToggleElement.src= modeToggleElement.src.includes("sun")? "./images/icon-moon.svg" :"./images/icon-sun.svg"
    
}

