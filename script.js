
const display=document.querySelector('.calculator-input')
const previous=document.querySelector('.calculator-previousinput')
const keys=document.querySelector('.calculator-keys')
const delbtn=document.querySelector('.back')

window.addEventListener('keydown', handleKeyboardInput)
let displayValue="0"
let firstValue=null;
let operator=null;
let waitingForSecondValue=false;
let previousValue=""


updateDisplay();

function updateDisplay(){
    display.value=displayValue

    
    
    
    

    
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
if(nextOperator==="+"){
    previous.value= displayValue+nextOperator
    console.log("this")
    }
    if(nextOperator==="-"){
        previous.value= displayValue+nextOperator
        }
        if(nextOperator==="/"){
            previous.value= displayValue+nextOperator
            }
            if(nextOperator==="*"){
                previous.value= displayValue+nextOperator
                }
    if(nextOperator==="="&&operator!=null && operator!="="){
        previous.value= (firstValue+operator+displayValue+"=")
    }

if(operator&&waitingForSecondValue){
    operator=nextOperator
    return;
}

if(firstValue===null){
    firstValue=value;
}else if(operator){
    console.log(firstValue+"bu first value"+value)
    const result= add(firstValue,value,operator);
    previous.value=result
    displayValue= Math.round(result*1000)/1000;
    firstValue= result
    // console.log("yeni first"+firstValue+" result ise"+result)
    
}



waitingForSecondValue=true;
operator=nextOperator;

console.log(displayValue,operator,firstValue,waitingForSecondValue)
}


function inputNumber(number){
    if(waitingForSecondValue){
        displayValue=number;
        waitingForSecondValue=false
    } else {
        displayValue = displayValue==='0'? number: displayValue + number;
        
    }
    
        console.log(displayValue,operator,firstValue,waitingForSecondValue)
}

function inputDecimal(){
    if(!displayValue.includes('.')) {
    displayValue+='.';
    }
}

function clear(){
    displayValue='';
    firstValue=null;
    operator=null;
    waitingForSecondValue=false;
    previous.value=""

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
    if (e.key ===',')inputDecimal()

    
    
    

    updateDisplay()
}

