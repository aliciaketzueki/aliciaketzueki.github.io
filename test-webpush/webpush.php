<?php

$url = 'https://fcm.googleapis.com/fcm/send';
$YOUR_API_KEY = 'AAAASgNFigU:APA91bHHecUByz-lDQVtgjm1S8Abo90islHr0Digs_Kq57W9ISbOIng3Zq7kui4F7AeedvnM96n1emqFhZ1QBLQN1LtLlGNTVrDy5_vuO9azp51j5PqCyr17fIJG5kyMkPzswRwh4urj'; // Server key
$YOUR_TOKEN_ID = 'ffkwS-99I_E:APA91bEJLDv5ifD6ZWPI6PPokRnquRfK1h1rlUprpNOs7VTwAMLnyFEjRQslqjbHe2PzItjt_qmaHD-nqxwh92M6zpNAliuTO8kDVIaeP8ozU_HiNk92RJtG8jQNSMudbEbaMG5HcyOi'; // Client token id

$request_body = array(
    'to' => $YOUR_TOKEN_ID,
    'notification' => [
        'title' => 'Заголовок уведомления',
        'body' => 'Текст уведомления',
        'icon' => '',
        'click_action' => 'https://makeit-da.ru/'
    ]
);
$fields = json_encode($request_body);

$request_headers = [
    'Content-Type: application/json',
    'Authorization: key=' . $YOUR_API_KEY
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_HTTPHEADER, $request_headers);
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
