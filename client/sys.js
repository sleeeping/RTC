/*
var limit = 100;

function test_view(limit) {
    console.log('[info] test_view', limit);
    var html = '<span style="color:red">';
    for (var i = 0; i < limit; i++) {
        html += i + '<br>';
    }
    html += '</span>';
    document.getElementById("tl").innerHTML = html;
}
*/

const my_id = "777452729903878144";
const group_ids = ["3234611605", "4146849434", "735043616305864704", "1021363264586899457", "721914131285020672", "777692742944075776", "1070017988"];
const mute_words = ['エロマンガ先生', '紗霧', 'ミシタ', '崖から突き落として', 'フレンズ', 'たつき', 'カドカワ', 'ヤオヨロズ', '角川', '貴サークル', 'シンゴジ', 'godzilla', 'ゴジラ', 'どうもり', 'どう森', 'ポケ森', 'どうぶつの森', 'キズナアイ', '魔法少女サイト', '山崎はるか', 'ポプ', 'キズナアイ', 'VTuber', 'バーチャルユーチューバー', 'SiroArt', '凛art', 'ミライアカリ', 'みとあーと', '美兎', 'にじさんじ', 'シャニマス', 'シャイニーカラー', '恋鐘', '咲耶', 'やばたにえん', 'でろあーと', 'でろーん', '猫宮ひなた', 'ヌォンタート', '名取', '輝夜月', 'せんせぇ', 'せんせえ', 'ファインダー越しの私の世界', 'エアコン', '熱中症', 'Roselia', '相羽あいな', 'サナヌリエ', 'カルテ', 'ほのむら通信局', 'バーチャルカラオケ', '因幡はねる', '声班', '姫', 'バーチャルYoutuber', 'カスタムキャスト', '#VakaTuberは誰だ', '🍆', 'さなねる', '六花', 'アカネ', 'SSSS_GRIDMAN', 'あなたのサークル', 'INIADFES', '私を布教して', 'ミリエロ', 'エロマンガ先生', '紗霧', 'ミシタ', '崖から突き落として', 'フレンズ', 'たつき', 'カドカワ', 'ヤオヨロズ', '角川', '貴サークル', 'シンゴジ', 'godzilla', 'ゴジラ', 'どうもり', 'どう森', 'ポケ森', 'どうぶつの森', 'キズナアイ', '魔法少女サイト', '山崎はるか', 'ポプ', 'キズナアイ', 'VTuber', 'バーチャルユーチューバー', 'SiroArt', '凛art', 'ミライアカリ', 'みとあーと', '美兎', 'にじさんじ', 'シャニマス', 'シャイニーカラー', '恋鐘', '咲耶', 'やばたにえん', 'でろあーと', 'でろーん', '猫宮ひなた', 'ヌォンタート', '名取', '輝夜月', 'せんせぇ', 'せんせえ', 'ファインダー越しの私の世界', 'エアコン', '熱中症', 'Roselia', '相羽あいな', 'サナヌリエ', 'カルテ', 'ほのむら通信局', 'バーチャルカラオケ', '因幡はねる', '声班', '姫', 'バーチャルYoutuber', 'カスタムキャスト', '#VakaTuberは誰だ', '🍆', 'さなねる', '六花', 'アカネ', 'SSSS_GRIDMAN', 'あなたのサークル', 'INIADFES', '私を布教して', 'ミリエロ', '下着モデル', 'はねるあーと', '歌ってみた', 'いいねした人に', 'いいねしてくれた人に', 'スターライトクルーズ', 'あきら', 'かぐや様', '恵方巻', 'りあむ', '#平成最後に自分の代表作を貼る', '令和', '仙狐さん', '平成最後'];
var grobal_tweets = new Array();
var grobal_list_top = null;
var grobal_list_bottom = null;
var grobal_owner_top = null;
var grobal_owner_bottom = null;
var bottom_load_rock = false;
var interval_id_lost_top = null;
var my_profile_image_url_https = null;
var my_name = null;
var my_screen_name = null;
//var grobal_list_reaming = null;
//var grobal_list_reset = null;
var grobal_in_reply_to_status_id = "";
var grobal_formobj = null;
var images = new Array();

function tweet_updater(id_str) {
    if (id_str == my_id) return 1;
    for (var i = 0; i < group_ids.length; i++) {
        if (group_ids[i] == id_str) return 2;
    }
    return 0;
}

function createHtml() {
    //console.log('[info] createHtml');
    bottom_load_rock = true;
    // sort
    grobal_tweets.sort(function (a, b) {
        if (a.id_str > b.id_str) return -1;
        if (a.id_str < b.id_str) return 1;
        return 0;
    });
    //console.log(grobal_tweets);
    var date_now = new Date();
    var html = "";
    for (var i = 0; i < grobal_tweets.length; i++) {
        var target = grobal_tweets[i];

        // 下限で切る
        if (target.id_str < grobal_list_bottom) break;

        // mute
        var continue_tweet = false;
        for (var m_i = 0; m_i < mute_words.length; m_i++) {
            if (target.full_text.indexOf(mute_words[m_i]) != -1) {
                continue_tweet = true;
                break;
            }
        }
        if (continue_tweet) {
            continue;
        }

        html += '<div class="box-tweet';
        if (target.retweeted_status) {
            target = target.retweeted_status;
            if (target.entities.user_mentions.length > 0) {
                html += ' mention';
            } else if (target.user.id_str == my_id) {
                html += ' mytweet';
            } else {
                html += ' rt';
            }
        } else {
            if (target.entities.user_mentions.length > 0) {
                html += ' mention';
            } else {
                switch (tweet_updater(target.user.id_str)) {
                    case 1: html += ' mytweet'; break;
                    case 2: html += ' group'; break;
                }
            }
        }

        if (target.retweet_count >= 1000 || target.favorite_count >= 1000) {
            html += ' popular';
        }
        var date_target = new Date(target.created_at);
        var spend = Math.floor((date_now.getTime() - date_target.getTime()) / 1000);
        html += '"><div class="box-profile-image">';
        html += '<img src="';
        if (target.user.id_str == my_id) {
            html += my_profile_image_url_https;
        } else {
            html += target.user.profile_image_url_https;
        }
        html += '" class="profile_image"></div><div class="box-status">';
        html += '<span class="name">';
        if (target.user.id_str == my_id) {
            html += my_name;
        } else {
            html += target.user.name;
        }
        html += '</span>';
        html += '<span class="screen_name">@';
        if (target.user.id_str == my_id) {
            html += my_screen_name;
        } else {
            html += target.user.screen_name;
        }
        html += '</span><span class="protected">';
        if (target.user.protected) {
            html += '<i class="icon icon-protected"></i>';
        }
        html += '</span><span class="time">';
        if (spend < 1) {
            html += '今';
        } else if (spend < 60) {
            html += spend + '秒';
        } else if (spend < 3600) {
            html += Math.floor(spend / 60) + '分';
        } else if (spend < 86400) {
            html += Math.floor(spend / 3600) + '時間';
        } else {
            html += Math.floor(spend / 86400) + '日';
        }
        html += '</span><br>';

        html += '<span class="status">';
        var text_tmp = target.full_text.replace(/\n/g, '<br>');
        // ????URL????
        if (target.extended_entities && target.extended_entities.media) {
            text_tmp = text_tmp.replace(target.extended_entities.media[0].url, '');
        }
        // ?URL??????
        if (target.entities.urls.length > 0) {
            for (var j = 0; j < target.entities.urls.length; j++) {
                text_tmp = text_tmp.replace(target.entities.urls[j].url, '<a href="' + target.entities.urls[j].expanded_url + '" target="_blank">' + target.entities.urls[j].display_url + '</a>');
            }
        }
        // ??????????
        //user_mentions
        // id, id_str, name, screen_name
        if (target.entities.user_mentions.length > 0) {
            for (var j = 0; j < target.entities.user_mentions.length; j++) {
                text_tmp = text_tmp.replace('@' + target.entities.user_mentions[j].screen_name, '<a href="https://twitter.com/' + target.entities.user_mentions[j].screen_name + '" target="_blank">@' + target.entities.user_mentions[j].screen_name + '</a>');
            }
        }
        // ???????????
        //hashtags
        // text
        if (target.entities.hashtags.length > 0) {
            for (var j = 0; j < target.entities.hashtags.length; j++) {
                text_tmp = text_tmp.replace('#' + target.entities.hashtags[j].full_text, '<a href="https://twitter.com/hashtag/' + target.entities.hashtags[j].text + '" target="_blank">#' + target.entities.hashtags[j].text + '</a>');
            }
        }
        // ?????????
        var text_tmp_tmp = text_tmp.replace(/[ ?]/g, '');
        if (text_tmp_tmp != '') {
            //html += tweet_replace(text_tmp);
            html += text_tmp;
            html += '</span><br>';
        } else {
            html += '</span>';
        }
        if (target.extended_entities && target.extended_entities.media) {
            html += '<div class="box-media">';
            var media_num = target.extended_entities.media.length;
            for (var j = 0; j < target.extended_entities.media.length; j++) {
                var medias = target.extended_entities.media[j];
                if (medias.media_url_https) {
                    var thumb = medias.media_url_https;
                    var url = thumb;
                    var html_tmp = '<div class="box-media-child"><a class="tweetlink" href="' + url + ':orig" target="_blank" data-lightbox="' + target.id_str + '"><img src="' + thumb + ':small" class="media_image';
                    if (medias.video_info && medias.video_info.variants) {
                        url = medias.video_info.variants[medias.video_info.variants.length - 1].url;
                        html_tmp = '<div><a href="' + url + '" target="_blank"><img src="' + thumb + ':small" class="media_image';
                    }
                    html += html_tmp;
                    switch (media_num) {
                        case 1: html += ' media_image_nomal'; break;
                        case 2: html += ' media_image_narrow'; break;
                        case 3: html += (j == 2 ? ' media_image_long' : ' media_image_mini'); break;
                        case 4: html += ' media_image_mini'; break;
                        default: break;
                    }
                    html += '"></a></div>';
                }
            }
            html += '</div>';
        }
        html += '<span class="client">via ';
        html += target.source.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
        html += '</span>';
        html += '<span class="retweet">';
        if (target.retweeted) {
            html += '<span style="color:#17bf63;"><i class="icon icon-retweet"></i>';
            if (target.retweet_count >= 1000) {
                html += Math.floor(target.retweet_count / 100) / 10 + 'k';
            } else if (target.retweet_count > 0) {
                html += target.retweet_count;
            }
            html += '</span>';
        } else {
            html += '<i class="icon icon-retweet"></i>';
            if (target.retweet_count >= 1000) {
                html += Math.floor(target.retweet_count / 100) / 10 + 'k';
            } else if (target.retweet_count > 0) {
                html += target.retweet_count;
            }
        }
        html += '</span><span class="favorite">';
        if (target.favorited) {
            html += '<span style="color:#e0245e;"><i class="icon icon-heart-filled"></i>';
            if (target.favorite_count >= 1000) {
                html += Math.floor(target.favorite_count / 100) / 10 + 'k';
            } else if (target.favorite_count > 0) {
                html += target.favorite_count;
            }
            html += '</span>';
        } else {
            html += '<i class="icon icon-favorite"></i>';
            if (target.favorite_count >= 1000) {
                html += Math.floor(target.favorite_count / 100) / 10 + 'k';
            } else if (target.favorite_count > 0) {
                html += target.favorite_count;
            }
        }
        html += '</span>';
        html += '<a class="overlaylink tweet-detail" href="javascript:void(0)" onclick="tap_detail(\'' + (target.retweeted_status ? target.id_str : target.id_str) + '\')"></a>';
        html += '<a class="overlaylink lefttap" href="javascript:void(0)" onclick="tap_left(\'' + target.id_str + '\')"></a>';
        html += '<a class="overlaylink centertap" href="javascript:void(0)" onclick="tap_center(\'' + target.id_str + '\')"></a>';
        html += '<a class="overlaylink righttap" href="javascript:void(0)" onclick="tap_right(\'' + target.id_str + '\')"></a>';

        /*
        if (target.retweeted_status) {
            // rt???Overlay
            html += '<div class="rtoverlay">';
            html += '<div class="rtoverlaychild"><img src="';
            if (target.user.id_str == my_id) {
                html += my_profile_image_url_https;
            } else {
                html += target.user.profile_image_url_https;
            }
            html += '" class="profile_image_rt"></div><div class="rtoverlaychild">';
            html += '<span class="screen_name_rt">@';
            if (target.user.id_str == my_id) {
                html += my_screen_name;
            } else {
                html += target.user.screen_name;
            }
            html += '</span><br><span class="name_rt">';
            if (target.user.id_str == my_id) {
                html += my_name;
            } else {
                html += target.user.name;
            }
            html += '</span></div>';
            html += '</div>';
            // ????
        }
        */
        html += '</div>';
        html += '</div><hr>';
    }
    document.getElementById("tl").innerHTML = html;
    var e_target = document.getElementsByClassName('tweet-detail');
    for (var i = 0; i < e_target.length; i++) {
        e_target[i].addEventListener('click', function (e) {
            click_y = e.clientY;
        });
    }
    bottom_load_rock = false;
}

function cancelPicture() {
    document.getElementById("footer_preview").style.display = "none";
    grobal_formobj = null;
    images = new Array();
}

function base64ToArrayBuffer(base64) {
    var len = base64.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = base64.charCodeAt(i);
    }
    return bytes.buffer;
}

function inputPicture(ele) {
    var html = '';
    var count = ele.files.length;
    for (var i = 0; i < ele.files.length; i++) {
        var filetype = '';
        var pattern = /^.+\.jpg$/;
        if (pattern.test(ele.files[i].name)) {
            filetype = 'jpeg';
        } else {
            pattern = /^.+\.png$/;
            if (pattern.test(ele.files[i].name)) {
                filetype = 'png';
            } else {
                pattern = /^.+\.gif$/;
                if (pattern.test(ele.files[i].name)) {
                    filetype = 'gif';
                }
            }
        }
        var fileReader = new FileReader();
        fileReader.onload = function () {
            var bin = atob(this.result.split(',')[1]);
            var exif = EXIF.readFromBinaryFile(base64ToArrayBuffer(bin));
            var tmp = ['', '', 1];
            tmp[0] = this.result.split(',')[1]; // 送信データ
            tmp[1] = filetype; // 拡張子
            tmp[2] = exif.Orientation; // 回転
            images.push(tmp);

            html += '<a href="' + this.result + '" data-lightbox="preview_' + count + '" class="preview-image-box"><img src="' + this.result + '" class="preview-image"></a>';
            if (--count == 0) {
                html += '<div class="preview-cancel-box"><button type="button" class="footer-button cancel-button" onclick="cancelPicture();"><img src="cancel.svg" width="70px" height="70px"></button></div>';
                document.getElementById("footer_preview").innerHTML = html;
                document.getElementById("footer_preview").style.display = "flex";
            }
        }
        fileReader.readAsDataURL(ele.files[i]);
    }
    grobal_formobj = document.getElementById("form_picture");
    //console.log('[info] grobal_formobj is not null');
    //console.log(grobal_formobj);
}

function tweet() {
    document.getElementById("ban").style.visibility = "visible";
    document.getElementById("ban-text").innerHTML = "Upload...";
    document.getElementById("ban-text").style.visibility = "visible";
    if (document.getElementById("status").value == '' && grobal_formobj == null) return null;
    var url = "https://slpn.jp/twitter/server/post_tweet.php?status=" + encodeURIComponent(document.getElementById("status").value);
    if (grobal_in_reply_to_status_id != "") {
        url += "&reply=" + grobal_in_reply_to_status_id;
    }
    if (grobal_formobj != null) {
        var senddata = { 'data': images };
        $.ajax({
            url: 'https://slpn.jp/twitter/server/imagerotate.php',
            type: 'POST',
            async: false,
            dataType: 'json',
            data: senddata,
        }).done(function (data) {
            if (data != null) {
                url += "&media=";
                for (var i = 0; i < data.length; i++) {
                    url += (i != 0 ? ',' : '') + data[i];
                }
            }
        });
    }
    var xhr_g = new XMLHttpRequest();
    xhr_g.onreadystatechange = function () {
        if (xhr_g.readyState === 4 && xhr_g.status === 200) {
            document.getElementById("ban").style.visibility = "hidden";
            document.getElementById("ban-text").style.visibility = "hidden";
            document.getElementById("status").value = "";
            grobal_in_reply_to_status_id = "";
            cancelPicture();
            var posted_status = JSON.parse(xhr_g.responseText);
            posted_status['full_text'] = posted_status.text;
            grobal_tweets_push([posted_status], null, null, (grobal_owner_top == null ? posted_status.id_str : null), null);
        }
    }
    xhr_g.open("GET", url, true);
    xhr_g.send(null);
}

function get_tweet_status(id) {
    var ret = null;
    for (var i = 0; i < grobal_tweets.length; i++) {
        if (grobal_tweets[i].id_str == id) {
            ret = grobal_tweets[i];
        }
    }
    // 探しに行く
    var url = "https://slpn.jp/twitter/server/get_tweet.php?id=" + id;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            ret = JSON.parse(xhr.responseText);
        }
    }
    xhr.open("GET", url, false);
    xhr.send(null);
    return ret;
}

function toggle_reload(id, type) {
    for (var i = 0; i < grobal_tweets.length; i++) {
        if (grobal_tweets[i].id_str == id) {
            if (type == 1) {
                grobal_tweets[i].retweeted = !grobal_tweets[i].retweeted;
            } else {
                grobal_tweets[i].favorited = !grobal_tweets[i].favorited;
            }
            createHtml();
            return null;
        }
    }
}

function call_change_status(id, func, type) {
    toggle_reload(id, type);
    var url = "https://slpn.jp/twitter/server/change_status.php?id=" + id + "&func=" + func;
    var xhr = new XMLHttpRequest();
    /*
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log('[Success]' + id + ', ' + func);
        }
    }
    */
    xhr.open("GET", url, true);
    xhr.send(null);
}

function toggle_retweet(id) {
    var tmp = get_tweet_status(id);
    if (tmp.retweeted) {
        call_change_status(id, "statuses/unretweet/", 1);
    } else {
        call_change_status(id, "statuses/retweet/", 1);
    }
}

function toggle_favorite(id) {
    var tmp = get_tweet_status(id);
    if (tmp.favorited) {
        call_change_status(id, "favorites/destroy", 2);
    } else {
        call_change_status(id, "favorites/create", 2);
    }
}

function paktwi(id) {
    var tmp = get_tweet_status(id);
    var text = '';
    if (!tmp['full_text']) {
        text = tmp.text;
    } else {
        text = tmp.full_text;
    }
    call_change_status(id, "favorites/create"); // fav
    document.getElementById("status").value = text;
    tweet();
}

function reply(id, in_reply_to_status_ids) {
    grobal_in_reply_to_status_id = id;
    document.getElementById("status").value = in_reply_to_status_ids;
    document.getElementById("status").focus();
}

function destroy(id) {
    var url = "https://slpn.jp/twitter/server/tweetdestroy.php?status=" + id;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            for (var i = 0; i < grobal_tweets.length; i++) {
                if (grobal_tweets[i].id_str == id) {
                    grobal_tweets.splice(i, 1);
                    createHtml();
                    break;
                }
            }
            close_detail();
        }
    }
    xhr.open("GET", url, true);
    xhr.send(null);
}

function tap_detail(id) {
    var target = null;
    //console.log(id);
    for (var i = 0; i < grobal_tweets.length; i++) {
        if (id == grobal_tweets[i].id_str) {
            //console.log("target set.");
            target = grobal_tweets[i];
            if (target.retweeted_status) {
                target = target.retweeted_status;
            }
            break;
        }
    }
    if (target == null) return null;

    //console.log(target);

    var html = '';
    html += '<div class="detail-flex"><img src="';
    if (target.user.id_str == my_id) {
        html += my_profile_image_url_https;
    } else {
        html += target.user.profile_image_url_https;
    }
    html += '" class="profile_image"></div><div class="detail-flex"><span class="detail-name">';
    if (target.user.id_str == my_id) {
        html += my_name;
    } else {
        html += target.user.name;
    }
    html += '</span><br><span class="detail-screen_name">@';
    if (target.user.id_str == my_id) {
        html += my_screen_name;
    } else {
        html += target.user.screen_name;
    }
    if (target.user.protected) {
        html += '🔒';
    }
    html += '</span></div><div class="detail-flex detail-text">';
    html += target.full_text.replace(/\n/g, '<br>');
    html += '</div>';
    /*
    html += '<br>';
    html += target.id_str;
    html += '<br>';
    html += target.created_at;
    */
    var ids = new Array();
    ids.push(target.user.id_str);
    var in_reply_to_status_ids = '@' + target.user.screen_name + ' ';
    if (target.entities.user_mentions.length > 0) {
        loopback:
        for (var j = 0; j < target.entities.user_mentions.length; j++) {
            for (var k = 0; k < ids.length; k++) {
                if (ids[k] == target.entities.user_mentions[j].id_str) {
                    continue loopback;
                }
            }
            ids.push(target.entities.user_mentions[j].id_str);
            in_reply_to_status_ids += '@' + target.entities.user_mentions[j].screen_name + ' ';
        }
    }
    html += '<button type="button" class="detail-action detail-action-color-a" onclick="reply(\'' + target.id_str + '\',\'' + in_reply_to_status_ids + '\')">@Reply</button>';
    var color_toggle = 0;
    if (target.user.id_str == my_id) {
        html += '<button type="button" class="detail-action detail-action-color-b" onclick="destroy(\'' + target.id_str + '\')">Delete</button>';
        color_toggle = 1;
    }
    // ボタン数を計算
    //var buttons = ids.length;
    // URL
    if (target.entities.urls.length > 0) {
        //buttons += target.entities.urls.length;
        for (var j = 0; j < target.entities.urls.length; j++) {
            html += '<a href="' + target.entities.urls[j].expanded_url + '" target="_blank"><button type="button" class="detail-action detail-action-color-' + (j % 2 == color_toggle ? 'b' : 'a') + '">' + target.entities.urls[j].display_url + '</button></a>';
        }
    }
    html += '<div class="detail-flex"><button type="button" class="close-button" onclick="close_detail()">×</button></div>';
    document.getElementById("detail_panel").innerHTML = html;
    document.getElementById("detail_panel").style.display = "flex";
}

function close_detail() {
    document.getElementById("detail_panel").style.display = "none";
}

function tap_left(id) {
    toggle_retweet(id);
}

function tap_center(id) {
    paktwi(id);
}

function tap_right(id) {
    toggle_favorite(id);
}

function id_calc(id, func) {
    var id_half = Math.floor(id.length / 2);
    var id_a = parseInt(id.substr(0, id_half), 10);
    var id_b = parseInt(id.substr(id_half), 10);
    var id_b_len = id.substr(id_half).length;
    var padding = '';
    for (var i = 0; i < id_b_len; i++) {
        padding += '0';
    }
    //console.log('[debug]', padding, id_a, id_b, id_b_len);
    if (func == '-') {
        var id_b_tmp = parseInt('1' + id.substr(id_half), 10);
        id_b -= 1;
        if (id_b < 0) {
            id_a -= 1;
            id_b = id_b_tmp - 1;
        }
        var ret = '' + id_a + (padding + id_b).slice(0 - id_b_len);
        //console.log('[debug]', (padding + id_b).slice(0 - id_b_len));
        //console.log('[debug]', ret);
        //console.log('[info] id calc', id, func, ret);
        return ret;
    } else if (func == '+') {
        id_b += 1;
        if (String(id_b).length > id_b_len) {
            id_a += 1;
            id_b = 0;
        }
        var ret = '' + id_a + (padding + id_b).slice(0 - id_b_len);
        //console.log('[debug]', (padding + id_b).slice(0 - id_b_len));
        //console.log('[debug]', ret);
        //console.log('[info] id calc', id, func, ret);
        return ret;
    }
    console.log('[warning] id calc error');
    return id;
}

function grobal_tweets_push(ary, list_top, list_bottom, owner_top, owner_bottom) {
    //console.log('[info] grobal_tweets_push', list_top, list_bottom, owner_top, owner_bottom);
    grobal_tweets = grobal_tweets.concat(ary);
    if (list_top != null) grobal_list_top = list_top;
    if (list_bottom != null) grobal_list_bottom = list_bottom;
    if (owner_top != null) grobal_owner_top = owner_top;
    if (owner_bottom != null) grobal_owner_bottom = owner_bottom;
    //console.log(grobal_tweets);
    //console.log('残り', grobal_list_reaming, grobal_list_reset, 's');
    createHtml();
}

function bottom_my_load() {
    // my
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://slpn.jp/twitter/server/get_my.php", true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(grobal_owner_top, grobal_owner_bottom);
            var json_sub = JSON.parse(xhr.responseText);
            //console.log('[info] get my', grobal_owner_top, grobal_owner_bottom);
            //console.log(json_sub.data);
            if (json_sub.data.length != 0) {
                grobal_tweets_push(json_sub.data, null, null, (grobal_owner_top == null ? json_sub.data[0].id_str : null), json_sub.data[json_sub.data.length - 1].id_str);
                if (grobal_list_bottom < grobal_owner_bottom) {
                    bottom_my_load();
                }
            }
        }
    };
    xhr.send(null);
}

function top_load() {
    var start = new Date().getTime();
    // list
    var url = "https://slpn.jp/twitter/server/get_timeline.php?since_id=" + id_calc(grobal_list_top, '+');
    //console.log('[info] get timeline url', url);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var done = new Date().getTime();
            var ping = done - start;
            var level = 5 - Math.floor(ping / 500);
            if (level < 1) level = 1;
            var ping_html = '<div class="ping-volume">';
            for (var i = 0; i < level; i++) {
                ping_html += '<div id="ping-vol-' + (i + 1) + '" class="ping-volume-bar ping-volume-' + (level) + '"></div>';
            }
            ping_html += '</div>';
            document.getElementById("ping_lay").innerHTML = ping_html;
            var json = JSON.parse(xhr.responseText);
            //console.log('[info] get timeline', grobal_list_top, null);
            if (json.data.length != 0) {
                grobal_tweets_push(json.data, json.data[0].id_str, null, null, null);
                //grobal_list_reaming = json.reaming;
                //grobal_list_reset = json.reset;
            }
        }
    };
    xhr.send(null);
}



function bottom_load() {
    // list
    var url = "https://slpn.jp/twitter/server/get_timeline.php?max_id=" + id_calc(grobal_list_bottom, '-');
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);
            //console.log('[info] get timeline', null, grobal_list_bottom);
            if (json.data.length != 0) {
                grobal_tweets_push(json.data, null, json.data[json.data.length - 1].id_str, null, null);
                toggle_rock(false);
            }/* else {
                console.log('[warning] json data is zero');
            }*/
        }
    };
    xhr.send(null);
}

function toggle_rock(isRock) {
    if (isRock) {
        //console.log('[info] rock');
        bottom_load_rock = true;
        document.getElementById("load_lay").style.display = "block";
    } else {
        //console.log('[info] unrock');
        bottom_load_rock = false;
        document.getElementById("load_lay").style.display = "none";
    }
}

function get_remain() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var clientHeight = document.body.clientHeight;
    var scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    if (scrollHeight === clientHeight) {
        clientHeight = window.innerHeight;
    }
    var remain = scrollHeight - clientHeight - scrollTop;
    //console.log('[info] remain', remain, bottom_load_rock);
    //document.getElementById("status").value = remain;
    if (remain < 200 && !bottom_load_rock) {
        toggle_rock(true);
        bottom_load();
    }
}

function init() {
    //console.log('[info] init');

    /*
    // newtwork event
    window.online = function () {
        to_online();
    }
    window.offline = function () {
        to_offline();
    }
    */

    // window event
    window.onscroll = function () {
        get_remain();
    }

    // my profile
    var xhr_pf = new XMLHttpRequest();
    xhr_pf.open("GET", "https://slpn.jp/twitter/server/get_my_profile.php", true);
    xhr_pf.onload = function (e) {
        if (xhr_pf.readyState === 4 && xhr_pf.status === 200) {
            //console.log(grobal_owner_top, grobal_owner_bottom);
            var json_pf = JSON.parse(xhr_pf.responseText);
            //console.log('[info] get my profile');
            //console.log(json_pf);
            my_profile_image_url_https = json_pf.profile_image_url_https;
            my_name = json_pf.name;
            my_screen_name = json_pf.screen_name;

            // init load

            // list
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://slpn.jp/twitter/server/get_timeline.php", true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var json = JSON.parse(xhr.responseText);
                    //console.log('[info] get timeline', null, null);
                    grobal_tweets_push(json.data, json.data[0].id_str, json.data[json.data.length - 1].id_str, null, null);

                    //my
                    bottom_my_load();

                    // top load
                    interval_id_lost_top = setInterval('top_load()', 2000);
                }
            };
            xhr.send(null);
        }
    };
    xhr_pf.send(null);
}