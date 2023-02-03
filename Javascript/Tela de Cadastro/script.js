function abrirCamposCadastro(){
    var formsField = document.getElementById('FormsField');

    formsField.classList.remove("FormsFieldContainer")
}

function createCadastroRow(){
    //Valores dos Formulários:
    var formName = document.getElementById('createNameField').value;
    var formAge = document.getElementById('createIdadeField').value;
    var formGender = document.getElementById('createGenderField').value;

    var tableElement = document.getElementById('FormsTable');
    var tbodyRef = tableElement.querySelector('tbody');
    var row = tbodyRef.insertRow(0);
    var nameCell = row.insertCell(0);
    var ageCell = row.insertCell(1);
    var genderCell = row.insertCell(2);
    var iconsCell = row.insertCell(3);

    //Inserindo valores do formulário à tabela:
    nameCell.innerHTML = formName;
    ageCell.innerHTML = formAge;
    genderCell.innerHTML = formGender;

    var editButton = document.createElement('editButton');
    var editIcon = document.createElement('i');
    editButton.setAttribute('type','button');
}