window.onload = function(){
    var buttonOne = document.createElement('input');
    buttonOne.setAttribute('type','button');
    buttonOne.setAttribute('value','Bom dia');
    buttonOne.setAttribute('onclick','functionOne()');
    buttonOne.setAttribute('id','buttonOne');

    document.body.appendChild(buttonOne);
}

function functionOne(){
    var buttonTwo = document.createElement('input');
    
    buttonTwo.setAttribute('type','button');
    buttonTwo.setAttribute('value','Boa Noite');
    buttonTwo.setAttribute('onclick','functionTwo()');
    buttonTwo.setAttribute('id','buttonTwo');

    document.body.appendChild(buttonTwo);

    var imgattach = document.createElement('img');
    imgattach.setAttribute('src', 'imagem.jpg');
    imgattach.setAttribute('id', 'createdImg');

    document.body.appendChild(imgattach);

    buttonOne.remove();
}

function functionTwo(){
    var buttonOne = document.createElement('input');
    var createdImg = document.getElementById('createdImg');

    buttonOne.setAttribute('type','button');
    buttonOne.setAttribute('value','Bom dia');
    buttonOne.setAttribute('onclick','functionOne()');
    buttonOne.setAttribute('id','buttonOne');

    document.body.appendChild(buttonOne);

    buttonTwo.remove();
    createdImg.remove();
}