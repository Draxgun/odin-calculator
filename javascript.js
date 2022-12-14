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

/* power */
const power = function(a,b) {
	return a**b
};

/* factorial */
const factorial = function(a) {
	let result = a;
  if(a!=0){
    for(let i=1;i<=a-1;i++){
      result = result*i;
    }
    return result;
  }else{
    return 1;
  }

};

/* Tests */
/* let a = 1;
let b = 2;

console.log(add(a,b))
console.log(substract(a,b))
console.log(multiply(a,b))
console.log(divide(a,b)) */

/* Operate */
let operators = ['+','-','*','/','x','÷','!','^']

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
    }else if (operator==='x' || operator==='*'){
        return multiply(a,b);
    }else if (operator==='÷'|| operator==='/'){
        return divide(a,b);
    }else if (operator==='^'){
        return power(a,b);
    }else if (operator==='÷'){
        return divide(a,b);
    }else if (operator==='!'){
        return factorial(a);
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
    let buttonContent = ['^','!','AC','DEL',"7","8","9",'÷','4','5','6','x','1','2','3','+','.','0','=','-']
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
        if(button.getAttribute('id')==='button3' || button.getAttribute('id')==='button4'||button.getAttribute('id')==='button19' ){

        }else{
            button.addEventListener('click',()=>{
                bottomTextContent = bottomTextContent +button.textContent;
                updateText()});
        }});
}



/* Checks if text updated */
let updateText = () =>{
    checkForPoints();
    checkForLenght();
    checkForOperator();
    topText.textContent = topTextContent;
    bottomText.textContent = bottomTextContent;
}

/* Clear all content */
let clear= () =>{
    topTextContent="";
    bottomTextContent ="";
    topText.textContent = "";
    bottomText.textContent = "";
}

let deleteButton = () =>{
    bottomTextContent = bottomTextContent.toString();
    bottomTextContent = bottomTextContent.slice(0, -1);
    topText.textContent = topTextContent;
    bottomText.textContent = bottomTextContent;
}

/* Checks if operators have been clicked */
let checkForOperator = () =>{
    if(operators.some(operator => bottomTextContent.includes(operator))){
        topTextContent = bottomTextContent;
        bottomTextContent = "";
    }else if(operators.some(operator => topTextContent.includes(operator))){
        topTextContent = topTextContent + bottomTextContent.slice(-1) ;
        bottomTextContent = bottomTextContent;
    }else{
        topTextContent = topTextContent;
        bottomTextContent = bottomTextContent;
    }

}

/* Calculate Expression */
let calculateExpression = () => {
    if(topTextContent!=''){

        /* Returns the operator that is used */
        const operator = operators.filter(operator => topTextContent.includes(operator)).join();
        let num1 = topTextContent.split(operator)[0];
        num1 = parseFloat(num1)
        let num2 = topTextContent.split(operator)[1];
        num2 = parseFloat(num2);
        let result = operate(num1,num2,operator)
        if (result.toString().length<16){
            if (result%1===0){
                bottomTextContent = result.toString()
                topTextContent = bottomTextContent;
                topText.textContent = topTextContent;
                bottomText.textContent = bottomTextContent;
            }else{
                bottomTextContent = result.toFixed(2).toString()
                topTextContent = bottomTextContent;
                topText.textContent = topTextContent;
                bottomText.textContent = bottomTextContent;
            }
        }else{
            alert("This operation is to large to be done")
            bottomTextContent = ""
            topTextContent = ""
            topText.textContent = topTextContent;
            bottomText.textContent = bottomTextContent;
        }


    }else{
        topTextContent=bottomTextContent;
        bottomTextContent =bottomTextContent;
        topText.textContent = topTextContent;
        bottomText.textContent = bottomTextContent;
    }

}

 /* Checks the result */
let checkForLenght = () => {
    if (bottomTextContent.length> 9 || topTextContent.length>12 ){
        alert('You exceeded the amount of digits permitted')    
        bottomTextContent = ''
        topTextContent = "";
    }
}

/* Checks for multiple decimal points */
let checkForPoints = () =>{
    count = bottomTextContent.split('.').length - 1;
    if(count>1){
        bottomTextContent=bottomTextContent.slice(0,-1);
    }
}



/* Creates all the buttons */
createGrid(4,5);

/* Keyboard compatibility */
document.onkeydown = function (e) {
    let validInputs = ['^','!','AC','DEL',"7","8","9",'÷','4','5','6','x','1','2','3','+','.','0','=','-','Enter',"Backspace",'Delete','*',"/"];
    e = e || window.event;
    console.log(e.key)
    if (validInputs.includes(e.key)){
        if (e.key === 'Enter'){
            calculateExpression()
        }else if (e.key === 'Backspace'){
            deleteButton();
        }else if (e.key === 'Delete'){
            clear();
        }else if (e.key === '*'){
            bottomTextContent = bottomTextContent + "x";
            bottomText.textContent = bottomTextContent
            updateText();
        }else if (e.key === '/'){
            bottomTextContent = bottomTextContent.toString() + "÷";
            updateText();
        }
        else{
            bottomTextContent = bottomTextContent + e.key;
            updateText();
        }

    } 

};

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

/* calculate button */
const calculateButton = document.getElementById('button19')
calculateButton.addEventListener('click', () =>{
    calculateExpression();
});