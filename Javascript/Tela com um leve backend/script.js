window.onload = function(e){ 
    this.importData();
}
function clearGrid(){
    $("#FormsTable tbody tr").remove();
}
function importData(){
    $.ajax({
        method: "POST",
        url: "https://studiopowerstrong.000webhostapp.com/Dados.php",
        dataType: 'json',
        data: { acao: "consultar", dbname: "UsuarioLeonardo"}
    })
    .done(function(result){
        clearGrid();
        fillGrid(result);
    })
    .fail(function(jqXHR, textStatus, msg){
        console.log(jqXHR);
        console.log(textStatus);
        alert(msg);
    });
}
function fillGrid(list){
    list.forEach(element => {
        var eleName = element.Nome;
        var eleAge = element.Idade;
        var eleGender = element.Sexo;
        var tableElement = document.getElementById('FormsTable');
        var tbodyRef = tableElement.querySelector('tbody');
        var row = tbodyRef.insertRow(0);
        var nameCell = row.insertCell(0);
        var ageCell = row.insertCell(1);
        var genderCell = row.insertCell(2);
        var iconsCell = row.insertCell(3);

        nameCell.innerHTML = eleName;
        ageCell.innerHTML = eleAge;
        genderCell.innerHTML = eleGender;

        
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
        deleteButton.setAttribute("onclick","deleteCadastro(this)");
        deleteButton.innerHTML = deleteIcon.outerHTML;

        iconsCell.innerHTML += deleteButton.outerHTML;

        var hiddenId = document.createElement('input');
        var eleId = element.Id;
        hiddenId.setAttribute("type","hidden");
        hiddenId.setAttribute("value",eleId);
        row.appendChild(hiddenId);

    });
    console.log(list);
}
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
    var formName = document.getElementById('createNameField').value;
    var formAge = document.getElementById('createIdadeField').value;
    var formGender = document.getElementById('createGenderField').value;
    
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
    var selectedID = editingRow[0].querySelector('input').value;

    editingRow[0].classList.remove('editing');

    $.ajax({
        method: "POST",
        url: "https://studiopowerstrong.000webhostapp.com/Dados.php",
        dataType: 'json',
        data: { acao: "editar", dbname: "UsuarioLeonardo", Id: selectedID, Nome: newFormName, Idade: newFormAge, Sexo: newformGender }
    })
    .done(function(result){
        clearGrid();
        importData();
    })
    .fail(function(jqXHR, textStatus, msg){
        console.log(jqXHR);
        console.log(textStatus);
        alert(msg);
    });
}

function deleteCadastro(btn){
    if(confirm("Tem certeza que deseja deletar este cadastro?") == true){
        var currentRow = btn.closest("tr");
        var selectedID = currentRow.querySelector('input').value;
        $.ajax({
            method: "POST",
            url: "https://studiopowerstrong.000webhostapp.com/Dados.php",
            dataType: 'json',
            data: { acao: "deletar", dbname: "UsuarioLeonardo", Id: selectedID}
        })
        .done(function(result){
            clearGrid();
            importData();
        })
        .fail(function(jqXHR, textStatus, msg){
            console.log(jqXHR);
            console.log(textStatus);
            alert(msg);
        });
    }
}