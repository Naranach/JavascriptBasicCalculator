
const display=document.querySelector('.calculator-input')
const keys=document.querySelector('.calculator-keys')
const delbtn=document.querySelector('.back')

window.addEventListener('keydown', handleKeyboardInput)
let displayValue='0';
let firstValue=null;
let operator=null;
let waitingForSecondValue=false;


updateDisplay();

function updateDisplay(){
    display.value=displayValue;
}
keys.addEventListener('click',function(e){
    const element=e.target;

    if(!element.matches('button'))return;

    if(element.classList.contains('operator')){
    handleOperator(element.value);
    updateDisplay()
    return;
}
    if(element.classList.contains('decimal')){
    inputDecimal(element.value);
    updateDisplay()
    return;
}
    if(element.classList.contains('clear')){
    clear();
    updateDisplay();
    return;
}
    if(element.classList.contains('back')){
        back();
        updateDisplay();
        return;
    }

inputNumber(element.value);
updateDisplay();
})

function handleOperator(nextOperator){
const value=parseFloat(displayValue);
if(operator&&waitingForSecondValue){
    operator=nextOperator
    return;
}

if(firstValue===null){
    firstValue=value;
}else if(operator){
    const result= add(firstValue,value,operator);
    displayValue= String(result.toFixed(3));
    firstValue= result;

}

waitingForSecondValue=true;
operator=nextOperator;
console.log(displayValue,firstValue,operator,waitingForSecondValue)
}


function inputNumber(number){
    if(waitingForSecondValue){
        displayValue=number;
        waitingForSecondValue=false
    } else {
        displayValue = displayValue==='0'? number: displayValue + number;
    }
    console.log(displayValue,firstValue,operator,waitingForSecondValue)
}

function inputDecimal(){
    if(!displayValue.includes('.')){
    displayValue+='.';
    }
}

function clear(){
    displayValue='0';
    firstValue=null;
    operator=null;
    waitingForSecondValue=false;

}

function add (first,second,operator){
    if(operator==='+'){
return first + second;
} else if(operator=== '-'){
    return first - second;
} else if (operator=== '*'){
    return first * second;
} else if(operator=== '/'){
    return first / second;
} else if (operator==='←'){
    return displayValue=displayValue.toString().slice(0,-1)
}
return second;
}

function back(){
    displayValue=displayValue.toString().slice(0,-1)
}


function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) inputNumber(e.key)
    if (e.key ==='Backspace')back()
    if (e.key ==='+')handleOperator("+")
    if (e.key ==='-')handleOperator("-")
    if (e.key ==='/')handleOperator("/")
    if (e.key ==='*')handleOperator("*")
    if (e.key ==='Enter')handleOperator("=")
    if (e.key ==='Escape')clear()

    
    
    

    updateDisplay()
}