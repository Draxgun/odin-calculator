/* Mathematical functions */
/* Sum */
let add = (a,b) =>{
    return a+b
}
/* substraction */
let substract = (a,b) =>{
    return a-b
}
/* multiply */
let multiply = (a,b) =>{
    return a*b
}
/* divide */
let divide = (a,b) =>{
    return a/b
}

/* Tests */
/* let a = 1;
let b = 2;

console.log(add(a,b))
console.log(substract(a,b))
console.log(multiply(a,b))
console.log(divide(a,b)) */

/* Operate */
let operators = ['+','-','*','/','x','÷']

/* Function that operates */
let operate = (a,b,operator) =>{
    return operators.includes(operator) ? checkOperator(a,b,operator):false
}

/* Checks which operator is used */
let checkOperator = (a,b,operator) =>{
    if(operator==='+'){
        return add(a,b);
    }else if (operator==='-'){
        return substract(a,b);
    }else if (operator==='*'){
        return multiply(a,b);
    }else if (operator==='/'){
        return divide(a,b);
    }
}

/* DOm element edit */
const calculatorButtons = document.querySelector(".calculatorButtons");
const topText = document.getElementById('topText');
const bottomText = document.getElementById('bottomText');
let topTextContent = "";
let bottomTextContent = "";

topText.textContent = topTextContent;
bottomText.textContent = bottomTextContent;


/*Function that creates grid */
let createGrid = (n,m) => {
    for(let i=1; i<=n*m;i++) {        
          let grid = document.createElement('div');
          grid.classList.add("button");
          grid.setAttribute('id', `button${i}` );
          calculatorButtons.appendChild(grid);
          calculatorButtons.style.gridTemplateColumns = `repeat(${n},1fr)`
          calculatorButtons.style.gridTemplateRows = `repeat(${m},1fr)`
      }
    addText();
    addClick();
  }

/* Button text content */

let addText = () =>{
    let buttonContent = ['x^','x!','AC','DEL',"7","8","9",'÷','4','5','6','x','1','2','3','+','.','0','=','-']
    const  buttons = document.querySelectorAll('.button')
    let i = 0;
    buttons.forEach(button => {
        button.textContent = buttonContent[i];
        i++;
    });
}

/* Adds event listener */
let addClick = () =>{
    const  buttons = document.querySelectorAll('.button')
    buttons.forEach(button => {
        if(button.getAttribute('id')==='button3' || button.getAttribute('id')==='button4' ){

        }else{
            button.addEventListener('click',()=>{
                bottomTextContent = bottomTextContent +button.textContent;
                updateText()});
        }});
}


/* Checks if text updated */
let updateText = () =>{
    checkForOperator();
    topText.textContent = topTextContent;
    bottomText.textContent = bottomTextContent;

}

/* Clear all content */
let clear= () =>{
    topTextContent = "";
    bottomTextContent = "";
    topText.textContent = "";
    bottomText.textContent = bottomTextContent;
}

let deleteButton = () =>{
    bottomTextContent = bottomTextContent.slice(0, -1);
    updateText();
}

/* Checks if operators have been clicked */
let checkForOperator = () =>{
    if(operators.some(operator => bottomTextContent.includes(operator))){
        console.log('hola')
        topTextContent = bottomTextContent;
        bottomTextContent = "";
    } else{
        topTextContent = topTextContent;
        bottomTextContent = bottomTextContent;
    }

}

/* Creates all the buttons */
createGrid(4,5);

/*  Clear button */
const clearButton = document.getElementById("button3")
clearButton.addEventListener('click',() => {
    clear();
})  

/*  delete button */
const delButton = document.getElementById("button4")
delButton.addEventListener('click',() => {
    deleteButton();
})  
