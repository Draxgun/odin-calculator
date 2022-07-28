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
let operators = ['+','-','*','/']

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

/*Function that creates grid */
let createGrid = (n) => {
    for(let i=1; i<=n*n;i++) {        
          let grid = document.createElement('div');
          grid.classList.add("button");
          grid.setAttribute('id', `button${i}` );
          calculatorButtons.appendChild(grid);
          calculatorButtons.style.gridTemplateColumns = `repeat(${n},1fr)`
      }
/*     createClickEvents(); */
  }

createGrid(4);

