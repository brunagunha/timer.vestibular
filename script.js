// Banco de dados com as datas oficiais dos vestibulares (Formato: AAAA-MM-DDTHH:MM:SS)
const vestibulares = {
    enem: { name: "ENEM - 1º Domingo", date: "2026-11-08T13:00:00", formatted: "08/11/2026" },
    fuvest: { name: "FUVEST - 1ª Fase", date: "2026-11-01T13:00:00", formatted: "01/11/2026" },
    ufpr: { name: "UFPR - Fase Única", date: "2026-11-01T14:00:00", formatted: "01/11/2026" },
    uel: { name: "UEL", date: "2026-10-18T14:00:00", formatted: "18/10/2026" },
    uem: { name: "UEM - Verão", date: "2026-12-06T13:50:00", formatted: "06/12/2026" },
    uepg: { name: "UEPG", date: "2026-12-13T13:30:00", formatted: "13/12/2026" },
    unicentro: { name: "UNICENTRO", date: "2026-09-21T14:00:00", formatted: "21/09/2026" },
    unioeste: { name: "UNIOESTE", date: "2026-11-29T14:00:00", formatted: "29/11/2026" }, // Data padrão estimada/histórica
    utfpr: { name: "UTFPR", date: "2026-11-22T14:00:00", formatted: "22/11/2026" }, // Janela estimada conforme edital preliminar
    puc: { name: "PUC-PR", date: "2026-10-11T13:00:00", formatted: "10/11/2026" }
};

// Seleção dos elementos do DOM
const selectElement = document.getElementById("vestibular-select");
const titleElement = document.getElementById("vestibular-title");
const dateTextElement = document.getElementById("exam-date-text");
const finishedMessage = document.getElementById("finished-message");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

let countdownInterval;

function updateCountdown() {
    const selectedKey = selectElement.value;
    const currentVestibular = vestibulares[selectedKey];

    // Altera os títulos textuais na tela
    titleElement.textContent = currentVestibular.name;
    dateTextElement.textContent = currentVestibular.formatted;

    const targetDate = new Date(currentVestibular.date).getTime();
    
    // Reseta intervalos antigos se o usuário mudar de opção
    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            // Se a data já passou
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            finishedMessage.classList.remove("finished-hidden");
            clearInterval(countdownInterval);
            return;
        }

        // Esconde a mensagem de expirado se o timer estiver ativo
        finishedMessage.classList.add("finished-hidden");

        // Cálculos matemáticos de tempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Renderiza os valores na tela com o zero à esquerda se necessário
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');

    }, 1000);
}

// Escuta mudanças de seleção do usuário
selectElement.addEventListener("change", updateCountdown);

// Executa a primeira vez ao carregar a página
updateCountdown();
