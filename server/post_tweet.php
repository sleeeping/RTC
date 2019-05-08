<?php
/*
header('Access-Control-Allow-Origin: *');
*/
header("Content-Type: application/json; charset=utf-8");
require_once '/var/www/html/slpn/test/twitter/common_y.php';

$api_key = CONSUMER_KEY;
$api_secret = CONSUMER_SECRET;
$access_token = ACCESS_TOKEN;
$access_token_secret = ACCESS_TOKEN_SECRET;
$request_url = 'https://api.twitter.com/1.1/statuses/update.json' ;
$request_method = 'POST' ;

if(!isset($_GET['status'])){
	exit(0);
}

$params_a = array(
	"status" => $_GET['status'],
	"trim_user" => true,
);
if(isset($_GET['max_id'])){
	$params_a['max_id'] = $_GET['max_id'];
}
if(isset($_GET['since_id'])){
	$params_a['since_id'] = $_GET['since_id'];
}
if(isset($_GET['reply'])){
	$params_a['in_reply_to_status_id'] = $_GET['reply'];
}
if(isset($_GET['media'])){
	$params_a['media_ids'] = $_GET['media'];
}

$signature_key = rawurlencode( $api_secret ) . '&' . rawurlencode( $access_token_secret ) ;

$params_b = array(
	'oauth_token' => $access_token ,
	'oauth_consumer_key' => $api_key ,
	'oauth_signature_method' => 'HMAC-SHA1' ,
	'oauth_timestamp' => time() ,
	'oauth_nonce' => microtime() ,
	'oauth_version' => '1.0' ,
) ;
$params_c = array_merge( $params_a , $params_b ) ;
ksort( $params_c ) ;
$request_params = http_build_query( $params_c , '' , '&' ) ;
$request_params = str_replace( array( '+' , '%7E' ) , array( '%20' , '~' ) , $request_params ) ;
$request_params = rawurlencode( $request_params ) ;
$encoded_request_method = rawurlencode( $request_method ) ;
$encoded_request_url = rawurlencode( $request_url ) ;
$signature_data = $encoded_request_method . '&' . $encoded_request_url . '&' . $request_params ;
$hash = hash_hmac( 'sha1' , $signature_data , $signature_key , TRUE ) ;
$signature = base64_encode( $hash ) ;
$params_c['oauth_signature'] = $signature ;
$header_params = http_build_query( $params_c , '' , ',' ) ;

$context = array(
	'http' => array(
		'method' => $request_method ,
		'header' => array(
			'Authorization: OAuth ' . $header_params ,
		) ,
	) ,
) ;
if( $params_a ) {
	$context['http']['content'] = http_build_query( $params_a ) ;
}

// cURL
$curl = curl_init() ;
curl_setopt( $curl, CURLOPT_URL , $request_url ) ;
curl_setopt( $curl, CURLOPT_HEADER, true ) ;
curl_setopt( $curl, CURLOPT_CUSTOMREQUEST , $context['http']['method'] ) ;
curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER , false ) ;
curl_setopt( $curl, CURLOPT_RETURNTRANSFER , true ) ;
curl_setopt( $curl, CURLOPT_HTTPHEADER , $context['http']['header'] ) ;
if( isset( $context['http']['content'] ) && !empty( $context['http']['content'] ) ) {
	curl_setopt( $curl , CURLOPT_POSTFIELDS , $context['http']['content'] ) ;
}
curl_setopt( $curl, CURLOPT_TIMEOUT , 5 ) ;
curl_setopt( $curl, CURLOPT_FRESH_CONNECT , true ) ;
$res1 = curl_exec( $curl ) ;
$res2 = curl_getinfo( $curl ) ;
curl_close( $curl ) ;
echo $json = substr( $res1, $res2['header_size'] ) ;
?>