<?php
    include "conexion.php";
    if(isset($_POST["nombre"]) && isset($_POST["descripcion"])){
        $nombre =  $_POST["nombre"];
        $descripcion =  $_POST["descripcion"];
        $consulta = "insert into tarea(nombre, descripcion) values ('$nombre', '$descripcion')";
        $resultado = mysqli_query($conexion, $consulta);
        if(!$resultado){
            die("La consulta ha fallado");
        }else{
            echo "Tarea agregada con exito";
        }
    }    
?>