
// Máscara para telefone \/

function handlePhone(event) {
    let input = event.target;
    input.value = phoneMask(input.value);
}

function phoneMask(value) {
    if (!value) return "";
    value = value.replace(/\D/g,'');
    value = value.replace(/(\d{2})(\d)/,"($1) $2");
    value = value.replace(/(\d)(\d{4})$/,"$1-$2");
    return value;
}

// Máscara para CPF \/

function handleCPF(event) {
    let input = event.target;
    input.value = CPFMask(input.value);
}

function CPFMask(value) {
    value = value.replace(/\D/g,"");                    //Remove tudo o que não é dígito
    value = value.replace(/(\d{3})(\d)/,"$1.$2");       //Coloca um ponto entre o terceiro e o quarto dígitos
    value = value.replace(/(\d{3})(\d)/,"$1.$2");       //Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
    value = value.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
    return value;
}

// Máscara para CEP \/

function handleCEP(event) {
    let input = event.target;
    input.value = CEPMask(input.value);
}

function CEPMask(value) {
    value = value.replace(/\D/g,"");                    //Remove tudo o que não é dígito
    value = value.replace(/(\d{5})(\d)/,"$1-$2");       //Coloca um hífen entre o quinto e o sexto dígitos;

    return value;
}

function lettersOnly(key) {
    if(!(key.keyCode >= 65 && key.keyCode <= 90) && !(key.keyCode == 8) && !(key.keyCode == 32) && !(key.keyCode == 192) && !(key.keyCode == 9)){
        key.preventDefault();
    }
}

function numbersOnly(input) {
    input.value = input.value.replace(/\D/g,"");
}