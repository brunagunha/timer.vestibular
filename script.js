let dataProva;

function iniciar(){

const vestibular=document.getElementById("vestibular").value;

const curso=document.getElementById("curso").value;

dataProva=new Date(document.getElementById("data").value);

if(!vestibular || !curso || isNaN(dataProva)){

alert("Preencha todos os campos.");

return;

}

document.getElementById("nomeVestibular").innerHTML=vestibular;

document.getElementById("nomeCurso").innerHTML="Curso: "+curso;

localStorage.setItem("vestibular",vestibular);

localStorage.setItem("curso",curso);

localStorage.setItem("data",dataProva);

}

function atualizar(){

const salva=localStorage.getItem("data");

if(!salva)return;

dataProva=new Date(salva);

document.getElementById("nomeVestibular").innerHTML=localStorage.getItem("vestibular");

document.getElementById("nomeCurso").innerHTML="Curso: "+localStorage.getItem("curso");

const agora=new Date();

const diferenca=dataProva-agora;

if(diferenca<=0){

document.getElementById("dias").innerHTML=0;
document.getElementById("horas").innerHTML=0;
document.getElementById("minutos").innerHTML=0;
document.getElementById("segundos").innerHTML=0;

return;

}

const dias=Math.floor(diferenca/(1000*60*60*24));

const horas=Math.floor((diferenca%(1000*60*60*24))/(1000*60*60));

const minutos=Math.floor((diferenca%(1000*60*60))/(1000*60));

const segundos=Math.floor((diferenca%(1000*60))/1000);

document.getElementById("dias").innerHTML=dias;

document.getElementById("horas").innerHTML=horas;

document.getElementById("minutos").innerHTML=minutos;

document.getElementById("segundos").innerHTML=segundos;

}

setInterval(atualizar,1000);