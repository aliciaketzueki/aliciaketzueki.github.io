<?php

$url = 'https://fcm.googleapis.com/fcm/send';
$YOUR_API_KEY = 'AAAASgNFigU:APA91bHHecUByz-lDQVtgjm1S8Abo90islHr0Digs_Kq57W9ISbOIng3Zq7kui4F7AeedvnM96n1emqFhZ1QBLQN1LtLlGNTVrDy5_vuO9azp51j5PqCyr17fIJG5kyMkPzswRwh4urj'; // Server key
$YOUR_TOKEN_ID = 'ePGDW707Slo:APA91bH-02IkrO9I8po4AckGiRLa-NoQ-GYP90T4_URFwRY3hc2mfkf--6Zc3feq0bfRKMPyz9PZ3eIb34Bl6AFBg16VQ7YZAnCb3TY8-05R6eQkuCRXvcEduhQPm1Cmths-hPkBhuzH'; // Client token id

$request_body = [
    'to' => $YOUR_TOKEN_ID,
    'notification' => [
        'title' => 'Заголовок уведомления',
        'body' => sprintf('Начало в %s.', date('H:i')),
        'icon' => '',
        'click_action' => 'https://makeit-da.ru/'
    ]
];
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
