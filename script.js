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
const setTarget = (value) => target = Number(value);
const setBalance = (value) => balance = Number(value);
const setRemain = (value) => remain = Number(value);

const setProgress = (value) => progress = value;
const setProgressBar = (value) => progressBar.style.width = value > 0 ? (value < 100 ? `${value}%` : '100%') : ('0%');

const getTarget = () => Number(target);
const getBalance = () => Number(balance);
const getRemain = () => Number(remain);

const getProgress = () => progress;
//

// UTILS
const fixNumber = (number) => number < 10 && number > 0 ? `0${number}` : number;

const formatNumber = (number) => fixNumber(fixNumber(Number(number).toFixed(2)).replace('.',','))

const formatProgress = (number) => Math.floor(number)
//

const loadValues = () =>
{
    setTarget(localStorage.getItem('target'))
    setBalance(localStorage.getItem('balance'))
    setRemain(getTarget()-getBalance())

    if(getTarget() == null) { setTarget(0); }
    if(getBalance() == null) { setBalance(0); }
    if(getRemain() == null) { setRemain(0); }

    setProgress(getTarget() != 0 ? ((getBalance()/getTarget())*100) : 0)
}

// Update functions
const updateTarget = (value) => localStorage.setItem('target', value);
const updateBalance = (value) => localStorage.setItem('balance', getBalance()+Number(value))

const updateDOM = () =>
{
    targetHTML.innerHTML = `R$ ${formatNumber(getTarget())}`
    balanceHTML.innerHTML = `R$ ${formatNumber(getBalance())}`
    remainHTML.innerHTML = (getTarget()-getBalance()) >= 0 ? `R$ ${formatNumber(getRemain())}` : `Ultrapassado`
    progressHTML.innerHTML = `${formatProgress(getProgress())}%`

    setProgressBar(getProgress())
}

const updateApp = () => 
{
    loadValues()
    updateDOM();
}

const clearApp = () =>
{
    localStorage.setItem('target', 0)
    localStorage.setItem('balance', 0)
    updateApp()
}
//

// Application function
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
        
        updateBalance(balanceInput.value)
        updateApp()
    })
}
//

App();