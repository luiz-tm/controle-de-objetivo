var objetivoAtual = document.getElementById('objetivo-atual-js')
var saldoAtual = document.getElementById('saldo-atual-js')
var objetivoInput = document.getElementById('input-objective')
var saldoInput = document.getElementById('input-saldo')
var porcentagemObjetivo = document.getElementById('progress-percent')
var progressBar = document.getElementById('div-bar')

var Storage = localStorage;

const updateObjective = () => {
    localStorage.setItem('objetivo', objetivoInput.value);
    updateApp()
}

const updateSaldo = () => {
    valueSaldo = Number(saldoAtual.value) + Number(saldoInput.value)
    localStorage.setItem('saldo', valueSaldo);
    saldoInput.value = ``
    updateApp()
}

const updateApp = () => {
    objetivoInput.value = localStorage.getItem('objetivo')
    saldoAtual.value = localStorage.getItem('saldo')

    var valueObjetivo = Number(objetivoInput.value).toFixed(2)
    var valueSaldo = Number(saldoAtual.value).toFixed(2)

    porcentagemObjetivo.value = (valueSaldo * 100) / valueObjetivo
    
    objetivoAtual.innerHTML = `R$ ${valueObjetivo}`
    saldoAtual.innerHTML = `R$ ${valueSaldo}`
    porcentagemObjetivo.innerHTML = `${porcentagemObjetivo.value.toFixed(2)}%`

    if(porcentagemObjetivo.value >= 0)
    {
        if(porcentagemObjetivo.value <= 100)
        {
            progressBar.style.width = `${porcentagemObjetivo.value}%`
        }
        else
        {
            progressBar.style.width = `100%`
        }
    }
    else
    {
        progressBar.style.width = `0%`
    }
}

updateApp()


