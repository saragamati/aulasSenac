function CEPAutofill() {
    var removeTraco = $('#cepInput')[0].value.split('-');
    var cepRequest = `${removeTraco[0]}${removeTraco[1]}`;

    var url = 'https://viacep.com.br/ws/'+cepRequest+'/json/';
            $.ajax({
                    url: url,
                    dataType: 'jsonp',
                    crossDomain: true,
                    contentType: "application/json",
                    success : function(json){
                        if(json.logradouro){
                            $("#logradouroInput").val(json.logradouro);
                            $("#bairroInput").val(json.bairro);
                            $("#cidadeInput").val(json.localidade);
                        }else{
                            $("#logradouroInput").val("");
                            $("#bairroInput").val("");
                            $("#cidadeInput").val("");
                        }
                    }
            });
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