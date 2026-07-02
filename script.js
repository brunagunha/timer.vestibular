let dadosVestibulares = {};
let intervalo;

async function carregarDados() {
    const resposta = await fetch("vestibulares.json");
    dadosVestibulares = await resposta.json();
}

function iniciarPesquisa() {
    const input = document.getElementById("vestibular").value.toLowerCase().trim();

    const resultado = dadosVestibulares[input];

    if (!resultado) {
        alert("Vestibular não encontrado no banco de dados.");
        return;
    }

    document.getElementById("titulo").innerText = resultado.nome;
    document.getElementById("descricao").innerText = resultado.descricao;

    const dataProva = new Date(resultado.data);

    if (intervalo) clearInterval(intervalo);

    intervalo = setInterval(() => {
        atualizarTimer(dataProva);
    }, 1000);
}

function atualizarTimer(dataProva) {
    const agora = new Date();
    const diferenca = dataProva - agora;

    if (diferenca <= 0) {
        document.getElementById("dias").innerText = 0;
        document.getElementById("horas").innerText = 0;
        document.getElementById("minutos").innerText = 0;
        document.getElementById("segundos").innerText = 0;
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = horas;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("segundos").innerText = segundos;
}

carregarDados();