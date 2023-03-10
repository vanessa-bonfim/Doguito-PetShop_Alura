import { valida } from "./validacao.js";

const inputs = document.querySelectorAll('input')

// evento blur é para quando se perde o foco do campo

inputs.forEach(input => {
    input.addEventListener('blur', (evento) =>{ 
        valida(evento.target)
    })
})