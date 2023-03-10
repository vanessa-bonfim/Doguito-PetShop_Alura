/* Código refatorado
const dataNascimento = document.querySelector('#nascimento')

dataNascimento.addEventListener('blur', (evento) =>{ // Quando se perde o foco do campo
    validaDataNascimento(evento.target)
})
 */
//Podemos acessar um data-atributes do input com dataset depois diz qual atribute.
export function valida(input) {
    
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
}

const validadores = {
    dataNascimento:input => validaDataNascimento(input)
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)){
    mensagem = 'Você deve ser maior que 18 anos para se cadastrar'
    }

    input.setCustomValidity(mensagem) /*função específica do input que retorna uma string  */
}

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual /* retorna um boolean */
}