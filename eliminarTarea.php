<?php
    include "conexion.php";
    if(isset($_POST["id"])){
        $id =  $_POST["id"];
        $consulta = "delete from tarea where id='" . $id . "'";
        $resultado = mysqli_query($conexion, $consulta);
        if(!$resultado){
            die("La consulta ha fallado");
        }else{
            echo "Tarea eliminada con exito";
        }
    }    
?>