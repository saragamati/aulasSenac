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
        genderCell.innerHTML = eleGender;

        //EDIT

        var editButton = document.createElement('button');
        var editIcon = document.createElement('i');

        editIcon.setAttribute('class','bi bi-pencil');

        editButton.setAttribute('class','btn btn-primary');
        editButton.setAttribute('data-bs-toggle','modal');
        editButton.setAttribute('data-bs-target','#staticBackdrop');

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
function incluir(ele){
    var formName = document.getElementById('formNome').value;
    var formGender = document.getElementById('formGenero').value;
    var formAge = document.getElementById('formIdade').value;

    $.ajax({
        method: "POST",
        url: "https://studiopowerstrong.000webhostapp.com/Dados.php",
        dataType: 'json',
        data: { acao: "cadastrar", dbname: "UsuarioLeonardo" , Nome: formName , Idade: formAge , Sexo: formGender}
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
function apagar(ele){
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