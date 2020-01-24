$(document).ready(function(){
    
    cargarTareas();
    
    console.log("JQuery esta funcionando");
    $("#resultadoTarea").hide();
    
    $('#buscar').keyup(function(e) {
        if ($('#buscar').val()) {
            let buscar = $('#buscar').val();
            $.ajax({
                url: 'busqueda_tareas.php',
                type: 'POST',
                data: { buscar },
                success: function(respuesta) {
                    let tareas = JSON.parse(respuesta);
                    console.log(tareas);
                    let plantilla = '';
                    
                    for(tarea of tareas){
                        plantilla += `<li>
                            ${tarea.nombre}
                        </li>`
                    }
                    $('#contenedor').html(plantilla);
                    $('#resultadoTarea').show();
                }
            });
        }
    });
    
    $("#form_tarea").submit(function(e){
        e.preventDefault();
        const datosPost = {
            "nombre": $("#nombre").val(),
            "descripcion": $("#descripcion").val()
        }
        $.post("agregarTarea.php", datosPost, function(respuesta){
            cargarTareas();
            $("#form_tarea").trigger("reset");
        });
    });
      
    function cargarTareas(){
        $.ajax({
            url: 'listarTareas.php',
            type: 'GET',
            success: function(respuesta) {
                //console.log(respuesta);
                let tareas = JSON.parse(respuesta);
                let plantilla = '';

                for(tarea of tareas){
                    plantilla += `
                    <tr idTarea='${tarea.id}' nomTarea='${tarea.nombre}' desTarea='${tarea.descripcion}'>
                        <td>${tarea.id}</td>
                        <td>${tarea.nombre}</td>
                        <td>${tarea.descripcion}</td>    
                        <td>
                            <button class='btn btn-danger eliminarTarea'>Eliminar</button>
                        </td>
                        <td>
                            <button class='btn btn-warning editarTarea' data-toggle='modal' data-target='#modal'>Editar</button>
                        </td>  
                    </tr>`
                }
               $("#tareas").html(plantilla);
            }
        });  
    }
    
    $(document).on("click", ".eliminarTarea", function(){
        if(confirm("Estas seguro de eliminar esta tarea?")){
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr("idTarea");
            $.ajax({
                url: "eliminarTarea.php",
                type: "POST",
                data: { id },
                success: function(respuesta){
                    cargarTareas();
                }
            });
        }
    });
    
     $(document).on("click", ".editarTarea", function(){
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr("idTarea");
        let nombre = $(elemento).attr("nomTarea");
        let descripcion = $(elemento).attr("desTarea");
        $("#id_tarea").val(id);
        $("#nombre_tarea").val(nombre);
        $("#des_tarea").val(descripcion);
         
    });
    
    $("#editarTarea").click(function(){
        
        const datosPost = {
            "id": $("#id_tarea").val(),
            "nombre": $("#nombre_tarea").val(),
            "descripcion": $("#des_tarea").val()
        }
        
        $.ajax({
            url: "editarTarea.php",
            type: "POST",
            data: datosPost,
            success: function(respuesta){
                cargarTareas();
                $('#modal').modal('hide');
            }
        });
    });
    
//    function agregarDatos(id, nombre, descripcion){
//		$("#id_tarea").val(id);
//		$("#nombre_tarea").val(nombre);	
//        $("#des_tarea").val(descripcion);	
//	}
});
        
        
        
//let campo =  document.getElementById("buscar");  
//campo.addEventListener("keyup", enviarPeticion);
//function enviarPeticion(){
//        let buscar = campo.value;
//        let obj = new XMLHttpRequest();
//        obj.open("POST", "busqueda_tareas.php", true);
//        obj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//        obj.onreadystatechange = function(){
//            let datos = JSON.parse(obj.response);
//            console.log(datos);
//    }
//    obj.send('buscar=' + buscar);
//}