function scriptzinho(){
    var data = new Date();
    var currentYear = data.getFullYear();
    var yearBorn = parseInt(document.getElementById("anoNascimento").value);
    var personAge = currentYear - yearBorn;
    var divDescricao = document.getElementById("descricao");
    var divFoto = document.getElementById("fotinho");
    var isMale = document.getElementById("masculino");

    divFoto.innerHTML = "";
    var img = document.createElement("img");

    if(isMale.checked == true){
        if(personAge<=10){
            img.setAttribute("src", "criancaM.jpg");
            divDescricao.innerHTML = `É uma criança de ${personAge} anos.`;
        }else if(personAge>10 && personAge<=18){
            img.setAttribute("src", "adolM.jpg");
            divDescricao.innerHTML = `É um adolescente de ${personAge} anos.`;
        }else if(personAge>18 && personAge<=50){
            img.setAttribute("src", "adultoM.jpg");
            divDescricao.innerHTML = `É um adulto de ${personAge} anos.`;
        }else{
            img.setAttribute("src", "idosoM.jpg");
            divDescricao.innerHTML = `É um idoso de ${personAge} anos.`;
        }
    }else{
        if(personAge<=10){
            img.setAttribute("src", "criancaF.jpg");
            divDescricao.innerHTML = `É uma criança de ${personAge} anos.`;
        }else if(personAge>10 && personAge<=18){
            img.setAttribute("src", "adolF.jpg");
            divDescricao.innerHTML = `É uma adolescente de ${personAge} anos.`;
        }else if(personAge>18 && personAge<=50){
            img.setAttribute("src", "adultoF.jpg");
            divDescricao.innerHTML = `É uma adulta de ${personAge} anos.`;
        }else{
            img.setAttribute("src", "idosoF.jpg");
            divDescricao.innerHTML = `É uma idosa de ${personAge} anos.`;
        }
    }
    divFoto.appendChild(img);
}