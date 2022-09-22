function carregar(){
    var data = new Date();
    var hora = data.getHours();
    var mins = data.getMinutes();

    var divDescricao = document.getElementById("descricao");

    divDescricao.innerHTML = `Agora são ${hora}:${mins}`;

    var img = document.getElementById("foto");

    if(hora >= 0 && hora < 12){
        img.src = `fotoManha.jpg`;
        document.body.style.background = "darkblue";
    }else if(hora >= 12 && hora < 18){
        img.src = `fotoatarde.jpg`;
        document.body.style.background = "rgb (70, 142, 236)";
    }else{
        img.src = `fotoanoite.jpg`;
        document.body.style.background = "midnightblue";
    }

}