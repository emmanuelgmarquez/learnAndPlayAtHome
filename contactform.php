<?php

if (isset($_POST['submit'])) {
    $email = $_POST['email'];

    $to = "emmanuelgmarquez@yahoo.com";

    mail($to, $email);
}

?>
