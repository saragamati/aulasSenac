function validateKey(key){
    if(!(key.keyCode >= 48 && key.keyCode <= 57) && !(key.keyCode >= 96 && key.keyCode <= 105) && !(key.keyCode == 8)){
        key.preventDefault();
        alert("Digite apenas números");
    }
}

function addBar(ele,e){
    var kC = e.keyCode;
    var dataV = ele.value;

    if( kC!=8 && kC!=46 ){
        if(dataV.length == 2 || dataV.length == 5){
            ele.value += "/"; 
        }
    }
}

function cpfScript(ele,e){
    var kC = e.keyCode;
    var dataV = ele.value;

    if( kC!=8 && kC!=46 ){
        if(dataV.length == 3 || dataV.length == 7){
            ele.value += "."; 
        }else if(dataV.length == 11){
            ele.value += "-";
        }
    }
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