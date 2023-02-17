function onlyLetters(k){
    if(!(k.keyCode >= 65 && k.keyCode <= 90) && !(k.keyCode == 186) && !(k.keyCode == 8) && !(k.keyCode == 32)){
        k.preventDefault();
    }
}

function onlyNumbers(k){
    if(!(k.keyCode >= 48 && k.keyCode <= 57) && !(k.keyCode >= 96 && k.keyCode <= 105) && !(k.keyCode == 8)){
        k.preventDefault();
    }
}
