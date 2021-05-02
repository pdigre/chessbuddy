<?php
include_once('db.php');
header("Access-Control-Allow-Origin: *");
$json = file_get_contents('php://input');
$data = json_decode($json);
$email=$data->email;
$device=$data->device;
$games=$data->games;

// Get Userid
$userid = 0;
$sql = "SELECT * FROM player WHERE email='".$email."';";
$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
if(mysqli_num_rows($get_data_query)!=0){
	$result = array();
	while($r = mysqli_fetch_array($get_data_query)){
		extract($r);
		$result[] = array("userid" => $userid);
	}
} else {
	$sql = "INSERT INTO player (email) VALUES ('".$email."');";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));

	$sql = "SELECT * FROM player WHERE email='".$email."';";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$result = array();
	while($r = mysqli_fetch_array($get_data_query)){
		extract($r);
		$result[] = array("userid" => $userid);
	}
}
// Get device
$sql = "SELECT * FROM devices WHERE userid = ".$userid." AND info = '".$device."';";
$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
if(mysqli_num_rows($get_data_query)!=0){
	$result = array();
	while($r = mysqli_fetch_array($get_data_query)){
		extract($r);
		$result[] = array("deviceid" => $deviceid);
	}
} else {
	$sql = "INSERT INTO devices (userid, info) VALUES (".$userid.",'".$device."');";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));

	$sql = "SELECT * FROM devices WHERE userid = ".$userid." AND info = '".$device."';";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$result = array();
	while($r = mysqli_fetch_array($get_data_query)){
		extract($r);
		$result[] = array("deviceid" => $deviceid);
	}
}
$t= base_convert((time()*1000),10,36);
$sql = "UPDATE devices SET updated = '".$t."' WHERE deviceid = ".$deviceid.";";
$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));


// Store games
$count=0;
$gamearr=explode("\n",$games);
foreach($gamearr as $game){
	$gamevars=explode(";",$game);
	$gametime=$gamevars[0];
	$sql = "SELECT * FROM games WHERE userid = ".$userid." AND updated='".$gametime."';";
	$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	if(mysqli_num_rows($get_data_query)!=0){
		$result = array();
		while($r = mysqli_fetch_array($get_data_query)){
			extract($r);
			$result[] = array("gameid" => $gameid);
		}
	} else {
		$sql = "INSERT INTO games (userid, info, updated) VALUES (".$userid.",'".$game."','".$gametime."');";
		$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		$count++;
	}
}
$allgames=[];
$sql = "SELECT * FROM games WHERE userid = ".$userid.";";
$get_data_query = mysqli_query($conn, $sql) or die(mysqli_error($conn));
if(mysqli_num_rows($get_data_query)!=0){
	$result = array();
	while($r = mysqli_fetch_array($get_data_query)){
		extract($r);
		$result[] = array("info" => $info);
		$allgames[sizeof($allgames)] = $info;
	}
}

$json = array("stored" => $count,"games" => $allgames);
@mysqli_close($conn);
header('Content-type: application/json');
echo json_encode($json);
?>
