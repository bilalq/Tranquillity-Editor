<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends MY_Controller {
	public function index() {
		$url = "http://api.lymbix.com/tonalize_detailed";
		$headers = array('Content-Type: application/json', 'ACCEPT: application/json', 'VERSION: 2.2', 'AUTHENTICATION: 6c89f5919d00b2aa292c2bb30c71f1900fcec95f');
		$dataz = array("article: please fucking work", "return_fields: []");

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $dataz);
		$reply = curl_exec($ch);
		curl_close($ch);
 
 		$ar = json_decode($reply,true);

 		echo $ar['dominant_emotion'];


		$this->template->build("editor");
	}

	public function sentiment($poem){
		$ch = curl_init();
		$ch = curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'ACCEPT: application/json', 'VERSION: 2.2', 'AUTHENTICATION: 6c89f5919d00b2aa292c2bb30c71f1900fcec95f'));
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		$reply=curl_exec($ch);
		curl_close($ch);
 
 		$ar = json_decode($reply,true);

 		echo $ar['dominant_emotion'];
	}
}

?>