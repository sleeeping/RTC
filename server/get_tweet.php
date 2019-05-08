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
$request_url = 'https://api.twitter.com/1.1/statuses/show.json' ;
$request_method = 'GET' ;

$params_a = array(
	"id" => $_GET['id'],
	"tweet_mode" => "extended",
	"trim_user" => "false",
	"include_my_retweet" => "true",
	"include_entities" => "true",
);

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
	$request_url .= '?' . http_build_query( $params_a );
}

// cURL
$curl = curl_init() ;
curl_setopt( $curl, CURLOPT_URL , $request_url ) ;
curl_setopt( $curl, CURLOPT_HEADER, true ) ;
curl_setopt( $curl, CURLOPT_CUSTOMREQUEST , $context['http']['method'] ) ;
curl_setopt( $curl, CURLOPT_SSL_VERIFYPEER , false ) ;
curl_setopt( $curl, CURLOPT_RETURNTRANSFER , true ) ;
curl_setopt( $curl, CURLOPT_HTTPHEADER , $context['http']['header'] ) ;
curl_setopt( $curl, CURLOPT_TIMEOUT , 5 ) ;
curl_setopt( $curl, CURLOPT_FRESH_CONNECT , true ) ;
$res1 = curl_exec( $curl ) ;
$res2 = curl_getinfo( $curl ) ;
curl_close( $curl ) ;

echo $json = substr( $res1, $res2['header_size'] ) ;
/*
$header = explode("\n", substr( $res1, 0, $res2['header_size'] )) ;
$obj = json_decode( $json ) ;

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
$ret['reaming'] = intval($x_rate_limit_remaining);
$ret['reset'] = $x_rate_limit_reset - time();
$ret['data'] = $obj;


echo json_encode($ret);
*/
?>