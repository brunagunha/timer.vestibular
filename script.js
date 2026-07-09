// 1. Banco de dados dos vestibulares com as datas e informações corretas
// O "-03:00" no final das datas garante o fuso horário de Brasília!
const dadosVestibulares = {
    "enem": {
        nome: "Contagem Regressiva: ENEM 2026",
        data: "2026-11-08T13:00:00-03:00", // Exemplo: 1º dia do ENEM às 13h
        estrutura: "90 questões por dia + Redação (Total de 180 questões).",
        materias: "Linguagens, Ciências Humanas, Ciências da Natureza e Matemática.",
        dica: "Organize seu cronograma priorizando a TRI (Teoria de Resposta ao Item) e faça provas anteriores!"
    },
    "fuvest": {
        nome: "Contagem Regressiva: FUVEST 2027",
        data: "2026-11-15T13:00:00-03:00", // Data fictícia/estimada para fim de 2026
        estrutura: "1ª Fase: 90 questões objetivas. 2ª Fase: Discursivas + Redação.",
        materias: "Disciplinas do Ensino Médio com forte cobrança de leitura obrigatória.",
        dica: "Não ignore a lista de livros obrigatórios e treine bastante a escrita para a segunda fase!"
    }
};

// Vestibular padrão ao abrir a página
let vestibularAtual = "enem";
let intervaloCronometro;

function iniciarCronometro() {
    // Limpa o intervalo anterior se o usuário mudar de vestibular
    clearInterval(intervaloCronometro);

    const dados = dadosVestibulares[vestibularAtual];
    const dataAlvo = new Date(dados.data).getTime();

    // Atualiza os textos da tela com o vestibular selecionado
    document.getElementById("nome-vestibular").innerText = dados.nome;
    document.getElementById("info-estrutura").innerText = dados.estrutura;
    document.getElementById("info-materias").innerText = dados.materias;
    document.getElementById("info-dica").innerText = dados.dica;

    function atualizarTela() {
        const agora = new Date().getTime();
        const diferenca = dataAlvo - agora;

        if (diferenca <= 0) {
            document.getElementById("nome-vestibular").innerText = `${dados.nome} - A prova já começou!`;
            zerarCronometro();
            clearInterval(intervaloCronometro);
            return;
        }

        // Constantes de conversão exatas
        const umSegundo = 1000;
        const umMinuto = umSegundo * 60;
        const umaHora = umMinuto * 60;
        const umDia = umaHora * 24;
        const umMes = umDia * 30.4368; // Média exata de dias por mês no ano

        // Cálculos matemáticos corrigidos
        const meses = Math.floor(diferenca / umMes);
        const dias = Math.floor((diferenca % umMes) / umDia);
        const horas = Math.floor((diferenca % umDia) / umaHora);
        const minutos = Math.floor((diferenca % umaHora) / umMinuto);
        const segundos = Math.floor((diferenca % umMinuto) / umSegundo);

        // Atualiza os elementos do seu HTML usando o padStart para ficar sempre com dois dígitos (ex: 05 em vez de 5)
        document.getElementById("meses").innerText = String(meses).padStart(2, '0');
        document.getElementById("dias").innerText = String(dias).padStart(2, '0');
        document.getElementById("horas").innerText = String(horas).padStart(2, '0');
        document.getElementById("minutos").innerText = String(minutos).padStart(2, '0');
        document.getElementById("segundos").innerText = String(segundos).padStart(2, '0');
    }

    // Executa imediatamente e depois a cada segundo
    atualizarTela();
    intervaloCronometro = setInterval(atualizarTela, 1000);
}

function zerarCronometro() {
    document.getElementById("meses").innerText = "00";
    document.getElementById("dias").innerText = "00";
    document.getElementById("horas").innerText = "00";
    document.getElementById("minutos").innerText = "00";
    document.getElementById("segundos").innerText = "00";
}

// Configuração do botão de busca/atualizar do seu HTML
document.getElementById("btn-atualizar").addEventListener("click", () => {
    const input = document.getElementById("vestibular-input").value.toLowerCase().trim();
    
    if (dadosVestibulares[input]) {
        vestibularAtual = input;
        iniciarCronometro();
    } else {
        alert("Vestibular não encontrado! Tente digitar 'enem' ou 'fuvest'.");
    }
});

// Inicializa o site mostrando o ENEM por padrão
iniciarCronometro();
