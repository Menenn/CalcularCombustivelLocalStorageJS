let gastodiario; var litrosPorDia; let precogasosa; let kmlitro; var diasSemana; var cpf; var tel; var rg;
var pesquisanum = 0;
var objetos = [];
puxardados();

function puxardados() {
    if (localStorage.length > 0) {
        var storedNames = JSON.parse(localStorage.getItem("objetos"));
        var Ids = (localStorage.getItem("ids"));
        objetos = storedNames;
        pesquisanum = Ids;
    }
}

function calcular() {
    pesquisanum += 1;
    var resultado = document.querySelector("#resultado");
    kmlitro = document.querySelector("#kmlitro").value;
    let kmdia = document.querySelector("#kmdia").value;
    precogasosa = document.querySelector("#preco").value;
    diasSemana = document.querySelector("#dias").value;
    cpf = document.querySelector("#cpf").value;
    tel = document.querySelector("#tel").value;
    rg = document.querySelector("#rg").value;

    window.scrollTo(0, 0);
    if (kmlitro != "" && kmdia != "" && precogasosa != "" && diasSemana != "" && cpf.length > 13 && tel.length > 7 && rg.length > 8) {
        litrosPorDia = kmdia / kmlitro;
        gastodiario = litrosPorDia * precogasosa;
        var resultadotbody = document.querySelector("#resultadotbody");
        resultado.style = "visibility: visible"
        resultadotbody.innerHTML = `
            <th>R$${(gastodiario).toFixed(2)}</th>
            <th>R$${(gastodiario * diasSemana).toFixed(2)}</th>
            <th>R$${((gastodiario * diasSemana) * 4).toFixed(2)}</th>
            <th>R$${((gastodiario * diasSemana) * 52).toFixed(2)}</th>`;
    } else {
        alert("Você precisa preencher todos os campos corretamente");
    }
}

var historico = document.querySelector("#historico");
function Historico() {
    console.log(objetos);
    if (historico.style.visibility == "" || historico.style.visibility == "hidden") {
        historico.style.visibility = "visible";
        var historicotbody = document.querySelector("#historicotbody");
        historicotbody.innerHTML = ``;
        for (itens of objetos) {
            historicotbody.innerHTML += `<tr id=tr${itens.Id}>
            <th>${itens.data}</th>
            <th>R$${itens.precogasolina}</th>
            <th>${itens.kmporlitro}</th>
            <th>R$${itens.dailycost.toFixed(2)}</th>
            <th>R$${itens.gastosemanal.toFixed(2)}</th>
            <th>R$${itens.gastomensal.toFixed(2)}</th>
            <th>R$${itens.gastoanual.toFixed(2)}</th>
            <th>${itens.cpf}</th>
            <th>${itens.rg}</th>
            <th>${itens.tel}</th>
            <th><button onclick="HistoricoDel(${itens.Id})">X</button></th>
        </tr>`;
        }
    } else if (historico.style.visibility == "visible") {
        historico.style.visibility = "hidden";
    }
}

function salvarCalc() {
    var resultado = document.querySelector("#resultado");
    resultado.style.visibility = "hidden";
    var today = new Date();
    document.querySelector("#kmlitro").value = "";
    document.querySelector("#kmdia").value = "";
    document.querySelector("#preco").value = "";
    document.querySelector("#dias").value = "";
    document.querySelector("#cpf").value = "";
    document.querySelector("#tel").value = "";
    document.querySelector("#rg").value = "";

    var addarray = { Id: pesquisanum, data: `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`, precogasolina: precogasosa, kmporlitro: kmlitro, dailycost: gastodiario, gastosemanal: gastodiario * diasSemana, gastomensal: (gastodiario * diasSemana) * 4, gastoanual: (gastodiario * diasSemana) * 52, cpf: cpf, tel: tel, rg: rg }
    objetos.push(addarray);
    console.log(objetos);
    document.querySelector("#kmlitro").focus();
    localStorage.setItem("objetos", JSON.stringify(objetos));
    localStorage.setItem("ids", pesquisanum);
}

function DescartarCalc() {
    var resultado = document.querySelector("#resultado");
    resultado.style.visibility = "hidden";
    var resultadotbody = document.querySelector("#resultadotbody");
    resultadotbody.innerHTML = ``;
    document.querySelector("#kmlitro").value = "";
    document.querySelector("#kmdia").value = "";
    document.querySelector("#preco").value = "";
    document.querySelector("#dias").value = "";
    document.querySelector("#cpf").value = "";
    document.querySelector("#tel").value = "";
    document.querySelector("#rg").value = "";
    document.querySelector("#kmlitro").focus();
}

function HistoricoDelAll() {
    if (confirm("Deseja deletar todos os resultados?")) {
        var historicotbody = document.querySelector("#historicotbody");
        historicotbody.innerHTML = ``;
        objetos = [];
        localStorage.clear();
    }
}

function HistoricoDel(id) {
    if (confirm("Deseja deletar este resultado?")) {
        var historicotbody = document.querySelector("#historicotbody");
        for (var i = 0; i < objetos.length; i++) {
            if (objetos[i].Id == id) {
                objetos.splice(objetos.indexOf(objetos[i]), 1);
            }
        }
        historicotbody.innerHTML = ``;
        for (itens of objetos) {
            historicotbody.innerHTML += `<tr id=tr${itens.Id}>
            <th>${itens.data}</th>
            <th>R$${itens.precogasolina}</th>
            <th>${itens.kmporlitro}</th>
            <th>R$${itens.dailycost.toFixed(2)}</th>
            <th>R$${itens.gastosemanal.toFixed(2)}</th>
            <th>R$${itens.gastomensal.toFixed(2)}</th>
            <th>R$${itens.gastoanual.toFixed(2)}</th>
            <th>${itens.cpf}</th>
            <th>${itens.rg}</th>
            <th>${itens.tel}</th>
            <th><button onclick="HistoricoDel(${itens.Id})">X</button></th>
        </tr>`;
            localStorage.setItem("objetos", JSON.stringify(objetos));
        }
    }
}

function EditarTextos(texto) {
    if (texto == 0) {
        var cpf = document.getElementById("cpf").value;
        cpf = String(cpf).split('.').join("");
        cpf = String(cpf).split('-').join("");

        if (cpf.length <= 14) {
            cpf = cpf.replace(/\D/g, "")
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
            document.getElementById("cpf").value = cpf;
        } else {
            cpf = cpf.replace(/\D/g, "")
            cpf = cpf.replace(/^(\d{2})(\d)/, "$1.$2")
            cpf = cpf.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            cpf = cpf.replace(/\.(\d{3})(\d)/, ".$1/$2")
            cpf = cpf.replace(/(\d{4})(\d)/, "$1-$2")
            document.getElementById("cpf").value = cpf;
        }
    } else if (texto == 1) {
        var numtelefone = document.getElementById("tel").value;
        numtelefone = String(numtelefone).split('(').join("");
        numtelefone = String(numtelefone).split(')').join("");
        numtelefone = String(numtelefone).split('-').join("");

        if (numtelefone.indexOf(0) == 0) {
            numtelefone = numtelefone.replace(/\D/g, "")
            numtelefone = numtelefone.replace(/(.{0})(\d)/, "$1($2")
            numtelefone = numtelefone.replace(/(.{6})(\d)/, "$1) $2")
            if (numtelefone.length == 10) {
                numtelefone = numtelefone.replace(/(.{1})$/, "-$1")
            } else if (numtelefone.length == 14) {
                numtelefone = numtelefone.replace(/(.{2})$/, "-$1")
            } else if (numtelefone.length == 15) {
                numtelefone = numtelefone.replace(/(.{3})$/, "-$1")
            } else if (numtelefone.length == 16) {
                numtelefone = numtelefone.replace(/(.{4})$/, "-$1")
            } else if (numtelefone.length > 16) {
                numtelefone = numtelefone.replace(/(.{4})$/, "-$1")
            }
        } else {
            numtelefone = numtelefone.replace(/\D/g, "")
            numtelefone = numtelefone.replace(/(.{0})(\d)/, "$1($2")
            numtelefone = numtelefone.replace(/(.{3})(\d)/, "$1) $2")
            if (numtelefone.length == 10) {
                numtelefone = numtelefone.replace(/(.{1})$/, "-$1")
            } else if (numtelefone.length == 11) {
                numtelefone = numtelefone.replace(/(.{2})$/, "-$1")
            } else if (numtelefone.length == 12) {
                numtelefone = numtelefone.replace(/(.{3})$/, "-$1")
            } else if (numtelefone.length == 13) {
                numtelefone = numtelefone.replace(/(.{4})$/, "-$1")
            } else if (numtelefone.length > 13 && numtelefone.length < 16) {
                numtelefone = numtelefone.replace(/(.{4})$/, "-$1")
            }
        }
        document.getElementById("tel").value = numtelefone;
    } else if (texto == 2) {
        var rg = document.getElementById("rg").value;
        rg = String(rg).split('-').join("");
        rg = String(rg).split('.').join("");
        rg = rg.replace(/\D/g, "")
        rg = rg.replace(/(\d{2})(\d)/, "$1.$2")
        rg = rg.replace(/(\d{3})(\d)/, "$1.$2")
        rg = rg.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        document.getElementById("rg").value = rg;
    }
    else if(texto == 3){
        var dias = document.getElementById("dias").value;
        if(dias > 7){
            document.getElementById("dias").value = 7;
        }else if(dias < 0){
            document.getElementById("dias").value = 0;
        }
    }
}