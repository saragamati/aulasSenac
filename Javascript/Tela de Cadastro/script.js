function abrirCamposCadastro(){
    var formsField = document.getElementById('FormsField');
    var listFormsField = formsField.classList;
    
    if(listFormsField.contains("FormsFieldContainer_hidden") == true){
        formsField.classList.remove("FormsFieldContainer_hidden");
        formsField.classList.add("FormsFieldContainer_show");
    }else{
        formsField.classList.remove("FormsFieldContainer_show");
        formsField.classList.add("FormsFieldContainer_hidden");
    }
    
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
    editButton.setAttribute("onclick","transferValueToModal(this)");
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

    var formNameEle = document.getElementById('createNameField');
    var formAgeEle = document.getElementById('createIdadeField');
    formNameEle.value = "";
    formAgeEle.value = "";

    var formsField = document.getElementById('FormsField');
    formsField.classList.remove("FormsFieldContainer_show");
    formsField.classList.add("FormsFieldContainer_hidden");
}

function transferValueToModal(btn){
    //removendo todas as TR em edição, caso haja
    var editingElements = document.querySelectorAll("tr.editing");
    for(var pos=0;pos<=((editingElements.length)-1);pos++){
        editingElements[pos].classList.remove('editing');
    }

    var currentRow = btn.closest("tr");
    currentRow.classList.add("editing");

    var TDElements = currentRow.cells;

    var currentName = TDElements[0].innerHTML;
    var currentAge = TDElements[1].innerHTML;
    var currentGender = TDElements[2].innerHTML;

    var editNameEle = document.getElementById("editNameField");
    var editAgeEle = document.getElementById("editIdadeField");
    var editGenderEle = document.getElementById("editGenderField");

    editNameEle.value = currentName;
    editAgeEle.value = currentAge;
    editGenderEle.value = currentGender;
}

function alterarCadastro(){
    var newFormName = document.getElementById('editNameField').value;
    var newFormAge = document.getElementById('editIdadeField').value;
    var newformGender = document.getElementById('editGenderField').value;
    var editingRow = document.getElementsByClassName('editing');
    var editingCells = editingRow[0].cells;

    editingCells[0].innerHTML = newFormName;
    editingCells[1].innerHTML = newFormAge;
    editingCells[2].innerHTML = newformGender;

    editingRow[0].classList.remove('editing');
}

function deleteRow(btn){
    if(confirm("Tem certeza que deseja deletar este cadastro?") == true){
        var currentRow = btn.closest("tr");
        currentRow.remove();
    }
}