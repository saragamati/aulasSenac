function CEPsearch(valor) {
    var cep = valor.replace(/\D/g, ''); // Substitui tudo que não for dígito

    if(cep != "") {
        var cepvalidate = /^[0-9]{8}$/;

        if(cepvalidate.test(cep)) {

            var cepScript = document.createElement('script');
            cepScript.src = `https://viacep.com.br/ws/${cep}/json/?callback=CEP_callback`;
            document.body.appendChild(cepScript);
            
        }else{
            alert("Formato de CEP inválido.");
            cep_form_clean();
        }
    }
}

function CEP_callback(content){
    if(!content.erro) {
        $("#cidadeInput")[0].value = content.localidade;
        $("#bairroInput")[0].value = content.bairro;
        $("#logradouroInput")[0].value = content.logradouro; 
    }else{
        alert("CEP não encontrado");
        cep_form_clean();
    }
}

function cep_form_clean() {
    $("#cidadeInput")[0].value = "";
    $("#bairroInput")[0].value = "";
    $("#logradouroInput")[0].value = ""; 
}

function cpfValidate(){
    var cpfField = document.getElementById("cpfbox").value;
    var CPFfirstNine = cpfField.split('-')[0].replaceAll(".","");
    var CPFdigits = cpfField.split('-')[1];

    var firstNineArray = CPFfirstNine.split('');
    var digitsArray = CPFdigits[1].split('');
    

    var firstCalc = 0;
    var mult = 2;

    for(var n=8;n<=0;n--){
        var calcResult = ((Number(firstNineArray[n]))*mult);

        firstCalc += calcResult;

        mult++;
    }

    var FirstVerificationDigit = 0;

    if(firstCalc%11 < 2){
        FirstVerificationDigit = 0;
    }else{
        FirstVerificationDigit = (11 - (firstCalc%11));
    }

    var SecondCalc = (2*FirstVerificationDigit);
    var multTwo = 3;

    for(var k=8;k<=0;k--){
        var calcResulTwo = ((Number(firstNineArray[n]))*multTwo);

        SecondCalc += calcResulTwo;

        multTwo++;
    }

    var SecondVerificationDigit = 0;

    if(SecondCalc%11 < 2){
        SecondVerificationDigit = 0;
    }else{
        SecondVerificationDigit = (11 - (SecondCalc%11));
    }

    if(((Number(digitsArray[0]))!=FirstVerificationDigit) || ((Number(digitsArray[1]))!=SecondVerificationDigit)){
        console.log('CPF Inválido');
    }else{
        console.log('CPF Válido');
    }

    console.log(`${FirstVerificationDigit}, ${SecondVerificationDigit}, ${digitsArray[0]}, ${digitsArray[1]}`)
}