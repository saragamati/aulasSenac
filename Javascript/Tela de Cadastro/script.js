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

    //criando o botão de editar campos

    var editButton = document.createElement('BUTTON');
    var editIcon = document.createElement('i');

    editIcon.setAttribute("class","bi bi-pencil");
    
    editButton.setAttribute("class","btn btn-primary");
    editButton.setAttribute("onclick","showEditFields(this)");
    editButton.setAttribute("data-bs-toggle","modal");
    editButton.setAttribute("data-bs-target","#staticBackdrop");
    editButton.innerHTML = editIcon.outerHTML;

    iconsCell.innerHTML = editButton.outerHTML;

    //criando o botão de remover o cadastro

    var deleteButton = document.createElement('BUTTON');
    var deleteIcon = document.createElement('i');

    deleteIcon.setAttribute("class","bi bi-trash");
    
    deleteButton.setAttribute("class","btn btn-danger");
    deleteButton.setAttribute("onclick","deleteRow(this)");
    deleteButton.innerHTML = deleteIcon.outerHTML;

    iconsCell.innerHTML += deleteButton.outerHTML;
}

function showEditFields(btn){
    var currentRow = btn.closest("tr");
    var TDElements = currentRow.cells;

    //salvando os dados antigos em variáveis
    var currentName = TDElements[0].innerHTML;
    var currentAge = TDElements[1].innerHTML;
    var currentGender = TDElements[2].innerHTML;


    console.log(currentName, currentAge, currentGender);
}