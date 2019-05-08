<?php
    //header('Access-Control-Allow-Origin: *');
    header("Content-Type: application/json; charset=utf-8");
    require_once '/var/www/html/slpn/test/twitter/common_y.php';

    // test
    require_once("/var/www/html/slpn/twitter/twitteroauth.php");
    require_once('/var/www/html/slpn/info/vendor/autoload.php');
    use Abraham\TwitterOAuth\TwitterOAuth;
    $api_key = CONSUMER_KEY;
    $api_secret = CONSUMER_SECRET;
    $access_token = ACCESS_TOKEN;
    $access_token_secret = ACCESS_TOKEN_SECRET;

    $ret = array();
    //$data = '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';
    for($i = 0; $i < count($_POST['data']); $i++){
        $data = $_POST['data'][$i][0];
        $data = base64_decode($data);
        $im = imagecreatefromstring($data);
        if($im !== false){
            // OK
            $degrees = 0;
            //$mode    = '';
            switch($_POST['data'][$i][2]){
                case 2:
                    //$mode = IMG_FLIP_VERTICAL;
                    break;
                case 3:
                    $degrees = 180;
                    break;
                case 4:
                    //$mode = IMG_FLIP_HORIZONTAL;
                    break;
                case 5:
                    $degrees = 270;
                    //$mode    = IMG_FLIP_VERTICAL;
                    break;
                case 6:
                    $degrees = 270;
                    break;
                case 7:
                    $degrees = 90;
                    //$mode    = IMG_FLIP_VERTICAL;
                    break;
                case 8:
                    $degrees = 90;
                    break;
            }
            /*
            if (!empty($mode)){
                imageflip($im, $mode);
            }
            */
            if ($degrees > 0){
                $im = imagerotate($im, $degrees, 0);
            }

            ob_start();
            if(strcmp("jpeg", $_POST['data'][$i][1]) == 0){
                imagejpeg($im);
            }else if(strcmp("png", $_POST['data'][$i][1]) == 0){
                imagepng($im);
            }else if(strcmp("gif", $_POST['data'][$i][1]) == 0){
                imagegif($im);
            }
            $imgdata = ob_get_contents();
            ob_end_clean();
            $imgdata = base64_encode($imgdata);
            imagedestroy($im);
            //$imgdata = 'data:image/jpeg;base64,' . $imgdata;
            //echo '<img src="' . $imgdata .'">';
            //$fn = 'tmp/' . password_hash(time(), PASSWORD_BCRYPT);
            $fn = 'tmp/' . md5($imgdata);
            file_put_contents($fn, base64_decode($imgdata));
            //echo $fn;

            $twObj = new TwitterOAuth($api_key,$api_secret,$access_token,$access_token_secret);
            $media_id = $twObj->upload("media/upload", array("media" => $fn));
            /*
            echo '<pre>';
            var_dump($media_id);
            echo '</pre>';
            */
            $ret[] = $media_id->media_id_string;

            unlink($fn);
        }else{
            // ERROR
        }
    }
    
    echo json_encode($ret);
?>