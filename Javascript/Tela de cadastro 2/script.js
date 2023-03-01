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
    });
}