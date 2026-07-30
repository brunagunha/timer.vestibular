const vestibulares = {
    enem: { 
        name: "ENEM - 1º Domingo", 
        date: "2026-11-08T13:00:00", 
        formatted: "08/11/2026",
        questoes: "90 questões (1º Dia: Linguagens e Humanas + Redação)",
        redacao: "Dissertativo-argumentativa (Modelo ENEM)",
        materias: "Linguagens, Códigos e suas Tecnologias, Ciências Humanas e suas Tecnologias"
    },
    fuvest: { 
        name: "FUVEST - 1ª Fase", 
        date: "2026-11-01T13:00:00", 
        formatted: "01/11/2026",
        questoes: "90 questões de múltipla escolha",
        redacao: "Dissertativo-argumentativa (Avaliada na 2ª fase)",
        materias: "Português, Matemática, História, Geografia, Física, Química, Biologia e Inglês"
    },
    ufpr: { 
        name: "UFPR - Fase Única", 
        date: "2026-11-01T14:00:00", 
        formatted: "01/11/2026",
        questoes: "90 questões objetivas + Compreensão e Produção de Textos",
        redacao: "Gêneros textuais diversos (geralmente dois textos solicitados)",
        materias: "Matemática, Física, Química, Biologia, Geografia, História, Língua Estrangeira e Português/Literatura"
    },
    uel: { 
        name: "UEL", 
        date: "2026-10-18T14:00:00", 
        formatted: "18/10/2026",
        questoes: "60 questões de conhecimentos gerais",
        redacao: "Dissertativa (aplicada na 2ª fase)",
        materias: "Artes, Biologia, Filosofia, Física, Geografias, História, Matemática, Química e Sociologia"
    },
    uem: { 
        name: "UEM - Verão", 
        date: "2026-12-06T13:50:00", 
        formatted: "06/12/2026",
        questoes: "50 questões de conhecimentos gerais + Redação",
        redacao: "Dissertativo-argumentativa ou outros gêneros textuais",
        materias: "Biologia, Física, Geografia, História, Língua Estrangeira, Literatura, Matemática, Português e Química"
    },
    uepg: { 
        name: "UEPG", 
        date: "2026-12-13T13:30:00", 
        formatted: "13/12/2026",
        questoes: "50 questões objetivas + Redação",
        redacao: "Dissertativo-argumentativa",
        materias: "Português, Literatura, Língua Estrangeira, Matemática, História, Geografia, Física, Química e Biologia"
    },
    unicentro: { 
        name: "UNICENTRO", 
        date: "2026-09-21T14:00:00", 
        formatted: "21/09/2026",
        questoes: "40 questões objetivas + Redação",
        redacao: "Dissertativo-argumentativa",
        materias: "Português, Literatura, Língua Estrangeira, Matemática, Física, Química, Biologia, História e Geografia"
    },
    unioeste: { 
        name: "UNIOESTE", 
        date: "2026-11-29T14:00:00", 
        formatted: "29/11/2026",
        questoes: "70 questões de múltipla escolha + Redação",
        redacao: "Dissertativo-argumentativa",
        materias: "Biologia, Física, Geografia, História, Língua Estrangeira, Matemática, Português, Literatura e Química"
    }, 
    utfpr: { 
        name: "UTFPR", 
        date: "2026-11-22T14:00:00", 
        formatted: "22/11/2026",
        questoes: "Utiliza as notas do ENEM (Processo Seletivo baseado no ENEM)",
        redacao: "Redação padrão ENEM",
        materias: "Matriz curricular completa do ENEM"
    }, 
    puc: { 
        name: "PUC-PR", 
        date: "2026-10-11T13:00:00", 
        formatted: "11/10/2026",
        questoes: "40 questões objetivas + Redação",
        redacao: "Dissertativo-argumentativa",
        materias: "Linguagens, Matemática, Ciências Humanas e Ciências da Natureza"
    }
};

const selectElement = document.getElementById("vestibular-select");
const titleElement = document.getElementById("vestibular-title");
const dateTextElement = document.getElementById("exam-date-text");
const finishedMessage = document.getElementById("finished-message");

// Elementos de informações adicionais
const infoQuestoes = document.getElementById("info-questoes");
const infoRedacao = document.getElementById("info-redacao");
const infoMaterias = document.getElementById("info-materias");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdownInterval;

function updateCountdown() {
    const selectedKey = selectElement.value;
    const currentVestibular = vestibulares[selectedKey];

    // Altera os títulos e informações textuais na tela
    titleElement.textContent = currentVestibular.name;
    dateTextElement.textContent = currentVestibular.formatted;
    infoQuestoes.textContent = currentVestibular.questoes;
    infoRedacao.textContent = currentVestibular.redacao;
    infoMaterias.textContent = currentVestibular.materias;

    const targetDate = new Date(currentVestibular.date).getTime();
    
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            finishedMessage.classList.remove("finished-hidden");
            clearInterval(countdownInterval);
            return;
        }

        finishedMessage.classList.add("finished-hidden");

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

    }, 1000);
}

selectElement.addEventListener("change", updateCountdown);

updateCountdown();
