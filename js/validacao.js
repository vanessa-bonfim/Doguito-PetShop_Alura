/* Código refatorado
const dataNascimento = document.querySelector('#nascimento')

dataNascimento.addEventListener('blur', (evento) =>{ // Quando se perde o foco do campo
    validaDataNascimento(evento.target)
})
 */

//Podemos acessar um data-atributes do input com dataset depois diz qual atribute.
export function valida(input) {

    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O campo Nome não pode estar vazio.'
    },
    email: {
        valueMissing: 'O campo Email não pode estar vazio.',
        typeMismatch: 'O campo digitado não é válido.'
    },
    senha: {
        valueMissing: 'O campo Senha não pode estar vazio.',
        patternMismatch: 'A senha deve conter entre 6 a 12 caracteres, pelo menos uma letra maiúscula, um numero e não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo Data de Nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo CPF não pode estar vazio.',
        customError: 'O CPF digitado não é válido.'
    },
    cep: {
        valueMissing: 'O campo CEP não pode estar vazio.',
        patternMismatch: 'O CEP digitado não é válido.'
    },
    logradouro: {
        valueMissing: 'O campo Logradouro não pode estar vazio.'

    },
    cidade: {
        valueMissing: 'O campo Cidade não pode estar vazio.',
        customError: 'Não foi possível buscar o CEP.'

    },
    estado: {
        valueMissing: 'O campo Estado não pode estar vazio.'

    },
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input),
    cep: input => recuperarCEP(input),
}

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach(erro => {
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if (!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior que 18 anos para se cadastrar.'
    }

    input.setCustomValidity(mensagem) /*função específica do input que retorna uma string  */
}

function maiorQue18(data) {
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual /* retorna um boolean */
}

function validaCPF(input) {
    const cpfFormatado = input.value.replace(/\D/g, '')
    let mensagem = ''

    if (!checaCPFRepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)) {
        mensagem = 'O CPF digitado não é válido.'
    }

    input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf) {
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ]

    let cpfValido = true

    valoresRepetidos.forEach(valor => {
        if (valor == cpf) {
            cpfValido = false
        }
    })

    return cpfValido
}


/** Nós temos que calcular a soma dos nove primeiros dígitos,
 * considerando o primeiro dígito verificador.
 * Porém, nós não vamos fazer a soma 1 + 2 + 3 + 4 + 5 + 6,
 * nós vamos fazer cada um dos dígitos multiplicado por 10, por 9, por 8, por 7, por 6, até chegar em 2.
 * let soma = (10 * 1) + (9 * 2) + (8 * 3) ... (2 * 9)
 */
/**
 * Essa que é a conta maluca que nós vamos ter que fazer para poder descobrir o primeiro dígito verificador
 * let digitoVerificador = 11 - (soma % 11)
 */

function checaEstruturaCPF(cpf) {
    const multiplicador = 10

    return checaDigitoVerificador(cpf, multiplicador)
}

function checaDigitoVerificador(cpf, multiplicador) {

    if (multiplicador >= 12) {
        return true
    }

    let multiplicadorInicial = multiplicador
    let soma = 0

    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
    const digitoVerificador = cpf.charAt(multiplicador - 1)

    for (let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--) {
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++
    }

    if (digitoVerificador == confirmaDigito(soma)) {
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false
}
/**
 * 
    function checaDigitoVerificadorCPF(cpf, multiplicador) {
        let soma = 0
        let contador = 0
        const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
        const digitoVerificador = cpf.charAt(multiplicador - 1)
        for(; multiplicador > 1 ; multiplicador--) {
            soma = soma + cpfSemDigitos[contador] * multiplicador
            contador++
        }

        if(soma % 11 > 9) {
            return digitoVerificador == 0
        }

        return digitoVerificador == 11 - (soma % 11)
    }
*/

function confirmaDigito(soma) {
    return 11 - (soma % 11)
}

function recuperarCEP(input) {

    const cep = input.value.replace(/\D/g, '')
    const url = `https://viacep.com.br/ws/${cep}/json`
    const options = {
        method: 'GET', // é o tipo de requisição que será feita.
        mode: 'cors', // indica que a comunicação será feita entre aplicações diferentes.
        headers: { 
            'content-type': 'application/json;charset=utf-8'
        }// diz como que queremos receber as informações da API.
    }

    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(url,options).then(
            response => response.json()
        ).then(
            data => {
                if(data.erro){
                    input.setCustomValidity('Não foi possível buscar o CEP.')
                    return
                }

                input.setCustomValidity('')
                preencherCamposComCEP(data)
                return  
            }
        )

    }

    function preencherCamposComCEP(data) {
        const logradouro = document.querySelector('[data-tipo="logradouro"]')
        const cidade = document.querySelector('[data-tipo="cidade"]')
        const estado = document.querySelector('[data-tipo="estado"]')

        logradouro.value = data.logradouro
        cidade.value = data.localidade
        estado.value = data.uf
    }
}