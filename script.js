var objetivoAtual = document.getElementById('objetivo-atual-js')
var saldoAtual = document.getElementById('saldo-atual-js')
var objetivoInput = document.getElementById('input-objective')
var saldoInput = document.getElementById('input-saldo')
var porcentagemObjetivo = document.getElementById('progress-percent')
var progressBar = document.getElementById('div-bar')
var lastUpdate = document.getElementById('last-update')
var restante = document.getElementById('restante-js')

var Storage = localStorage;

/* window.alert(`${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`) */


const updateObjective = () => {
    updateDate()
    localStorage.setItem('objetivo', objetivoInput.value);
    updateApp()
}

const updateSaldo = () => {
    updateDate()
    valueSaldo = (Number(saldoAtual.value) + Number(saldoInput.value.replace(',','.')))
    localStorage.setItem('saldo', valueSaldo);
    saldoInput.value = ``
    updateApp()
}

const updateDate = () => {
    var data = new Date()
    var dia = data.getDate()
    var mes = data.getMonth()+1
    var ano = data.getFullYear()
    var hora = data.getHours()
    var minuto = data.getMinutes()
    var segundo = data.getSeconds()
    localStorage.setItem('gettime', `${dia}/${mes}/${ano} - ${hora}:${minuto}:${segundo}`)
}

const resetInfo = () => {
    localStorage.setItem('saldo', 0)
    localStorage.setItem('objetivo', 0)
    updateApp()
}

const updateApp = () => {

    objetivoInput.value = localStorage.getItem('objetivo')
    saldoAtual.value = localStorage.getItem('saldo')

    var valueObjetivo = Number(objetivoInput.value).toFixed(2)
    var valueSaldo = Number(saldoAtual.value).toFixed(2)
    var valueRestante = Number(valueObjetivo-valueSaldo).toFixed(2)

    porcentagemObjetivo.value = (valueSaldo * 100) / valueObjetivo

    if(isNaN(porcentagemObjetivo.value))
    {
        porcentagemObjetivo.value = 0
    }
    
    objetivoAtual.innerHTML = `R$ ${valueObjetivo}`
    saldoAtual.innerHTML = `R$ ${valueSaldo}`

    if(valueObjetivo-valueSaldo >= 0) { restante.innerHTML = `R$ ${valueRestante}`} else 
    { restante.innerHTML = `Ultrapassado`}

    
    porcentagemObjetivo.innerHTML = `${porcentagemObjetivo.value.toFixed(2)}%`

    lastUpdate.innerHTML = `Última atualização: <strong>${localStorage.getItem('gettime')}</strong>`

    if(localStorage.getItem('gettime') == null)
    {
        lastUpdate.innerHTML = `Última atualização: <strong>Nunca</strong>`
    }

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


