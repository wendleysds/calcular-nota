let textFieldNotaT1 = document.getElementById("n1");
let textFieldNotaT2 = document.getElementById("n2");
let textFieldNotaT3 = document.getElementById("n3");

textFieldNotaT1.addEventListener("input", OnInput);
textFieldNotaT2.addEventListener("input", OnInput);
textFieldNotaT3.addEventListener("input", OnInput);

function OnInput(){
    let nota1 = AcceptVirgula(textFieldNotaT1.value) * 10;
    let nota2 = AcceptVirgula(textFieldNotaT2.value) * 10;
    let nota3 = AcceptVirgula(textFieldNotaT3.value) * 10;
    
    if(IncorrectVerifyNota(textFieldNotaT1)){
        return LogOutput("Preencha a primeira nota")
    }
    if(IncorrectVerifyNota(textFieldNotaT2)){
        return LogOutput("Preencha a segunda nota")
    }

    let soma = SomaTotalNota(nota1, nota2, nota3);
    let media = (soma / 10);
    let precisa = (600 - SomaTotalNota(nota1, nota2, 0)) / 4;

    if (precisa.toString() == "NaN")
        return LogOutput("As notas estão inválidas. Verifique se digitou corretamente!")

    let msm;

    let mediaR = (media/10).toFixed(2);
    let precisaR = (precisa/10).toFixed(1);

    if(precisaInvalido(precisaR, nota1, nota2)){
        console.log(`nota reajustada de '${precisaR}' para '${(parseFloat(precisaR) + 0.1).toFixed(1)}'`);
        precisaR = (parseFloat(precisaR) + 0.1).toFixed(1);
    }

    if (!(nota3.toString().length > 1)) {
        msm = `Precisa: ${precisaR}\nMedia Atual: ${mediaR}\nStatus: ${precisa > 100 ? "Reprovado nessa diciplina 😢" : `${media >= 60 ? "Aprovado nessa diciplina 😎" : "Aguardando ultima nota"}`}`
    }
    else {
        msm = `Media Final: ${mediaR}\nStatus: ${mediaR < 6 ? `Reprovado nessa diciplina 😭\nPrecisava: ${precisaR}` : "Aprovado na diciplina 😎"}`
    }

    return LogOutput(msm);
}

function LogOutput(msg) {
    document.getElementById("message").innerText = msg;
}

function SomaTotalNota(nota1, nota2, nota3) {
    return (nota1 * 3) + (nota2 * 3) + (nota3 * 4);
};

function IncorrectVerifyNota(notaTextField){
    let nota = notaTextField.value * 10;

    if(nota > 100 || notaTextField.value.length > 3 || notaTextField.value.length == 0)
        return true;

    return false;
}

function AcceptVirgula(input){
    return input.replace(',', '.')
}

function precisaInvalido(precisa, nota1, nota2){
    let soma = SomaTotalNota(nota1, nota2, precisa*10);
    let media = (soma/10);
    console.log(`${media} | ${media < 60}`)
    return media < 60;
}

document.querySelector(".info").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
    document.querySelector(".container").style.display = "none";
});

document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".container").style.display = "flex";
});
