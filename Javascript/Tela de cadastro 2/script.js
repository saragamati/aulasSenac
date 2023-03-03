window.onload = function(e){
    this.importData();
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
function clearGrid(){
    $("#fullTable tbody tr").remove();
}
function fillGrid(cadastros){
    cadastros.forEach(element => {
        var eleName = element.Nome;
        var eleAge = element.Idade;
        var eleGender = element.Sexo;
        var tableElement = document.getElementById('fullTable');
        var tbodyRef = tableElement.querySelector('tbody');
        var row = tbodyRef.insertRow(0);
        var nameCell = row.insertCell(0);
        var ageCell = row.insertCell(1);
        var genderCell = row.insertCell(2);
        var iconsCell = row.insertCell(3);
        
        nameCell.innerHTML = eleName;
        ageCell.innerHTML = eleAge;
        
        if(eleGender == 1){
            eleGender = "Masculino";
        }else if(eleGender == 2){
            eleGender = "Feminino";
        }else{
            eleGender = "Prefiro não responder";
        }

        genderCell.innerHTML = eleGender;

        //EDIT

        var editButton = document.createElement('button');
        var editIcon = document.createElement('i');

        editIcon.setAttribute('class','bi bi-pencil');

        editButton.setAttribute('class','btn btn-primary');
        editButton.setAttribute('data-bs-toggle','modal');
        editButton.setAttribute('data-bs-target','#staticBackdrop');
        editButton.setAttribute('onclick','valueTransfer(this)');

        editButton.innerHTML = editIcon.outerHTML;

        iconsCell.appendChild(editButton);

        //DELETE

        var deleteButton = document.createElement('button');
        var deleteIcon = document.createElement('i');

        deleteIcon.setAttribute('class','bi bi-trash');

        deleteButton.setAttribute('class','btn btn-danger');
        deleteButton.setAttribute('onclick','apagar(this)');

        deleteButton.innerHTML = deleteIcon.outerHTML;

        iconsCell.appendChild(deleteButton);

        //HIDDEN ID
        var hiddenInput = document.createElement('input');

        hiddenInput.setAttribute('type','hidden');
        hiddenInput.setAttribute('value', element.Id);

        row.appendChild(hiddenInput);
    });
}
function modalSetToCreate(){
    var modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerHTML = "Criar novo cadastro";

    var nameField = document.getElementById('formNome');
    var ageField = document.getElementById('formIdade');
    var genderField = document.getElementById('formGenero');

    nameField.value = "";
    ageField.value = "";
    genderField.value = "";

    var saveButton = document.getElementById('modalSaveButton');
    var saveButtonOnclick = saveButton.getAttributeNode("onclick");
    saveButton.removeAttributeNode(saveButtonOnclick);
    saveButton.setAttribute('onclick','incluir()');
}
function incluir(){
    var formName = document.getElementById('formNome').value;
    var formGender = document.getElementById('formGenero').value;
    var formAge = document.getElementById('formIdade').value;

    $.ajax({
        method: "POST",
        url: "https://studiopowerstrong.000webhostapp.com/Dados.php",
        data: { acao: "cadastrar", dbname: "UsuarioLeonardo" , Nome: formName , Idade: formAge , Sexo: formGender}
    })
    .done(function(e){
        clearGrid();
        importData();
    })
    .fail(function(jqXHR, textStatus, msg){
        console.log(jqXHR);
        console.log(textStatus);
        alert(msg);
    });
}
function apagar(ele){
    if(confirm('Tem certeza que deseja deletar?') == true){
        var selectedRow = ele.closest('tr');
        var hiddenInput = selectedRow.querySelector('input');
    
        $.ajax({
            method: "POST",
            url: "https://studiopowerstrong.000webhostapp.com/Dados.php",
            dataType: 'json',
            data: { acao: "deletar", dbname: "UsuarioLeonardo" , Id: hiddenInput.value}
        })
        .done(function(){
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
function valueTransfer(e){
    // limpar todas classes editing
    var editingRows = document.querySelectorAll("tr.editing");

    if(editingRows.length > 0){
        editingRows.forEach(element => {
            element.classList.remove('editing');
        });
    }
    
    //adicionar editing à tr selecionada

    var currentRow = e.closest('tr');
    currentRow.classList.add('editing');

    var TDarray = currentRow.cells;
    var currentName = TDarray[0].innerHTML;
    var currentAge = TDarray[1].innerHTML;
    var currentGender = TDarray[2].innerHTML;

    if(currentGender == "Masculino"){
        genderID = 1;
    }else if(currentGender == "Feminino"){
        genderID = 2;
    }else{
        genderID = 3;
    }

    var nameEditField = document.getElementById('formNome');
    var ageEditField = document.getElementById('formIdade');
    var genderEditField = document.getElementById('formGenero');

    nameEditField.value = currentName;
    ageEditField.value = currentAge;
    genderEditField.value = genderID;

    var saveButton = document.getElementById('modalSaveButton');
    var saveButtonOnclick = saveButton.getAttributeNode("onclick");
    saveButton.removeAttributeNode(saveButtonOnclick);
    saveButton.setAttribute('onclick','salvarAlteracoes()');

    var modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerHTML = "Edição de cadastro";
}
function salvarAlteracoes(){
    var editingTR = document.getElementsByClassName('editing');

    var editID = editingTR[0].querySelector('input').value;
    var nameEditField = document.getElementById('formNome').value;
    var ageEditField = document.getElementById('formIdade').value;
    var genderEditField = document.getElementById('formGenero').value;

    $.ajax({
        method: "POST",
        url: "https://studiopowerstrong.000webhostapp.com/Dados.php",
        dataType: 'json',
        data: { acao: "editar", dbname: "UsuarioLeonardo", Id: editID, Nome: nameEditField, Idade: ageEditField, Sexo: genderEditField }
    })
    .done(function(){
        clearGrid();
        importData();
    })
    .fail(function(jqXHR, textStatus, msg){
        console.log(jqXHR);
        console.log(textStatus);
        alert(msg);
    });
    
}
