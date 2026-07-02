let dataVestibular = null;

function salvar(){

    const vestibular = document.getElementById("vestibular").value;

    const area = document.getElementById("area").value;

    const nota = document.getElementById("nota").value;

    dataVestibular = new Date(document.getElementById("data").value);

    localStorage.setItem("vestibular",vestibular);

    localStorage.setItem("area",area);

    localStorage.setItem("nota",nota);

    localStorage.setItem("data",dataVestibular);

    atualizarInformacoes();

}

function atualizarInformacoes(){

    document.getElementById("tituloVestibular").innerText =
        localStorage.getItem("vestibular") || "Vestibular";

    document.getElementById("curso").innerText =
        "Área: " + (localStorage.getItem("area") || "-");

    document.getElementById("notaCorte").innerText =
        "Nota de Corte: " + (localStorage.getItem("nota") || "-");

}

function atualizarTimer(){

    if(!dataVestibular){

        const salva = localStorage.getItem("data");

        if(salva){

            dataVestibular = new Date(salva);

        }else{

            return;

        }

    }

    const agora = new Date();

    const diferenca = dataVestibular - agora;

    if(diferenca <= 0){

        document.getElementById("dias").innerText="0";
        document.getElementById("horas").innerText="0";
        document.getElementById("minutos").innerText="0";
        document.getElementById("segundos").innerText="0";

        return;

    }

    const dias = Math.floor(diferenca/(1000*60*60*24));

    const horas = Math.floor((diferenca%(1000*60*60*24))/(1000*60*60));

    const minutos = Math.floor((diferenca%(1000*60*60))/(1000*60));

    const segundos = Math.floor((diferenca%(1000*60))/1000);

    document.getElementById("dias").innerText=dias;

    document.getElementById("horas").innerText=horas;

    document.getElementById("minutos").innerText=minutos;

    document.getElementById("segundos").innerText=segundos;

}

atualizarInformacoes();

setInterval(atualizarTimer,1000);