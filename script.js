// Banco de dados simulado para os principais vestibulares
const dadosVestibulares = {
    "enem": {
        nome: "ENEM 2026",
        data: "November 8, 2026 13:00:00",
        estrutura: "90 questões por dia + Redação (Total de 180 questões multipla escolha).",
        materias: "Linguagens, Ciências Humanas, Ciências da Natureza e Matemática.",
        dica: "A nota usa o sistema TRI. Não chute tudo igual, foque em garantir as questões fáceis!"
    },
    "fuvest": {
        nome: "FUVEST 2027",
        data: "November 15, 2026 13:00:00",
        estrutura: "1ª Fase: 90 questões objetivas. 2ª Fase: Discursivas + Redação.",
        materias: "Core de matérias do Ensino Médio com forte cobrança em Leitura Obrigatória.",
        dica: "A Fuvest exige muito conteúdo clássico e leitura atenta dos livros obrigatórios!"
    },
    "unicamp": {
        nome: "UNICAMP 2027",
        data: "October 18, 2026 13:00:00",
        estrutura: "1ª Fase: 72 questões. 2ª Fase: Questões discursivas específicas + Redação.",
        materias: "Foco em interdisciplinaridade e criticidade nas questões.",
        dica: "A redação da Unicamp exige formatos diferentes (cartas, manifestos, etc.). Treine gêneros textuais!"
    }
};

// Data padrão inicial (Caso o input não bata com nosso banco, jogamos uma data padrão de 6 meses à frente)
let dataAlvo = new Date(dadosVestibulares.enem.data).getTime();
let intervaloCronometro;

function atualizarCronometro() {
    const agora = new Date().getTime();
    const diferenca = dataAlvo - agora;

    if (diferenca <= 0) {
        clearInterval(intervaloCronometro);
        document.getElementById("meses").innerText = "00";
        document.getElementById("dias").innerText = "00";
        document.getElementById("horas").innerText = "00";
        document.getElementById("minutos").innerText = "00";
        document.getElementById("segundos").innerText = "00";
        return;
    }

    // Cálculos matemáticos de conversão de tempo
    const umSegundo = 1000;
    const umMinuto = umSegundo * 60;
    const umaHora = umMinuto * 60;
    const umDia = umaHora * 24;
    const umMes = umDia * 30.44; // Média de dias por mês

    const meses = Math.floor(diferenca / umMes);
    const dias = Math.floor((diferenca % umMes) / umDia);
    const horas = Math.floor((diferenca % umDia) / umaHora);
    const minutos = Math.floor((diferenca % umaHora) / umMinuto);
    const segundos = Math.floor((diferenca % umMinuto) / umSegundo);

    // Inserindo os valores na tela formatados com zero à esquerda se menor que 10
    document.getElementById("meses").innerText = meses < 10 ? "0" + meses : meses;
    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;
}

// Evento do Botão de Atualizar
document.getElementById("btn-atualizar").addEventListener("click", () => {
    const inputUser = document.getElementById("vestibular-input").value.trim().toLowerCase();
    
    if (inputUser === "") return;

    if (dadosVestibulares[inputUser]) {
        // Se achou no sistema (Enem, Fuvest ou Unicamp)
        const info = dadosVestibulares[inputUser];
        document.getElementById("nome-vestibular").innerText = `Contagem Regressiva: ${info.nome}`;
        document.getElementById("info-estrutura").innerText = info.estrutura;
        document.getElementById("info-materias").innerText = info.materias;
        document.getElementById("info-dica").innerText = info.dica;
        dataAlvo = new Date(info.data).getTime();
    } else {
        // Se o usuário digitar outro vestibular genérico
        document.getElementById("nome-vestibular").innerText = `Contagem Regressiva: ${inputUser.toUpperCase()}`;
        document.getElementById("info-estrutura").innerText = "Consulte o edital oficial para ver o número de questões.";
        document.getElementById("info-materias").innerText = "Geralmente engloba todas as matérias da BNCC do Ensino Médio.";
        document.getElementById("info-dica").innerText = "Mantenha a constância nos simulados semanais!";
        
        // Define uma data fictícia de 5 meses para frente para o cronômetro não zerar
        let dataFutura = new Date();
        dataFutura.setMonth(dataFutura.getMonth() + 5);
        dataAlvo = dataFutura.getTime();
    }

    // Reinicia o loop do cronômetro com o novo tempo
    clearInterval(intervaloCronometro);
    atualizarCronometro();
    intervaloCronometro = setInterval(atualizarCronometro, 1000);
});

// Inicialização Automática ao abrir a página
atualizarCronometro();
intervaloCronometro = setInterval(atualizarCronometro, 1000);
