import { valida } from "./validacao.js";

const inputs = document.querySelectorAll('input')

// evento blur é para quando se perde o foco do campo

inputs.forEach(input => {
    //Antes de enviar, adiciona a mascara.
    if (input.dataset.tipo == 'preco') {
        SimpleMaskMoney.setMask(input, { 
            prefix: 'R$ ',
            fixed: true,
            fractionDigits: 2,
            decimalSeparator: ',',
            thousandsSeparator: '.',
            cursor: 'end'
        })
    }
    
    input.addEventListener('blur', (evento) => {
        valida(evento.target)
    })
})