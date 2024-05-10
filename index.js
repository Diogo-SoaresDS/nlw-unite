let participantes = [
    {
        nome: 'Diego Fernandes',
        email: 'diego@gmail.com',
        dataInscricao: new Date(2024, 2, 1, 19, 23),
        dataCheckIn: new Date(2024, 2, 1, 20, 20)
    },
    {
        nome: 'Mayk Brito',
        email: 'mayk@gmail.com',
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: null
    },
    {
        nome: 'Ana Silva',
        email: 'ana@gmail.com',
        dataInscricao: new Date(2024, 2, 10, 12, 45),
        dataCheckIn: new Date(2024, 2, 10, 18, 30)
    },
    {
        nome: 'João Souza',
        email: 'joao@gmail.com',
        dataInscricao: new Date(2024, 2, 5, 8, 0),
        dataCheckIn: new Date(2024, 2, 5, 9, 15)
    },
    {
        nome: 'Maria Oliveira',
        email: 'maria@gmail.com',
        dataInscricao: new Date(2024, 2, 18, 17, 30),
        dataCheckIn: null
    },
    {
        nome: 'Carlos Santos',
        email: 'carlos@gmail.com',
        dataInscricao: new Date(2024, 2, 14, 10, 0),
        dataCheckIn: new Date(2024, 2, 14, 11, 30)
    },
    {
        nome: 'Juliana Lima',
        email: 'juliana@gmail.com',
        dataInscricao: new Date(2024, 2, 8, 15, 20),
        dataCheckIn: new Date(2024, 2, 8, 17, 0)
    },
    {
        nome: 'Rafaela Costa',
        email: 'rafaela@gmail.com',
        dataInscricao: new Date(2024, 2, 27, 9, 45),
        dataCheckIn: new Date(2024, 2, 27, 10, 30)
    },
    {
        nome: 'Pedro Nunes',
        email: 'pedro@gmail.com',
        dataInscricao: new Date(2024, 2, 3, 14, 10),
        dataCheckIn: null
    },
    {
        nome: 'Lucas Rodrigues',
        email: 'lucas@gmail.com',
        dataInscricao: new Date(2024, 2, 20, 20, 30),
        dataCheckIn: null
    }
]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
    if(participante.dataCheckIn === null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
                Confirmar check-in
            </button>
        `
    }

    return `
    <tr>
        <td>
            <strong>${participante.nome}</strong>
            <br />
            <small>
                ${participante.email}
            </small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ''
    for(let participante of participantes) {
        output += criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output  
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)
    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    const participanteExiste = participantes.find(p => p.email === participante.email)

    if(participanteExiste) {
        alert('Participante já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    event.target.querySelector('[name="nome"]').value = ''
    event.target.querySelector('[name="email"]').value = ''

}

const fazerCheckIn = (event) => {
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
 
    if(confirm(mensagemConfirmacao) === false) {
        return
    }

    const participante = participantes.find(p => p.email === event.target.dataset.email)

    participante.dataCheckIn = new Date()
    atualizarLista(participantes)
}