<?php
include('conexion.php');

$consulta= "select * from tarea";
$resultado = mysqli_query($conexion, $consulta);

if(!$resultado){
    die('Error de consulta' . mysqli_error($conexion));
}

//while($fila = mysqli_fetch_array($resultado)){
//    echo "<tr>";
//        echo "<td>" . $fila['id'] . "</td>";
//        echo "<td>" . $fila['nombre'] . "</td>";
//        echo "<td>" . $fila['descripcion'] . "</td>";
//    echo"</tr>";
//}

$json = array();
while($fila = mysqli_fetch_array($resultado)){
    $json[] = array(
        'nombre' => $fila['nombre'],
        'descripcion' => $fila['descripcion'],
        'id' => $fila['id']
    );
}
$jsonstring = json_encode($json);
echo $jsonstring;
?>