/**
 * Pede dados e devolve a resposta
 */
const listaClientes = () => {
    return fetch(`http://localhost:3000/profile`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            }
            throw new Error('Não foi possível listar os clientes.')
        });
    /* const promise = new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.open('GET', 'http://localhost:3000/profile');
        http.send();

        http.onload = () => {
            if (http.status >= 400) {
                reject(JSON.parse(http.response));
            } else {
                resolve(JSON.parse(http.response));
            }
        };
    });
    return promise; */
};

const criaCliente = (nome, email) => {
    return fetch(`http://localhost:3000/profile`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.body;
            }
            throw new Error('Não foi possível criar um cliente.')
        })
};

const removeCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (!resposta.ok) {
            throw new Error('Não foi possível remover um cliente.')
        }
    })
};

const detalhaCliente = (id) => {
    return fetch(`http://localhost:3000/profile/${id}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            }
            throw new Error('Não foi possível detalhar um cliente.')
        });
};

const atualizaCliente = (id, nome, email) => {
    return fetch(`http://localhost:3000/profile/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email
        })
    })
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            }
            throw new Error('Não foi possível atualizar os clientes.')
        })
};

export const clienteService = {
    listaClientes,
    criaCliente,
    removeCliente,
    detalhaCliente,
    atualizaCliente
};