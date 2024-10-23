<?php
  
  try 
  {
    $db = new PDO('mysql:host=localhost;dbname=barcode', 'root', 'root');
  }
  catch (PDOException $e)
  {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
  }

  $barcode = $_GET['barcode'];

  if($barcode)
  {
    $query = $db->prepare("SELECT * FROM products WHERE barcode = :barcode");
    $query->bindParam(':barcode', $barcode);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }
  else
  {
    $query = $db->prepare("SELECT * FROM products");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
  }