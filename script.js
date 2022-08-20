/* 
    Application created by Luiz Henrique.
    Access      github.com/luiz-tm      for more contents.
*/


// Document Object Model
let targetHTML = document.querySelector('#objetivo-atual-js')
let balanceHTML = document.querySelector('#saldo-atual-js')
let remainHTML = document.querySelector('#restante-js')
let targetInput = document.querySelector('#input-objective')
let updateButton = document.querySelector('#button-update')
let clearButton = document.querySelector('.button-clear')
let balanceInput = document.querySelector('#input-saldo')
let addButton = document.querySelector('.add-button')
let progressHTML = document.querySelector('.progress-percent')
let progressBar = document.querySelector('#div-bar')
//

// Application variables
let target = 0, balance = 0, remain = 0, progress = 0;
//

// GET and SET methods
const setTarget = (value) => target = value;
const setBalance = (value) => balance = value;
const setRemain = (value) => remain = value;

const setProgress = (value) => progress = value;
const setProgressBar = (value) => progressBar.style.width = value < 100 ? `${value}%` : '100%';

const getTarget = () => target;
const getBalance = () => balance;
const getRemain = () => remain;

const getProgress = () => progress;
//

const loadValues = () =>
{
    setTarget(localStorage.getItem('target'))
    setBalance(localStorage.getItem('balance'))
    setRemain(Number(target)-Number(balance))

    if(getTarget() == null) { setTarget(0); }
    if(getBalance() == null) { setBalance(0); }
    if(getRemain() == null) { setRemain(0); }

    setProgress(getTarget() != 0 ? ((getBalance()/getTarget())*100) : 0)
    setProgressBar(getProgress())
}

const fixNumber = (number) => number < 10 && number > 0 ? `0${number}` : number;

const updateApp = () => 
{
    loadValues()

    targetHTML.innerHTML = `R$ ${fixNumber(Number(getTarget()).toFixed(2)).replace('.',',')}`
    balanceHTML.innerHTML = `R$ ${fixNumber(Number(getBalance()).toFixed(2)).replace('.',',')}`
    remainHTML.innerHTML = (getTarget()-getBalance()) >= 0 ? `R$ ${fixNumber(Number(getRemain()).toFixed(2)).replace('.',',')}` : `Ultrapassado`
    progressHTML.innerHTML = `${Math.floor(getProgress())}%`
}

const updateTarget = (value) => localStorage.setItem('target', value);
const updateBalance = (value) => localStorage.setItem('balance', Number(getBalance())+Number(value))

const clearApp = () =>
{
    localStorage.setItem('target', 0)
    localStorage.setItem('balance', 0)
    updateApp()
}

const App = () => 
{
    updateApp();

    clearButton.addEventListener('click', () => clearApp())

    updateButton.addEventListener('click', () => {
        if(!targetInput.value.length)
            return alert('You must type a number first.')
        
        if(!Number(targetInput.value))
            return alert('You must type a number.')
        
        if(Number(targetInput.value) < 0)
            return alert('The number must be greater than 0.')
        
        updateTarget(targetInput.value);
        updateApp()
    })

    addButton.addEventListener('click', () => {
        if(!balanceInput.value.length)
            return alert('You must type a number first.')
        
        if(!Number(balanceInput.value))
            return alert('You must type a number.')

            if(Number(balanceInput.value) < 0)
            return alert('The number must be greater than 0.')
        
        updateBalance(balanceInput.value)
        updateApp()
    })
}

App();