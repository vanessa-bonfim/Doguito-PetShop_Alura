import { clienteService } from "../service/cliente-service.js";

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

   const nome = evento.target.querySelector('[data-nome]').value;
   const email = evento.target.querySelector('[data-email]').value;

   clienteService.criaCliente(nome, email)
    .then(()=>{
        window.location.href = '../html/cadastra_cliente_concluido.html'
    });
});