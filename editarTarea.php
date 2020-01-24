<?php
    include "conexion.php";
    if(isset($_POST["id"])){
        $id =  $_POST["id"];
        $nombre =  $_POST["nombre"];
        $descripcion =  $_POST["descripcion"];
        $consulta = "update tarea set nombre='" . $nombre . "', descripcion='" . $descripcion . "' where id='" . $id . "'";
        echo $consulta;
        $resultado = mysqli_query($conexion, $consulta);
        if(!$resultado){
            die("La consulta ha fallado");
        }else{
            echo "Tarea modificada con exito";
        }
    }    
?>