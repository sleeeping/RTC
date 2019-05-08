<?php
require_once '/var/www/html/slpn/test/twitter/common_y.php';

$log_file = '/var/www/html/slpn/test/twitter/php_log.txt';

$api_key = CONSUMER_KEY;
$api_secret = CONSUMER_SECRET;
$access_token = ACCESS_TOKEN;
$access_token_secret = ACCESS_TOKEN_SECRET;
$request_url = 'https://api.twitter.com/1.1/';
$params_a = array();
if($_GET['func'] === "statuses/unretweet/" || $_GET['func'] === "statuses/retweet/"){
	$request_url .= $_GET['func'] . $_GET['id'] . '.json';
	file_put_contents($log_file, date("Y.m.d H:i:s") . ' [Info] Set url: ' . $request_url . "\n", FILE_APPEND);
}else{
	$request_url = 'https://api.twitter.com/1.1/' . $_GET['func'] . '.json' ;
	file_put_contents($log_file, date("Y.m.d H:i:s") . ' [Info] Set url: ' . $request_url . "\n", FILE_APPEND);
	$params_a = array('id'=>$_GET['id']);
}
$request_method = 'POST' ;

echo 'url: ' . $request_url . "\n";
echo 'id: ' . $_GET['id'] . "\n";
echo 'func: ' . $_GET['func'] . "\n";

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
//$header = explode("\n", substr( $res1, 0, $res2['header_size'] )) ;

// JSONをオブジェクトに変換
//$obj = json_decode( $json ) ;

/*
// エラー判定
if( !$json || !$obj ) {
	// error
}
*/

// 検証用
/*
echo 'json<br>' ;
echo '<p><pre>';
var_dump($obj);
echo '</pre></p>' ;
*/
/*
echo 'response<br>' ;
echo '<p><pre>';
var_dump($header);
echo '</pre></p>' ;
*/

/*
$x_rate_limit_reset;
$x_rate_limit_remaining;
foreach($header as $val){
	if(strpos($val, 'x-rate-limit-reset') !== false){
		// x-rate-limit-reset
		if($res = preg_match('/[0-9]+/u', $val, $matches)){
			$x_rate_limit_reset = $matches[0];
		}
	}else if(strpos($val, 'x-rate-limit-remaining') !== false){
		// x-rate-limit-remaining
		if($res = preg_match('/[0-9]+/u', $val, $matches)){
			$x_rate_limit_remaining = $matches[0];
		}
	}
}
$time = new DateTime();
$time->setTimestamp($x_rate_limit_reset)->setTimezone(new DateTimeZone('Asia/Tokyo'));
//echo '解除: ' . $time->format('H:i:s') . '<br>';

$ret = array();
$ret['reaming'] = $x_rate_limit_remaining;
$ret['reset'] = $x_rate_limit_reset - time();
$ret['data'] = $obj;


echo json_encode($ret);
*/


// 検証用
/*
echo 'url<br>' ;
echo '<p><pre>' . $context['http']['method'] . ' ' . $request_url . '</pre></p>' ;
echo 'header<br>' ;
echo '<p><pre>' . implode( "\r\n" , $context['http']['header'] ) . '</pre></p>' ;
*/
/*
foreach($obj as $ApiData){
	echo $ApiData->text . '<br>';
}
*/
/*
for($i = 0; $i < count($obj) $i++){
	echo $obj[$i]->text . '<br>';
}
*/
?>