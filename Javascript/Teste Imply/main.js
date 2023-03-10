function CEPsearch(valor) {
    var cep = valor.replace(/\D/g, ''); // Substitui tudo que não for dígito

    if(cep != "") {
        var cepvalidate = /^[0-9]{8}$/;

        if(cepvalidate.test(cep)) {

            var cepScript = document.createElement('script');
            cepScript.src = `https://viacep.com.br/ws/${cep}/json/?callback=CEP_callback`;
            document.body.appendChild(cepScript);
            
        }else{
            // alertAppend('Formato do CEP inválido');
            cep_form_clean();
        }
    }else{
        // alertAppend('Formato do CEP inválido');
        cep_form_clean();
    }
}

function CEP_callback(content) {
    if(!content.erro) {
        $("#cidadeInput")[0].value = content.localidade;
        $("#bairroInput")[0].value = content.bairro;
        $("#logradouroInput")[0].value = content.logradouro; 
    }else{  
        // alertAppend('CEP não encontrado');
        cep_form_clean();
    }
}

function cep_form_clean() {
    $("#cepInput")[0].value = "";
    $("#cidadeInput")[0].value = "";
    $("#bairroInput")[0].value = "";
    $("#logradouroInput")[0].value = ""; 
}

function startVerification() {
    nameVerification();
    emailVerification();
    phoneVerification();
    cpfVerification();
}

function nameVerification() {
    var inputName = $('#nomeCompletoInput').val();

    if(!/^[A-z ]+$/.test(inputName)) {
        alertAppend('Nome inválido');
    }
}

function emailVerification() {
    var inputEmail = $('#mailInput').val();
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!validRegex.test(inputEmail)) {
        alertAppend('E-mail inválido');
    }
}

function phoneVerification() {
    var inputPhone = $('#telefoneInput').val().replace(/\D/g,'');

    if(!(inputPhone.length == 11) && !(inputPhone.length == 10)) {
        alertAppend('Telefone inválido');
    }
}

function cpfVerification() {
    var inputCPF = $('#cpfInput').val().replace(/\D/g,'');

    if(inputCPF.length == 11){
        if(!cpfsearch(inputCPF)){
            alertAppend('CPF inválido');
        }
    }else{
        alertAppend('CPF inválido');
    }
}

function cpfsearch(CPF){
    var cpfNine = CPF.slice(0, 9);
    var digitoUm = cpfcalc(cpfNine);
    var cpfTen = `${cpfNine}${digitoUm}`;
    var digitoDois = cpfcalc(cpfTen);
    var verificador = `${cpfTen}${digitoDois}`;

    if(verificador == CPF){
        return true;
    }else{
        return false;
    }
}

function cpfcalc(num) {
    var multiplicador = (num.length+1)
    var numbersArray = num.split('');
    var result = 0;
    
    numbersArray.forEach(number => {
        mult = number*multiplicador;
        result += mult;
        multiplicador--;
    });

    if((result%11)<2){
        var digit = 0;
        return digit;
    }else{
        var digit = 11-(result%11);
        return digit;
    }
}

function alertAppend(erro) {
    var modalBodyDiv = $('.modal-body');

    var alert = document.createElement('div');
    alert.setAttribute('class' , 'alert alert-danger');
    alert.setAttribute('role' , 'alert');
    alert.innerHTML = `${erro}`;

    modalBodyDiv.append(alert)
}

function clearModalBody() {
    var modalBodyDivs = $('.modal-body div');
    modalBodyDivs.remove();
}